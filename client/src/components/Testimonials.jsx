import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const testimonials = [
  { name: 'John Smith', image: '/images/person_3.jpg' },
  { name: 'Robert Aguilar', image: '/images/person_2.jpg' },
  { name: 'Roger Spears', image: '/images/person_4.jpg' },
  { name: 'Kyle McDonald', image: '/images/person_1.jpg' },
]

const quote =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reprehenderit aperiam quaerat fugiat repudiandae explicabo animi minima fuga beatae illum eligendi incidunt consequatur. Amet dolores excepturi earum unde iusto.'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const current = testimonials[index]

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  return (
    <section className="site-section testimonial-wrap" id="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h3 className="section-sub-title">People Says</h3>
          <h2 className="section-title mb-3">Testimonials</h2>
        </div>

        <div className="testimonial-slider">
          <div className="testimonial">
            <figure>
              <img src={current.image} alt={current.name} />
            </figure>
            <blockquote className="mb-3">
              <p>&ldquo;{quote}&rdquo;</p>
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
