import Hero from '../components/Hero'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import FeaturedProducts from '../components/FeaturedProducts'
import About from '../components/About'
import Team from '../components/Team'
import SpecialPromo from '../components/SpecialPromo'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import Blog from '../components/Blog'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <Newsletter />
      <FeaturedProducts />
      <About />
      <Team />
      <SpecialPromo />
      <Services />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  )
}
