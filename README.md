# Vibe Commerce - Mock E-commerce Demo

A complete full-stack shopping cart demo built with React and Node.js, demonstrating end-to-end e-commerce flows including product display, cart management, and checkout with receipt generation.

## 🚀 Features

- **Product Catalog**: Browse products with images, names, and prices
- **Shopping Cart**: Add/remove items, update quantities, view totals
- **Checkout Process**: Form validation, order processing, receipt generation
- **Responsive Design**: Mobile-first approach with clean, modern UI
- **State Management**: React Context API for cart state
- **Database Support**: MongoDB with Mongoose (with in-memory fallback)
- **Error Handling**: User-friendly error messages and loading states

## 🛠 Tech Stack

### Frontend
- React 18+
- React Router for navigation
- Context API for state management
- Axios for HTTP requests
- CSS3 with responsive design

### Backend
- Node.js + Express
- MongoDB with Mongoose
- CORS enabled for cross-origin requests
- In-memory storage fallback

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (optional - app works without it)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vibe-commerce
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   cp .env.example .env  # Optional: configure MongoDB
   npm run seed
   npm start
   ```

3. **Set up the frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Environment Configuration

Create a `.env` file in the server directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/vibe-commerce?retryWrites=true&w=majority
PORT=5000
```

**Note**: The application works with MongoDB Atlas or falls back to in-memory storage if no connection is available.

## 🗄️ MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project (e.g., "Vibe Commerce")

### Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0 Sandbox)
3. Select a cloud provider and region close to you
4. Give your cluster a name (e.g., "vibe-commerce-cluster")
5. Click "Create Cluster"

### Step 3: Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0) for development
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as driver
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `vibe-commerce`

### Step 6: Update Environment Variables
1. Create a `.env` file in the `server` directory
2. Add your MongoDB Atlas connection string:

```env
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/vibe-commerce?retryWrites=true&w=majority
PORT=5000
```

### Step 7: Seed the Database
```bash
cd server
npm run seed
```

This will populate your MongoDB Atlas database with sample products.

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test
```

### Manual Testing Checklist

#### 1. Products Load Correctly
- [ ] Navigate to http://localhost:3000
- [ ] Verify products are displayed in a grid
- [ ] Check that product images, names, and prices are shown
- [ ] Confirm "Add to Cart" buttons are present

#### 2. Cart Functionality
- [ ] Add a product to cart
- [ ] Verify cart badge shows item count
- [ ] Navigate to `/cart` page
- [ ] Check that added items appear with correct details
- [ ] Test quantity increase/decrease buttons
- [ ] Test remove item functionality
- [ ] Verify total calculation updates correctly

#### 3. Checkout Process
- [ ] Navigate to `/checkout` with items in cart
- [ ] Verify order summary shows correct items and total
- [ ] Test form validation (empty fields, invalid email)
- [ ] Submit valid checkout form
- [ ] Verify receipt modal appears with correct details
- [ ] Check that cart is cleared after successful checkout

#### 4. Error Handling
- [ ] Test with invalid email format
- [ ] Test with empty form fields
- [ ] Test checkout with empty cart (should redirect to home)
- [ ] Verify loading states during API calls

## 📁 Project Structure

```
vibe-commerce/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React Context providers
│   │   ├── pages/          # Page components
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── test/              # Unit tests
│   ├── server.js          # Main server file
│   ├── seed.js            # Database seeding script
│   └── package.json
├── .env.example           # Environment variables template
└── README.md
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Fetch all products

### Cart
- `GET /api/cart` - Get current cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout and generate receipt

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Spinners and disabled buttons during API calls
- **Error Messages**: Clear, user-friendly error feedback
- **Form Validation**: Real-time validation with helpful error messages
- **Receipt Modal**: Professional-looking order confirmation
- **Empty States**: Helpful messages when cart is empty

## 🚀 Development

### Running in Development Mode

**Backend with auto-reload:**
```bash
cd server
npm run dev
```

**Frontend with hot reload:**
```bash
cd client
npm start
```

### Database Seeding

To populate the database with sample products:
```bash
cd server
npm run seed
```

This creates 8 sample products with images from Unsplash.

## 🔧 Configuration

### MongoDB Setup (Optional)

1. Install MongoDB locally or use MongoDB Atlas
2. Update the `MONGO_URI` in your `.env` file
3. Run `npm run seed` to populate the database

### Without MongoDB

The application automatically falls back to in-memory storage if MongoDB is not available. Data will persist only during the server session.

## 📝 API Request Examples

### Add Item to Cart
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": "product_id_here", "qty": 1}'
```

### Process Checkout
```bash
curl -X POST http://localhost:5000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "cartItems": [{"name": "Product", "price": 10.00, "qty": 1}],
    "buyerName": "John Doe",
    "buyerEmail": "john@example.com"
  }'
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the PORT in `.env` or kill the process using the port

2. **MongoDB connection failed**
   - Check if MongoDB is running
   - Verify the connection string in `.env`
   - The app will work with in-memory storage as fallback

3. **CORS errors**
   - Ensure the backend is running on port 5000
   - Check that the frontend proxy is configured correctly

4. **Products not loading**
   - Run `npm run seed` to populate the database
   - Check browser console for API errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Product images from Unsplash
- Icons and UI inspiration from modern e-commerce sites
- Built as a demonstration project for full-stack development skills

