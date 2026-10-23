import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function getTimeLeft(target) {
  const total = Math.max(0, target - Date.now())
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  return { days, hours, minutes, seconds }
}

export default function SpecialPromo() {
  const [target] = useState(() => Date.now() + 1000 * 60 * 60 * 24 * 25)
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const blocks = [
    { label: timeLeft.days, text: 'Días' },
    { label: timeLeft.hours, text: 'Horas' },
    { label: timeLeft.minutes, text: 'Minutos' },
    { label: timeLeft.seconds, text: 'Segundos' },
  ]

  return (
    <section
      className="site-blocks-cover overlay get-notification"
      id="special-section"
      style={{
        backgroundImage: 'url(/images/hero_2.jpg)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'top',
        minHeight: 500,
        height: 'auto',
        padding: '5rem 0',
      }}
    >
      <div className="container">
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <h3 className="section-sub-title">Promoción especial</h3>
          <h3 className="section-title text-white mb-4">Promoción navideña</h3>
          <p className="mb-5 lead">
            Descubre nuestras ofertas especiales y encuentra el cuidado ideal para tu cabello.
          </p>

          <div className="countdown">
            {blocks.map((block) => (
              <div className="countdown-block" key={block.text}>
                <span className="label">{String(block.label).padStart(2, '0')}</span>
                <span className="text">{block.text}</span>
              </div>
            ))}
          </div>

          <p>
            <Link to="/shop" className="btn btn-outline-white rounded-0">
              Comprar ahora
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
