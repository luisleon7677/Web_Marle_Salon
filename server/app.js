require('dotenv').config()

const crypto = require('node:crypto')
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const pool = require('./src/config/database')

const app = express()
const bucket = process.env.AWS_S3_BUCKET || 'marlestore'
const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-2', endpoint: process.env.AWS_ENDPOINT_URL_S3, forcePathStyle: true })
const uploads = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) callback(null, true)
    else callback(new Error('Formato de imagen no permitido.'))
  },
})
const loginAttempts = new Map()

app.set('trust proxy', 1)
app.use(cors({ origin: process.env.URL_FRONTEND || 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }))
app.use(express.json({ limit: '32kb' }))

function secureEqual(left, right) {
  const a = Buffer.from(String(left))
  const b = Buffer.from(String(right))
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

function signSession(expiry) {
  const payload = Buffer.from(JSON.stringify({ exp: expiry })).toString('base64url')
  const signature = crypto.createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

function requireAdmin(req, res, next) {
  const token = /^Bearer (.+)$/.exec(req.get('authorization') || '')?.[1]
  if (!token || !process.env.ADMIN_SESSION_SECRET) return res.status(401).json({ error: 'Inicia sesión.' })
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return res.status(401).json({ error: 'Sesión inválida.' })
  const expected = crypto.createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(payload).digest('base64url')
  if (!secureEqual(signature, expected)) return res.status(401).json({ error: 'Sesión inválida.' })
  try {
    if (JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Date.now()) return next()
  } catch { /* invalid payload */ }
  return res.status(401).json({ error: 'La sesión expiró. Inicia sesión de nuevo.' })
}

function parseProduct(body, current = null) {
  const name = String(body.name || '').trim()
  const description = String(body.description ?? current?.description ?? '').trim()
  const category = String(body.category || '').trim().toLowerCase()
  const line = String(body.line || '').trim()
  const badgeLabel = String(body.badgeLabel || '').trim()
  const price = Number(body.price)
  const oldPrice = body.oldPrice === '' || body.oldPrice == null ? null : Number(body.oldPrice)
  const rating = body.rating === '' || body.rating == null ? null : Number(body.rating)
  if (!name || name.length > 180 || !category || category.length > 80 || line.length > 100 || badgeLabel.length > 50 ||
    !Number.isFinite(price) || price < 0 || (oldPrice !== null && (!Number.isFinite(oldPrice) || oldPrice < 0)) ||
    (rating !== null && (!Number.isFinite(rating) || rating < 0 || rating > 5))) return null
  const badge = { ...(current?.badge || {}) }
  if (line) badge.line = line
  else delete badge.line
  if (badgeLabel) { badge.label = badgeLabel; badge.type ||= 'new' }
  else { delete badge.label; delete badge.type }
  return { name, description, category, price, oldPrice, rating, badge: Object.keys(badge).length ? badge : null }
}

async function isRegisteredCategory(category) {
  const result = await pool.query("SELECT 1 FROM categories WHERE id=$1 AND id NOT IN ('all', 'todos')", [category])
  return result.rowCount > 0
}

async function uploadImage(file, req) {
  if (!file) return null
  const bytes = file.buffer
  const isJpeg = file.mimetype === 'image/jpeg' && bytes[0] === 0xff && bytes[1] === 0xd8
  const isPng = file.mimetype === 'image/png' && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  const isWebp = file.mimetype === 'image/webp' && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP'
  if (!isJpeg && !isPng && !isWebp) {
    const error = new Error('El archivo no es una imagen válida.')
    error.status = 400
    throw error
  }
  const extension = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[file.mimetype]
  const key = `products/${crypto.randomUUID()}.${extension}`
  await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: file.buffer, ContentType: file.mimetype }))
  const base = (process.env.API_PUBLIC_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '')
  return { key, url: `${base}/product-images/${key}` }
}

async function removeManagedImage(url) {
  try {
    const match = new URL(url).pathname.match(/^\/product-images\/(products\/[a-f0-9-]{36}\.(?:jpg|png|webp))$/)
    if (match) await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: match[1] }))
  } catch (error) { console.error('No se pudo eliminar la imagen anterior:', error) }
}

function handleError(res, error) {
  console.error(error)
  res.status(error.status || 500).json({ error: error.status === 400 ? error.message : 'No se pudo completar la operación.' })
}

app.post('/admin/login', (req, res) => {
  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) return res.status(503).json({ error: 'El acceso de administración no está configurado.' })
  const key = req.ip
  const attempt = loginAttempts.get(key)
  if (attempt && attempt.until > Date.now() && attempt.count >= 5) return res.status(429).json({ error: 'Demasiados intentos. Espera 15 minutos.' })
  const valid = secureEqual(req.body?.username || '', process.env.ADMIN_USER) && secureEqual(req.body?.password || '', process.env.ADMIN_PASSWORD)
  if (!valid) {
    const count = attempt && attempt.until > Date.now() ? attempt.count + 1 : 1
    loginAttempts.set(key, { count, until: Date.now() + 15 * 60 * 1000 })
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' })
  }
  loginAttempts.delete(key)
  res.json({ token: signSession(Date.now() + 8 * 60 * 60 * 1000) })
})

