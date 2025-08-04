const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('API Base URL:', API_BASE_URL);
console.log('Environment variables:', import.meta.env);

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // Always throw error for all non-ok responses, including 401/403
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  console.log('Auth token:', token ? 'Present' : 'Missing');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Authentication API
export const authAPI = {
  // Sign up
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  // Login
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/user`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Update profile
  updateProfile: async (profileData) => {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(profileData).forEach(key => {
      if (key !== 'avatar' && profileData[key] !== undefined) {
        formData.append(key, profileData[key]);
      }
    });
    
    // Add avatar if provided
    if (profileData.avatar) {
      // If avatar is a base64 string, convert it to a file
      if (typeof profileData.avatar === 'string' && profileData.avatar.startsWith('data:')) {
        try {
          const response = await fetch(profileData.avatar);
          const blob = await response.blob();
          formData.append('image', blob, 'avatar.jpg'); // Changed from 'avatar' to 'image'
        } catch (error) {
          console.error('Error converting base64 to blob:', error);
          // If conversion fails, send as text field
          formData.append('avatar', profileData.avatar);
        }
      } else {
        formData.append('image', profileData.avatar); // Changed from 'avatar' to 'image'
      }
    }
    
    console.log('Sending profile update with formData:', Object.fromEntries(formData.entries()));
    
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        Authorization: getAuthHeaders().Authorization
      },
      body: formData
    });
    return handleResponse(response);
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return handleResponse(response);
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    return handleResponse(response);
  },

  // Logout
  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Posts API
export const postsAPI = {
  // Get all posts with pagination
  getPosts: async (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    const response = await fetch(`${API_BASE_URL}/posts?${params}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get single post
  getPost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Create new post
  createPost: async (postData) => {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(postData).forEach(key => {
      if (key !== 'image' && postData[key] !== undefined) {
        formData.append(key, postData[key]);
      }
    });
    
    // Add image if provided
    if (postData.image) {
      formData.append('image', postData.image);
    }
    
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeaders().Authorization
      },
      body: formData
    });
    return handleResponse(response);
  },

  // Update post
  updatePost: async (id, postData) => {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(postData).forEach(key => {
      if (key !== 'image' && postData[key] !== undefined) {
        formData.append(key, postData[key]);
      }
    });
    
    // Add image if provided
    if (postData.image) {
      formData.append('image', postData.image);
    }
    
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: getAuthHeaders().Authorization
      },
      body: formData
    });
    return handleResponse(response);
  },

  // Delete post
  deletePost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Toggle like on post
  toggleLike: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}/like`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Add comment to post
  addComment: async (id, content) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}/comments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content })
    });
    return handleResponse(response);
  },

  // Remove comment from post
  removeComment: async (postId, commentId) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get posts by category
  getPostsByCategory: async (category, page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    const response = await fetch(`${API_BASE_URL}/posts?category=${category}&${params}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Users API
export const usersAPI = {
  // Get user profile
  getUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return handleResponse(response);
  },

  // Get user's posts
  getUserPosts: async (id, page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    const response = await fetch(`${API_BASE_URL}/users/${id}/posts?${params}`);
    return handleResponse(response);
  },

  // Get user statistics
  getUserStats: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}/stats`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Health check
export const healthCheck = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return handleResponse(response);
}; 