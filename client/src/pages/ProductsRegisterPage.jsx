import { useEffect, useMemo, useState } from 'react'
import '../products-register.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const SESSION_KEY = 'marle-admin-session'
const DEFAULT_DESCRIPTION = 'Producto de alta calidad seleccionado especialmente para ti. Disponible para pedido inmediato v\u00eda WhatsApp. Cont\u00e1ctanos y te atendemos al instante.'
const emptyForm = { name: '', description: DEFAULT_DESCRIPTION, category: '', line: '', price: '', oldPrice: '', rating: '', badgeLabel: '', image: null }

export default function ProductsRegisterPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_KEY) || '')
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState('')
  const [creatingCategory, setCreatingCategory] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [customLine, setCustomLine] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const lines = useMemo(() => [...new Set(products.map((product) => product.line || product.badge?.line).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es')), [products])

  async function request(path, options = {}, authToken = token) {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}), ...options.headers },
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      const failure = new Error(data.error || 'No se pudo completar la operación.')
      failure.status = response.status
      throw failure
    }
    return data
  }

  useEffect(() => {
    if (!token) return
    let active = true
    setLoading(true)
    Promise.all([request('/admin/products', {}, token), request('/categories', {}, token)])
      .then(([productData, categoryData]) => {
        if (!active) return
        const available = categoryData.categories.filter((category) => !['all', 'todos'].includes(category.id))
        setProducts(productData.products)
        setCategories(available)
        setForm((previous) => previous.category ? previous : { ...previous, category: available[0]?.id || '' })
      })
      .catch((failure) => {
        if (!active) return
        if (failure.status === 401) {
          sessionStorage.removeItem(SESSION_KEY)
          setToken('')
        }
        setError(failure.message)
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [token])

  async function login(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const data = await request('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      }, '')
      sessionStorage.setItem(SESSION_KEY, data.token)
      setToken(data.token)
      setCredentials({ username: '', password: '' })
    } catch (failure) { setError(failure.message) }
    finally { setBusy(false) }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    setToken('')
    setProducts([])
    setCategories([])
    setForm(emptyForm)
    setCustomLine(false)
    setEditingId(null)
    setError('')
    setSuccess('')
  }

  function edit(product) {
    setEditingId(product.id)
    setCustomLine(false)
    setForm({
      name: product.name || '',
      description: product.description ?? DEFAULT_DESCRIPTION,
      category: product.category || '',
      line: product.line || product.badge?.line || '',
      price: product.price ?? '',
      oldPrice: product.oldPrice ?? '',
      rating: product.rating ?? '',
      badgeLabel: product.badge?.label || '',
      image: null,
    })
    setError('')
    setSuccess('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function createCategory() {
    if (!newCategory.trim()) return
    setCreatingCategory(true)
    setError('')
    setSuccess('')
    try {
      const { category } = await request('/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: newCategory }),
      })
      setCategories((previous) => [...previous, category].sort((a, b) => a.label.localeCompare(b.label, 'es')))
      setForm((previous) => ({ ...previous, category: category.id }))
      setNewCategory('')
      setSuccess('Categoría agregada.')
    } catch (failure) {
      if (failure.status === 401) logout()
      setError(failure.message)
    } finally { setCreatingCategory(false) }
  }

  async function save(event) {
    event.preventDefault()
    const formElement = event.currentTarget
    setBusy(true)
    setError('')
    setSuccess('')
    try {
      const data = new FormData()
      for (const [key, value] of Object.entries(form)) if (key !== 'image') data.append(key, value)
      if (form.image) data.append('image', form.image)
      const saved = await request(editingId ? `/admin/products/${editingId}` : '/admin/products', {
        method: editingId ? 'PUT' : 'POST', body: data,
      })
      setProducts((previous) => editingId
        ? previous.map((product) => product.id === editingId ? saved.product : product)
        : [saved.product, ...previous])
      setSuccess(editingId ? 'Producto actualizado.' : 'Producto agregado.')
      setForm({ ...emptyForm, category: categories[0]?.id || '' })
      setCustomLine(false)
      setEditingId(null)
      formElement.reset()
    } catch (failure) {
      if (failure.status === 401) logout()
      setError(failure.message)
    } finally { setBusy(false) }
  }

  async function remove(product) {
    if (!window.confirm(`¿Eliminar "${product.name}" de la tienda?`)) return
    setBusy(true)
    setError('')
    setSuccess('')
    try {
      await request(`/admin/products/${product.id}`, { method: 'DELETE' })
      setProducts((previous) => previous.filter((item) => item.id !== product.id))
      if (editingId === product.id) { setEditingId(null); setForm({ ...emptyForm, category: categories[0]?.id || '' }); setCustomLine(false) }
      setSuccess('Producto eliminado.')
    } catch (failure) {
      if (failure.status === 401) logout()
      setError(failure.message)
    } finally { setBusy(false) }
  }

  const field = (key) => ({
    value: form[key],
    onChange: (event) => setForm((previous) => ({ ...previous, [key]: event.target.value })),
  })

  return (
    <main className="product-admin">
      <div className="product-admin-shell">
        <header className="product-admin-header">
          <div><span className="product-admin-eyebrow">Marle Salón</span><h1>Registro de productos</h1></div>
          {token && <button type="button" className="product-admin-secondary" onClick={logout}>Cerrar sesión</button>}
        </header>

        {!token ? (
          <form className="product-admin-card product-admin-login" onSubmit={login}>
            <h2>Acceso privado</h2>
            <p>Ingresa tus datos para administrar los productos de la tienda.</p>
            <label>Usuario<input autoComplete="username" required value={credentials.username} onChange={(event) => setCredentials({ ...credentials, username: event.target.value })} /></label>
            <label>Contraseña<input type="password" autoComplete="current-password" required value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} /></label>
            {error && <p className="product-admin-error" role="alert">{error}</p>}
            <button className="product-admin-primary" disabled={busy}>{busy ? 'Ingresando...' : 'Ingresar'}</button>
          </form>
        ) : (
          <>
            {error && <p className="product-admin-error" role="alert">{error}</p>}
            {success && <p className="product-admin-success" role="status">{success}</p>}
            <section className="product-admin-card">
              <h2>{editingId ? 'Editar producto' : 'Agregar producto'}</h2>
              <form key={editingId || 'new'} onSubmit={save}>
                <div className="product-admin-fields">
                  <label>Nombre<input required maxLength="180" {...field('name')} /></label>
                  <label>Categoría
                    <select required value={form.category} onChange={(event) => setForm((previous) => ({ ...previous, category: event.target.value }))}>
                      <option value="" disabled>Selecciona una categoría</option>
                      {categories.map((category) => <option key={category.id} value={category.id}>{category.label || category.id}</option>)}
                    </select>
                    <span className="product-admin-category-create">
                      <input aria-label="Nueva categoría" maxLength="80" placeholder="Nombre de nueva categoría" value={newCategory} onChange={(event) => setNewCategory(event.target.value)} />
                      <button type="button" className="product-admin-secondary" disabled={creatingCategory || !newCategory.trim()} onClick={createCategory}>{creatingCategory ? 'Agregando...' : 'Agregar categoría'}</button>
                    </span>
                  </label>
                  <label>Línea
                    <select value={customLine ? '__new__' : form.line} onChange={(event) => {
                      const isNew = event.target.value === '__new__'
                      setCustomLine(isNew)
                      setForm((previous) => ({ ...previous, line: isNew ? '' : event.target.value }))
                    }}>
                      <option value="">Sin línea</option>
                      {lines.map((line) => <option key={line} value={line}>{line}</option>)}
                      <option value="__new__">+ Registrar nueva línea</option>
                    </select>
                    {customLine && <input required autoFocus maxLength="100" placeholder="Nombre de la nueva línea" {...field('line')} />}
                  </label>
                  <label className="product-admin-description">Descripci&oacute;n<textarea rows="4" {...field('description')} /></label>
                  <label>Precio (S/)<input type="number" required min="0" step="0.01" {...field('price')} /></label>
                  <label>Precio anterior (S/)<input type="number" min="0" step="0.01" {...field('oldPrice')} /></label>
                  <label>Valoración (0 a 5)<input type="number" min="0" max="5" step="1" {...field('rating')} /></label>
                  <label>Etiqueta opcional<input maxLength="50" placeholder="Ej. Nuevo" {...field('badgeLabel')} /></label>
                  <label>Imagen {editingId ? '(opcional)' : '(obligatoria)'}<input type="file" accept="image/jpeg,image/png,image/webp" required={!editingId} onChange={(event) => setForm((previous) => ({ ...previous, image: event.target.files[0] || null }))} /><small>JPG, PNG o WebP. Máximo 5 MB.</small></label>
                </div>
                {editingId && <p className="product-admin-hint">Si no eliges otra imagen, se conserva la actual.</p>}
                <div className="product-admin-actions">
                  <button className="product-admin-primary" disabled={busy || loading || categories.length === 0}>{busy ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Agregar producto'}</button>
                  {editingId && <button type="button" className="product-admin-secondary" onClick={() => { setEditingId(null); setForm({ ...emptyForm, category: categories[0]?.id || '' }); setCustomLine(false); setError('') }}>Cancelar edición</button>}
                </div>
              </form>
            </section>

            <section className="product-admin-card">
              <h2>Productos cargados <span>({products.length})</span></h2>
              {loading ? <p>Cargando productos...</p> : products.length === 0 ? <p>Aún no hay productos cargados.</p> : (
                <div className="product-admin-list">
                  {products.map((product) => (
                    <article className="product-admin-item" key={product.id}>
                      <img src={product.image} alt={product.name} />
                      <div className="product-admin-item-details">
                        <strong>{product.name}</strong>
                        <span>{product.category}{product.badge?.line ? ` · ${product.badge.line}` : ''}</span>
                        <span>S/ {Number(product.price).toFixed(2)}</span>
                      </div>
                      <div className="product-admin-item-actions">
                        <button type="button" disabled={busy} onClick={() => edit(product)}>Editar</button>
                        <button type="button" disabled={busy} onClick={() => remove(product)}>Eliminar</button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  )
}
