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
            <h1 className="text-2xl font-bold text-gray-900">StoryLoom</h1>
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
            <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors">
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
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
              A
            </div>
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

      {/* Floating Chat Icon */}
      <div className="fixed right-8 bottom-4 transform -translate-y-1/2">
        <button className={`p-3 rounded-lg transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-700 hover:bg-gray-600' 
            : 'bg-gray-200 hover:bg-gray-300'
        }`}>
          <svg className={`w-6 h-6 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 0C42.6522 0 45.1957 1.10905 47.0711 3.08316C48.9464 5.05727 50 7.73475 50 10.5266V31.5797C50 34.3715 48.9464 37.049 47.0711 39.0231C45.1957 40.9972 42.6522 42.1063 40 42.1063H28.19L16.285 49.6249C15.9265 49.8513 15.5197 49.9796 15.1019 49.9977C14.6842 50.0159 14.2687 49.9235 13.8936 49.729C13.5186 49.5345 13.1958 49.244 12.955 48.8842C12.7141 48.5244 12.5629 48.1068 12.515 47.6695L12.5 47.3695V42.1063H10C7.43439 42.1063 4.96693 41.0682 3.10797 39.2069C1.24901 37.3456 0.140781 34.8033 0.0125003 32.106L0 31.5797V10.5266C0 7.73475 1.05357 5.05727 2.92893 3.08316C4.8043 1.10905 7.34784 0 10 0H40ZM33 24.4374C32.5266 23.9489 31.8882 23.6784 31.2253 23.6853C30.5623 23.6922 29.9292 23.976 29.465 24.4743C28.8831 25.0997 28.1884 25.5966 27.4217 25.9358C26.655 26.275 25.8317 26.4497 25 26.4497C24.1683 26.4497 23.345 26.275 22.5783 25.9358C21.8116 25.5966 21.1169 25.0997 20.535 24.4743C20.0685 23.9875 19.4387 23.7135 18.7819 23.7116C18.125 23.7097 17.4939 23.98 17.0248 24.4641C16.5558 24.9481 16.2866 25.6071 16.2754 26.2984C16.2642 26.9897 16.5119 27.658 16.965 28.1586C18.0124 29.2837 19.2626 30.1775 20.6423 30.7877C22.022 31.3979 23.5035 31.7122 25 31.7122C26.4965 31.7122 27.978 31.3979 29.3577 30.7877C30.7374 30.1775 31.9876 29.2837 33.035 28.1586C33.4991 27.6602 33.7561 26.9882 33.7495 26.2904C33.743 25.5925 33.4734 24.926 33 24.4374ZM18.775 13.1582H18.75C18.087 13.1582 17.4511 13.4355 16.9822 13.929C16.5134 14.4225 16.25 15.0919 16.25 15.7898C16.25 16.4878 16.5134 17.1572 16.9822 17.6507C17.4511 18.1442 18.087 18.4215 18.75 18.4215H18.775C19.438 18.4215 20.0739 18.1442 20.5428 17.6507C21.0116 17.1572 21.275 16.4878 21.275 15.7898C21.275 15.0919 21.0116 14.4225 20.5428 13.929C20.0739 13.4355 19.438 13.1582 18.775 13.1582ZM31.275 13.1582H31.25C30.587 13.1582 29.9511 13.4355 29.4822 13.929C29.0134 14.4225 28.75 15.0919 28.75 15.7898C28.75 16.4878 29.0134 17.1572 29.4822 17.6507C29.9511 18.1442 30.587 18.4215 31.25 18.4215H31.275C31.938 18.4215 32.5739 18.1442 33.0428 17.6507C33.5116 17.1572 33.775 16.4878 33.775 15.7898C33.775 15.0919 33.5116 14.4225 33.0428 13.929C32.5739 13.4355 31.938 13.1582 31.275 13.1582Z" fill="#dd6b20"/>
          </svg>
        </button>
      </div>
      </main>
    </div>
  );
};

export default Discover; 