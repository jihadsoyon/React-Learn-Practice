import { useState } from 'react';
import { Brain, ChevronRight, ChevronLeft, RotateCcw, Trophy, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { progressStorage } from '../utils/localStorage';

const quizzes = {
  'JavaScript Basics': {
    color: 'text-yellow-400',
    questions: [
      { q: 'Which of the following is used to declare a constant in JavaScript?', opts: ['var', 'let', 'const', 'static'], ans: 2 },
      { q: 'What does DOM stand for?', opts: ['Document Object Model', 'Data Object Management', 'Dynamic Output Model', 'Document Oriented Method'], ans: 0 },
      { q: 'Which method adds an element to the end of an array?', opts: ['push()', 'pop()', 'shift()', 'unshift()'], ans: 0 },
      { q: 'What is the output of typeof null?', opts: ['null', 'undefined', 'object', 'boolean'], ans: 2 },
      { q: 'Which symbol is used for strict equality?', opts: ['==', '===', '!=', '='], ans: 1 },
    ],
  },
  'React Basics': {
    color: 'text-blue-400',
    questions: [
      { q: 'What hook is used for component state in React?', opts: ['useEffect', 'useState', 'useContext', 'useRef'], ans: 1 },
      { q: 'What does JSX stand for?', opts: ['JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension', 'JSON XML'], ans: 0 },
      { q: 'How do you pass data to a child component?', opts: ['state', 'props', 'context', 'ref'], ans: 1 },
      { q: 'Which hook runs after every render?', opts: ['useState', 'useCallback', 'useEffect', 'useMemo'], ans: 2 },
      { q: 'What is the virtual DOM?', opts: ['A real DOM', 'A lightweight copy of the real DOM', 'A CSS engine', 'A server-side renderer'], ans: 1 },
    ],
  },
  'CSS Basics': {
    color: 'text-teal-400',
    questions: [
      { q: 'Which property changes text color in CSS?', opts: ['font-color', 'text-color', 'color', 'background-color'], ans: 2 },
      { q: 'What does `display: flex` do?', opts: ['Hides element', 'Creates a block layout', 'Creates a flex container', 'Adds animation'], ans: 2 },
      { q: 'Which unit is relative to the font size of the element?', opts: ['px', 'em', 'vh', '%'], ans: 1 },
      { q: 'What does `position: absolute` do?', opts: ['Fixes to viewport', 'Positions relative to parent', 'Removes from flow', 'Stacks on top'], ans: 1 },
      { q: 'Which selector has the highest specificity?', opts: ['element', '.class', '#id', '*'], ans: 2 },
    ],
  },
};

export default function Quiz() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft] = useState(600);

  const startQuiz = (name) => {
    setSelectedQuiz(name);
    setCurrent(0);
    setAnswers({});
    setSubmitted(false);
  };

  const pick = (idx) => {
    if (submitted) return;
    setAnswers({ ...answers, [current]: idx });
  };

  const submit = () => {
    setSubmitted(true);
    if (user) progressStorage.incrementStat(user.id, 'quizzesTaken');
  };

  const score = () => {
    if (!selectedQuiz) return 0;
    const qs = quizzes[selectedQuiz].questions;
    return qs.filter((q, i) => answers[i] === q.ans).length;
  };

  const card = `rounded-2xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`;

  if (!selectedQuiz) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Quiz & Practice</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Test your knowledge and track your progress.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(quizzes).map(([name, data]) => (
            <button
              key={name}
              onClick={() => startQuiz(name)}
              className={`text-left p-6 rounded-2xl border transition-all hover:border-violet-500/50 hover:-translate-y-0.5 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}
            >
              <div className="w-12 h-12 rounded-xl bg-violet-600/15 flex items-center justify-center mb-4">
                <Brain size={22} className="text-violet-400" />
              </div>
              <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{name} Quiz</h3>
              <p className={`text-sm ${data.color}`}>{quizzes[name].questions.length} Questions</p>
              <div className="mt-4 flex items-center gap-1 text-violet-400 text-sm font-medium">
                Start Quiz <ChevronRight size={15} />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const qs = quizzes[selectedQuiz].questions;
  const q = qs[current];
  const totalScore = score();

  if (submitted) {
    const pct = Math.round((totalScore / qs.length) * 100);
    return (
      <div className="max-w-2xl mx-auto">
        <div className={`${card} p-8 text-center`}>
          <div className="w-20 h-20 rounded-full bg-violet-600/15 flex items-center justify-center mx-auto mb-6">
            <Trophy size={36} className="text-yellow-400" />
          </div>
          <h2 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quiz Complete!</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{selectedQuiz}</p>
          <div className="text-5xl font-black text-violet-400 mb-2">{pct}%</div>
          <p className={`text-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{totalScore}/{qs.length} correct</p>

          {/* Results */}
          <div className="text-left space-y-3 mb-8">
            {qs.map((question, i) => {
              const isCorrect = answers[i] === question.ans;
              return (
                <div key={i} className={`p-3 rounded-xl text-sm ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                  <p className={`font-medium mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{isCorrect ? '✓' : '✗'} {question.q}</p>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Correct: {question.opts[question.ans]}</p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 justify-center">
            <button onClick={() => startQuiz(selectedQuiz)} className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all">
              <RotateCcw size={15} /> Retry
            </button>
            <button onClick={() => setSelectedQuiz(null)} className={`px-5 py-2.5 rounded-xl text-sm font-medium ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              All Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setSelectedQuiz(null)} className={`text-sm flex items-center gap-1 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          ← Quizzes
        </button>
        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <Clock size={14} />
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
      </div>

      <div className={`${card} p-6`}>
        {/* Progress */}
        <div className="flex items-center justify-between text-sm mb-4">
          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{selectedQuiz} Quiz</span>
          <span className="text-violet-400 font-medium">Question {current + 1} of {qs.length}</span>
        </div>
        <div className={`h-1.5 rounded-full mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="h-full bg-violet-600 rounded-full transition-all" style={{ width: `${((current + 1) / qs.length) * 100}%` }} />
        </div>

        {/* Question */}
        <h2 className={`text-base font-bold mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{q.q}</h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {q.opts.map((opt, i) => (
            <button
              key={i}
              onClick={() => pick(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                answers[current] === i
                  ? 'bg-violet-600 border-violet-600 text-white'
                  : isDark ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-violet-500/50' : 'bg-white border-gray-200 text-gray-700 hover:border-violet-400'
              }`}
            >
              <span className="mr-3">{['A', 'B', 'C', 'D'][i]}.</span>{opt}
            </button>
          ))}
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm disabled:opacity-40 ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
          >
            <ChevronLeft size={15} /> Previous
          </button>
          <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{Object.keys(answers).length}/{qs.length} answered</span>
          {current < qs.length - 1 ? (
            <button
              onClick={() => setCurrent(current + 1)}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl"
            >
              Next <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={Object.keys(answers).length < qs.length}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}