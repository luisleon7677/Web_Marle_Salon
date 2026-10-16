import { FaStar, FaHeart } from 'react-icons/fa'

const products = [
  { id: 1, name:'Shampoo Liss Care', desc:'Limpia suavemente y prolonga el efecto del alisado, dejando tu cabello suave y brillante.', image: 'https://br-withered-tree-b5jjxkkj.storage.c-7.us-east-2.aws.neon.tech/marlestore/acondicionador_liss_care.webp', wishlist: false },
  { id: 2, name:'Acondicionador Liss Care',desc:'Hidrata y desenreda tu cabello, aportando suavidad y manejabilidad.',image: 'https://br-withered-tree-b5jjxkkj.storage.c-7.us-east-2.aws.neon.tech/marlestore/shampoo_liss_care.webp', wishlist: true },
  { id: 3, name:'Mascarilla Liss Care', desc:'Nutre profundamente y ayuda a mantener tu cabello sedoso, brillante y saludable.',image: 'https://br-withered-tree-b5jjxkkj.storage.c-7.us-east-2.aws.neon.tech/marlestore/mascarilla_liss_care.webp', wishlist: false },

]

export default function Products() {
  return (
    <section className="site-section" id="products-section">
      <div className="container">
        <div className="products-intro">
          <h3 className="section-sub-title">Productos populares</h3>
          <h2 className="section-title mb-3">Nuestros productos</h2>
          <p>
          Descubre nuestros productos más populares, seleccionados para cuidar, nutrir y transformar tu cabello. Encuentra tus marcas favoritas y disfruta de un cabello más suave, brillante y saludable desde casa. 
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-item" key={product.id}>
              <figure>
                <img src={product.image} alt="Wild West Hoodie" />
              </figure>
              <div className="px-4">
                <h3><a href="#">{product.name}</a></h3>
                <div className="mb-3">
                  <span className="meta-icons mr-3">
                    <a href="#"><FaStar className="text-warning" /></a> 5.0
                  </span>
                  <span className={`meta-icons wishlist ${product.wishlist ? 'active' : ''}`}>
                    <a href="#"><FaHeart /></a> 29
                  </span>
                </div>
                <p className="mb-4">{product.desc}</p>
                <div className="product-actions">
                  <a href="#" className="btn btn-black rounded-0">Comprar</a>
                  <a href="#" className="btn btn-outline-black rounded-0">Ver</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
