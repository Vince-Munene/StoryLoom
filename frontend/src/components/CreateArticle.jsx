import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreateArticle = ({ 
  postId = null, 
  initialData = null, 
  onSave = () => {}, 
  onPublish = () => {}, 
  onDelete = () => {},
  onClose = () => {}
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    article: '',
    author: '',
    publishDate: '',
    coverImage: null,
    coverImagePreview: null,
    isPublished: false
  });

  const [textFormatting, setTextFormatting] = useState({
    alignment: 'left',
    isUnderlined: false,
    isPreviewMode: false
  });
  const [insertedImages, setInsertedImages] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Load initial data when editing
  useEffect(() => {
    if (postId && initialData) {
      setFormData({
        title: initialData.title || '',
        article: initialData.article || '',
        author: initialData.author || '',
        publishDate: initialData.publishDate || '',
        coverImage: initialData.coverImage || null,
        isPublished: initialData.isPublished || false
      });
      setIsEditing(true);
    }
  }, [postId, initialData]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (formData.title || formData.article) {
        handleAutoSave();
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [formData]);

  // Close dropdown and date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
      if (showDatePicker && !event.target.closest('.date-picker-container')) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown, showDatePicker]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Image selected:', file.name);
      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        coverImage: file,
        coverImagePreview: imageUrl
      }));
    }
  };

  const handleAutoSave = () => {
    console.log('Auto-saving draft:', formData);
    // Auto-save logic would go here
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      console.log('Saving article:', formData);
      await onSave(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const publishData = { ...formData, isPublished: true };
      console.log('Publishing article:', publishData);
      await onPublish(publishData);
      setFormData(prev => ({ ...prev, isPublished: true }));
    } catch (error) {
      console.error('Publish error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      console.log('Deleting article:', postId);
      await onDelete(postId);
      
      // Reset everything back to default
      resetForm();
      
      // Show success popup
      setShowDeleteSuccess(true);
      
      console.log('Article deleted and form reset to default');
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (formData.title || formData.article) {
      // Ask for confirmation before closing
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose();
        // Reset form when closing
        resetForm();
      }
    } else {
      onClose();
      // Reset form when closing
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      article: '',
      author: '',
      publishDate: '',
      coverImage: null,
      coverImagePreview: null,
      isPublished: false
    });
    
    setTextFormatting({
      alignment: 'left',
      isUnderlined: false,
      isPreviewMode: false
    });
    
    setInsertedImages([]);
    
    setIsEditing(false);
    setShowDeleteConfirm(false);
    setShowDropdown(false);
    setShowDatePicker(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleDateSelect = (date) => {
    const formattedDate = date.toLocaleDateString('en-GB');
    setFormData(prev => ({ ...prev, publishDate: formattedDate }));
    setShowDatePicker(false);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleTextAlignment = (alignment) => {
    setTextFormatting(prev => ({ ...prev, alignment }));
    console.log('Text alignment changed to:', alignment);
  };

  const handleUnderline = () => {
    setTextFormatting(prev => ({ ...prev, isUnderlined: !prev.isUnderlined }));
    console.log('Underline toggled:', !textFormatting.isUnderlined);
  };

  const handlePreviewMode = () => {
    setTextFormatting(prev => ({ ...prev, isPreviewMode: !prev.isPreviewMode }));
    console.log('Preview mode toggled:', !textFormatting.isPreviewMode);
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    // Add settings functionality here
  };

  const handleInsertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      console.log('Inserting link:', url);
      // Add link insertion logic here
    }
  };

  const handleInsertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        const imageId = `img_${Date.now()}`;
        
        // Add image to inserted images state
        setInsertedImages(prev => [...prev, { id: imageId, url: imageUrl, name: file.name }]);
        
        // Add a line break and image placeholder to the text
        const imagePlaceholder = `\n[IMAGE: ${file.name}]\n`;
        setFormData(prev => ({
          ...prev,
          article: prev.article + imagePlaceholder
        }));
        
        console.log('Inserting image:', file.name);
      }
    };
    input.click();
  };

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Navigation Bar */}
      <header className={`border-b ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Discover</h1>
            <nav className="flex items-center space-x-6">
              <Link to="/home" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Home</Link>
              <Link to="/discover" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Explore</Link>
              <Link to="/CreateArticle" className={`${isDarkMode ? 'text-orange-400' : 'text-orange-600'} font-medium`}>Write</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64 ${
                isDarkMode 
                  ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400' 
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
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
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-600'
            }`}>
              A
            </div>
            <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors">
              SEARCH
            </button>
          </div>
        </div>
      </header>

      {/* Main Header */}
      <div className={`px-8 py-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {isEditing ? 'Edit Article' : 'Create New Article'}
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-2 bg-midbrown text-white font-medium rounded-lg hover:bg-darkbrown transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading ? 'SAVING...' : 'SAVE'}
            </button>
            <button
              onClick={handlePublish}
              disabled={isLoading || formData.isPublished}
              className={`px-6 py-2 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 ${
                isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {isLoading ? 'PUBLISHING...' : formData.isPublished ? 'PUBLISHED' : 'PUBLISH'}
            </button>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {/* More Options Menu */}
            <div className="relative dropdown-container">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 border ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        setShowDeleteConfirm(true);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:transition-colors duration-200 ${
                        isDarkMode 
                          ? 'text-red-400 hover:bg-gray-800 hover:text-red-300' 
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                    >
                      Delete Article
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        handleClose();
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:transition-colors duration-200 ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-800' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 p-6 gap-6 overflow-hidden">
        {/* Left Column */}
        <div className="flex-1 space-y-4">
          {/* Title Section */}
          <div>
            <label className={`block text-sm font-bold mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-900'
            }`}>
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Article title"
              className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-midbrown focus:border-transparent ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-orange-50 border border-orange-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Article Section */}
          <div className="flex-1">
            <label className={`block text-sm font-bold mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-900'
            }`}>
              Article
            </label>
            <div className={`border rounded-lg h-full flex flex-col ${
              isDarkMode 
                ? 'border-gray-700 bg-gray-800' 
                : 'border-orange-200 bg-orange-50'
            }`}>
              {/* Toolbar */}
              <div className={`flex items-center space-x-2 p-2 border-b rounded-t-lg ${
                isDarkMode 
                  ? 'border-gray-700 bg-gray-900' 
                  : 'border-orange-200 bg-white'
              }`}>
                {/* Left Align */}
                <button 
                  onClick={() => handleTextAlignment('left')}
                  className={`p-1 rounded hover:transition-colors duration-200 ${
                    textFormatting.alignment === 'left' 
                      ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                      : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800')
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4h16v2H2V4zm0 4h12v2H2V8zm0 4h14v2H2v-2z"/>
                  </svg>
                </button>
                
                {/* Center Align */}
                <button 
                  onClick={() => handleTextAlignment('center')}
                  className={`p-1 rounded hover:transition-colors duration-200 ${
                    textFormatting.alignment === 'center' 
                      ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                      : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800')
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4h16v2H2V4zm2 4h12v2H4V8zm1 4h10v2H5v-2z"/>
                  </svg>
                </button>
                
                {/* Right Align */}
                <button 
                  onClick={() => handleTextAlignment('right')}
                  className={`p-1 rounded hover:transition-colors duration-200 ${
                    textFormatting.alignment === 'right' 
                      ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                      : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800')
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4h16v2H2V4zm4 4h12v2H6V8zm2 4h10v2H8v-2z"/>
                  </svg>
                </button>
                
                {/* Justify */}
                <button 
                  onClick={() => handleTextAlignment('justify')}
                  className={`p-1 rounded hover:transition-colors duration-200 ${
                    textFormatting.alignment === 'justify' 
                      ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                      : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800')
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4h16v2H2V4zm0 4h16v2H2V8zm0 4h16v2H2v-2z"/>
                  </svg>
                </button>
                
                {/* Underline */}
                <button 
                  onClick={handleUnderline}
                  className={`p-1 rounded hover:transition-colors duration-200 ${
                    textFormatting.isUnderlined 
                      ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                      : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800')
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16 9A6 6 0 1 1 4 9V1a1 1 0 1 1 2 0v8a4 4 0 1 0 8 0V1a1 1 0 1 1 2 0v8z"/>
                  </svg>
                </button>
                
                {/* Text Formatting (Tt) */}
                <button 
                  onClick={handleSettings}
                  className={`p-1 rounded hover:transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <text x="2" y="14" fontSize="12" fontWeight="bold">T</text>
                    <text x="8" y="16" fontSize="10">t</text>
                  </svg>
                </button>
                
                {/* Color Palette */}
                <button 
                  onClick={handleSettings}
                  className={`p-1 rounded hover:transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="6" cy="6" r="2" fill="red"/>
                    <circle cx="12" cy="6" r="2" fill="green"/>
                    <circle cx="18" cy="6" r="2" fill="blue"/>
                    <path d="M10 12h8v2h-8v-2z"/>
                  </svg>
                </button>
                
                {/* Link */}
                <button 
                  onClick={handleInsertLink}
                  className={`p-1 rounded hover:transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Image */}
                <button 
                  onClick={handleInsertImage}
                  className={`p-1 rounded hover:transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {/* Text Area */}
              <div className="flex-1 p-3 border-0 rounded-b-lg focus:outline-none resize-none overflow-y-auto">
                <div
                  contentEditable
                  onInput={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      article: e.target.innerText
                    }));
                  }}
                  placeholder="Write Your Article Here..."
                  className={`min-h-full outline-none ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white placeholder-gray-400' 
                      : 'bg-orange-50 text-gray-900 placeholder-gray-500'
                  }`}
                  style={{ 
                    minHeight: '200px',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {formData.article}
                </div>
                {/* Display images below the text area */}
                {insertedImages.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {insertedImages.map((image, index) => (
                      <div key={image.id} className="border-l-4 border-midbrown pl-4">
                        <img 
                          src={image.url} 
                          alt={image.name}
                          className="max-w-full h-auto rounded-lg shadow-md"
                          style={{ maxHeight: '300px' }}
                        />
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {image.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-72 space-y-4">
          {/* Author Section */}
          <div>
            <label className={`block text-sm font-bold mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-900'
            }`}>
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Your Name Goes Here..."
              className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-midbrown focus:border-transparent ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-orange-50 border border-orange-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Publish Date Section */}
          <div>
            <label className={`block text-sm font-bold mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-900'
            }`}>
              Publish Date
            </label>
            <div className="relative">
              <input
                type="text"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleInputChange}
                placeholder="dd/mm/yyyy"
                onClick={() => setShowDatePicker(!showDatePicker)}
                readOnly
                className={`w-full px-3 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-midbrown focus:border-transparent cursor-pointer ${
                  isDarkMode 
                    ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-orange-50 border border-orange-200 text-gray-900 placeholder-gray-500'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Date Picker */}
              {showDatePicker && (
                <div className="absolute top-full left-0 mt-1 z-20 date-picker-container">
                  <div className={`p-4 rounded-lg shadow-lg border ${
                    isDarkMode 
                      ? 'bg-gray-900 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <input
                      type="date"
                      value={formData.publishDate ? new Date(formData.publishDate.split('/').reverse().join('-')).toISOString().split('T')[0] : getCurrentDate()}
                      onChange={(e) => handleDateSelect(new Date(e.target.value))}
                      className={`px-3 py-2 rounded border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={() => handleDateSelect(new Date())}
                        className={`px-3 py-1 text-sm rounded ${
                          isDarkMode 
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Today
                      </button>
                      <button
                        onClick={() => setShowDatePicker(false)}
                        className={`px-3 py-1 text-sm rounded ${
                          isDarkMode 
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cover Image Section */}
          <div>
            <label className={`block text-sm font-bold mb-1 flex items-center justify-between ${
              isDarkMode ? 'text-gray-300' : 'text-gray-900'
            }`}>
              Cover Image
              <button className={`p-1 rounded hover:transition-colors duration-200 ${
                isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
              }`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </button>
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="coverImage"
              />
              <label
                htmlFor="coverImage"
                className={`block w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 overflow-hidden ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                    : 'bg-orange-50 border-orange-200 hover:border-orange-300'
                }`}
              >
                {formData.coverImagePreview ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={formData.coverImagePreview} 
                      alt="Cover preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                      <span className={`text-xs opacity-0 hover:opacity-100 transition-opacity duration-200 ${
                        isDarkMode ? 'text-white' : 'text-white'
                      }`}>Click to change image</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <svg className={`w-8 h-8 mb-1 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Add article cover or image</span>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 max-w-md w-full mx-4 border ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Delete Article</h3>
            <p className={`mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Are you sure you want to delete this article? This action cannot be undone.</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Modal */}
      {showDeleteSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-orange-50 rounded-lg p-8 max-w-md w-full mx-4 border border-orange-200">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-midbrown rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Success Title */}
              <h3 className="text-2xl font-bold text-midbrown mb-2">Article Deleted</h3>
              
              {/* Success Message */}
              <p className="text-gray-700 mb-6">The article has been successfully deleted.</p>
              
              {/* Close Button */}
              <button
                onClick={() => setShowDeleteSuccess(false)}
                className="w-full px-6 py-3 bg-midbrown text-white font-medium rounded-lg hover:bg-darkbrown transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Icon */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2">
        <button className={`p-3 rounded-lg transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-700 hover:bg-gray-600' 
            : 'bg-gray-200 hover:bg-gray-300'
        }`}>
          <svg className={`w-6 h-6 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CreateArticle; 