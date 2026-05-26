import { useEffect, useState } from 'react';
import { TrendingUp, BookOpen, FileText, Brain, Flame, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { progressStorage } from '../utils/localStorage';

export default function Progress() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({ topicsLearned: 0, notesCreated: 0, quizzesTaken: 0, streak: 0 });

  useEffect(() => {
    if (user) setStats(progressStorage.get(user.id));
  }, [user]);

  const card = `rounded-2xl border p-6 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`;

  const goals = [
    { label: 'Topics Learned', current: stats.topicsLearned, goal: 20, icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Notes Created', current: stats.notesCreated, goal: 10, icon: FileText, color: 'bg-green-500' },
    { label: 'Quizzes Taken', current: stats.quizzesTaken, goal: 15, icon: Brain, color: 'bg-purple-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Progress</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Track your learning journey</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Topics', value: stats.topicsLearned, icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Notes', value: stats.notesCreated, icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Quizzes', value: stats.quizzesTaken, icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Day Streak', value: stats.streak || 7, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={card}>
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Goals */}
      <div className={card}>
        <div className="flex items-center gap-2 mb-6">
          <Target size={18} className="text-violet-400" />
          <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Monthly Goals</h2>
        </div>
        <div className="space-y-5">
          {goals.map(({ label, current, goal, icon: Icon, color }) => {
            const pct = Math.min(100, Math.round((current / goal) * 100));
            return (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon size={15} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{current}/{goal}</span>
                </div>
                <div className={`h-2.5 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
                </div>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{pct}% complete</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak Calendar placeholder */}
      <div className={card}>
        <div className="flex items-center gap-2 mb-6">
          <Flame size={18} className="text-orange-400" />
          <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Study Streak</h2>
        </div>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-5xl mb-2">🔥</div>
            <p className={`text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.streak || 7}</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Day Streak</p>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mt-6">
          {Array.from({ length: 28 }, (_, i) => (
            <div
              key={i}
              className={`h-8 rounded-lg ${i < (stats.streak || 7) ? 'bg-violet-600' : isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
            />
          ))}
        </div>
        <div className={`flex justify-between text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          <span>4 weeks ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}