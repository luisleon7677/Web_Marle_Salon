const featured = [
  {
    number: '01.',
    image: 'https://br-withered-tree-b5jjxkkj.storage.c-7.us-east-2.aws.neon.tech/marlestore/shampoo_liss_care.webp',
    reverse: false,
    description: 'El shampoo Liss Care de Lan Keratine limpia suavemente el cabello, ayudando a mantenerlo fresco, suave y brillante. Ideal para complementar tu rutina de cuidado después del alisado.',
    description2: 'Su fórmula ayuda a eliminar las impurezas mientras cuida la fibra capilar, dejando el cabello con una apariencia saludable, manejable y llena de brillo.',
    price:23,
    oldPrice:45,

  },
  {
    number: '02.',
    image: 'https://br-withered-tree-b5jjxkkj.storage.c-7.us-east-2.aws.neon.tech/marlestore/acondicionador_liss_care.webp',
    reverse: true,
    description:'El acondicionador Liss Care de Lan Keratine ayuda a hidratar y suavizar tu cabello, facilitando el desenredado y el peinado.',
    description2:'Disfruta de un cabello más sedoso, manejable y brillante, ideal para complementar tu rutina de cuidado después del alisado.',
    price:23,
    oldPrice:46
  },
]

export default function FeaturedProducts() {
  return (
    <section className="site-section bg-light">
      <div className="container">
        <div className="products-intro">
          <h3 className="section-sub-title">Productos fantásticos</h3>
          <h2 className="section-title mb-3">Nuestros productos</h2>
          <p>
          Descubre nuestros dos productos favoritos y más pedidos, ideales para cuidar tu cabello, brindarle una hidratación profunda y mantenerlo suave, brillante y saludable. ¡Dale a tu cabello el cuidado que merece con Liss Care de Lan Keratine!
          </p>
        </div>

        {featured.map((item) => (
          <div className="featured-card" key={item.number}>
            <div className={`product-item-2 ${item.reverse ? 'reverse' : ''}`}>
              <div className="product-media">
                <img src={item.image} alt="Featured product" />
              </div>
              <div className="product-title-wrap">
                <span className="number">{item.number}</span>
                <h3 className="text-black mb-4">Sobre este producto</h3>
                <p className="mb-4">
                  {item.description}
                </p>
                <p>
                {item.description2}
                </p>
                <div className="mb-4">
                  <h3 className="text-black mb-0" style={{ fontSize: '1rem' }}>
                    Precio:
                  </h3>
                  <div className="price">
                    <del>S/. {item.oldPrice}</del> S/. {item.price}
                  </div>
                </div>
                <div className="featured-actions">
                  <a href="#" className="btn btn-outline-black rounded-0">
                    Ver detalles
                  </a>
                  <a href="#" className="btn btn-black rounded-0">
                    Añadir al carrito
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
