const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/garissa-lodge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  image: String,
  images: [String],
  category: String,
  condition: String,
  stock: Number,
  featured: Boolean,
  createdBy: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

async function migrateCategories() {
  try {
    console.log('Starting category migration...');
    
    // Update old categories to new ones
    const updates = [
      {
        from: 'Coffee & Beverage',
        to: 'Coffee Machines'
      },
      {
        from: 'Baking & Cooking',
        to: 'Accessories' // or 'Coffee Machines' depending on the product
      }
    ];
    
    for (const update of updates) {
      const result = await Product.updateMany(
        { category: update.from },
        { $set: { category: update.to } }
      );
      console.log(`Updated ${result.modifiedCount} products from "${update.from}" to "${update.to}"`);
    }
    
    console.log('Category migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateCategories();
