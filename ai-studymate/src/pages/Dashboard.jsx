import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Brain, Flame, TrendingUp, MessageSquare, ArrowRight, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { progressStorage, notesStorage } from '../utils/localStorage';

const courses = [
  { title: 'JavaScript Basics', progress: 75, color: 'bg-yellow-500' },
  { title: 'React Fundamentals', progress: 71, color: 'bg-blue-500' },
  { title: 'Tailwind CSS', progress: 72, color: 'bg-teal-500' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({ topicsLearned: 0, notesCreated: 0, quizzesTaken: 0, streak: 0 });
  const [recentNotes, setRecentNotes] = useState([]);

  useEffect(() => {
    if (user) {
      const p = progressStorage.get(user.id);
      setStats(p);
      const notes = notesStorage.getAll(user.id).slice(0, 3);
      setRecentNotes(notes);
    }
  }, [user]);

  const statCards = [
    { label: 'Topics Learned', value: stats.topicsLearned, icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Notes Created', value: stats.notesCreated, icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Quizzes Taken', value: stats.quizzesTaken, icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Day Streak', value: stats.streak || 7, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  ];

  const card = `rounded-2xl border p-5 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Let's continue your learning journey.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={card}>
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className={`lg:col-span-2 ${card}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Continue Learning</h2>
            <Link to="/learn" className="text-violet-400 text-sm hover:text-violet-300 flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {courses.map(({ title, progress, color }) => (
              <div key={title}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{title}</span>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{progress}% Complete</span>
                </div>
                <div className={`h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <div
                    className={`h-full rounded-full ${color} transition-all duration-700`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Card */}
        <div className={card}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Study Streak</h2>
            <Flame size={18} className="text-orange-400" />
          </div>
          <div className="text-center py-6">
            <div className="text-6xl mb-2">🔥</div>
            <p className={`text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.streak || 7}</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Days</p>
            <p className={`text-xs mt-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Keep it up! 🎯</p>
          </div>
        </div>
      </div>

      {/* Recent Notes */}
      <div className={card}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Notes</h2>
          <Link to="/notes" className="text-violet-400 text-sm hover:text-violet-300 flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        {recentNotes.length === 0 ? (
          <div className="text-center py-8">
            <FileText size={32} className="text-gray-500 mx-auto mb-3" />
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No notes yet. Start taking notes!</p>
            <Link to="/notes" className="inline-block mt-3 text-violet-400 text-sm hover:underline">Create your first note</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentNotes.map((note) => (
              <div key={note.id} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} transition-colors cursor-pointer`}>
                <div className="w-8 h-8 rounded-lg bg-violet-600/15 flex items-center justify-center flex-shrink-0">
                  <FileText size={14} className="text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{note.title}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`} >
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Clock size={13} className="text-gray-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Ask AI', icon: MessageSquare, to: '/ai-chat', color: 'from-violet-600 to-violet-700' },
          { label: 'New Note', icon: FileText, to: '/notes', color: 'from-blue-600 to-blue-700' },
          { label: 'Take Quiz', icon: Brain, to: '/quiz', color: 'from-purple-600 to-purple-700' },
          { label: 'Learn', icon: TrendingUp, to: '/learn', color: 'from-emerald-600 to-emerald-700' },
        ].map(({ label, icon: Icon, to, color }) => (
          <Link
            key={label}
            to={to}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br ${color} text-white hover:opacity-90 transition-all hover:scale-[1.02]`}
          >
            <Icon size={22} />
            <span className="text-sm font-semibold">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}