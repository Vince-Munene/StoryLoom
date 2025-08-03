import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Discover = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const recommendations = [
    {
      id: 1,
      title: 'Fitness Motivation',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
      category: 'Health & Fitness'
    },
    {
      id: 2,
      title: 'Tropical Paradise',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop&crop=center',
      category: 'Travel'
    }
  ];

  const topicCategories = [
    {
      id: 1,
      name: 'Health',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: 2,
      name: 'Travel',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: 3,
      name: 'Technology',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: 4,
      name: 'Education',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=200&fit=crop&crop=center'
    }
  ];

  const handleExploreTopics = (topicName) => {
    navigate('/ExploreTopics', { state: { selectedTopic: topicName } });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
            <nav className="flex items-center space-x-6">
              <Link to="/home" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <Link to="/discover" className="text-orange-600 font-medium">Explore</Link>
              <Link to="/CreateArticle" className="text-gray-600 hover:text-gray-900 transition-colors">Write</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
            />
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
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
              A
            </div>
            <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors">
              SEARCH
            </button>
          </div>
        </div>
      </header>

      <section className="relative h-96 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&crop=center"
            alt="Hero background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-4">Welcome To Discover</h2>
            <p className="text-lg text-white opacity-90">
              Your daily source for insightful articles, trending topics, and inspiring authors. Start exploring below.
            </p>
          </div>
        </div>
      </section>

      <main className="px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((item) => (
                <div key={item.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore by topics</h3>
              <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center">
                <span className="text-orange-600 text-sm">😊</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {topicCategories.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => handleExploreTopics(topic.name)}
                  className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={topic.image}
                      alt={topic.name}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className={`text-sm font-semibold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{topic.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Discover; 