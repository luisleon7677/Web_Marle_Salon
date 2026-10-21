import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaShoppingCart, FaChevronDown, FaSlidersH, FaTimes, FaEye } from 'react-icons/fa'
import { useCart } from '../components/CartProvider'
import { categories, priceRanges } from '../data/shopData'
import ProductDetail from '../components/ProductDetail'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const PRODUCTS_PER_PAGE = 9

function getProductLine(product) {
  const line = typeof product.line === 'string' ? product.line.trim() : ''
  return line || (typeof product.badge?.line === 'string' ? product.badge.line.trim() : '')
}


function matchesPrice(product, selectedPrices) {
  if (selectedPrices.length === 0) return true
  return selectedPrices.some((range) => {
    if (range === 'menor a 50') return product.price < 50
    if (range === '50 - 100') return product.price >= 50 && product.price <= 100
    if (range === '100 - 200') return product.price > 100 && product.price <= 200
    if (range === '200 - 500') return product.price > 200 && product.price <= 500
    if (range === 'mayor a 500') return product.price > 500
    return true
  })
}

export default function ShopPage() {
  const { addItem } = useCart()
  const [category, setCategory] = useState('all')
  const [selectedLine, setSelectedLine] = useState('')
  const [selectedPrices, setSelectedPrices] = useState([])
  const [sortBy, setSortBy] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [shopProducts, setShopProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [page, setPage] = useState(1)

  //carga de productos
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log('Respuesta completa del backend:', data);

        // Si el backend devuelve directamente un array
        if (Array.isArray(data)) {
          setShopProducts(data);
        } else if (Array.isArray(data.products)) {
          // Si devuelve { products: [...] }
          setShopProducts(data.products);
        } else {
          console.error('La respuesta no contiene una lista de productos:', data);
          setShopProducts([]);
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    }

    getProducts();
  }, []);


  const lines = useMemo(() => {
    const counts = new Map()
    shopProducts.forEach((product) => {
      const line = getProductLine(product)
      if (line) counts.set(line, (counts.get(line) || 0) + 1)
    })
    return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b, 'es'))
  }, [shopProducts])

  const filtered = useMemo(() => {
    let list = shopProducts.filter((product) => {
      const catOk = category === 'all' || product.category === category
      const priceOk = matchesPrice(product, selectedPrices)
      const lineOk = selectedLine === '' || getProductLine(product) === selectedLine
      return catOk && priceOk && lineOk
    })

    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))

    return list
  }, [shopProducts, category, selectedPrices, sortBy, selectedLine])

  const activeCategory = categories.find((c) => c.id === category)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PRODUCTS_PER_PAGE
  const visibleProducts = filtered.slice(pageStart, pageStart + PRODUCTS_PER_PAGE)

  const togglePrice = (id) => {
    setPage(1)
    setSelectedPrices((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const Sidebar = (
    <aside className="shop-sidebar">
      <div className="shop-sidebar-block">
        <h3 className="shop-sidebar-title">Categories</h3>
        <ul className="shop-categories">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                className={category === cat.id ? 'active' : ''}
                onClick={() => {
                  setCategory(cat.id)
                  setPage(1)
                  setFiltersOpen(false)
                }}
              >
                <span>{cat.label}</span>
                <span className="count">({cat.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="shop-sidebar-block">
        <h3 className="shop-sidebar-title">Líneas</h3>
        <ul className="shop-categories">
          {[[ '', shopProducts.length ], ...lines].map(([line, count]) => (
            <li key={line}>
              <button
                type="button"
                className={selectedLine === line ? 'active' : ''}
                aria-pressed={selectedLine === line}
                onClick={() => {
                  setSelectedLine(line)
                  setPage(1)
                  setFiltersOpen(false)
                }}
              >
                <span>{line || 'Todas las líneas'}</span>
                <span className="count">({count})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="shop-sidebar-block">
        <h3 className="shop-sidebar-title">Rango de precios</h3>
        <ul className="shop-price-list">
          {priceRanges.map((range) => (
            <li key={range.id}>
              <label className="shop-check">
                <input
                  type="checkbox"
                  checked={selectedPrices.includes(range.id)}
                  onChange={() => togglePrice(range.id)}
                />
                <span>{range.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )

  return (
    <div className="shop-page">
      <div className="shop-breadcrumbs">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Products</span>
          </nav>
        </div>
      </div>

      <div className="container shop-layout">
        <div className="shop-sidebar-desktop">{Sidebar}</div>

        <div className="shop-main">
          <div className="shop-toolbar">
            <div>
              <h1 className="shop-title">{activeCategory?.label || 'All Products'}</h1>
              <p className="shop-count">{filtered.length} products</p>
            </div>

            <div className="shop-toolbar-actions">
              <button
                type="button"
                className="shop-filter-toggle"
                onClick={() => setFiltersOpen(true)}
              >
                <FaSlidersH /> Filters
              </button>

              <div className="shop-sort">
                <label htmlFor="sort-by">Sort by:</label>
                <div className="shop-sort-select">
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                  <FaChevronDown className="shop-sort-icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="shop-grid">
            {visibleProducts.map((product) => (
              <article
                className="shop-card"
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                style={{ cursor: 'pointer' }}
              >
                <div className="shop-card-media">
                  {product.badge && (
                    <span className={`shop-badge shop-badge--${product.badge.type}`}>
                      {product.badge.label}
                    </span>
                  )}
                  <button
                    type="button"
                    className="shop-add-cart"
                    aria-label={`Agregar ${product.name} al carrito`}
                    title="Agregar al carrito"
                    onClick={(e) => { e.stopPropagation(); addItem(product) }}
                  >
                    <FaShoppingCart />
                  </button>
                  <img src={product.image} alt={product.name} />
                  <button
                    type="button"
                    className="shop-card-cart"
                    onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                  >
                    <FaEye style={{ marginRight: 6 }} />
                    Ver detalle
                  </button>
                </div>
                <div className="shop-card-body">
                  <p className="shop-card-cat">{product.category}</p>
                  <h3>{product.name}</h3>
                  <div className="shop-card-meta">
                    <span className="shop-card-rating">
                      <FaStar /> {product.rating}
                    </span>
                    <div className="shop-card-price">
                      {product.oldPrice && <del>S/{product.oldPrice}</del>}
                      <strong>S/{product.price}</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="shop-pagination" aria-label="Paginación de productos">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
              >
                Anterior
              </button>
              <span aria-live="polite" aria-atomic="true">
                Página {currentPage} de {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
              >
                Siguiente
              </button>
            </nav>
          )}

          {filtered.length === 0 && (
            <p className="shop-empty">No products match your filters.</p>
          )}
        </div>
      </div>

      <div
        className={`shop-filters-overlay ${filtersOpen ? 'open' : ''}`}
        onClick={() => setFiltersOpen(false)}
      />
      <div className={`shop-filters-drawer ${filtersOpen ? 'open' : ''}`}>
        <div className="shop-filters-drawer-header">
          <h3>Filters</h3>
          <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close">
            <FaTimes />
          </button>
        </div>
        {Sidebar}
      </div>
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
