import { FaWhatsapp } from 'react-icons/fa'

import { WHATSAPP_NUMBER } from '../data/contact'

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const field = event.currentTarget.elements.consulta
    const consultation = field.value.trim()
    if (!consultation) {
      field.setCustomValidity('Escribe tu consulta para continuar.')
      field.reportValidity()
      return
    }
    const message = `¡Hola, Marle Salón! Tengo esta consulta:\n\n${consultation}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="site-section bg-light" id="contact-section">
      <div className="container">
        <div className="section-header">
          <h3 className="section-sub-title">Consultas por WhatsApp</h3>
          <h2 className="section-title mb-3">Ponte en contacto</h2>
        </div>
        <div className="contact-form-wrap">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2 className="h4 text-black mb-3" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              Escríbenos por WhatsApp
            </h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-consultation">Consulta</label>
                <textarea
                  id="contact-consultation"
                  name="consulta"
                  rows="5"
                  required
                  className="form-control rounded-0"
                  placeholder="Escribe tu consulta sobre nuestros productos o servicios..."
                  onInput={(event) => event.currentTarget.setCustomValidity('')}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-black rounded-0" style={{ padding: '14px 24px' }}>
              <FaWhatsapp aria-hidden="true" style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Enviar a WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
