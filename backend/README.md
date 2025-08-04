# StoryLoom Backend API

A robust Node.js backend API for the StoryLoom social blogging platform, built with Express.js, MongoDB, and JWT authentication.

## 🚀 Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Blog Management**: CRUD operations for blog posts with comments and likes
- **File Upload**: Image upload support using Multer
- **Email Integration**: Password reset and welcome emails using Nodemailer
- **Security**: Rate limiting, CORS, and Helmet security headers
- **Database**: MongoDB with Mongoose ODM
- **API Documentation**: Comprehensive REST API endpoints

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository and navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment configuration:**
   - Copy `config.env` and update with your values
   - Set up MongoDB connection string
   - Configure JWT secret
   - Set up email credentials (optional)

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

## 🔧 Environment Variables

Create a `config.env` file in the backend root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/storyloom

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

## 📚 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/user` | Get current user | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |
| PUT | `/api/auth/change-password` | Change password | Private |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| PUT | `/api/auth/reset-password/:token` | Reset password | Public |
| POST | `/api/auth/logout` | Logout user | Private |

### Posts Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/posts` | Get all posts (paginated) | Public |
| GET | `/api/posts/:id` | Get single post | Public |
| POST | `/api/posts` | Create new post | Private |
| PUT | `/api/posts/:id` | Update post | Private |
| DELETE | `/api/posts/:id` | Delete post | Private |
| PUT | `/api/posts/:id/like` | Toggle like on post | Private |
| POST | `/api/posts/:id/comments` | Add comment to post | Private |
| DELETE | `/api/posts/:id/comments/:commentId` | Remove comment | Private |
| GET | `/api/posts/user/:userId` | Get user's posts | Public |
| GET | `/api/posts/category/:category` | Get posts by category | Public |

### Users Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users` | Get all users (admin) | Private/Admin |
| GET | `/api/users/:id` | Get single user | Public |
| PUT | `/api/users/profile` | Update user profile | Private |
| GET | `/api/users/:id/posts` | Get user's posts | Public |
| GET | `/api/users/:id/liked-posts` | Get user's liked posts | Private |
| DELETE | `/api/users/:id` | Delete user (admin) | Private/Admin |
| GET | `/api/users/:id/stats` | Get user statistics | Private |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📁 Project Structure

```
backend/
├── models/           # Database models
│   ├── User.js      # User model
│   └── Post.js      # Post model
├── routes/           # API routes
│   ├── auth.js      # Authentication routes
│   ├── posts.js     # Post routes
│   └── users.js     # User routes
├── middleware/       # Custom middleware
│   ├── auth.js      # Authentication middleware
│   ├── errorHandler.js # Error handling
│   └── upload.js    # File upload middleware
├── utils/           # Utility functions
│   └── email.js     # Email utilities
├── seeds/           # Database seeding
│   └── seedData.js  # Sample data
├── uploads/         # Uploaded files
├── server.js        # Main server file
├── config.env       # Environment variables
└── package.json     # Dependencies
```

## 🗄️ Database Models

### User Model
- `username`: Unique username
- `email`: Unique email address
- `password`: Hashed password
- `avatar`: Profile image URL
- `bio`: User biography
- `role`: User role (user/admin)
- `isVerified`: Email verification status
- `resetPasswordToken`: Password reset token
- `resetPasswordExpire`: Token expiration
- `lastLogin`: Last login timestamp

### Post Model
- `title`: Post title
- `content`: Post content
- `summary`: Post summary
- `image`: Featured image URL
- `category`: Post category
- `author`: Reference to User
- `status`: Post status (draft/published/archived)
- `tags`: Array of tags
- `likes`: Array of user IDs who liked
- `views`: View count
- `comments`: Array of comment objects
- `featured`: Featured post flag
- `readTime`: Estimated read time

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Setup
1. Set `NODE_ENV=production`
2. Use MongoDB Atlas or production MongoDB instance
3. Configure proper CORS origins
4. Set up email service credentials
5. Use strong JWT secret

## 🔧 Available Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `npm run seed`: Seed database with sample data

## 📝 Sample Data

After running the seed script, you can use these credentials:

**Admin User:**
- Email: `admin@storyloom.com`
- Password: `admin123`

**Regular User:**
- Email: `john@example.com`
- Password: `password123`

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation
- File upload restrictions

## 📧 Email Features

- Password reset emails
- Welcome emails for new users
- HTML email templates
- Configurable SMTP settings

## 🐛 Error Handling

The API includes comprehensive error handling:
- Validation errors
- Authentication errors
- Database errors
- File upload errors
- Custom error messages

## 📊 API Response Format

### Success Response
```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 