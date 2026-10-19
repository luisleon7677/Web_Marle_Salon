export default function About() {
  return (
    <section className="site-section" id="about-section">
      <div className="container">
        <div className="about-row">
          <div className="about-media">
            <img src="/images/about_1.jpg" alt="About us" />
            <div className="experience">
              <span className="year">Llevando belleza</span>
              <span className="caption">a todo el Perú</span>
            </div>
          </div>
          <div>
            <h3 className="section-sub-title">Marle Store</h3>
            <h2 className="section-title mb-3">Nosotros</h2>
            <p className="mb-4">
            En Marle Store nos dedicamos a la venta de productos capilares de alta calidad y ofrecemos servicios profesionales en nuestro salón de belleza. Somos distribuidores autorizados de las mejores marcas para el cuidado y la belleza del cabello.
            </p>
            <p>
              <a href="#" className="btn btn-black btn-black--hover rounded-0">
                Learn More
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
