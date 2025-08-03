import { useState } from 'react';
import booksBackground from '../assets/books-background.jpg';
import avatar from '../assets/avatar-placeholder.svg';

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!formData.fullName || formData.fullName === '') {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phoneNumber || formData.phoneNumber === '') {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.gender || formData.gender === '') {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.dateOfBirth || formData.dateOfBirth === '') {
      newErrors.dateOfBirth = 'Date of birth is required';
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
      console.log('Profile completion:', formData);
      setIsCompleted(true);
    } catch (error) {
      console.error('Profile completion error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show success screen after profile completion
  if (isCompleted) {
    return (
      <div className="min-h-screen flex">
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

        {/* Right Section - Success Message */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
          <div className="w-full max-w-md text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Profile Complete!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Welcome to Storyloom! Your profile has been successfully created.
              </p>
            </div>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-darkbrown hover:bg-midbrown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-midbrown transition-colors duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
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

      {/* Right Section - Profile Completion Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Complete your profile</h2>
            <svg width="25" height="25" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.75 25.3334C34.75 30.1646 34.75 32.5819 33.2118 34.0818C31.6753 35.5834 29.199 35.5834 24.25 35.5834H13.75C8.801 35.5834 6.32475 35.5834 4.78825 34.0818C3.25 32.5819 3.25 30.1646 3.25 25.3334V11.6667C3.25 6.83558 3.25 4.41829 4.78825 2.91837C6.32475 1.41675 8.801 1.41675 13.75 1.41675H24.25C29.199 1.41675 31.6753 1.41675 33.2118 2.91837C34.75 4.41829 34.75 6.83558 34.75 11.6667V18.5001M12 1.41675V8.25008M12 35.5834V15.0834M1.5 18.5001H5M1.5 25.3334H5M1.5 11.6667H5M18.125 9.10425H26.875M18.125 15.0834H26.875" stroke="#B1521E" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>

          {/* Privacy Note */}
          <p className="text-sm text-gray-600 mb-8">
            Don't worry only you can see your personal data. No one else will be able to see it.
          </p>

          {/* Profile Picture Placeholder */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center">
              <img src={avatar} alt="Logo" className="w-16 h-16 color-midbrown" />
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className={`block w-full px-3 py-3 border-b-2 focus:outline-none focus:border-midbrown transition-colors duration-200 placeholder-gray-400 ${
                  errors.fullName 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-midbrown'
                }`}
                placeholder="Full Name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`block w-full px-3 py-3 border-b-2 focus:outline-none focus:border-midbrown transition-colors duration-200 placeholder-gray-400 ${
                  errors.phoneNumber 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-midbrown'
                }`}
                placeholder="+254 710201985"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Gender Field */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-3 pr-10 border-b-2 focus:outline-none focus:border-midbrown transition-colors duration-200 appearance-none ${
                    errors.gender 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-midbrown'
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-midbrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
              )}
            </div>

            {/* Date of Birth Field */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`block w-full px-3 py-3 border-b-2 focus:outline-none focus:border-midbrown transition-colors duration-200 placeholder-gray-400 ${
                  errors.dateOfBirth 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-midbrown'
                }`}
                placeholder="MM/DD/YYYY"
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
              )}
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
                  Completing profile...
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

export default CompleteProfile;
