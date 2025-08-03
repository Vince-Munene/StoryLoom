import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import CreateArticle from './components/CreateArticle'; 
import ExploreTopics from './components/ExploreTopics';
import Discover from './components/Discover';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/CreateArticle" element={<CreateArticle />} />
        <Route path="/ExploreTopics" element={<ExploreTopics onClose={() => window.history.back()} />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
