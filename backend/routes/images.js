const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Test endpoint to list all uploaded images
router.get('/test/list', async (req, res) => {
  try {
    if (!bucket) {
      return res.status(500).json({ message: 'GridFS bucket not initialized' });
    }

    const files = await bucket.find({}).toArray();
    res.json({
      message: 'All uploaded files',
      files: files.map(file => ({
        id: file._id,
        filename: file.filename,
        contentType: file.metadata?.contentType,
        length: file.length,
        uploadDate: file.uploadDate
      }))
    });
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).json({ message: 'Error listing files' });
  }
});

// Initialize GridFS bucket
let bucket;
const conn = mongoose.connection;
conn.once('open', () => {
  bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload image
router.post('/upload', auth, requireRole(['admin', 'merchant']), upload.single('image'), async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('File:', req.file ? {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    } : 'No file');
    console.log('User:', req.user ? { id: req.user._id, role: req.user.role } : 'No user');

    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    if (!bucket) {
      console.log('GridFS bucket not initialized');
      return res.status(500).json({ message: 'GridFS bucket not initialized' });
    }

    const filename = `${Date.now()}-${req.file.originalname}`;
    console.log('Uploading file with filename:', filename);

    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        originalName: req.file.originalname,
        contentType: req.file.mimetype,
        uploadedBy: req.user._id
      }
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on('error', (error) => {
      console.error('Upload stream error:', error);
      res.status(500).json({ message: 'Error uploading image' });
    });

    uploadStream.on('finish', () => {
      console.log('Upload completed successfully');
      console.log('Uploaded file ID:', uploadStream.id.toString());
      res.json({
        message: 'Image uploaded successfully',
        imageId: uploadStream.id.toString(),
        filename: filename,
        url: `/api/images/${uploadStream.id}`
      });
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

// Get image by ID
router.get('/:id', async (req, res) => {
  try {
    console.log('Image request for ID:', req.params.id);
    
    if (!bucket) {
      console.log('GridFS bucket not initialized');
      return res.status(500).json({ message: 'GridFS bucket not initialized' });
    }

    const fileId = new mongoose.Types.ObjectId(req.params.id);
    console.log('Looking for file with ObjectId:', fileId);
    
    // Check if file exists
    const files = await bucket.find({ _id: fileId }).toArray();
    console.log('Found files:', files.length);
    
    if (files.length === 0) {
      console.log('No files found for ID:', req.params.id);
      return res.status(404).json({ message: 'Image not found' });
    }

    const file = files[0];
    console.log('File details:', {
      id: file._id,
      filename: file.filename,
      contentType: file.metadata?.contentType,
      length: file.length
    });
    
    // Check if it's an image
    if (!file.metadata?.contentType?.startsWith('image/')) {
      console.log('File is not an image:', file.metadata?.contentType);
      return res.status(404).json({ message: 'Not an image' });
    }

    // Set appropriate headers
    res.set({
      'Content-Type': file.metadata.contentType,
      'Content-Length': file.length,
      'Cache-Control': 'public, max-age=31536000' // Cache for 1 year
    });

    console.log('Starting download stream for file:', file.filename);

    // Create download stream
    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);

    downloadStream.on('error', (error) => {
      console.error('Download stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error retrieving image' });
      }
    });

    downloadStream.on('end', () => {
      console.log('Download stream completed for file:', file.filename);
    });

  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({ message: 'Error retrieving image' });
  }
});

// Delete image
router.delete('/:id', auth, requireRole(['admin', 'merchant']), async (req, res) => {
  try {
    if (!bucket) {
      return res.status(500).json({ message: 'GridFS bucket not initialized' });
    }

    const fileId = new mongoose.Types.ObjectId(req.params.id);
    
    // Check if file exists
    const files = await bucket.find({ _id: fileId }).toArray();
    if (files.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete the file
    await bucket.delete(fileId);
    res.json({ message: 'Image deleted successfully' });

  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ message: 'Error deleting image' });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
    }
  }
  res.status(400).json({ message: error.message });
});

module.exports = router;
