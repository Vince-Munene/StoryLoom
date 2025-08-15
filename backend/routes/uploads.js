const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Handle preflight OPTIONS requests
router.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
});

// Serve uploaded images
router.get('/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    
    // Set CORS headers for image requests
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Validate filename to prevent directory traversal attacks
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid filename'
      });
    }

    // Construct the full file path
    const filePath = path.join(__dirname, '../uploads', filename);
    
    // Debug logging
    console.log('Requested filename:', filename);
    console.log('File path:', filePath);
    console.log('File exists:', fs.existsSync(filePath));
    console.log('Current working directory:', process.cwd());
    console.log('__dirname:', __dirname);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        status: 'error',
        message: 'Image not found',
        debug: {
          filename,
          filePath,
          exists: fs.existsSync(filePath)
        }
      });
    }

    // Get file stats to check if it's actually a file
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid file type'
      });
    }

    // Set appropriate headers for image serving
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'image/jpeg'; // default
    
    switch (ext) {
      case '.png':
        contentType = 'image/png';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      default:
        return res.status(400).json({
          status: 'error',
          message: 'Unsupported image format'
        });
    }

    // Set cache headers for better performance
    res.set({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      'Content-Length': stats.size
    });

    // Stream the file
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);

    // Handle stream errors
    stream.on('error', (error) => {
      console.error('Error streaming image:', error);
      if (!res.headersSent) {
        res.status(500).json({
          status: 'error',
          message: 'Error serving image'
        });
      }
    });

  } catch (error) {
    console.error('Error in uploads route:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Handle legacy /uploads/ path for backward compatibility
router.get('/legacy/:filename', (req, res) => {
  // Redirect to the new API endpoint
  const filename = req.params.filename;
  res.redirect(`/api/uploads/${filename}`);
});

// Health check for uploads route
router.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Uploads route is working',
    timestamp: new Date().toISOString(),
    uploadsDir: path.join(__dirname, '../uploads'),
    dirExists: fs.existsSync(path.join(__dirname, '../uploads')),
    files: fs.existsSync(path.join(__dirname, '../uploads')) ? fs.readdirSync(path.join(__dirname, '../uploads')) : [],
    currentDir: __dirname,
    cwd: process.cwd()
  });
});

// Test route to create a simple test image
router.get('/test-image', (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Create a simple test image (1x1 pixel PNG)
    const testImagePath = path.join(uploadsDir, 'test-image.png');
    
    // Create a minimal PNG file (1x1 transparent pixel)
    const pngData = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
      0x00, 0x00, 0x00, 0x0D, // IHDR chunk length
      0x49, 0x48, 0x44, 0x52, // IHDR
      0x00, 0x00, 0x00, 0x01, // width: 1
      0x00, 0x00, 0x00, 0x01, // height: 1
      0x08, 0x02, 0x00, 0x00, // bit depth, color type, compression, filter, interlace
      0x00, 0x00, 0x00, 0x00, // CRC placeholder
      0x00, 0x00, 0x00, 0x0C, // IDAT chunk length
      0x49, 0x44, 0x41, 0x54, // IDAT
      0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00, 0x00, // compressed data
      0x00, 0x00, 0x00, 0x00, // CRC placeholder
      0x00, 0x00, 0x00, 0x00, // IEND chunk length
      0x49, 0x45, 0x4E, 0x44, // IEND
      0xAE, 0x42, 0x60, 0x82  // CRC
    ]);
    
    fs.writeFileSync(testImagePath, pngData);
    
    res.json({
      status: 'success',
      message: 'Test image created',
      testImagePath,
      testImageUrl: '/api/uploads/test-image.png'
    });
  } catch (error) {
    console.error('Error creating test image:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create test image',
      error: error.message
    });
  }
});

// List all uploaded images (for debugging/admin purposes)
router.get('/', (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      return res.status(404).json({
        status: 'error',
        message: 'Uploads directory not found'
      });
    }

    const files = fs.readdirSync(uploadsDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    res.json({
      status: 'success',
      message: 'Uploaded images list',
      count: imageFiles.length,
      images: imageFiles.map(file => ({
        filename: file,
        url: `/api/uploads/${file}`,
        size: fs.statSync(path.join(uploadsDir, file)).size
      }))
    });

  } catch (error) {
    console.error('Error listing uploads:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error listing uploads'
    });
  }
});

module.exports = router;
