import { FaFacebookF, FaTiktok, FaInstagram } from 'react-icons/fa'
import { SOCIAL_LINKS } from '../data/contact'

const team = [
  {
    name: 'John Rooster',
    role: 'Cofundador y presidente',
    image: '/images/person_2.jpg',
  },
  {
    name: 'Tom Sharp',
    role: 'Cofundador y director de operaciones',
    image: '/images/person_3.jpg',
  },
  {
    name: 'Winston Hodson',
    role: 'Mercadotecnia',
    image: '/images/person_4.jpg',
  },
]

export default function Team() {
  return (
    <section className="site-section" id="team-section" style={{ borderBottom: '1px solid #edf0f5' }}>
      <div className="container">
        <div className="section-header">
          <h3 className="section-sub-title">Equipo</h3>
          <h2 className="section-title mb-3">Nuestro equipo</h2>
        </div>

        <div className="team-grid">
          {team.map((member) => (
            <div className="person" key={member.name}>
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p className="position text-muted">{member.role}</p>
              <p className="mb-4">
                Trabajamos para ofrecerte una atención cercana y ayudarte a
                encontrar los productos y servicios ideales para tu cabello.
              </p>
              <ul className="ul-social-circle">
                <li><a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a></li>
                <li><a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok /></a></li>
                <li><a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a></li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
