import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignIn from './components/SignIn';
import CreateAccount from './components/CreateAccount';
import ForgotPassword from './components/ForgotPassword';
import CreateNewPassword from './components/CreateNewPassword';
import CreateArticle from './components/CreateArticle'; 
import ExploreTopics from './components/ExploreTopics';
import Discover from './components/Discover';
import Home from './components/Home';
import Article from './components/Article';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<CreateNewPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/CreateArticle" element={<CreateArticle />} />
          <Route path="/exploreTopics" element={<ExploreTopics onClose={() => window.history.back()} />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
