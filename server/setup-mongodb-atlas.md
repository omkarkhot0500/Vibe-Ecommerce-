# MongoDB Atlas Setup Guide for Vibe Commerce

## Quick Setup Steps

### 1. Create MongoDB Atlas Account
- Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
- Sign up for a free account
- Create a new project called "Vibe Commerce"

### 2. Create a Free Cluster
- Click "Build a Database"
- Choose "FREE" tier (M0 Sandbox)
- Select a region close to you
- Name your cluster (e.g., "vibe-commerce-cluster")
- Click "Create Cluster"

### 3. Set Up Database User
- Go to "Database Access" → "Add New Database User"
- Choose "Password" authentication
- Create username: `vibe-commerce-user`
- Create a strong password (save it!)
- Set privileges to "Read and write to any database"
- Click "Add User"

### 4. Configure Network Access
- Go to "Network Access" → "Add IP Address"
- Choose "Allow access from anywhere" (0.0.0.0/0)
- Click "Confirm"

### 5. Get Your Connection String
- Go to "Database" → Click "Connect" on your cluster
- Choose "Connect your application"
- Select "Node.js" as driver
- Copy the connection string

### 6. Update Your Environment
1. Create a `.env` file in the `server` directory:
```bash
cd server
cp .env.example .env
```

2. Edit the `.env` file and replace the MONGO_URI with your actual connection string:
```env
MONGO_URI=mongodb+srv://vibe-commerce-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/vibe-commerce?retryWrites=true&w=majority
PORT=5000
```

### 7. Seed Your Database
```bash
cd server
npm run seed
```

### 8. Start Your Application
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm start
```

## Verification
- Backend should show: "✅ MongoDB Atlas connected successfully"
- Frontend should load at http://localhost:3000
- Products should be loaded from MongoDB Atlas

## Troubleshooting
- **Connection failed**: Check your MONGO_URI format
- **Authentication failed**: Verify username/password
- **Network access denied**: Check IP whitelist settings
- **Database not found**: The database will be created automatically on first use

## Benefits of MongoDB Atlas
- ✅ Cloud-hosted database
- ✅ Automatic backups
- ✅ Scalable
- ✅ Free tier available
- ✅ Data persistence across server restarts
- ✅ Real-time data synchronization

