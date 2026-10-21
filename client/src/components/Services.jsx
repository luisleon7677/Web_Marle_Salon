import {
  FaChartPie,
  FaBackspace,
  FaClock,
  FaCheckCircle,
  FaBriefcase,
  FaCloud,
} from 'react-icons/fa'

import { PiHairDryerBold } from "react-icons/pi";
import { TbCut } from "react-icons/tb";
import { GiComb } from "react-icons/gi";
import { LuPipette } from "react-icons/lu";
import { MdFace2 } from "react-icons/md";
import { MdOutlineFaceRetouchingNatural } from "react-icons/md";


const services = [
  { title: 'Alisados', icon: PiHairDryerBold, dsc: 'Transforma tu cabello con un alisado profesional que aporta suavidad, brillo y una apariencia saludable, para lucir un cabello manejable y hermoso.' },
  { title: 'Laceados', icon: GiComb, dsc: 'Luce un cabello liso, sedoso y con movimiento natural, con un acabado profesional que realza tu belleza y facilita tu rutina diaria.' },
  { title: 'Mechas creativas', icon: TbCut, dsc: 'Dale vida a tu cabello con mechas llenas de personalidad, combinando tonos y reflejos que aportan luminosidad y un estilo único.' },
  { title: 'Balayage', icon: MdOutlineFaceRetouchingNatural, dsc: 'Ilumina tu melena con un balayage de acabado natural, creando reflejos suaves y degradados que aportan dimensión, elegancia y luminosidad.' },
  { title: 'Botox capilar', icon: LuPipette, dsc: 'Revitaliza tu cabello con un tratamiento que ayuda a reducir el frizz, mejorar la suavidad y devolverle una apariencia más brillante y saludable.' },
  { title: 'Morena iluminada', icon: MdFace2, dsc: 'Realza la belleza de tu cabello oscuro con delicados reflejos en tonos cálidos que aportan luz, profundidad y un acabado sofisticado y natural.' },
]

const WHATSAPP_NUMBER = '50900184348'

export default function Services() {

  const handleWhatsApp = (service) => {
    const message = encodeURIComponent(
      `¡Hola! Estoy interesada en el servicio de ${service.title}`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <section className="site-section bg-light" id="services-section">
      <div className="container">
        <div className="section-header">
          <h3 className="section-sub-title">Nuestros servicios</h3>
          <h2 className="section-title mb-3">Nosotros ofrecemos</h2>
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
                    {service.dsc}
                  </p>
                  <p>
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      handleWhatsApp(service);
                    }}>
                      Consultar
                    </a>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
