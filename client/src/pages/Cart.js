import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, loading, error, updateQty, removeFromCart, isCartEmpty } = useCart();

  const handleQuantityChange = (cartItemId, newQty) => {
    updateQty(cartItemId, newQty);
  };

  const handleRemoveItem = (cartItemId) => {
    removeFromCart(cartItemId);
  };

  if (loading) {
    return (
      <div className="loading-text">
        <span className="loading"></span>
        Loading cart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  if (isCartEmpty()) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <Link to="/" className="add-to-cart-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item._id || item.id} className="cart-item">
            <img 
              src={item.image || 'https://via.placeholder.com/80x80?text=No+Image'} 
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)} each</p>
            </div>
            
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(item._id || item.id, item.qty - 1)}
                disabled={loading}
              >
                -
              </button>
              <span className="quantity-display">{item.qty}</span>
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(item._id || item.id, item.qty + 1)}
                disabled={loading}
              >
                +
              </button>
            </div>
            
            <div className="cart-item-total">
              <strong>${(item.price * item.qty).toFixed(2)}</strong>
            </div>
            
            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item._id || item.id)}
              disabled={loading}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h3>Total: ${cart.total.toFixed(2)}</h3>
        <Link to="/checkout" className="checkout-btn">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;


