export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className="site-section bg-light" id="contact-section">
      <div className="container">
        <div className="section-header">
          <h3 className="section-sub-title">Contact Form</h3>
          <h2 className="section-title mb-3">Get In Touch</h2>
        </div>

        <div className="contact-form-wrap">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2 className="h4 text-black mb-5" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              Contact Form
            </h2>

            <div className="form-row two-cols">
              <div className="form-group">
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" className="form-control rounded-0" />
              </div>
              <div className="form-group">
                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" className="form-control rounded-0" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control rounded-0" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" className="form-control rounded-0" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  cols="30"
                  rows="7"
                  className="form-control rounded-0"
                  placeholder="Write your notes or questions here..."
                />
              </div>
            </div>

            <button type="submit" className="btn btn-black rounded-0" style={{ padding: '14px 24px' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
