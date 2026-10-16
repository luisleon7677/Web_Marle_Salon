export default function Newsletter() {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section
      className="site-blocks-cover inner-page-cover overlay get-notification"
      style={{
        backgroundImage: 'url(/images/hero_2.jpg)',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container">
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <h2>¿Quieres al por mayor?</h2>
          <div className="newsletter-row">
            <input
              type="email"
              className="form-control rounded-0"
              placeholder="Enter your email address"
              required
            />
            <button type="submit" className="btn btn-outline-white rounded-0">
              Subscribe
            </button>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            commodi veniam doloremque ducimus tempora.
          </p>
        </form>
      </div>
    </section>
  )
}
