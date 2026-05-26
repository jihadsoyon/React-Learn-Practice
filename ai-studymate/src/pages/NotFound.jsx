import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function NotFound() {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center text-center px-4 ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="text-8xl font-black text-violet-600 mb-4">404</div>
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all">
        Go Home
      </Link>
    </div>
  );
}