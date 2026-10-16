import {
  FaChartPie,
  FaBackspace,
  FaClock,
  FaCheckCircle,
  FaBriefcase,
  FaCloud,
} from 'react-icons/fa'

const services = [
  { title: 'Business Consulting', icon: FaChartPie },
  { title: 'Market Analysis', icon: FaBackspace },
  { title: 'User Monitoring', icon: FaClock },
  { title: 'Seller Consulting', icon: FaCheckCircle },
  { title: 'Financial Investment', icon: FaBriefcase },
  { title: 'Financial Management', icon: FaCloud },
]

export default function Services() {
  return (
    <section className="site-section bg-light" id="services-section">
      <div className="container">
        <div className="section-header">
          <h3 className="section-sub-title">Our Services</h3>
          <h2 className="section-title mb-3">We Offer Services</h2>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div className="unit-4" key={service.title}>
                <div className="unit-4-icon">
                  <Icon />
                </div>
                <div>
                  <h3>{service.title}</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perferendis quis molestiae vitae eligendi at.
                  </p>
                  <p><a href="#">Learn More</a></p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
