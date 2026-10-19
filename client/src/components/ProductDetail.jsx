import { useEffect } from 'react'
import { FaStar, FaTimes, FaWhatsapp, FaTag, FaShieldAlt, FaTruck } from 'react-icons/fa'

const WHATSAPP_NUMBER = '50212345678' // ← cambia este número al tuyo

export default function ProductDetail({ product, onClose }) {
  // Cerrar con ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!product) return null

  const discount =
    product.oldPrice
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `¡Hola! Estoy interesado/a en el producto:\n\n*${product.name}*\nCategoría: ${product.category}\nPrecio: $${product.price}${product.oldPrice ? ` (antes $${product.oldPrice})` : ''}\n\n¿Está disponible?`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(product.rating)
    const half = !filled && i < product.rating
    return { filled, half }
  })

  return (
    <>
      {/* Overlay */}
      <div className="pd-overlay" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div className="pd-panel" role="dialog" aria-modal="true" aria-label={product.name}>
        {/* Close button */}
        <button className="pd-close" onClick={onClose} aria-label="Cerrar">
          <FaTimes />
        </button>

        <div className="pd-body">
          {/* Imagen */}
          <div className="pd-media">
            {product.badge && (
              <span className={`pd-badge pd-badge--${product.badge.type}`}>
                {product.badge.label}
              </span>
            )}
            <img src={product.image} alt={product.name} className="pd-img" />
          </div>

          {/* Info */}
          <div className="pd-info">
            <p className="pd-category">{product.category}</p>
            <h2 className="pd-name">{product.name}</h2>

            {/* Rating */}
            <div className="pd-rating">
              {stars.map((s, i) => (
                <span key={i} className={`pd-star ${s.filled ? 'filled' : s.half ? 'half' : ''}`}>
                  <FaStar />
                </span>
              ))}
              <span className="pd-rating-val">{product.rating} / 5</span>
            </div>

            {/* Precio */}
            <div className="pd-price-block">
              {product.oldPrice && (
                <del className="pd-old-price">${product.oldPrice}</del>
              )}
              <span className="pd-price">${product.price}</span>
              {discount && (
                <span className="pd-discount">
                  <FaTag /> {discount}% OFF
                </span>
              )}
            </div>

            {/* Descripción placeholder */}
            <p className="pd-desc">
              Producto de alta calidad seleccionado especialmente para ti. Disponible para pedido
              inmediato vía WhatsApp. Contáctanos y te atendemos al instante.
            </p>

            {/* Perks */}
            <ul className="pd-perks">
              <li><FaTruck className="pd-perk-icon" /> Envío disponible</li>
              <li><FaShieldAlt className="pd-perk-icon" /> Producto original garantizado</li>
            </ul>

            {/* Botón WhatsApp */}
            <button className="pd-whatsapp-btn" onClick={handleWhatsApp}>
              <FaWhatsapp className="pd-wa-icon" />
              Pedir por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
