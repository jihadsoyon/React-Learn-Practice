import { useState, useEffect } from 'react';
import { Bookmark, Plus, Trash2, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { storage, KEYS } from '../utils/localStorage';

export default function Bookmarks() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [bookmarks, setBookmarks] = useState([]);
  const [form, setForm] = useState({ title: '', url: '', note: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const all = storage.get(KEYS.BOOKMARKS) || {};
    setBookmarks(all[user?.id] || []);
  }, [user]);

  const save = () => {
    if (!form.title || !form.url) return;
    const all = storage.get(KEYS.BOOKMARKS) || {};
    const userBm = all[user.id] || [];
    userBm.unshift({ ...form, id: Date.now(), createdAt: new Date().toISOString() });
    all[user.id] = userBm;
    storage.set(KEYS.BOOKMARKS, all);
    setBookmarks(userBm);
    setForm({ title: '', url: '', note: '' });
    setShowForm(false);
  };

  const del = (id) => {
    const all = storage.get(KEYS.BOOKMARKS) || {};
    all[user.id] = (all[user.id] || []).filter((b) => b.id !== id);
    storage.set(KEYS.BOOKMARKS, all);
    setBookmarks(all[user.id]);
  };

  const card = `rounded-2xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`;
  const inputClass = `w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-violet-500 ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Bookmarks</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Save and organize your resources</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl"
        >
          <Plus size={15} /> Add Bookmark
        </button>
      </div>

      {showForm && (
        <div className={`${card} p-5 space-y-3`}>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className={inputClass} />
          <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="URL (https://...)" className={inputClass} />
          <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Note (optional)" className={inputClass} />
          <div className="flex gap-2">
            <button onClick={save} className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl">Save</button>
            <button onClick={() => setShowForm(false)} className={`px-4 py-2 text-sm rounded-xl ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>Cancel</button>
          </div>
        </div>
      )}

      {bookmarks.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark size={40} className="text-gray-500 mx-auto mb-3" />
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No bookmarks yet. Save your first resource!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((bm) => (
            <div key={bm.id} className={`${card} p-4 flex items-start gap-3`}>
              <div className="w-9 h-9 rounded-xl bg-violet-600/15 flex items-center justify-center flex-shrink-0">
                <LinkIcon size={15} className="text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{bm.title}</h3>
                <a href={bm.url} target="_blank" rel="noreferrer" className="text-violet-400 text-xs hover:underline truncate block">{bm.url}</a>
                {bm.note && <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{bm.note}</p>}
              </div>
              <div className="flex gap-1.5">
                <a href={bm.url} target="_blank" rel="noreferrer" className="p-1.5 text-gray-500 hover:text-violet-400">
                  <ExternalLink size={13} />
                </a>
                <button onClick={() => del(bm.id)} className="p-1.5 text-gray-500 hover:text-red-400">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}