import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const ExploreTopics = ({ onClose }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
        id: 1,
        title: '10 Must-Visit Destinations in 2024',
        summary: 'Discover the most breathtaking destinations that should be on your travel bucket list this year.',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
        author: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face' },
        date: '2024-01-15',
        likes: 245,
        comments: 18
      },
      {
        id: 2,
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
        id: 3,
        title: 'The Complete Guide to Mental Wellness',
        summary: 'Essential practices for maintaining good mental health in today\'s fast-paced world.',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
        author: { name: 'Dr. Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop&crop=face' },
        date: '2024-01-14',
        likes: 312,
        comments: 45
      },
      {
        id: 4,
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
        id: 5,
        title: 'AI Revolution: What\'s Next?',
        summary: 'Exploring the latest developments in artificial intelligence and their impact on society.',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
        author: { name: 'Alex Kumar', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' },
        date: '2024-01-13',
        likes: 456,
        comments: 67
      },
      {
        id: 6,
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
                <Link to="/discover" className={`${isDarkMode ? 'text-orange-400' : 'text-orange-600'} font-medium`}>Explore</Link>
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
              <div key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
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
              <Link to="/discover" className={`${isDarkMode ? 'text-orange-400' : 'text-orange-600'} font-medium`}>Explore</Link>
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

      <div className="fixed bottom-6 right-6">
        <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ExploreTopics; 