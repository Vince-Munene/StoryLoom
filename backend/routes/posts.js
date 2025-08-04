const express = require('express');
const { protect, optionalAuth } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

// @desc    Get all posts with pagination
// @route   GET /api/posts
// @access  Public
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;
    const author = req.query.author;

    // Build filters
    const filters = {};
    if (category) filters.category = category;
    if (author) filters.author = author;
    if (search) {
      filters.$text = { $search: search };
    }

    // Get posts with pagination
    const result = await Post.getPosts(page, limit, filters);

    // Add like status for authenticated users
    if (req.user) {
      result.posts = result.posts.map(post => ({
        ...post,
        isLiked: post.likes.includes(req.user.id)
      }));
    }

    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
router.post('/', protect, uploadSingle, async (req, res, next) => {
  try {
    const { title, content, summary, category, tags, status } = req.body;

    // Create post data
    const postData = {
      title,
      content,
      summary,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      status: status || 'published',
      author: req.user.id
    };

    // Add image if uploaded
    if (req.file) {
      postData.image = `/uploads/${req.file.filename}`;
    }

    const post = await Post.create(postData);

    // Populate author details
    await post.populate('author', 'username avatar');

    res.status(201).json({
      status: 'success',
      message: 'Post created successfully',
      data: {
        post
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Toggle like on post
// @route   PUT /api/posts/:id/like
// @access  Private
router.put('/:id/like', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    await post.toggleLike(req.user.id);

    res.status(200).json({
      status: 'success',
      message: 'Like toggled successfully',
      data: {
        likes: post.likes.length,
        isLiked: post.likes.includes(req.user.id)
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
router.post('/:id/comments', protect, async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        status: 'error',
        message: 'Comment content is required'
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    await post.addComment(req.user.id, content);

    // Get updated post with populated comments
    const updatedPost = await Post.findById(req.params.id)
      .populate('comments.user', 'username avatar');

    const newComment = updatedPost.comments[updatedPost.comments.length - 1];

    res.status(201).json({
      status: 'success',
      message: 'Comment added successfully',
      data: {
        comment: newComment
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Remove comment from post
// @route   DELETE /api/posts/:id/comments/:commentId
// @access  Private
router.delete('/:id/comments/:commentId', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    await post.removeComment(req.params.commentId, req.user.id);

    res.status(200).json({
      status: 'success',
      message: 'Comment removed successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username avatar bio')
      .populate('comments.user', 'username avatar')
      .populate('likes', 'username avatar');

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    // Increment views
    await post.incrementViews();

    // Add like status for authenticated users
    if (req.user) {
      post.isLiked = post.likes.some(like => like._id.toString() === req.user.id);
    }

    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
router.put('/:id', protect, uploadSingle, async (req, res, next) => {
  try {
    const { title, content, summary, category, tags, status } = req.body;

    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    // Check ownership
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this post'
      });
    }

    // Update post data
    const updateData = {
      title,
      content,
      summary,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      status
    };

    // Add image if uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    post = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'username avatar');

    res.status(200).json({
      status: 'success',
      message: 'Post updated successfully',
      data: {
        post
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    // Check ownership
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this post'
      });
    }

    await post.remove();

    res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 