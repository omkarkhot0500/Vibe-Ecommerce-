const mongoose = require('mongoose');

// Use the same MongoDB URI as server.js
const MONGO_URI = "mongodb+srv://alltest:alltest@cluster0.swn6uhf.mongodb.net/alltest?appName=Cluster0";

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, default: '' }
});

const Product = mongoose.model('Product', ProductSchema);

// Sample products data
const sampleProducts = [
  {
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    description: 'High-quality wireless headphones with noise cancellation'
  },
  {
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    description: 'Fitness tracking smartwatch with heart rate monitor'
  },
  {
    name: 'Gaming Keyboard',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
    description: 'Mechanical gaming keyboard with RGB lighting'
  },
  {
    name: 'Bluetooth Speaker',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
    description: 'Portable Bluetooth speaker with 360-degree sound'
  },
  {
    name: 'Laptop Stand',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
    description: 'Adjustable aluminum laptop stand for better ergonomics'
  },
  {
    name: 'Phone Case',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    description: 'Protective phone case with shock absorption'
  },
  {
    name: 'USB-C Cable',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop',
    description: 'High-speed USB-C cable for fast charging and data transfer'
  },
  {
    name: 'Desk Lamp',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    description: 'LED desk lamp with adjustable brightness and color temperature'
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${sampleProducts.length} products successfully`);
    
    // Display seeded products
    const products = await Product.find();
    console.log('\n📦 Seeded products:');
    products.forEach(product => {
      console.log(`- ${product.name}: $${product.price}`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
};

seedDatabase();
