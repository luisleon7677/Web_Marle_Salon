const posts = [
  {
    image: '/images/model_1_bg.jpg',
    author: 'Ham Brook',
  },
  {
    image: '/images/product_1_bg.jpg',
    author: 'James Phelps',
  },
  {
    image: '/images/model_5_bg.jpg',
    author: 'James Phelps',
  },
]

export default function Blog() {
  return (
    <section className="site-section" id="blog-section">
      <div className="container">
        <div className="section-header">
          <h3 className="section-sub-title">Blog</h3>
          <h2 className="section-title mb-3">Artículos del blog</h2>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <article className="h-entry" key={post.image}>
              <img src={post.image} alt="Artículo del blog" />
              <h2>
                <a href="#">
                  Consejos para cuidar tu cabello todos los días
                </a>
              </h2>
              <div className="meta mb-4">
                {post.author}
                <span className="mx-2">&bull;</span>
                18 de enero de 2019
                <span className="mx-2">&bull;</span>
                <a href="#">Novedades</a>
              </div>
              <p>
                Descubre consejos sencillos para mantener tu cabello suave,
                brillante y saludable con una rutina de cuidado adecuada.
              </p>
              <p><a href="#">Seguir leyendo...</a></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
