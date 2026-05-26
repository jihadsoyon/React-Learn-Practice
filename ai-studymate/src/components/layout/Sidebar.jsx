import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, MessageSquare, FileText,
  Brain, Bookmark, TrendingUp, User, Settings, LogOut, GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/learn', icon: BookOpen, label: 'Learn' },
  { to: '/ai-chat', icon: MessageSquare, label: 'AI Chat' },
  { to: '/notes', icon: FileText, label: 'Notes' },
  { to: '/quiz', icon: Brain, label: 'Quizzes' },
  { to: '/bookmarks', icon: Bookmark, label: 'Bookmarks' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={`flex flex-col h-full w-64 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-r`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
        <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
          <GraduationCap size={20} className="text-white" />
        </div>
        <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
          AI <span className="text-violet-400">StudyMate</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                  : isDark
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className={`p-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className={`flex items-center gap-3 px-3 py-2 rounded-xl mb-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.name}</p>
            <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 w-full transition-all"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}