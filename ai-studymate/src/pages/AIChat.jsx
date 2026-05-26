import { useState, useRef, useEffect } from 'react';
import { Send, Plus, Bot, User, Sparkles, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { chatStorage } from '../utils/localStorage';


export default function AIChat() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (user) {
      const history = chatStorage.getHistory(user.id);
      setMessages(history);
    }
  }, [user]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
  if (!input.trim() || loading) return;

  const userMsg = { role: 'user', content: input };
  const updated = chatStorage.addMessage(user.id, userMsg);
  setMessages([...updated]);
  setInput('');
  setLoading(true);

  try {
    const history = updated.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'CHATBOT' : 'USER',
      message: m.content,
    }));

    const response = await fetch('https://api.cohere.com/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer KdFxzfKLw0Y0fY73A8UM6voUQdmj8fo4QHEvx6ns'
        'Authorization': `Bearer ${import.meta.env.VITE_COHERE_KEY}`,
      },
      body: JSON.stringify({
        message: input,
        chat_history: history,
        preamble: 'You are AI StudyMate, a helpful AI learning assistant. Help students learn topics clearly with examples. Keep responses concise and educational.',
      }),
    });

    const data = await response.json();
    const reply = data.text || 'Sorry, could not respond.';
    const aiMsg = { role: 'assistant', content: reply };
    const final = chatStorage.addMessage(user.id, aiMsg);
    setMessages([...final]);
  } catch (err) {
    console.error(err);
    const errMsg = { role: 'assistant', content: 'Connection error. Please try again.' };
    const final = chatStorage.addMessage(user.id, errMsg);
    setMessages([...final]);
  }

  setLoading(false);
};

  const clearChat = () => {
    chatStorage.clearHistory(user.id);
    setMessages([]);
  };

  const suggestions = [
    'What is React?',
    'Explain useState hook',
    'Difference between var, let, const',
    'How does async/await work?',
  ];

  const card = `rounded-2xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`;

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>AI Chat</h1>
          <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Ask anything. Get instant AI-powered answers.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={clearChat} className={`p-2.5 rounded-xl transition-all ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`} title="Clear chat">
            <Trash2 size={17} />
          </button>
          <button onClick={clearChat} className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <Plus size={15} />
            New Chat
          </button>
        </div>
      </div>

      <div className={`${card} flex-1 flex flex-col overflow-hidden`}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <div className="w-16 h-16 rounded-2xl bg-violet-600/15 flex items-center justify-center mb-4">
                <Sparkles size={30} className="text-violet-400" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>How can I help you learn?</h3>
              <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Ask me anything about any topic!</p>
              <div className="grid grid-cols-2 gap-2 max-w-md">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => setInput(s)} className={`text-left px-3 py-2.5 rounded-xl text-sm border transition-all hover:border-violet-500/50 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-violet-600' : isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {msg.role === 'user' ? <User size={15} className="text-white" /> : <Bot size={15} className="text-violet-400" />}
                </div>
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-violet-600 text-white rounded-tr-sm' : isDark ? 'bg-gray-800 text-gray-200 rounded-tl-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex gap-3">
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <Bot size={15} className="text-violet-400" />
              </div>
              <div className={`px-4 py-3 rounded-2xl rounded-tl-sm ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className="flex gap-1.5 items-center h-4">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className={`p-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask anything..."
              className={`flex-1 px-4 py-3 rounded-xl border text-sm outline-none focus:border-violet-500 transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-12 h-12 flex items-center justify-center bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all"
            >
              <Send size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}