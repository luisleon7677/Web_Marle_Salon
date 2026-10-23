import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { homeLinks } from '../data/navigation'

export default function Header({ sticky, onMenuToggle }) {
  const location = useLocation()
  const isShop = location.pathname.startsWith('/shop')

  return (
    <header className={`site-navbar py-4 ${sticky ? 'is-sticky' : ''}`} role="banner">
      <div className="container">
        <div className="nav-inner">
          <h1 className="mb-0 site-logo">
            <Link to="/">
            {/* <img src="/logoo.png" alt="Marle Salón" className="logo" width={60} height={60} /> */}
              Marle Salón<span className="text-primary">.</span>
            </Link>
          </h1>

          <nav className="site-navigation" role="navigation">
            <ul className="site-menu">
              <li>
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Tienda
                </NavLink>
              </li>
              {!isShop &&
                homeLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
            </ul>
          </nav>

          <button
            type="button"
            className="menu-toggle"
            onClick={onMenuToggle}
            aria-label="Abrir menú"
          >
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  )
}
