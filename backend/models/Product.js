const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, // GridFS file ID or URL
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Coffee & Beverage', 'Baking & Cooking']
  },
  condition: {
    type: String,
    required: true,
    enum: ['Excellent', 'Good', 'Fair']
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
productSchema.index({ category: 1, condition: 1 });
productSchema.index({ featured: 1 });

module.exports = mongoose.model('Product', productSchema);
