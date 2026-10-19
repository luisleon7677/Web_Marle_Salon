import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      {/* Top wave / divider */}
      <div className="footer-top-bar" />

      <div className="container">
        <div className="footer-main">

          {/* Col 1 – Logo + tagline */}
          <div className="footer-col footer-col--brand">
            <Link to="/" className="footer-logo-link">
              <img src="/logoo.png" alt="Marle Salón Studio" className="footer-logo" />
            </Link>
            <p className="footer-tagline">
              Tu belleza, nuestra pasión.<br />
              Vive la experiencia Marle.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook" className="footer-social-btn"><FaFacebookF /></a>
              <a href="#" aria-label="Instagram" className="footer-social-btn"><FaInstagram /></a>
              <a href="#" aria-label="WhatsApp" className="footer-social-btn"><FaWhatsapp /></a>
            </div>
          </div>

          {/* Col 2 – Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navegación</h4>
            <ul className="footer-nav">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/shop">Productos</Link></li>
              <li><a href="/#about-section">Nosotros</a></li>
              <li><a href="/#services-section">Servicios</a></li>
              <li><a href="/#contact-section">Contacto</a></li>
            </ul>
          </div>

          {/* Col 3 – Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Servicios</h4>
            <ul className="footer-nav">
              <li><a href="/#services-section">Corte & Peinado</a></li>
              <li><a href="/#services-section">Coloración</a></li>
              <li><a href="/#services-section">Tratamientos</a></li>
              <li><a href="/#services-section">Uñas</a></li>
              <li><a href="/#services-section">Maquillaje</a></li>
            </ul>
          </div>

          {/* Col 4 – Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contacto</h4>
            <ul className="footer-contact-list">
              <li>
                <FaMapMarkerAlt className="fc-icon" />
                <span>Ciudad de Guatemala, GT</span>
              </li>
              <li>
                <FaPhoneAlt className="fc-icon" />
                <a href="tel:+50212345678">+502 1234-5678</a>
              </li>
              <li>
                <FaEnvelope className="fc-icon" />
                <a href="mailto:hola@marlesalon.com">hola@marlesalon.com</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} Marle Salón Studio. Todos los derechos reservados.</p>
          <p className="footer-bottom-right">
            Diseñado con <span className="footer-heart">♥</span> en Guatemala
          </p>
        </div>
      </div>
    </footer>
  )
}
