import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-text">
        <span className="loading"></span>
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={fetchProducts} className="add-to-cart-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Our Products</h1>
      <p>Discover amazing products at great prices</p>
      
      {products.length === 0 ? (
        <div className="empty-cart">
          <h2>No products available</h2>
          <p>Please try again later or contact support.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;


