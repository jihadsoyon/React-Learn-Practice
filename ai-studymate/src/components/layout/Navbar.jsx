import { useState } from 'react';
import { Menu, Sun, Moon, Bell, GraduationCap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:hidden transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Top Navbar */}
      <header className={`h-16 flex items-center justify-between px-4 lg:px-6 border-b sticky top-0 z-30 ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'}`}>
        {/* Mobile menu btn */}
        <button
          onClick={() => setSidebarOpen(true)}
          className={`lg:hidden p-2 rounded-xl ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
        >
          <Menu size={20} />
        </button>

        {/* Mobile Logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
            <GraduationCap size={14} className="text-white" />
          </div>
          <span className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
            AI <span className="text-violet-400">StudyMate</span>
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={toggle}
            className={`p-2 rounded-xl transition-all ${isDark ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className={`p-2 rounded-xl ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
            <Bell size={18} />
          </button>
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </header>
    </>
  );
}