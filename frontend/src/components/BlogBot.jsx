import { useState, useRef, useEffect } from 'react';

const BlogBot = ({ isOpen, onClose, isDarkMode = false }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm BlogBot, your assistant today. How can I help you find the perfect blog today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const parseBotResponse = (response) => {
  // Expecting an object like { response: { ... } }
  // if (!response || typeof response !== "object" || !response.response) {
  //   return { type: "text", data: "Unexpected response format." };
  // }

  const { message, title, content, hashtags } = response.response;

  // Format 1: Simple message
  if (message) {
    return { type: "text", data: message };
  }

  // Format 2: Structured blog response
  if (title && content && hashtags) {
    const formatted = `Title: ${title}\n\n${content}\n\nHashtags: ${hashtags}`;
    return { type: "text", data: formatted };
  }

  return { type: "text", data: "responce not processed." };
};


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const query = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch("https://social-media-blog-0aw9.onrender.com/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      const parsed = parseBotResponse(data.response);

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: parsed.type === "structured" ? JSON.stringify(parsed.data, null, 2) : parsed.data,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Failed to fetch bot response:", err);
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
          type: 'bot',
          content: "Oops! Something went wrong while fetching the blog. Please try again.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className={`relative w-full max-w-md h-full flex flex-col ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`px-6 py-4 flex items-center justify-between border-b ${
          isDarkMode 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-orange-100 border-orange-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <svg width="97" height="89" viewBox="0 0 97 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M72.5625 59.8125C72.5625 64.6688 68.6687 68.5625 63.8125 68.5625C58.9562 68.5625 55.0625 64.6688 55.0625 59.8125C55.0625 54.9563 59 51.0625 63.8125 51.0625C68.625 51.0625 72.5625 55 72.5625 59.8125ZM33.1875 51.0625C28.375 51.0625 24.4375 55 24.4375 59.8125C24.4375 64.625 28.375 68.5625 33.1875 68.5625C38 68.5625 41.9375 64.6688 41.9375 59.8125C41.9375 54.9563 38.0438 51.0625 33.1875 51.0625ZM96.625 57.625V70.75C96.625 
                73.1563 94.6562 75.125 92.25 75.125H87.875V79.5C87.875 84.3563 83.9812 88.25 79.125 88.25H17.875C15.5544 88.25 13.3288 87.3281 11.6878 85.6872C10.0469 84.0462 9.125 81.8207 9.125 79.5V75.125H4.75C2.34375 75.125 0.375 73.1563 0.375 70.75V57.625C0.375 55.2188 2.34375 53.25 4.75 53.25H9.125C9.125 36.3188 22.8188 22.625 39.75 22.625H44.125V17.0688C41.5 15.5813 39.75 12.7375 39.75 9.5C39.75 4.6875 43.6875 0.75 48.5 0.75C53.3125 0.75
                57.25 4.6875 57.25 9.5C57.25 12.7375 55.5 15.5813 52.875 17.0688V22.625H57.25C74.1813 22.625 87.875 36.3188 87.875 53.25H92.25C94.6562 53.25 96.625 55.2188 96.625 57.625ZM87.875 62H79.125V53.25C79.125 41.175 69.325 31.375 57.25 31.375H39.75C27.675 31.375 17.875 41.175 17.875 53.25V62H9.125V66.375H17.875V79.5H79.125V66.375H87.875V62Z" fill={isDarkMode ? "white" : "black"}/>
              </svg>
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>BlogBot</h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>Your AI Blog Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-md transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-600 text-gray-300' 
                : 'hover:bg-orange-200 text-black'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'user' && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-black'
                }`}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? isDarkMode 
                      ? 'bg-gray-600 text-white' 
                      : 'bg-orange-100 text-black'
                    : isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-orange-100 text-black'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.type === 'bot' && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-2 flex-shrink-0 ${
                  isDarkMode ? 'bg-gray-500' : 'bg-gray-600'
                }`}>
                  <span className="text-white text-sm font-bold">A</span>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0 ${
                isDarkMode ? 'bg-gray-500' : 'bg-gray-600'
              }`}>
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div className={`px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-orange-100'
              }`}>
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-white' : 'bg-black'
                  }`}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-white' : 'bg-black'
                  }`} style={{ animationDelay: '0.1s' }}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-white' : 'bg-black'
                  }`} style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={`border-t p-4 ${
          isDarkMode 
            ? 'border-gray-600 bg-gray-700' 
            : 'border-gray-200 bg-orange-100'
        }`}>
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything..."
              className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              type="submit"
              className={`p-2 border rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300' 
                  : 'bg-white border-gray-300 hover:bg-gray-50 text-black'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          <p className={`text-xs mt-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Powered by AI</p>
        </div>
      </div>
    </div>
  );
};

export default BlogBot;
