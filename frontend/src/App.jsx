import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

// Public Route Component (redirects to home if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (user) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute><SignIn /></PublicRoute>} />
      <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><CreateAccount /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/reset-password/:token" element={<PublicRoute><CreateNewPassword /></PublicRoute>} />
      
      {/* Protected Routes */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/CreateArticle" element={<ProtectedRoute><CreateArticle /></ProtectedRoute>} />
      <Route path="/exploreTopics" element={<ProtectedRoute><ExploreTopics onClose={() => window.history.back()} /></ProtectedRoute>} />
      <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
      <Route path="/article/:id" element={<ProtectedRoute><Article /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
