import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedLayout from './components/layout/ProtectedLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Notes from './pages/Notes';
import Quiz from './pages/Quiz';
import AIChat from './pages/AIChat';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Progress from './pages/Progress';
import Bookmarks from './pages/Bookmarks';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected */}
            <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
            <Route path="/learn" element={<ProtectedLayout><Learn /></ProtectedLayout>} />
            <Route path="/notes" element={<ProtectedLayout><Notes /></ProtectedLayout>} />
            <Route path="/quiz" element={<ProtectedLayout><Quiz /></ProtectedLayout>} />
            <Route path="/ai-chat" element={<ProtectedLayout><AIChat /></ProtectedLayout>} />
            <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
            <Route path="/settings" element={<ProtectedLayout><Settings /></ProtectedLayout>} />
            <Route path="/progress" element={<ProtectedLayout><Progress /></ProtectedLayout>} />
            <Route path="/bookmarks" element={<ProtectedLayout><Bookmarks /></ProtectedLayout>} />

            {/* Fallback */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;