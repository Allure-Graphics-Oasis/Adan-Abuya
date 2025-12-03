# Dawa Coffee machines and Business Equipment Website

A full-stack equipment marketplace website with admin panel for managing products and images.

## Features

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB + JWT Authentication
- **Image Storage**: MongoDB GridFS for uploaded images
- **Authentication**: bcryptjs + JWT tokens
- **Admin Panel**: Product CRUD operations with image upload
- **Image Search**: Unsplash API integration for finding better product images

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `env.example`):
```bash
cp env.example .env
```

4. Update `.env` with your MongoDB connection and JWT secret:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/garissa-lodge
JWT_SECRET=your-super-secret-jwt-key-here
ADMIN_EMAIL=admin@garissa-lodge.com
ADMIN_PASSWORD=admin123
MERCHANT_EMAIL=merchant@garissa-lodge.com
MERCHANT_PASSWORD=merchant123
NODE_ENV=development
```

5. Seed the database with sample data:
```bash
node scripts/seed.js
```

6. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `env.example`):
```bash
cp env.example .env
```

3. Update `.env` with your API URL and Unsplash key:
```env
VITE_API_URL=http://localhost:5000/api
VITE_UNSPLASH_ACCESS_KEY=your-unsplash-access-key-here
```

4. Start the frontend development server:
```bash
npm run dev
```

## Admin Access

- **Access**: Click the "AXUK" logo in the navbar to access admin panel
- **Default Credentials**:
  - Admin: `admin@garissa-lodge.com` / `admin123`
  - Merchant: `merchant@garissa-lodge.com` / `merchant123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/me` - Get current user info
- `GET /api/auth/verify` - Verify JWT token

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get single product (public)
- `POST /api/products` - Create product (admin/merchant only)
- `PUT /api/products/:id` - Update product (admin/merchant only)
- `DELETE /api/products/:id` - Delete product (admin/merchant only)

### Images
- `POST /api/images/upload` - Upload image (admin/merchant only)
- `GET /api/images/:id` - Get image by ID (public)
- `DELETE /api/images/:id` - Delete image (admin/merchant only)

## Database Schema

### User
```javascript
{
  email: String (unique),
  password: String (hashed),
  role: String (admin|merchant),
  name: String,
  isActive: Boolean
}
```

### Product
```javascript
{
  title: String,
  description: String,
  price: String,
  image: String (GridFS ID or URL),
  category: String,
  condition: String (Excellent|Good|Fair),
  stock: Number,
  featured: Boolean,
  createdBy: ObjectId (User)
}
```

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (admin/merchant)
- Rate limiting
- CORS protection
- Helmet security headers
- File upload validation

## Image Management

- Upload images directly to MongoDB GridFS using native GridFSBucket
- Search and replace images using Unsplash API
- Automatic image URL generation
- Support for multiple image formats (JPEG, PNG, GIF)
- 5MB file size limit
- Compatible with latest MongoDB driver versions

## Development

### Backend
- Uses nodemon for auto-restart during development
- MongoDB connection with error handling
- Comprehensive error logging
- Environment-based configuration

### Frontend
- Hot module replacement with Vite
- TypeScript for type safety
- Tailwind CSS for styling
- React Router for navigation
- API client with automatic token management

## Production Deployment

1. Set `NODE_ENV=production` in backend `.env`
2. Update `VITE_API_URL` to your production API URL
3. Use a production MongoDB instance
4. Set strong JWT secrets
5. Configure CORS for your domain
6. Use a reverse proxy (nginx) for the backend
7. Build frontend: `npm run build`

## License

MIT License