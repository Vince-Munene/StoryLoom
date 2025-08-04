const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - require authentication
exports.protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    console.log('No token provided in request');
    return res.status(401).json({
      status: 'error',
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified successfully for user:', decoded.id);
    console.log('JWT Secret:', process.env.JWT_SECRET ? 'Present' : 'Missing');

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');
    console.log('User found in database:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('User not found for token:', decoded.id);
      console.log('Available users in database:', await User.find().select('_id username email'));
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    return res.status(401).json({
      status: 'error',
      message: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

// Optional authentication - doesn't require token but adds user if present
exports.optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = user;
      }
    } catch (error) {
      // Token is invalid, but we don't throw an error for optional auth
    }
  }

  next();
}; 