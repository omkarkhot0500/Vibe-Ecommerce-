#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Vibe Commerce - MongoDB Atlas Setup');
console.log('=====================================\n');

console.log('This script will help you set up your .env file for MongoDB Atlas.\n');

console.log('First, make sure you have:');
console.log('1. Created a MongoDB Atlas account');
console.log('2. Created a cluster');
console.log('3. Set up a database user');
console.log('4. Configured network access');
console.log('5. Got your connection string\n');

rl.question('Enter your MongoDB Atlas connection string: ', (mongoUri) => {
  if (!mongoUri || !mongoUri.includes('mongodb+srv://')) {
    console.log('❌ Invalid connection string. Please provide a valid MongoDB Atlas URI.');
    rl.close();
    return;
  }

  const port = process.env.PORT || 5000;
  
  const envContent = `# MongoDB Atlas Connection String
MONGO_URI=${mongoUri}

# Server Port
PORT=${port}
`;

  const envPath = path.join(__dirname, '.env');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env file created successfully!');
    console.log(`📁 Location: ${envPath}`);
    console.log('\nNext steps:');
    console.log('1. Run: npm run seed (to populate your database)');
    console.log('2. Run: npm start (to start the server)');
    console.log('3. Check the console for "✅ MongoDB Atlas connected successfully"');
  } catch (error) {
    console.log('❌ Error creating .env file:', error.message);
  }
  
  rl.close();
});