app.get('/test-db', async (_req, res) => {
  try { const result = await pool.query('SELECT NOW()'); res.json({ ok: true, database: result.rows[0] }) }
  catch (error) { handleError(res, error) }
})

app.get('/products', async (_req, res) => {
  try { const result = await pool.query('SELECT * FROM products ORDER BY id DESC'); res.json({ products: result.rows }) }
  catch (error) { handleError(res, error) }
})

app.get('/product-images/products/:filename', async (req, res) => {
  if (!/^[a-f0-9-]{36}\.(jpg|png|webp)$/.test(req.params.filename)) return res.sendStatus(404)
  try {
    const image = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: `products/${req.params.filename}` }))
    res.set('Content-Type', image.ContentType || 'application/octet-stream')
    res.set('Cache-Control', 'public, max-age=31536000, immutable')
    image.Body.pipe(res)
  } catch (error) { console.error(error); res.sendStatus(404) }
})

app.get('/admin/products', requireAdmin, async (_req, res) => {
  try { const result = await pool.query('SELECT * FROM products ORDER BY id DESC'); res.json({ products: result.rows }) }
  catch (error) { handleError(res, error) }
})

app.post('/admin/products', requireAdmin, uploads.single('image'), async (req, res) => {
  const product = parseProduct(req.body)
  if (!product || !req.file) return res.status(400).json({ error: 'Completa los datos y selecciona una imagen JPG, PNG o WebP.' })
  let uploaded
  try {
    if (!await isRegisteredCategory(product.category)) return res.status(400).json({ error: 'Selecciona una categoría de la lista.' })
    uploaded = await uploadImage(req.file, req)
    const result = await pool.query('INSERT INTO products (name, description, category, price, image, "oldPrice", rating, badge) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [product.name, product.description, product.category, product.price, uploaded.url, product.oldPrice, product.rating, product.badge])
    res.status(201).json({ product: result.rows[0] })
  } catch (error) {
    if (uploaded) await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: uploaded.key })).catch(console.error)
    handleError(res, error)
  }
})

app.put('/admin/products/:id', requireAdmin, uploads.single('image'), async (req, res) => {
  if (!/^\d+$/.test(req.params.id)) return res.sendStatus(400)
  let uploaded
  try {
    const existing = await pool.query('SELECT * FROM products WHERE id=$1', [req.params.id])
    if (!existing.rows.length) return res.sendStatus(404)
    const product = parseProduct(req.body, existing.rows[0])
    if (!product) return res.status(400).json({ error: 'Revisa los datos del producto.' })
    if (!await isRegisteredCategory(product.category)) return res.status(400).json({ error: 'Selecciona una categoría de la lista.' })
    uploaded = await uploadImage(req.file, req)
    const result = await pool.query('UPDATE products SET name=$1, description=$2, category=$3, price=$4, image=$5, "oldPrice"=$6, rating=$7, badge=$8 WHERE id=$9 RETURNING *',
      [product.name, product.description, product.category, product.price, uploaded?.url || existing.rows[0].image, product.oldPrice, product.rating, product.badge, req.params.id])
    res.json({ product: result.rows[0] })
    if (uploaded) await removeManagedImage(existing.rows[0].image)
  } catch (error) {
    if (uploaded) await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: uploaded.key })).catch(console.error)
    handleError(res, error)
  }
})

app.delete('/admin/products/:id', requireAdmin, async (req, res) => {
  if (!/^\d+$/.test(req.params.id)) return res.sendStatus(400)
  try {
    const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING image', [req.params.id])
    if (!result.rows.length) return res.sendStatus(404)
    res.json({ ok: true })
    await removeManagedImage(result.rows[0].image)
  } catch (error) { handleError(res, error) }
})

app.get('/categories', async (_req, res) => {
  try { const result = await pool.query('SELECT * FROM categories ORDER BY label'); res.json({ ok: true, categories: result.rows }) }
  catch (error) { handleError(res, error) }
})

app.post('/admin/categories', requireAdmin, async (req, res) => {
  const label = String(req.body?.label || '').trim().replace(/\s+/g, ' ')
  const id = label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  if (!label || label.length > 80 || !id || ['all', 'todos'].includes(id)) {
    return res.status(400).json({ error: 'Escribe un nombre de categoría válido (máximo 80 caracteres).' })
  }
  try {
    const result = await pool.query('INSERT INTO categories (id, label) VALUES ($1, $2) RETURNING *', [id, label])
    res.status(201).json({ category: result.rows[0] })
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ error: 'Esa categoría ya existe.' })
    handleError(res, error)
  }
})

app.use((error, _req, res, next) => {
  if (error instanceof multer.MulterError) return res.status(400).json({ error: 'La imagen supera el límite de 5 MB.' })
  if (error.message === 'Formato de imagen no permitido.') return res.status(400).json({ error: error.message })
  next(error)
})

const PORT = process.env.PORT || 3000
if (require.main === module) app.listen(PORT, '0.0.0.0', () => console.log(`Servidor ejecutándose en el puerto ${PORT}`))
module.exports = app
