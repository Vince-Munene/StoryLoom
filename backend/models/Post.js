const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'Post summary is required'],
    trim: true,
    maxlength: [300, 'Summary cannot exceed 300 characters']
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Technology', 'Travel', 'Health', 'Education', 'Economy', 'Music', 'Science', 'Nature', 'Lifestyle', 'Other'],
    default: 'Other'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  tags: [{
    type: String,
    trim: true
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  comments: [commentSchema],
  featured: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate read time before saving
postSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(' ').length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

// Virtual for like count
postSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Index for better query performance
postSchema.index({ title: 'text', content: 'text', summary: 'text' });
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ category: 1, createdAt: -1 });
postSchema.index({ status: 1, createdAt: -1 });

// Static method to get posts with pagination
postSchema.statics.getPosts = async function(page = 1, limit = 10, filters = {}) {
  const skip = (page - 1) * limit;
  
  const query = { status: 'published', ...filters };
  
  const posts = await this.find(query)
    .populate('author', 'username avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
    
  const total = await this.countDocuments(query);
  
  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};

// Instance method to increment views
postSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Instance method to toggle like
postSchema.methods.toggleLike = function(userId) {
  const likeIndex = this.likes.indexOf(userId);
  
  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push(userId);
  }
  
  return this.save();
};

// Instance method to add comment
postSchema.methods.addComment = function(userId, content) {
  this.comments.push({
    user: userId,
    content: content
  });
  
  return this.save();
};

// Instance method to remove comment
postSchema.methods.removeComment = function(commentId, userId) {
  const commentIndex = this.comments.findIndex(
    comment => comment._id.toString() === commentId && 
    (comment.user.toString() === userId || this.author.toString() === userId)
  );
  
  if (commentIndex > -1) {
    this.comments.splice(commentIndex, 1);
    return this.save();
  }
  
  throw new Error('Comment not found or unauthorized');
};

module.exports = mongoose.model('Post', postSchema); 