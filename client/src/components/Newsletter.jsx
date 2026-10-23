import { useState } from 'react'
import { WHATSAPP_NUMBER } from '../data/contact'

export default function Newsletter() {
  const [phone, setPhone] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const number = phone.trim()
    const message = `¡Hola, Marle Store! Mi número de WhatsApp es ${number}. Quiero que me agreguen al grupo de promociones especiales y lives en vivo.`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      className="site-blocks-cover inner-page-cover overlay get-notification"
      style={{
        backgroundImage: 'url(/images/hero_2.jpg)',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container">
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <h2>Únete a nuestro grupo de WhatsApp</h2>
          <div className="newsletter-row">
            <input
              type="tel"
              inputMode="tel"
              pattern="[+]?[0-9 ]{9,18}"
              title="Ingresa entre 9 y 18 dígitos; puedes incluir el código de país."
              className="form-control rounded-0"
              placeholder="Ingresa tu número de WhatsApp"
              aria-label="Número de WhatsApp"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
            <button type="submit" className="btn btn-outline-white rounded-0">
              Enviar por WhatsApp
            </button>
          </div>
          <p>Déjanos tu número para agregarte al grupo de promociones especiales y lives en vivo.</p>
        </form>
      </div>
    </section>
  )
}
