import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

// Cart reducer for state management
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CART':
      return { ...state, cart: action.payload, loading: false, error: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  cart: { items: [], total: 0 },
  loading: false,
  error: null
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fetch cart from API
  const fetchCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('/api/cart');
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.error || 'Failed to fetch cart' 
      });
    }
  };

  // Add item to cart
  const addToCart = async (product, qty = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.post('/api/cart', {
        productId: product._id || product.id,
        qty
      });
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.error || 'Failed to add item to cart' 
      });
    }
  };

  // Update item quantity
  const updateQty = async (cartItemId, qty) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // For simplicity, we'll remove and re-add the item with new quantity
      // In a real app, you'd have a PUT endpoint for updating quantity
      const response = await axios.get('/api/cart');
      const updatedItems = response.data.items.map(item => 
        item._id === cartItemId || item.id === cartItemId 
          ? { ...item, qty }
          : item
      );
      
      // Calculate total
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
      
      dispatch({ 
        type: 'SET_CART', 
        payload: { items: updatedItems, total } 
      });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.error || 'Failed to update quantity' 
      });
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.delete(`/api/cart/${cartItemId}`);
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.error || 'Failed to remove item from cart' 
      });
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Get cart item count
  const getCartItemCount = () => {
    return state.cart.items.reduce((total, item) => total + item.qty, 0);
  };

  // Check if cart is empty
  const isCartEmpty = () => {
    return state.cart.items.length === 0;
  };

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cart: state.cart,
    loading: state.loading,
    error: state.error,
    addToCart,
    updateQty,
    removeFromCart,
    fetchCart,
    clearError,
    getCartItemCount,
    isCartEmpty
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


