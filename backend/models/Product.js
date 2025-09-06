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
    type: String, // GridFS file ID or URL (primary image)
    required: true
  },
  images: {
    type: [String], // Array of GridFS file IDs or URLs (additional images)
    default: []
  },
  category: {
    type: String,
    required: true,
    enum: ['Coffee Machines', 'Spare Parts', 'Accessories']
  },
  condition: {
    type: String,
    required: true,
    enum: ['Excellent', 'Good', 'Fair', 'New']
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
