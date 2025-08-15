const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Serve uploaded images
router.get('/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    
    // Validate filename to prevent directory traversal attacks
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid filename'
      });
    }

    // Construct the full file path
    const filePath = path.join(__dirname, '../uploads', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        status: 'error',
        message: 'Image not found'
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
