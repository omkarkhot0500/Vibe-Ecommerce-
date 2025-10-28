import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, loading } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
        }}
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={loading || isAdding}
        >
          {isAdding ? (
            <span className="loading-text">
              <span className="loading"></span>
              Adding...
            </span>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


