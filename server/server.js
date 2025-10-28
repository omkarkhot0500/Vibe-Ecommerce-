// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// const connectDB = async () => {
//   try {
//     if (process.env.MONGO_URI) {
//       await mongoose.connect(process.env.MONGO_URI);
//       console.log("✅ MongoDB Atlas connected successfully");
//       console.log("📊 Database:", mongoose.connection.db.databaseName);
//     } else {
//       console.log("⚠️  No MONGO_URI found - using in-memory storage");
//       console.log(
//         "💡 To use MongoDB Atlas, create a .env file with your MONGO_URI"
//       );
//     }
//   } catch (error) {
//     console.log("❌ MongoDB connection failed, using in-memory storage");
//     console.log("Error:", error.message);
//     console.log("💡 Check your MONGO_URI in the .env file");
//   }
// };


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Directly define your MongoDB URI and Port here
const MONGO_URI = "mongodb+srv://alltest:alltest@cluster0.swn6uhf.mongodb.net/alltest?appName=Cluster0";
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    console.log("🔌 Attempting to connect to MongoDB Atlas...");
    console.log("📍 URI:", MONGO_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs
    
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Atlas connected successfully");
    console.log("📊 Database:", mongoose.connection.db.databaseName);
    console.log("🔗 Connection state:", mongoose.connection.readyState);
  } catch (error) {
    console.log("❌ MongoDB connection failed");
    console.log("Error:", error.message);
    console.log("💡 Please check your MongoDB Atlas credentials and network access");
  }
};

// Call the DB connection
connectDB();



// In-memory storage fallback
let products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    description: "Fitness tracking smartwatch with heart rate monitor",
  },
  {
    id: "3",
    name: "Gaming Keyboard",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
    description: "Mechanical gaming keyboard with RGB lighting",
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    description: "Portable Bluetooth speaker with 360-degree sound",
  },
  {
    id: "5",
    name: "Laptop Stand",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    description: "Adjustable aluminum laptop stand for better ergonomics",
  },
  {
    id: "6",
    name: "Phone Case",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
    description: "Protective phone case with shock absorption",
  },
  {
    id: "7",
    name: "USB-C Cable",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
    description: "High-speed USB-C cable for fast charging and data transfer",
  },
  {
    id: "8",
    name: "Desk Lamp",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    description:
      "LED desk lamp with adjustable brightness and color temperature",
  },
];
let cart = { items: [], total: 0 };
let orders = [];

// Models
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, default: "" },
});

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1 },
});

const CartSchema = new mongoose.Schema({
  items: [CartItemSchema],
  total: { type: Number, default: 0 },
});

const OrderSchema = new mongoose.Schema({
  buyerName: { type: String, required: true },
  buyerEmail: { type: String, required: true },
  items: [CartItemSchema],
  total: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", ProductSchema);
const Cart = mongoose.model("Cart", CartSchema);
const Order = mongoose.model("Order", OrderSchema);

// Helper functions for in-memory storage
const calculateCartTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.qty, 0);
};

const updateCartInMemory = () => {
  cart.total = calculateCartTotal(cart.items);
};

// API Routes

// GET /api/products
app.get("/api/products", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const products = await Product.find();
      res.json(products);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /api/cart
app.get("/api/cart", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let cartDoc = await Cart.findOne();
      if (!cartDoc) {
        cartDoc = new Cart({ items: [], total: 0 });
        await cartDoc.save();
      }
      res.json(cartDoc);
    } else {
      updateCartInMemory();
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// POST /api/cart
app.post("/api/cart", async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;

    if (mongoose.connection.readyState === 1) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      let cartDoc = await Cart.findOne();
      if (!cartDoc) {
        cartDoc = new Cart({ items: [], total: 0 });
      }

      const existingItem = cartDoc.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.qty += qty;
      } else {
        cartDoc.items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          qty: qty,
        });
      }

      cartDoc.total = calculateCartTotal(cartDoc.items);
      await cartDoc.save();
      res.json(cartDoc);
    } else {
      // In-memory storage
      const product = products.find((p) => p.id === productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const existingItem = cart.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.qty += qty;
      } else {
        cart.items.push({
          id: Date.now().toString(),
          productId: product.id,
          name: product.name,
          price: product.price,
          qty: qty,
        });
      }

      updateCartInMemory();
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

// DELETE /api/cart/:id
app.delete("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      let cartDoc = await Cart.findOne();
      if (!cartDoc) {
        return res.status(404).json({ error: "Cart not found" });
      }

      cartDoc.items = cartDoc.items.filter(
        (item) => item._id.toString() !== id
      );
      cartDoc.total = calculateCartTotal(cartDoc.items);
      await cartDoc.save();
      res.json(cartDoc);
    } else {
      // In-memory storage
      cart.items = cart.items.filter((item) => item.id !== id);
      updateCartInMemory();
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

// POST /api/checkout
app.post("/api/checkout", async (req, res) => {
  try {
    console.log("🛒 Checkout request received:", req.body);
    
    const { cartItems, buyerName, buyerEmail } = req.body;

    if (!buyerName || !buyerEmail) {
      return res
        .status(400)
        .json({ error: "Buyer name and email are required" });
    }

    if (!buyerEmail.includes("@")) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const total = calculateCartTotal(cartItems);
    const timestamp = new Date();

    const orderData = {
      buyerName,
      buyerEmail,
      items: cartItems,
      total,
      timestamp,
    };

    console.log("📊 Order data:", orderData);
    console.log("🔌 MongoDB connection state:", mongoose.connection.readyState);

    if (mongoose.connection.readyState === 1) {
      console.log("💾 Saving order to MongoDB Atlas...");
      
      const order = new Order(orderData);
      const savedOrder = await order.save();
      
      console.log("✅ Order saved successfully:", savedOrder._id);

      // Clear cart
      await Cart.deleteMany();
      console.log("🛒 Cart cleared");
    } else {
      console.log("⚠️ MongoDB not connected, using in-memory storage");
      // In-memory storage
      orders.push({ ...orderData, id: Date.now().toString() });
      cart = { items: [], total: 0 };
    }

    const response = {
      success: true,
      receipt: {
        buyerName,
        buyerEmail,
        total,
        timestamp: timestamp.toISOString(),
        formattedTimestamp: timestamp.toLocaleString(),
        items: cartItems,
      },
    };

    console.log("✅ Checkout successful, sending response");
    res.json(response);
  } catch (error) {
    console.error("❌ Checkout failed:", error);
    res.status(500).json({ error: "Checkout failed: " + error.message });
  }
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
