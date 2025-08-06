import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

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

const ProfilePictureUpload = ({ onClose, onUpdate }) => {
  const { user, updateProfile } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file.name, file.type, file.size);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setError('');

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Convert file to base64 for storage (in a real app, you'd upload to a server)
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;
        
        // Update user profile with new avatar
        console.log('Updating profile with avatar...');
        try {
          const result = await updateProfile({
            avatar: base64Image
          });
          console.log('Profile update result:', result);

          if (result.success) {
            onUpdate(base64Image);
            onClose();
          } else {
            setError(result.error || 'Failed to update profile picture');
          }
        } catch (error) {
          console.error('Profile update error:', error);
          setError(error.message || 'Failed to update profile picture');
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    setIsUploading(true);
    try {
      console.log('Removing profile picture...');
      // Send empty string to reset to default avatar
      const result = await updateProfile({
        avatar: '' // Reset to default avatar
      });
      console.log('Remove result:', result);

      if (result.success) {
        setPreviewUrl('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
        setSelectedFile(null);
                  onUpdate('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
      } else {
        setError(result.error || 'Failed to remove profile picture');
      }
    } catch (error) {
      console.error('Remove error:', error);
      setError(error.message || 'Failed to remove profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {user?.avatar && user.avatar !== 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' 
              ? 'Update Profile Picture' 
              : 'Add Profile Picture'
            }
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Preview */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={getAvatarUrl(previewUrl)}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              onError={(e) => {
                // Fallback to default avatar if image fails to load
                e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
              }}
            />
            {selectedFile && (
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={triggerFileInput}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Choose Image
          </button>

          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload Picture'}
            </button>
          )}

          {user?.avatar && user.avatar !== 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' && (
            <button
              onClick={handleRemove}
              disabled={isUploading}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isUploading ? 'Removing...' : 'Remove Picture'}
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* File Info */}
        {selectedFile && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">
              <strong>Selected:</strong> {selectedFile.name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureUpload; 