import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

const team = [
  {
    name: 'John Rooster',
    role: 'Co-Founder, President',
    image: '/images/person_2.jpg',
  },
  {
    name: 'Tom Sharp',
    role: 'Co-Founder, COO',
    image: '/images/person_3.jpg',
  },
  {
    name: 'Winston Hodson',
    role: 'Marketing',
    image: '/images/person_4.jpg',
  },
]

export default function Team() {
  return (
    <section className="site-section" id="team-section" style={{ borderBottom: '1px solid #edf0f5' }}>
      <div className="container">
        <div className="section-header">
          <h3 className="section-sub-title">Team</h3>
          <h2 className="section-title mb-3">Leadership</h2>
        </div>

        <div className="team-grid">
          {team.map((member) => (
            <div className="person" key={member.name}>
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p className="position text-muted">{member.role}</p>
              <p className="mb-4">
                Nisi at consequatur unde molestiae quidem provident voluptatum
                deleniti quo iste error eos est praesentium distinctio
                cupiditate tempore suscipit inventore deserunt tenetur.
              </p>
              <ul className="ul-social-circle">
                <li><a href="#" aria-label="Facebook"><FaFacebookF /></a></li>
                <li><a href="#" aria-label="Twitter"><FaTwitter /></a></li>
                <li><a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a></li>
                <li><a href="#" aria-label="Instagram"><FaInstagram /></a></li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
