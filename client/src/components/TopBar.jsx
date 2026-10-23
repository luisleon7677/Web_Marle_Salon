import { FaFacebookF, FaInstagram, FaTiktok, FaPhone, FaEnvelope } from 'react-icons/fa'
import { EMAIL, PHONE_DISPLAY, SOCIAL_LINKS, WHATSAPP_NUMBER } from '../data/contact'

export default function TopBar() {
  return (
    <div className="top-bar py-3" id="home-section">
      <div className="container">
        <div className="row">
          <ul className="social-media">
            <li><a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a></li>
            <li><a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok /></a></li>
            <li><a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a></li>
          </ul>
          <p className="top-bar-contact mb-0">
            <span className="mr-3">
              <a href={`tel:+${WHATSAPP_NUMBER}`}>
                <FaPhone className="mr-2" style={{ position: 'relative', top: 2 }} />
                <span className="contact-text">{PHONE_DISPLAY}</span>
              </a>
            </span>
            <span>
              <a href={`mailto:${EMAIL}`}>
                <FaEnvelope className="mr-2" style={{ position: 'relative', top: 2 }} />
                <span className="contact-text">{EMAIL}</span>
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
