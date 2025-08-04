# StoryLoom 🌟

A modern social blogging platform where writers can share their stories, connect with readers, and build a community around their content. Built with React, Node.js, and MongoDB.

![StoryLoom](https://img.shields.io/badge/StoryLoom-Social%20Blogging-blue)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-4DB33D)

## ✨ Features

### 🎨 User Experience
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Real-time Updates**: Instant feedback for likes, comments, and interactions
- **Dark/Light Mode**: Toggle between themes for comfortable reading
- **Mobile Responsive**: Optimized for all device sizes

### 👤 User Management
- **Authentication**: Secure JWT-based login/signup system
- **Profile Management**: Customizable user profiles with avatars
- **Password Reset**: Email-based password recovery
- **Role-based Access**: User and admin roles with different permissions

### 📝 Content Creation
- **Rich Text Editor**: Create beautiful blog posts with formatting
- **Image Upload**: Support for featured images and inline media
- **Draft System**: Save and edit posts before publishing
- **Categories & Tags**: Organize content with categories and tags
- **Auto-save**: Never lose your work with automatic saving

### 🔍 Discovery & Engagement
- **Explore Feed**: Discover trending and popular content
- **Search & Filter**: Find posts by category, author, or keywords
- **Like & Comment**: Engage with content through likes and comments
- **User Following**: Follow your favorite authors
- **Reading Time**: Estimated reading time for each post

### 🤖 AI Features
- **BlogBot**: AI-powered writing assistant for content creation
- **Smart Suggestions**: Get writing tips and content ideas
- **Auto-summarization**: Generate post summaries automatically

### 📊 Analytics & Insights
- **View Tracking**: Monitor post performance and engagement
- **User Statistics**: Track your blogging activity and growth
- **Popular Posts**: See trending content across the platform

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StoryLoom
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   # Copy the config file
   cp config.env.example config.env
   
   # Edit config.env with your settings
   nano config.env
   ```

4. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the Development Servers**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## ⚙️ Configuration

### Backend Environment Variables

Create a `backend/config.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/storyloom

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

### Frontend Configuration

The frontend automatically connects to the backend API. If you change the backend URL, update it in `frontend/src/services/api.js`.

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Build the application**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**:
   - Connect your repository to Vercel
   - Set the build command: `npm run build`
   - Set the output directory: `dist`

3. **Configure Environment Variables in Vercel**:
   ```
   VITE_API_URL=https://your-backend-domain.com/api
   ```

4. **Fix Routing Issues**:
   The `vercel.json` file is already configured to handle client-side routing properly.

### Backend Deployment (Heroku/Railway/Render)

1. **Set up environment variables** in your hosting platform
2. **Configure MongoDB Atlas** for production database
3. **Set up email service** for password reset functionality
4. **Deploy the backend** to your preferred platform

### Environment Variables for Production

```env
# Backend
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
FRONTEND_URL=https://your-frontend-domain.com

# Frontend (in Vercel)
VITE_API_URL=https://your-backend-domain.com/api
```

### 🔧 Fixing Vercel Deployment Issues

If you experience routing issues after deployment (pages not loading after login), ensure:

1. **Vercel Configuration**: The `vercel.json` file is present in the frontend directory
2. **Environment Variables**: Set `VITE_API_URL` to your production backend URL
3. **CORS Configuration**: Update backend CORS to allow your Vercel domain

## 📁 Project Structure

```
StoryLoom/
├── backend/                 # Node.js API Server
│   ├── models/             # MongoDB Models
│   │   ├── User.js        # User schema
│   │   └── Post.js        # Post schema
│   ├── routes/            # API Routes
│   │   ├── auth.js        # Authentication routes
│   │   ├── posts.js       # Post management routes
│   │   └── users.js       # User management routes
│   ├── middleware/        # Custom Middleware
│   │   ├── auth.js        # JWT authentication
│   │   ├── errorHandler.js # Error handling
│   │   └── upload.js      # File upload handling
│   ├── utils/             # Utility Functions
│   │   └── email.js       # Email services
│   ├── seeds/             # Database Seeding
│   │   └── seedData.js    # Sample data
│   ├── uploads/           # Uploaded Files
│   ├── server.js          # Main server file
│   └── config.env         # Environment variables
│
├── frontend/              # React Application
│   ├── src/
│   │   ├── components/    # React Components
│   │   │   ├── Home.jsx           # Landing page
│   │   │   ├── Dashboard.jsx      # User dashboard
│   │   │   ├── CreateArticle.jsx  # Post creation
│   │   │   ├── Article.jsx        # Post display
│   │   │   ├── Discover.jsx       # Content discovery
│   │   │   ├── SignIn.jsx         # Authentication
│   │   │   ├── BlogBot.jsx        # AI writing assistant
│   │   │   └── ...                # Other components
│   │   ├── contexts/      # React Contexts
│   │   │   └── AuthContext.jsx    # Authentication state
│   │   ├── services/      # API Services
│   │   │   └── api.js             # API client
│   │   ├── assets/        # Static Assets
│   │   └── main.jsx       # App entry point
│   ├── index.html         # HTML template
│   ├── vercel.json        # Vercel configuration
│   └── package.json       # Frontend dependencies
│
└── README.md              # This file
```

## 🔧 Available Scripts

### Backend Scripts
```bash
cd backend
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

### Frontend Scripts
```bash
cd frontend
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🗄️ Database Models

### User Model
```javascript
{
  username: String,           // Unique username
  email: String,              // Unique email
  password: String,           // Hashed password
  avatar: String,             // Profile image URL
  bio: String,                // User biography
  role: String,               // 'user' or 'admin'
  isVerified: Boolean,        // Email verification status
  lastLogin: Date,            // Last login timestamp
  resetPasswordToken: String, // Password reset token
  resetPasswordExpire: Date   // Token expiration
}
```

### Post Model
```javascript
{
  title: String,              // Post title
  content: String,            // Post content
  summary: String,            // Post summary
  image: String,              // Featured image URL
  category: String,           // Post category
  author: ObjectId,           // Reference to User
  status: String,             // 'draft', 'published', 'archived'
  tags: [String],             // Array of tags
  likes: [ObjectId],          // Array of user IDs who liked
  views: Number,              // View count
  comments: [Comment],        // Array of comment objects
  featured: Boolean,          // Featured post flag
  readTime: Number            // Estimated read time in minutes
}
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication:

1. **Login/Signup**: Users authenticate and receive a JWT token
2. **Token Storage**: Tokens are stored in localStorage
3. **API Requests**: Tokens are automatically included in API headers
4. **Token Expiration**: Tokens expire after 7 days (configurable)

### Protected Routes
- Post creation and editing
- User profile management
- Like and comment functionality
- Admin features

## 📱 Key Features in Detail

### 🎯 Content Creation
- **Rich Text Editor**: Create formatted content with headings, lists, and emphasis
- **Image Upload**: Drag and drop or click to upload images
- **Auto-save**: Content is automatically saved as you type
- **Preview Mode**: See how your post will look before publishing
- **Draft Management**: Save multiple drafts and edit later

### 🔍 Content Discovery
- **Explore Feed**: Browse trending and popular content
- **Category Filtering**: Filter posts by category
- **Search Functionality**: Search posts by title, content, or author
- **Tag System**: Discover content through tags
- **Reading Lists**: Save posts for later reading

### 👥 Social Features
- **User Profiles**: Customizable profiles with avatars and bios
- **Follow System**: Follow your favorite authors
- **Like & Comment**: Engage with content through likes and comments
- **Share Posts**: Share posts on social media
- **User Statistics**: Track your blogging activity

### 🤖 AI-Powered Features
- **BlogBot Assistant**: Get writing suggestions and tips
- **Content Ideas**: AI-generated content ideas based on your interests
- **Writing Enhancement**: Improve your writing with AI suggestions
- **Auto-summarization**: Generate post summaries automatically

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Issues**
   - Clear localStorage and try logging in again
   - Check JWT token expiration
   - Verify backend is running and accessible

2. **Database Connection**
   - Verify MongoDB connection string
   - Check network connectivity
   - Ensure database user has proper permissions

3. **File Upload Issues**
   - Check file size limits
   - Verify upload directory permissions
   - Ensure proper CORS configuration

4. **Email Functionality**
   - Verify SMTP credentials
   - Check email service provider settings
   - Test email configuration

5. **Vercel Deployment Issues**
   - Ensure `vercel.json` is present in frontend directory
   - Set `VITE_API_URL` environment variable in Vercel
   - Check browser console for API errors
   - Verify backend CORS allows Vercel domain

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your backend configuration.

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed
- Ensure all tests pass

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing frontend framework
- **Express.js** for the robust backend framework
- **MongoDB** for the flexible database solution
- **Tailwind CSS** for the beautiful styling framework
- **Vite** for the fast build tool

## 📞 Support

If you encounter any issues or have questions:

1. **Check the troubleshooting section** above
2. **Search existing issues** in the repository
3. **Create a new issue** with detailed information
4. **Contact the development team**

---

**Happy Blogging! 📝✨**

Built with ❤️ by the StoryLoom Team 