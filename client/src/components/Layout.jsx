import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import Header from './Header'
import Footer from './Footer'
import { homeLinks } from '../data/navigation'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const location = useLocation()
  const isShop = location.pathname.startsWith('/shop')

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
          <li><NavLink to="/" end onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink></li>
          <li><NavLink to="/shop" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Tienda</NavLink></li>
          {!isShop && homeLinks.map((link) => (
            <li key={link.href}><a href={link.href} onClick={closeMenu}>{link.label}</a></li>
          ))}
        </ul>
      </aside>

      <TopBar />
      <Header sticky={sticky} onMenuToggle={() => setMenuOpen(true)} />
      <Outlet />
      <Footer />
    </div>
  )
}
