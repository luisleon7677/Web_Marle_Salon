import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope } from 'react-icons/fa'

export default function TopBar() {
  return (
    <div className="top-bar py-3" id="home-section">
      <div className="container">
        <div className="row">
          <ul className="social-media">
            <li><a href="#" aria-label="Facebook"><FaFacebookF /></a></li>
            <li><a href="#" aria-label="Twitter"><FaTwitter /></a></li>
            <li><a href="#" aria-label="Instagram"><FaInstagram /></a></li>
            <li><a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a></li>
          </ul>
          <p className="top-bar-contact mb-0">
            <span className="mr-3">
              <a href="tel:+123456789101">
                <FaPhone className="mr-2" style={{ position: 'relative', top: 2 }} />
                <span className="contact-text">(+1) 234 5678 9101</span>
              </a>
            </span>
            <span>
              <a href="mailto:shop@yourdomain.com">
                <FaEnvelope className="mr-2" style={{ position: 'relative', top: 2 }} />
                <span className="contact-text">shop@yourdomain.com</span>
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
