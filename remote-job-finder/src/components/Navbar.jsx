import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase, Bookmark, Home, Moon, Sun, Menu, X, LogOut, ChevronDown, Sparkles, BarChart2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useJob } from "../context/JobContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, setDarkMode, bookmarks } = useJob();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/jobs", label: "Find Jobs", icon: Briefcase },
    { to: "/ai-match", label: "AI Match", icon: Sparkles, badge: null, isNew: true },
    // ✅ NEW: Insights link যোগ করা হয়েছে
    { to: "/insights", label: "Insights", icon: BarChart2, isNew: true },
    { to: "/bookmarks", label: "Saved", icon: Bookmark, badge: bookmarks.length },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-dark-900/90 backdrop-blur-xl shadow-sm border-b border-gray-100 dark:border-dark-700"
          : "bg-white dark:bg-dark-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <div>
              <span className="font-display font-bold text-gray-900 dark:text-white text-lg leading-none">
                Remotely<span className="text-primary-500">.</span>
              </span>
              <p className="text-xs text-gray-400 leading-none">Remote job hubs</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon, badge, isNew }) => (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === to
                    ? "bg-primary-500 text-white shadow-md"
                    : to === "/ai-match" && location.pathname !== to
                    ? "text-primary-500 hover:bg-gray-100 dark:hover:bg-dark-700"
                    : to === "/insights" && location.pathname !== to
                    ? "text-violet-400 hover:bg-gray-100 dark:hover:bg-dark-700"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon size={16} />
                {label}
                {/* NEW badge — AI Match ও Insights দুটোতেই */}
                {isNew && location.pathname !== to && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                    to === "/insights"
                      ? "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400"
                      : "bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400"
                  }`}>
                    NEW
                  </span>
                )}
                {/* Bookmark count badge */}
                {badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 transition-all"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-100 dark:border-dark-700 py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-dark-700 mb-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut size={15} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn-ghost text-sm py-2 px-4">Sign in</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Sign up</Link>
              </div>
            )}

            <button
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-900 border-t border-gray-100 dark:border-dark-700 px-4 py-3 space-y-1 animate-slide-up">
          {navLinks.map(({ to, label, icon: Icon, badge, isNew }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === to
                  ? "bg-primary-500 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-700"
              }`}
            >
              <Icon size={18} />
              {label}
              {isNew && location.pathname !== to && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                  to === "/insights"
                    ? "bg-violet-100 text-violet-600"
                    : "bg-primary-100 text-primary-600"
                }`}>
                  NEW
                </span>
              )}
              {badge > 0 && (
                <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          ))}
          {!user && (
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="flex-1 text-center btn-ghost text-sm py-2">Sign in</Link>
              <Link to="/register" className="flex-1 text-center btn-primary text-sm py-2">Sign up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;