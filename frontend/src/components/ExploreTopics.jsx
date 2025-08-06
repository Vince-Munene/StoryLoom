import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import BlogBot from './BlogBot';

const ExploreTopics = ({ onClose }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [limit] = useState(10);

  const topics = [
    {
      id: 1,
      name: 'Travel',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center',
      description: 'Explore travel destinations and experiences'
    },
    {
      id: 2,
      name: 'Health',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center',
      description: 'Health and wellness articles'
    },
    {
      id: 3,
      name: 'Technology',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center',
      description: 'Latest in technology and innovation'
    },
    {
      id: 4,
      name: 'Education',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop&crop=center',
      description: 'Educational content and learning resources'
    },
    {
      id: 5,
      name: 'Economy',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
      description: 'Economic trends and financial insights'
    },
    {
      id: 6,
      name: 'Music',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
      description: 'Music industry and artist features'
    },
    {
      id: 7,
      name: 'Science',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop&crop=center',
      description: 'Scientific discoveries and research'
    },
    {
      id: 8,
      name: 'Nature',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
      description: 'Nature and environmental topics'
    }
  ];

  const mockArticles = {
    'Travel': [
      {
        _id: 1,
        title: '10 Must-Visit Destinations in 2024',
        summary: 'Discover the most breathtaking destinations that should be on your travel bucket list this year.',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
        author: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face' },
        date: '2024-01-15',
        likes: 245,
        comments: 18
      },
      {
        _id: 2,
        title: 'Budget Travel Tips for Europe',
        summary: 'How to explore Europe without breaking the bank - practical tips and tricks.',
        image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=400&h=250&fit=crop',
        author: { name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' },
        date: '2024-01-12',
        likes: 189,
        comments: 23
      }
    ],
    'Health': [
      {
        _id: 3,
        title: 'The Complete Guide to Mental Wellness',
        summary: 'Essential practices for maintaining good mental health in today\'s fast-paced world.',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
        author: { name: 'Dr. Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop&crop=face' },
        date: '2024-01-14',
        likes: 312,
        comments: 45
      },
      {
        _id: 4,
        title: 'Nutrition Myths Debunked',
        summary: 'Separating fact from fiction in the world of nutrition and healthy eating.',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop',
        author: { name: 'Lisa Thompson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face' },
        date: '2024-01-10',
        likes: 178,
        comments: 31
      }
    ],
    'Technology': [
      {
        _id: 5,
        title: 'AI Revolution: What\'s Next?',
        summary: 'Exploring the latest developments in artificial intelligence and their impact on society.',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
        author: { name: 'Alex Kumar', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' },
        date: '2024-01-13',
        likes: 456,
        comments: 67
      },
      {
        _id: 6,
        title: 'Cybersecurity in 2024',
        summary: 'The evolving landscape of digital security and how to protect yourself online.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
        author: { name: 'David Park', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face' },
        date: '2024-01-11',
        likes: 234,
        comments: 28
      }
    ]
  };

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check if a topic was passed from Discover page
  useEffect(() => {
    if (location.state?.selectedTopic) {
      const topic = topics.find(t => t.name === location.state.selectedTopic);
      if (topic) {
        handleTopicClick(topic);
      }
    }
  }, [location.state]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setCurrentPage(1);
    setArticles(mockArticles[topic.name] || []);
    setTotalPages(Math.ceil((mockArticles[topic.name] || []).length / limit));
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setArticles([]);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (selectedTopic) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToTopics}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedTopic.name} Articles</h1>
              </div>
              <nav className="flex items-center space-x-6">
                <Link to="/home" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Home</Link>
                <Link to="/discover" className={`${isDarkMode ? 'text-orange-400' : 'text-orange-600'} font-medium`}>Back To Discover</Link>
                <Link to="/CreateArticle" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Write</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
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
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-700">{article.author.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(article.date)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{article.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{article.comments}</span>
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found for {selectedTopic.name}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`border-b ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore By Topics</h1>
            <nav className="flex items-center space-x-6">
              <Link to="/home" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Home</Link>
              <Link to="/discover" className={`${isDarkMode ? 'text-orange-400' : 'text-orange-600'} font-medium`}>Back to Discover</Link>
              <Link to="/CreateArticle" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Write</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search for a topic"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64 ${
                isDarkMode 
                  ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400' 
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-orange-600 text-white font-medium rounded-r-md hover:bg-orange-700 transition-colors"
            >
              SEARCH
            </button>
            <button
              onClick={toggleDarkMode}
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
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={topic.image}
                  alt={topic.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No topics found matching "{searchQuery}"</p>
          </div>
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
          <path d="M40 0C42.6522 0 45.1957 1.10905 47.0711 3.08316C48.9464 5.05727 50 7.73475 50 10.5266V31.5797C50 34.3715 48.9464 37.049 47.0711 39.0231C45.1957 40.9972 42.6522 42.1063 40 42.1063H28.19L16.285 49.6249C15.9265 49.8513 15.5197 49.9796 15.1019 49.9977C14.6842 50.0159 14.2687 49.9235 13.8936 49.729C13.5186 49.5345 13.1958 49.244 12.955 48.8842C12.7141 48.5244 12.5629 48.1068 12.515 47.6695L12.5 47.3695V42.1063H10C7.43439 42.1063 
          4.96693 41.0682 3.10797 39.2069C1.24901 37.3456 0.140781 34.8033 0.0125003 32.106L0 31.5797V10.5266C0 7.73475 1.05357 5.05727 2.92893 3.08316C4.8043 1.10905 7.34784 0 10 0H40ZM33 24.4374C32.5266 23.9489 31.8882 23.6784 31.2253 23.6853C30.5623 23.6922 29.9292 23.976 29.465 24.4743C28.8831 25.0997 28.1884 25.5966 27.4217 25.9358C26.655 26.275 25.8317 26.4497 25 26.4497C24.1683 26.4497 23.345 26.275 22.5783 25.9358C21.8116 25.5966 21.1169 25.0997 20.535 24.4743C20.0685 23.9875 
          19.4387 23.7135 18.7819 23.7116C18.125 23.7097 17.4939 23.98 17.0248 24.4641C16.5558 24.9481 16.2866 25.6071 16.2754 26.2984C16.2642 26.9897 16.5119 27.658 16.965 28.1586C18.0124 29.2837 19.2626 30.1775 20.6423 30.7877C22.022 31.3979 23.5035 31.7122 25 31.7122C26.4965 31.7122 27.978 31.3979 29.3577 30.7877C30.7374 30.1775 31.9876 29.2837 33.035 28.1586C33.4991 27.6602 33.7561 26.9882 33.7495 26.2904C33.743 25.5925 33.4734 24.926 33 24.4374ZM18.775 13.1582H18.75C18.087 13.1582 
          17.4511 13.4355 16.9822 13.929C16.5134 14.4225 16.25 15.0919 16.25 15.7898C16.25 16.4878 16.5134 17.1572 
          16.9822 17.6507C17.4511 18.1442 18.087 18.4215 18.75 18.4215H18.775C19.438 18.4215 20.0739 18.1442 20.5428 17.6507C21.0116 17.1572 21.275 16.4878 21.275 15.7898C21.275 15.0919 21.0116 14.4225 20.5428 13.929C20.0739 13.4355 19.438 13.1582 18.775 13.1582ZM31.275 
          13.1582H31.25C30.587 13.1582 29.9511 13.4355 29.4822 13.929C29.0134 14.4225 28.75 15.0919 28.75 15.7898C28.75 16.4878 29.0134 17.1572 29.4822 17.6507C29.9511 18.1442 30.587 18.4215 31.25 18.4215H31.275C31.938 18.4215 32.5739 18.1442 33.0428 17.6507C33.5116 17.1572 33.775 16.4878 33.775 15.7898C33.775 15.0919 33.5116 14.4225 33.0428 13.929C32.5739 13.4355 31.938 13.1582 31.275 13.1582Z" fill="#dd6b20"/>
          </svg>
        </button>
      </div>
      
      {/* BlogBot Chat Panel */}
      <BlogBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default ExploreTopics; 