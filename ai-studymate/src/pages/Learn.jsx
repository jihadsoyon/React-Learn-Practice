import { useState } from 'react';
import { Search, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { progressStorage } from '../utils/localStorage';

const topics = [
  { id: 1, title: 'JavaScript Basics', desc: 'Variables, functions, loops, and core JS concepts.', tag: 'JavaScript', color: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
  { id: 2, title: 'React Fundamentals', desc: 'Components, hooks, props, state, and JSX syntax.', tag: 'React', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  { id: 3, title: 'Tailwind CSS', desc: 'Utility-first CSS for rapid UI development.', tag: 'CSS', color: 'bg-teal-500/15 text-teal-400 border-teal-500/30' },
  { id: 4, title: 'Python Fundamentals', desc: 'Data types, loops, functions, OOP in Python.', tag: 'Python', color: 'bg-green-500/15 text-green-400 border-green-500/30' },
  { id: 5, title: 'Data Structures', desc: 'Arrays, linked lists, stacks, queues, trees, graphs.', tag: 'CS', color: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  { id: 6, title: 'SQL & Databases', desc: 'Queries, joins, indexing, normalization basics.', tag: 'Database', color: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
  { id: 7, title: 'REST APIs', desc: 'HTTP methods, status codes, building RESTful services.', tag: 'Backend', color: 'bg-pink-500/15 text-pink-400 border-pink-500/30' },
  { id: 8, title: 'Git & Version Control', desc: 'Branching, merging, pull requests, GitHub workflow.', tag: 'DevOps', color: 'bg-red-500/15 text-red-400 border-red-500/30' },
];

const summaries = {
  1: `JavaScript is a versatile, high-level programming language used for web development. Key concepts include:\n\n• **Variables**: Declared with let, const, or var\n• **Functions**: Reusable blocks of code (function declarations, arrow functions)\n• **Loops**: for, while, forEach for iteration\n• **Arrays & Objects**: Core data structures\n• **DOM Manipulation**: Changing HTML/CSS with JS\n• **Async Programming**: Promises, async/await for handling asynchronous operations`,
  2: `React is a JavaScript library for building user interfaces. Core concepts:\n\n• **Components**: Reusable UI pieces (functional/class)\n• **JSX**: JavaScript XML syntax for describing UI\n• **Props**: Passing data to child components\n• **State**: useState hook for component state\n• **Effects**: useEffect for side effects\n• **Virtual DOM**: Efficient rendering engine`,
};

export default function Learn() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = topics.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.tag.toLowerCase().includes(search.toLowerCase())
  );

  const openTopic = (topic) => {
    setSelected(topic);
    if (user) progressStorage.incrementStat(user.id, 'topicsLearned');
  };

  const card = `rounded-2xl border p-5 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Learning Hub</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Explore topics and get AI-powered summaries</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search topics..."
          className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm outline-none focus:border-violet-500 transition-colors ${isDark ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
        />
      </div>

      {selected ? (
        /* Topic Detail View */
        <div className={card}>
          <button onClick={() => setSelected(null)} className={`text-sm mb-4 flex items-center gap-1 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            ← Back to Topics
          </button>
          <div className="flex items-start gap-3 mb-6">
            <BookOpen size={24} className="text-violet-400 mt-0.5" />
            <div>
              <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{selected.title}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full border mt-1 inline-block ${selected.color}`}>{selected.tag}</span>
            </div>
          </div>
          <div className={`flex items-center gap-2 mb-4 p-3 rounded-xl ${isDark ? 'bg-violet-600/10 border border-violet-500/20' : 'bg-violet-50 border border-violet-200'}`}>
            <Sparkles size={16} className="text-violet-400" />
            <span className="text-violet-400 text-sm font-medium">AI Summary</span>
          </div>
          {summaries[selected.id] ? (
            <div className={`text-sm leading-relaxed whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {summaries[selected.id]}
            </div>
          ) : (
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {selected.desc} Study this topic using the AI Chat feature for detailed explanations, examples, and practice problems.
            </p>
          )}
        </div>
      ) : (
        /* Topic Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((topic) => (
            <button
              key={topic.id}
              onClick={() => openTopic(topic)}
              className={`text-left p-5 rounded-2xl border transition-all hover:border-violet-500/50 hover:-translate-y-0.5 ${isDark ? 'bg-gray-900 border-gray-800 hover:bg-gray-800/50' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${topic.color}`}>{topic.tag}</span>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
              <h3 className={`font-bold mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{topic.title}</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{topic.desc}</p>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16">
              <BookOpen size={40} className="text-gray-500 mx-auto mb-3" />
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No topics found for "{search}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}