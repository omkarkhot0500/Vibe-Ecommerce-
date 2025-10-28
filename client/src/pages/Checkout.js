import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";

const Checkout = () => {
  const { cart, isCartEmpty, fetchCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    buyerName: "",
    buyerEmail: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    console.log("🛒 Current Cart Data:", cart);
    if (isCartEmpty()) {
      console.warn("⚠️ Cart is empty — redirecting to home");
      navigate("/");
    }
  }, [isCartEmpty, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`✏️ Input Changed — ${name}:`, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.buyerName.trim()) {
      newErrors.buyerName = "Name is required";
    }

    if (!formData.buyerEmail.trim()) {
      newErrors.buyerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.buyerEmail)) {
      newErrors.buyerEmail = "Please enter a valid email address";
    }

    console.log("✅ Validation Results:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 Checkout submission started with form data:", formData);
    console.log("🧾 Cart being sent:", cart.items);

    if (!validateForm()) {
      console.warn("⚠️ Validation failed. Aborting checkout.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("📡 Sending POST request to /api/checkout...");
      const response = await axios.post("/api/checkout", {
        cartItems: cart.items,
        buyerName: formData.buyerName,
        buyerEmail: formData.buyerEmail,
      });

      console.log("✅ Checkout response received:", response.data);
      setReceipt(response.data.receipt);

      console.log("🔄 Refreshing cart after checkout...");
      await fetchCart();
      console.log("🧹 Cart cleared successfully.");
    } catch (error) {
      console.error("❌ Checkout failed:", error);
      if (error.response) {
        console.error("📩 Server responded with:", error.response.data);
      } else if (error.request) {
        console.error("📭 No response received:", error.request);
      } else {
        console.error("⚙️ Request setup error:", error.message);
      }

      setErrors({
        submit:
          error.response?.data?.error || "Checkout failed. Please try again.",
      });
    } finally {
      console.log("🕓 Checkout process completed.");
      setIsSubmitting(false);
    }
  };

  const closeReceipt = () => {
    console.log("✅ Closing receipt and navigating to home.");
    setReceipt(null);
    navigate("/");
  };

  if (isCartEmpty()) {
    console.warn("🛒 Cart is empty. Redirect triggered.");
    return null;
  }

  return (
    <div>
      <h1>Checkout</h1>

      <div className="checkout-form">
        <h2>Order Summary</h2>
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item._id || item.id} className="cart-item">
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">
                  ${item.price.toFixed(2)} × {item.qty} = $
                  {(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-total">
          <h3>Total: ${cart.total.toFixed(2)}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <div className="form-group">
            <label htmlFor="buyerName" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              id="buyerName"
              name="buyerName"
              value={formData.buyerName}
              onChange={handleInputChange}
              className={`form-input ${errors.buyerName ? "error" : ""}`}
              placeholder="Enter your full name"
            />
            {errors.buyerName && (
              <div className="form-error">{errors.buyerName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="buyerEmail" className="form-label">
              Email Address *
            </label>
            <input
              type="email"
              id="buyerEmail"
              name="buyerEmail"
              value={formData.buyerEmail}
              onChange={handleInputChange}
              className={`form-input ${errors.buyerEmail ? "error" : ""}`}
              placeholder="Enter your email address"
            />
            {errors.buyerEmail && (
              <div className="form-error">{errors.buyerEmail}</div>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="loading-text">
                <span className="loading"></span>
                Processing...
              </span>
            ) : (
              "Complete Order"
            )}
          </button>
        </form>
      </div>

      {receipt && (
        <div className="receipt-modal">
          <div className="receipt-content">
            <div className="receipt-header">
              <h2 className="receipt-title">Order Confirmed!</h2>
              <p className="receipt-success">Thank you for your purchase</p>
            </div>

            <div className="receipt-details">
              <div className="receipt-row">
                <span className="receipt-label">Order Number:</span>
                <span className="receipt-value">
                  #{Date.now().toString().slice(-8)}
                </span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Customer:</span>
                <span className="receipt-value">{receipt.buyerName}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Email:</span>
                <span className="receipt-value">{receipt.buyerEmail}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Date:</span>
                <span className="receipt-value">
                  {receipt.formattedTimestamp}
                </span>
              </div>
            </div>

            <div className="receipt-items">
              <h3>Items Ordered:</h3>
              {receipt.items.map((item, index) => (
                <div key={index} className="receipt-item">
                  <div>
                    <div className="receipt-item-name">{item.name}</div>
                    <div className="receipt-item-details">
                      ${item.price.toFixed(2)} × {item.qty}
                    </div>
                  </div>
                  <div className="receipt-item-total">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="receipt-total">
              Total: ${receipt.total.toFixed(2)}
            </div>

            <button onClick={closeReceipt} className="close-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
