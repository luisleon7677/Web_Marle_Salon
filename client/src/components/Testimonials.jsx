import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const testimonials = [
  { name: 'Sara Herrera', image: '/images/testimonial-woman-1.jpg' , test:'Estoy encantada con los resultados de Marle Salon. Mi cabello quedó suave, brillante y hermoso. La atención fue excelente y los productos que utilizan son increíbles. ¡Lo recomiendo totalmente!'},
  { name: 'Melissa  Aguilar', image: '/images/testimonial-woman-2.jpg' , test:'Me encantó mi cambio de look. El balayage quedó precioso, con tonos naturales que iluminan mi cabello. Cuidaron cada detalle y el resultado superó mis expectativas.'},
  { name: 'Sofia Puma', image: '/images/testimonial-woman-3.jpg' , test:'Los productos capilares de Marle Salon se han convertido en mis favoritos. Mi cabello luce más hidratado, suave y brillante. Me encanta poder cuidarlo también en casa.'},
  { name: 'Adelis Contreras', image: '/images/person_1.jpg' , test:'Mi experiencia fue excelente. Me realicé un alisado y quedé feliz con el resultado. Mi cabello luce hermoso y es mucho más fácil de peinar. ¡Volveré pronto!'},
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const current = testimonials[index]

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  return (
    <section className="site-section testimonial-wrap" id="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h3 className="section-sub-title">La gente dice</h3>
          <h2 className="section-title mb-3">Testimonios</h2>
        </div>

        <div className="testimonial-slider">
          <div className="testimonial">
            <figure>
              <img src={current.image} alt={current.name} />
            </figure>
            <blockquote className="mb-3">
              <p>&ldquo;{current.test}&rdquo;</p>
            </blockquote>
            <p className="text-black"><strong>{current.name}</strong></p>
          </div>

          <div className="testimonial-nav">
            <button type="button" onClick={prev} aria-label="Anterior">
              <FaChevronLeft />
            </button>
            <button type="button" onClick={next} aria-label="Siguiente">
              <FaChevronRight />
            </button>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                className={i === index ? 'active' : ''}
                onClick={() => setIndex(i)}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
