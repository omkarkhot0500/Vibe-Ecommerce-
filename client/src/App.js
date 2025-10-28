import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main">
            <div className="container">
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;


