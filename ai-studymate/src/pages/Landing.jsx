import { Link } from 'react-router-dom';
import { GraduationCap, Brain, FileText, MessageSquare, BarChart2, BookOpen, Star, ArrowRight, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const features = [
  { icon: MessageSquare, title: 'AI Chat Assistant', desc: 'Ask anything, get instant AI-powered answers on any topic.' },
  { icon: FileText, title: 'Smart Notes', desc: 'Create, organize, and search your study notes effortlessly.' },
  { icon: Brain, title: 'Quiz & Practice', desc: 'Auto-generate quizzes to test your knowledge and progress.' },
  { icon: BarChart2, title: 'Progress Tracking', desc: 'Track topics, streaks, and stats to stay motivated.' },
  { icon: BookOpen, title: 'Learning Hub', desc: 'Explore topics and get AI summaries instantly.' },
  { icon: Star, title: 'Bookmarks', desc: 'Save and organize your favorite resources and notes.' },
];

const stats = [
  { label: 'Active Learners', value: '10K+' },
  { label: 'Study Materials', value: '500+' },
  { label: 'Satisfaction', value: '95%' },
  { label: 'AI Support', value: '24/7' },
];

export default function Landing() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} sticky top-0 z-50 backdrop-blur-md ${isDark ? 'bg-gray-950/90' : 'bg-white/90'}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg">AI <span className="text-violet-400">StudyMate</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Features', 'How it Works', 'Testimonials'].map((item) => (
            <a key={item} href="#" className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>{item}</a>
          ))}
        </div>
        <Link
          to="/register"
          className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-all"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        {/* BG glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-600/10 border border-violet-500/30 text-violet-400 text-sm mb-8">
            <Zap size={14} />
            Trusted by 1000+ Learners
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Learn Smarter<br />
            with <span className="text-violet-400">AI StudyMate</span>
          </h1>
          <p className={`text-lg mb-10 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Your all-in-one AI learning companion. Learn, take notes, practice quizzes, and grow every day.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-7 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-violet-600/30"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className={`px-7 py-3 border font-semibold rounded-xl transition-all ${isDark ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              Explore Features
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className={`max-w-3xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl border ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-black text-violet-400">{value}</p>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className={`px-6 py-20 ${isDark ? 'bg-gray-900/30' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4">Everything You Need to Learn</h2>
          <p className={`text-center mb-14 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Powerful AI-powered tools designed for modern learners
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className={`p-6 rounded-2xl border transition-all hover:border-violet-500/50 hover:-translate-y-1 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}
              >
                <div className="w-11 h-11 rounded-xl bg-violet-600/15 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-violet-400" />
                </div>
                <h3 className="font-bold text-base mb-2">{title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-4">Ready to Learn Smarter?</h2>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Join thousands of learners already using AI StudyMate.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-violet-600/30"
          >
            Start Learning Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`px-6 py-8 border-t text-center ${isDark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
        <p className="text-sm">© 2024 AI StudyMate. Built with React + Vite + Tailwind CSS.</p>
      </footer>
    </div>
  );
}