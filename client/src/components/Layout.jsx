import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-wrap">
      <div
        className={`mobile-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />
      <aside className={`site-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="site-mobile-menu-header">
          <button
            type="button"
            className="site-mobile-menu-close"
            onClick={closeMenu}
            aria-label="Cerrar menú"
          >
            ×
          </button>
        </div>
        <ul className="site-nav-wrap">
          <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
          <li><Link to="/shop" onClick={closeMenu}>Tienda</Link></li>
          <li><a href="/#products-section" onClick={closeMenu}>Productos</a></li>
          <li><a href="/#about-section" onClick={closeMenu}>Nosotros</a></li>
          <li><a href="/#special-section" onClick={closeMenu}>Servicios</a></li>
          <li><a href="/#testimonials-section" onClick={closeMenu}>Testimonios</a></li>
          <li><a href="/#blog-section" onClick={closeMenu}>Blog</a></li>
          <li><a href="/#contact-section" onClick={closeMenu}>Contacto</a></li>
        </ul>
      </aside>

      <TopBar />
      <Header sticky={sticky} onMenuToggle={() => setMenuOpen(true)} />
      <Outlet />
      <Footer />
    </div>
  )
}
