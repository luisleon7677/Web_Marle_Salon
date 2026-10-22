import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section
      className="site-blocks-cover overlay"
      style={{ backgroundImage: 'url(/images/hero_2.jpg)' }}
    >
      <div className="container">
        <div className="hero-content">
          <h1>El cuidado que tu cabello merece</h1>
          <p className="mb-5 lead">
          Encuentra los productos ideales para consentir tu cabello y convertir cada día en un momento de cuidado.
          </p>
          <div className="hero-btns">
            <Link to="/shop" className="btn btn-outline-white rounded-0">
              Ver productos
            </Link>
            <a href="#services-section" className="btn btn-white rounded-0">
              Ver servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
