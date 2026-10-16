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
          <h2 className="section-title mb-3">Blog Posts</h2>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <article className="h-entry" key={post.image}>
              <img src={post.image} alt="Blog post" />
              <h2>
                <a href="#">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </a>
              </h2>
              <div className="meta mb-4">
                {post.author}
                <span className="mx-2">&bull;</span>
                Jan 18, 2019
                <span className="mx-2">&bull;</span>
                <a href="#">News</a>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                eligendi nobis ea maiores sapiente veritatis reprehenderit
                suscipit quaerat rerum voluptatibus a eius.
              </p>
              <p><a href="#">Continue Reading...</a></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
