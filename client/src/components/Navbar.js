import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            Vibe Commerce
          </Link>
          <ul className="nav-links">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/cart">
                Cart
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;


