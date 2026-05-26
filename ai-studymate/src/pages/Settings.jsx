import { Sun, Moon, Bell, Shield, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/localStorage';

export default function Settings() {
  const { isDark, toggle, theme } = useTheme();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const clearAllData = () => {
    if (window.confirm('This will delete all your notes, chat history, and progress. Are you sure?')) {
      storage.clear();
      logout();
      navigate('/');
    }
  };

  const card = `rounded-2xl border p-6 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`;
  const row = `flex items-center justify-between py-3 border-b last:border-0 ${isDark ? 'border-gray-800' : 'border-gray-100'}`;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Customize your experience</p>
      </div>

      {/* Appearance */}
      <div className={card}>
        <h2 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Sun size={16} className="text-yellow-400" /> Appearance
        </h2>
        <div className={row}>
          <div>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Theme</p>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Switch between dark and light mode</p>
          </div>
          <button
            onClick={toggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {isDark ? <Moon size={14} /> : <Sun size={14} />}
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className={card}>
        <h2 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Bell size={16} className="text-blue-400" /> Notifications
        </h2>
        {[
          { label: 'Daily Reminders', desc: 'Get reminded to study every day' },
          { label: 'Quiz Results', desc: 'Notifications when quiz is graded' },
          { label: 'Progress Updates', desc: 'Weekly progress summary' },
        ].map(({ label, desc }) => (
          <div key={label} className={row}>
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{label}</p>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{desc}</p>
            </div>
            <button className="w-11 h-6 rounded-full bg-violet-600 relative transition-all">
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </button>
          </div>
        ))}
      </div>

      {/* Account */}
      <div className={card}>
        <h2 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Shield size={16} className="text-green-400" /> Account
        </h2>
        <div className={row}>
          <div>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Account Email</p>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{user?.email}</p>
          </div>
        </div>
        <div className="pt-4">
          <button
            onClick={clearAllData}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-xl transition-all border border-red-500/20"
          >
            <Trash2 size={15} />
            Clear All Data & Reset Account
          </button>
        </div>
      </div>
    </div>
  );
}