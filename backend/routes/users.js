const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');
const User = require('../models/User');
const Post = require('../models/Post');

const router = express.Router();

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .populate('postCount')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    res.status(200).json({
      status: 'success',
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalUsers: total,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, uploadSingle, async (req, res, next) => {
  try {
    const { username, bio } = req.body;

    const user = await User.findById(req.user.id);

    if (username && username !== user.username) {
      // Check if username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'Username already taken'
        });
      }
      user.username = username;
    }

    if (bio !== undefined) user.bio = bio;
    if (req.file) {
      // Store the uploaded file path as avatar
      user.avatar = `/api/uploads/${req.file.filename}`;
    } else if (req.body.avatar !== undefined) {
      // Handle avatar as text field (for base64, URL, or empty string to reset)
      if (req.body.avatar === '') {
        // Reset to default avatar
        user.avatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
      } else {
        user.avatar = req.body.avatar;
      }
    }

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
          role: user.role
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get user's posts
// @route   GET /api/users/:id/posts
// @access  Public
router.get('/:id/posts', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Get user's posts
    const result = await Post.getPosts(page, limit, { author: userId });

    res.status(200).json({
      status: 'success',
      data: {
        ...result,
        user: {
          id: user._id,
          username: user.username,
          avatar: user.avatar,
          bio: user.bio
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get user's liked posts
// @route   GET /api/users/:id/liked-posts
// @access  Private
router.get('/:id/liked-posts', protect, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Check if requesting user's own liked posts or admin
    if (userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to view this user\'s liked posts'
      });
    }

    // Get posts that the user has liked
    const skip = (page - 1) * limit;
    const posts = await Post.find({ likes: userId })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Post.countDocuments({ likes: userId });

    res.status(200).json({
      status: 'success',
      data: {
        posts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalPosts: total,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete user (admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Delete user's posts
    await Post.deleteMany({ author: user._id });

    // Delete user
    await user.remove();

    res.status(200).json({
      status: 'success',
      message: 'User and associated posts deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get user statistics
// @route   GET /api/users/:id/stats
// @access  Private
router.get('/:id/stats', protect, async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Check if requesting user's own stats or admin
    if (userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to view this user\'s statistics'
      });
    }

    // Get user's posts count
    const postsCount = await Post.countDocuments({ author: userId });

    // Get user's total likes received
    const posts = await Post.find({ author: userId });
    const totalLikes = posts.reduce((sum, post) => sum + post.likes.length, 0);

    // Get user's total comments received
    const totalComments = posts.reduce((sum, post) => sum + post.comments.length, 0);

    // Get user's total views
    const totalViews = posts.reduce((sum, post) => sum + post.views, 0);

    // Get user's liked posts count
    const likedPostsCount = await Post.countDocuments({ likes: userId });

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          postsCount,
          totalLikes,
          totalComments,
          totalViews,
          likedPostsCount
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('postCount');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 