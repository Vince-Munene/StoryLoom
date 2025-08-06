import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { postsAPI } from '../services/api';
import BlogBot from './BlogBot';
import ProfilePictureUpload from './ProfilePictureUpload';

// Helper function to get full avatar URL
const getAvatarUrl = (avatar) => {
  if (!avatar) return null;
  
  // If it's already a full URL (starts with http), return as is
  if (avatar.startsWith('http')) {
    return avatar;
  }
  
  // If it's a relative path (starts with /), prepend the API base URL
  if (avatar.startsWith('/')) {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${baseUrl}${avatar}`;
  }
  
  // Otherwise return as is (could be base64 or other format)
  return avatar;
};

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  console.log('Home component mounted, user:', user, 'isAuthenticated:', isAuthenticated);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfilePictureUpload, setShowProfilePictureUpload] = useState(false);
  const limit = 10;

  const mockPosts = [
    {
      id: 1,
      title: 'The Top 5 Travel Destinations for 2025!',
      summary: 'The year 2025 is right around the corner, and when it comes the opportunity to explore new places, try new foods and meet new people.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
      category: 'Travel',
      author: { name: 'Natasha Whring', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face' },
      date: '2024-01-15',
      likes: 357,
      comments: 78
    },
    {
      id: 2,
      title: 'Mental Health in the Digital Age',
      summary: 'How social media and technology are affecting our mental wellbeing and what we can do to maintain a healthy balance.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      category: 'Health',
      author: { name: 'Dr. Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop&crop=face' },
      date: '2024-01-14',
      likes: 234,
      comments: 45
    }
  ];

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileDropdown]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await postsAPI.getPosts(currentPage, limit);
      setPosts(response.data.posts);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Fallback to mock data if API fails
      const startIndex = (currentPage - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedPosts = mockPosts.slice(startIndex, endIndex);
      setPosts(paginatedPosts);
      setTotalPages(Math.ceil(mockPosts.length / limit));
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 Day Ago';
    if (diffDays < 7) return `${diffDays} Days Ago`;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleReadMore = (postId) => {
    navigate(`/article/${postId}`);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfilePictureUpdate = (newAvatar) => {
    // The user object will be updated automatically by the AuthContext
    setShowProfileDropdown(false);
  };

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    navigate('/signin');
    return null;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 sticky top-0 z-50`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className={`p-2 rounded-md transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>StoryLoom</h1>
            <nav className="hidden lg:flex items-center space-x-6 ml-8">
              <Link to="/home" className="text-orange-600 font-medium">Home</Link>
              <Link to="/discover" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Explore</Link>
              <Link to="/CreateArticle" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Write</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64 ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors">
              SEARCH
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white hover:opacity-80 transition-colors overflow-hidden"
              >
                {user?.avatar && user.avatar !== 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' ? (
                  <img
                    src={getAvatarUrl(user.avatar)}
                    alt={user?.username || 'User'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initial if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-700">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </button>
              
              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className={`absolute right-0 mt-2 w-64 rounded-md shadow-lg z-50 border profile-dropdown ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="py-2">
                    {/* Profile Header */}
                    <div className={`px-4 py-3 border-b ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-100'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          {user?.avatar && user.avatar !== 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' ? (
                            <img
                              src={getAvatarUrl(user.avatar)}
                              alt={user?.username || 'User'}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to initial if image fails to load
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-700 font-medium">
                              {user?.username?.charAt(0).toUpperCase() || 'U'}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>{user?.username}</p>
                          <p className={`text-xs truncate ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Profile Actions */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowProfilePictureUpload(true);
                          setShowProfileDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-2 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>
                          {user?.avatar && user.avatar !== 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' 
                            ? 'Update Profile Picture' 
                            : 'Add Profile Picture'
                          }
                        </span>
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-2 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`lg:hidden mt-4 pb-4 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <nav className="flex flex-col space-y-2 pt-4">
              <Link to="/home" className="text-orange-600 font-medium">Home</Link>
              <Link to="/discover" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Explore</Link>
              <Link to="/CreateArticle" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Write</Link>
            </nav>
          </div>
        )}
      </header>

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Latest Articles</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${
                  viewMode === 'grid' 
                    ? 'bg-orange-100 text-orange-600' 
                    : isDarkMode 
                      ? 'bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${
                  viewMode === 'list' 
                    ? 'bg-orange-100 text-orange-600' 
                    : isDarkMode 
                      ? 'bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <>
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {posts.map((post) => (
                  <article key={post.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${viewMode === 'list' ? 'flex' : ''}`}>
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-1/3' : ''}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`p-6 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.summary}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <img
                            src={post.author?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'}
                            alt={post.author?.username || 'Unknown'}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm text-gray-700">{post.author?.username || 'Unknown'}</span>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{post.likeCount || 0}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{post.commentCount || 0}</span>
                          </span>
                        </div>
                        <button 
                          onClick={() => {
                            // Use _id if available (from API), otherwise use id (from mock data)
                            const postId = post._id || post.id;
                            handleReadMore(postId);
                          }}
                          className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-colors"
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-md ${
                        currentPage === page
                          ? 'bg-orange-600 text-white'
                          : 'border border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      {/* Floating Chat Icon */}
      <div className="fixed right-8 bottom-4 transform -translate-y-1/2">
        <button 
          onClick={() => setIsChatOpen(true)}
          className={`p-3 rounded-lg transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          <svg className={`w-6 h-6 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 0C42.6522 0 45.1957 1.10905 47.0711 3.08316C48.9464 5.05727 50 7.73475 50 10.5266V31.5797C50 34.3715 48.9464 37.049 47.0711 39.0231C45.1957 40.9972 42.6522 42.1063 40 42.1063H28.19L16.285 49.6249C15.9265 49.8513 15.5197 49.9796 15.1019 49.9977C14.6842 50.0159 14.2687 49.9235 13.8936 49.729C13.5186 49.5345 13.1958 49.244 12.955 48.8842C12.7141 48.5244 12.5629 48.1068 12.515 47.6695L12.5 47.3695V42.1063H10C7.43439 42.1063 4.96693 41.0682 3.10797 39.2069C1.24901 37.3456 0.140781 34.8033 0.0125003 32.106L0 31.5797V10.5266C0 7.73475 1.05357 5.05727 2.92893 3.08316C4.8043 1.10905 7.34784 0 10 0H40ZM33 24.4374C32.5266 23.9489 31.8882 23.6784 31.2253 23.6853C30.5623 23.6922 29.9292 23.976 29.465 24.4743C28.8831 25.0997 28.1884 25.5966 27.4217 25.9358C26.655 26.275 25.8317 26.4497 25 26.4497C24.1683 26.4497 23.345 26.275 22.5783 25.9358C21.8116 25.5966 21.1169 25.0997 20.535 24.4743C20.0685 23.9875 19.4387 23.7135 18.7819 23.7116C18.125 23.7097 17.4939 23.98 17.0248 24.4641C16.5558 24.9481 16.2866 25.6071 16.2754 
          26.2984C16.2642 26.9897 16.5119 27.658 16.965 28.1586C18.0124 29.2837 19.2626 30.1775 20.6423 30.7877C22.022 31.3979 23.5035 31.7122 25 31.7122C26.4965 31.7122 27.978 31.3979 29.3577 30.7877C30.7374 30.1775 31.9876 29.2837 33.035 28.1586C33.4991 27.6602 33.7561 26.9882 33.7495 26.2904C33.743 25.5925 33.4734 24.926 33 24.4374ZM18.775 13.1582H18.75C18.087 13.1582 17.4511 13.4355 16.9822 13.929C16.5134 14.4225 16.25 15.0919 16.25 15.7898C16.25 16.4878 16.5134 17.1572 16.9822 17.6507C17.4511 18.1442 18.087 18.4215 18.75 18.4215H18.775C19.438 18.4215 20.0739 18.1442 20.5428 17.6507C21.0116 17.1572 21.275 16.4878 21.275 15.7898C21.275 15.0919 21.0116 14.4225 20.5428 13.929C20.0739 13.4355 19.438 13.1582 18.775 13.1582ZM31.275 13.1582H31.25C30.587 13.1582 29.9511 13.4355 29.4822 13.929C29.0134 14.4225 28.75 15.0919 28.75 15.7898C28.75 16.4878 29.0134 17.1572 29.4822 17.6507C29.9511 18.1442 30.587 18.4215 31.25 18.4215H31.275C31.938 18.4215 32.5739 18.1442 33.0428 17.6507C33.5116 17.1572 33.775 16.4878 33.775 15.7898C33.775 15.0919 33.5116 14.4225 33.0428 13.929C32.5739 13.4355 31.938 13.1582 31.275 13.1582Z" fill="#dd6b20"/>
          </svg>
        </button>
      </div>
      
             {/* BlogBot Chat Panel */}
       <BlogBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} isDarkMode={isDarkMode} />
      
      {/* Profile Picture Upload Modal */}
      {showProfilePictureUpload && (
        <ProfilePictureUpload
          onClose={() => setShowProfilePictureUpload(false)}
          onUpdate={handleProfilePictureUpdate}
        />
      )}
      </main>
    </div>
  );
  };
  
  export default Home; 