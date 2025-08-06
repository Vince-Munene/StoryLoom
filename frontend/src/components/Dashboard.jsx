import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BlogBot from './BlogBot';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const recentArticles = [
    {
      _id: 1,
      title: "How to improve blood flow",
      image: "https://images.unsplash.com/photo-1599585795426-3390ee964f96?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: "Dr. napoleon",
      time: "5 min ago",
      likes: 24,
      comments: 8
    },
    {
      _id: 2,
      title: "How to become an expert artist",
      image: "https://images.unsplash.com/photo-1650783756107-739513b38177?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: "carmelasan",
      time: "1 min ago",
      likes: 18,
      comments: 5
    },
    {
      _id: 3,
      title: "Can I really go Hogwarts to learn magic?",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop",
      author: "silo lavender",
      time: "5 min ago",
      likes: 156,
      comments: 23
    }
  ];

  const myArticles = [
    {
      _id: 1,
      title: "Strategies to Increase Your Sales by 50%",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      author: "ali",
      time: "1 min ago",
      likes: 45,
      comments: 12
    },
    {
      _id: 2,
      title: "Most Disappointing Final Bosses in Gaming History",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
      author: "ali",
      time: "1 min ago",
      likes: 78,
      comments: 19
    }
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleClose = () => {
    navigate('/home');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>StoryLoom</h1>
          <button
            onClick={handleClose}
            className={`p-2 rounded-md transition-colors ${
              isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      <main className="px-6 py-8">
        {/* Hero Banner */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1599585795426-3390ee964f96?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Writer at desk"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Learn how to become a great writer</h2>
                <button className="px-6 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-gray-900 transition-colors">
                  READ MORE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Articles Section */}
        <div className="max-w-7xl mx-auto mb-8 sm:mb-12 px-4 sm:px-6">
          <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {recentArticles.map((article) => (
              <div
                key={article._id}
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className={`font-semibold mb-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{article.author}</span>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{article.time}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{article.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{article.comments}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Articles Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {myArticles.map((article) => (
              <div
                key={article._id}
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className={`font-semibold mb-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{article.author}</span>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{article.time}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{article.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{article.comments}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

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
          <path d="M40 0C42.6522 0 45.1957 1.10905 47.0711 3.08316C48.9464 5.05727 50 7.73475 50 10.5266V31.5797C50 34.3715 48.9464 37.049 47.0711 39.0231C45.1957 40.9972 42.6522 42.1063 40 42.1063H28.19L16.285 49.6249C15.9265 49.8513 15.5197 49.9796 15.1019 49.9977C14.6842 50.0159 14.2687 49.9235 13.8936 49.729C13.5186 49.5345 13.1958 49.244 12.955 48.8842C12.7141 48.5244 12.5629 48.1068 12.515 47.6695L12.5 47.3695V42.1063H10C7.43439 42.1063 4.96693 41.0682 3.10797 39.2069C1.24901 37.3456 0.140781 34.8033 0.0125003 32.106L0 31.5797V10.5266C0 7.73475 1.05357 5.05727 2.92893 3.08316C4.8043 1.10905 7.34784 0 10 0H40ZM33 24.4374C32.5266 23.9489 31.8882 23.6784 31.2253 23.6853C30.5623 23.6922 29.9292 23.976 29.465 24.4743C28.8831 25.0997 28.1884 25.5966 27.4217 25.9358C26.655 26.275 25.8317 26.4497 25 26.4497C24.1683 26.4497 23.345 26.275 22.5783 25.9358C21.8116 25.5966 21.1169 25.0997 20.535 24.4743C20.0685 23.9875 19.4387 23.7135 18.7819 23.7116C18.125 23.7097 17.4939 23.98 17.0248 24.4641C16.5558 24.9481 16.2866 25.6071 16.2754 26.2984C16.2642 26.9897 16.5119 27.658 16.965 28.1586C18.0124 29.2837 19.2626 30.1775 20.6423 30.7877C22.022 31.3979 23.5035 31.7122 25 31.7122C26.4965 31.7122 27.978 31.3979 29.3577 30.7877C30.7374 30.1775 31.9876 29.2837 33.035 28.1586C33.4991 27.6602 33.7561 26.9882 33.7495 26.2904C33.743 25.5925 33.4734 24.926 33 24.4374ZM18.775 13.1582H18.75C18.087 13.1582 17.4511 13.4355 16.9822 13.929C16.5134 14.4225 16.25 15.0919 16.25 15.7898C16.25 16.4878 16.5134 17.1572 16.9822 17.6507C17.4511 18.1442 18.087 18.4215 18.75 18.4215H18.775C19.438 18.4215 20.0739 18.1442 20.5428 17.6507C21.0116 17.1572 21.275 16.4878 21.275 15.7898C21.275 15.0919 21.0116 14.4225 20.5428 13.929C20.0739 13.4355 19.438 13.1582 18.775 13.1582ZM31.275 13.1582H31.25C30.587 13.1582 29.9511 13.4355 29.4822 13.929C29.0134 14.4225 28.75 15.0919 28.75 15.7898C28.75 16.4878 29.0134 17.1572 29.4822 17.6507C29.9511 18.1442 30.587 18.4215 31.25 18.4215H31.275C31.938 18.4215 32.5739 18.1442 33.0428 17.6507C33.5116 17.1572 33.775 16.4878 33.775 15.7898C33.775 15.0919 33.5116 14.4225 33.0428 13.929C32.5739 13.4355 31.938 13.1582 31.275 13.1582Z" fill="#dd6b20"/>
          </svg>
        </button>
      </div>
      
      {/* BlogBot Chat Panel */}
      <BlogBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Dashboard; 