const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/garissa-lodge');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      email: process.env.ADMIN_EMAIL || 'admin@garissa-lodge.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: 'Admin User',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Created admin user');

    // Create merchant user
    const merchantUser = new User({
      email: process.env.MERCHANT_EMAIL || 'merchant@garissa-lodge.com',
      password: process.env.MERCHANT_PASSWORD || 'merchant123',
      name: 'Merchant User',
      role: 'merchant'
    });
    await merchantUser.save();
    console.log('Created merchant user');

    // Create sample products
    const sampleProducts = [
      {
        title: "Crux Coffee Grinder",
        description: "Professional Crux coffee grinder, perfect for cafes and restaurants. Consistent grind quality.",
        price: "45,000",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
        category: "Coffee & Beverage",
        condition: "Excellent",
        stock: 3,
        featured: true,
        createdBy: adminUser._id
      },
      {
        title: "Wega Commercial Espresso Machine",
        description: "High-performance Wega commercial espresso machine. Ex-UK quality for professional use.",
        price: "125,000",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
        category: "Coffee & Beverage",
        condition: "Excellent",
        stock: 1,
        featured: true,
        createdBy: adminUser._id
      },
      {
        title: "Double Deck Pizza Oven",
        description: "Commercial double deck pizza oven. Perfect for restaurants and pizzerias. Ex-UK import.",
        price: "185,000",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
        category: "Baking & Cooking",
        condition: "Excellent",
        stock: 2,
        featured: true,
        createdBy: merchantUser._id
      },
      {
        title: "Mazzer Coffee Grinder",
        description: "Professional Mazzer type coffee grinder with precision grinding capabilities.",
        price: "52,000",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
        category: "Coffee & Beverage",
        condition: "Good",
        stock: 5,
        featured: false,
        createdBy: adminUser._id
      },
      {
        title: "Automatic Espresso Machine (Nespresso Style)",
        description: "High-quality automatic espresso machine with Nespresso-style functionality.",
        price: "85,000",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
        category: "Coffee & Beverage",
        condition: "Excellent",
        stock: 2,
        featured: false,
        createdBy: merchantUser._id
      }
    ];

    for (const productData of sampleProducts) {
      const product = new Product(productData);
      await product.save();
    }
    console.log('Created sample products');

    console.log('Seeding completed successfully!');
    console.log('\nDefault credentials:');
    console.log('Admin:', process.env.ADMIN_EMAIL || 'admin@garissa-lodge.com', process.env.ADMIN_PASSWORD || 'admin123');
    console.log('Merchant:', process.env.MERCHANT_EMAIL || 'merchant@garissa-lodge.com', process.env.MERCHANT_PASSWORD || 'merchant123');

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

seedData();
