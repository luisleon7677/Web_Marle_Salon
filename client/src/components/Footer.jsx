import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer bg-white">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-links-row">
            <div>
              <h2 className="footer-heading">About Us</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                facere laudantium magnam voluptatum autem. Amet aliquid nesciunt
                veritatis aliquam.
              </p>
            </div>
            <div>
              <h2 className="footer-heading">Quick Links</h2>
              <ul className="list-unstyled">
                <li><Link to="/shop">Shop</Link></li>
                <li><a href="/#about-section">About Us</a></li>
                <li><a href="/#services-section">Services</a></li>
                <li><a href="/#contact-section">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h2 className="footer-heading">Follow Us</h2>
              <div className="footer-social">
                <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                <a href="#" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              </div>
            </div>
          </div>

          <div className="footer-product">
            <h2 className="footer-heading">Featured Product</h2>
            <Link to="/shop">
              <img src="/images/product_1_bg.jpg" alt="Leather Brown Shoe" className="mb-3" />
            </Link>
            <h4 className="h5">Leather Brown Shoe</h4>
            <strong className="text-black mb-3" style={{ display: 'inline-block' }}>
              $60.00
            </strong>
            <p>
              <Link to="/shop" className="btn btn-black rounded-0">Add to Cart</Link>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Copyright &copy;{year} All rights reserved | This template is made
            with <FaHeart className="icon-heart" aria-hidden="true" /> by{' '}
            <a href="https://colorlib.com" target="_blank" rel="noreferrer">
              Colorlib
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
