import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa'
import { EMAIL, PHONE_DISPLAY, SOCIAL_LINKS, WHATSAPP_NUMBER } from '../data/contact'

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
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-btn"><FaFacebookF /></a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer-social-btn"><FaTiktok /></a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-btn"><FaInstagram /></a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer-social-btn"><FaWhatsapp /></a>
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
                <FaPhoneAlt className="fc-icon" />
                <a href={`tel:+${WHATSAPP_NUMBER}`}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <FaEnvelope className="fc-icon" />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
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
            Hecho con <span className="footer-heart" aria-label="amor" role="img">♥</span> por{' '}
            <a href="https://luisleon.online/" target="_blank" rel="noopener noreferrer">Luis León</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
