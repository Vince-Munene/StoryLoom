import { useState } from 'react';
import booksBackground from '../assets/books-background.jpg';
import CompleteProfile from './CompleteProfile';
import lock from '../assets/lock-and-key.svg';
import avatar from '../assets/avatar-placeholder.svg';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Account creation:', formData);
      // Show success screen first
      setShowSuccess(true);
      // After 3 seconds, show CompleteProfile
      setTimeout(() => {
        setShowCompleteProfile(true);
      }, 3000);
    } catch (error) {
      console.error('Account creation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show success screen if account creation was successful
  if (showSuccess && !showCompleteProfile) {
    return (
      <div className="h-screen flex">
        {/* Left Section - Blurred Background */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden blur-sm">
          {/* Books Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${booksBackground})` }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
          
          {/* Content Overlay */}
          <div className="relative z-10 flex items-center justify-center h-full w-full px-12">
            <div className="text-center text-white max-w-md">
              <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Storyloom</h1>
              <div className="space-y-2 text-xl font-normal drop-shadow-md">
                <p>Unlock Your Potential</p>
                <p>Create Your Space</p>
                <p>Connect With Your World</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Success Screen */}
        <div className="w-full lg:w-1/2 bg-orange-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl border-2 border-orange-200 p-12 text-center max-w-md mx-4">
            {/* User Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-brown-600 rounded-full flex items-center justify-center border-4">
                <img src={avatar} alt="User Icon" className="w-20 h-20" />
              </div>
            </div>
            
            {/* Success Heading */}
            <h2 className="text-2xl font-bold text-brown-800 mb-4">Sign up Successful!</h2>
            
            {/* Success Message */}
            <p className="text-brown-600 mb-8 leading-relaxed">
              Your account has been created..<br />
              Please wait a moment, we are preparing for you.
            </p>
            
            {/* Simple Loading Indicator */}
            <div className="flex justify-center">
              <div className="w-6 h-6 border-2 border-brown-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show CompleteProfile after success screen
  if (showCompleteProfile) {
    return <CompleteProfile />;
  }

  return (
    <div className="h-screen flex">
      {/* Left Section - Promotional/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Books Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${booksBackground})` }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full w-full px-12">
          <div className="text-center text-white max-w-md">
            <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Storyloom</h1>
            <div className="space-y-2 text-xl font-normal drop-shadow-md">
              <p>Unlock Your Potential</p>
              <p>Create Your Space</p>
              <p>Connect With Your World</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Create Account Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-black">Create an account</h2>
            <img src={lock} alt="Lock" className="w-8 h-8" />
          </div>

          {/* Instructions */}
          <p className="text-sm text-black mb-8">
            Enter your username, email & password. If you forget it, then you have to do forgot password.
          </p>

          {/* Create Account Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-black">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleInputChange}
                className={`block w-full px-3 py-3 border-b-2 focus:outline-none focus:border-midbrown transition-colors duration-200 placeholder-gray-400 ${
                  errors.username 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-midbrown'
                }`}
                placeholder="Username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full px-3 py-3 border-b-2 focus:outline-none focus:border-midbrown transition-colors duration-200 placeholder-gray-400 ${
                  errors.email 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-midbrown'
                }`}
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-3 pr-10 border-b-2 focus:outline-none focus:border-midbrown transition-colors duration-200 placeholder-gray-400 ${
                    errors.password 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-midbrown'
                  }`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-midbrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-midbrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-3 pr-10 border-b-2 focus:outline-none focus:border-midbrown transition-colors duration-200 placeholder-gray-400 ${
                    errors.confirmPassword 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-midbrown'
                  }`}
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5 text-midbrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-midbrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-midbrown focus:ring-midbrown border-gray-300 rounded accent-darkbrown"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-black">
                 Remember me
              </label>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-darkbrown hover:bg-midbrown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-midbrown disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                'CONTINUE'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount; 