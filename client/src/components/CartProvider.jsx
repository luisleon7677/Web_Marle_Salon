import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { FaShoppingCart, FaTimes, FaWhatsapp } from 'react-icons/fa'

const CartContext = createContext(null)
const STORAGE_KEY = 'marle-cart'
import { WHATSAPP_NUMBER } from '../data/contact'
const money = (value) => `S/ ${value.toFixed(2)}`

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved.filter((item) => item &&
      (typeof item.id === 'string' || typeof item.id === 'number') &&
      typeof item.name === 'string' && Number.isFinite(item.price) && item.price >= 0 &&
      Number.isSafeInteger(item.quantity) && item.quantity > 0) : []
  } catch {
    return []
  }
}

export const useCart = () => useContext(CartContext)

export default function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)
  const [notice, setNotice] = useState('')
  const [storageError, setStorageError] = useState(false)
  const dialog = useRef(null)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }, [items])

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(''), 3000)
    return () => clearTimeout(timer)
  }, [notice])

  const addItem = (product) => {
    const price = Number(product.price)
    if (!Number.isFinite(price) || price < 0 || product.id == null) {
      setNotice('No se pudo agregar este producto. Revisa su precio.')
      return
    }
    const id = String(product.id)
    setItems((previous) => {
      const existing = previous.find((item) => String(item.id) === id)
      return existing
        ? previous.map((item) => String(item.id) === id ? { ...item, price, quantity: item.quantity + 1 } : item)
        : [...previous, { id, name: product.name, price, image: product.image,
          category: product.category, line: product.line || product.badge?.line || '', quantity: 1 }]
    })
    setNotice(`${product.name} agregado al carrito`)
  }

  const changeQuantity = (id, delta) => setItems((previous) => previous.map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))

  const message = [
    '¡Hola, Marle Salón! Quiero realizar este pedido:',
    ...items.map((item, index) => `\n${index + 1}. ${item.name} (ID: ${item.id})\n` +
      `Cantidad: ${item.quantity} | Precio unitario: ${money(item.price)}\n` +
      `${item.category ? `Categoría: ${item.category}\n` : ''}${item.line ? `Línea: ${item.line}\n` : ''}` +
      `Subtotal: ${money(item.price * item.quantity)}`),
    `\nTotal de productos: ${count}\nTotal: ${money(total)}`,
    'Por favor, confirmar disponibilidad y costo de envío.',
  ].join('\n')

  return (
    <CartContext.Provider value={{ addItem }}>
      {children}
      <div className="floating-shop-actions">
      <a
        className="whatsapp-launcher"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola, Marle Salón! Quisiera hacer una consulta sobre sus productos y servicios.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultar por WhatsApp"
        title="Consultar por WhatsApp"
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
      <button type="button" className="cart-launcher" onClick={() => dialog.current.showModal()} aria-label={`Abrir carrito, ${count} productos`}>
        <FaShoppingCart aria-hidden="true" />
        <span className="cart-launcher-count" aria-hidden="true">{count}</span>
      </button>
      </div>
      <div className="cart-notice" role="status">{notice}</div>
      <dialog ref={dialog} className="cart-dialog" aria-labelledby="cart-title" onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current.close()
      }}>
        <div className="cart-content">
          <div className="cart-heading">
            <h2 id="cart-title">Tu carrito</h2>
            <button type="button" onClick={() => dialog.current.close()} aria-label="Cerrar carrito"><FaTimes /></button>
          </div>
          {storageError && <p role="alert">No se pudo guardar el carrito en este navegador. Se conservará mientras esta página siga abierta.</p>}
          {items.length === 0 ? <p>Tu carrito está vacío. Agrega productos desde la tienda.</p> : <>
            <ul className="cart-items">
              {items.map((item) => <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <span>{money(item.price)} por unidad</span>
                  <div className="cart-quantity">
                    <button type="button" disabled={item.quantity === 1} onClick={() => changeQuantity(item.id, -1)} aria-label={`Reducir cantidad de ${item.name}`}>−</button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Aumentar cantidad de ${item.name}`}>+</button>
                    <button type="button" onClick={() => setItems((previous) => previous.filter((entry) => entry.id !== item.id))}>Eliminar</button>
                  </div>
                  <strong>{money(item.price * item.quantity)}</strong>
                </div>
              </li>)}
            </ul>
            <p className="cart-total">Total: {money(total)}</p>
            <p>Envío y disponibilidad por confirmar.</p>
            <a className="cart-checkout" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> Enviar pedido por WhatsApp
            </a>
          </>}
        </div>
      </dialog>
    </CartContext.Provider>
  )
}
