import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit3, Save, X, FileText, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { notesStorage, progressStorage } from '../utils/localStorage';

const tagColors = {
  React: 'bg-blue-500/15 text-blue-400', JavaScript: 'bg-yellow-500/15 text-yellow-400',
  CSS: 'bg-teal-500/15 text-teal-400', General: 'bg-gray-500/15 text-gray-400',
  Python: 'bg-green-500/15 text-green-400', Other: 'bg-purple-500/15 text-purple-400',
};

const TAGS = ['General', 'JavaScript', 'React', 'CSS', 'Python', 'Other'];

export default function Notes() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All Tags');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', tag: 'General' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) setNotes(notesStorage.getAll(user.id));
  }, [user]);

  const save = () => {
    if (!form.title.trim()) return;
    const note = editing ? { ...editing, ...form } : { ...form };
    const updated = notesStorage.save(user.id, note);
    setNotes(updated);
    if (!editing) progressStorage.incrementStat(user.id, 'notesCreated');
    resetForm();
  };

  const del = (id) => {
    const updated = notesStorage.delete(user.id, id);
    setNotes(updated);
  };

  const openEdit = (note) => {
    setEditing(note);
    setForm({ title: note.title, content: note.content, tag: note.tag || 'General' });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ title: '', content: '', tag: 'General' });
    setShowForm(false);
  };

  const filtered = notes.filter((n) => {
    const matchSearch = n.title?.toLowerCase().includes(search.toLowerCase()) || n.content?.toLowerCase().includes(search.toLowerCase());
    const matchTag = filter === 'All Tags' || n.tag === filter;
    return matchSearch && matchTag;
  });

  const card = `rounded-2xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>My Notes</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Organize and manage your notes</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-all"
        >
          <Plus size={16} />
          New Note
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-52">
          <Search size={15} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:border-violet-500 ${isDark ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`px-3 py-2.5 rounded-xl border text-sm outline-none ${isDark ? 'bg-gray-900 border-gray-800 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
        >
          <option>All Tags</option>
          {TAGS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Note Form Modal */}
      {showForm && (
        <div className={`${card} p-5`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{editing ? 'Edit Note' : 'New Note'}</h2>
            <button onClick={resetForm} className="text-gray-500 hover:text-gray-300"><X size={18} /></button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Note title..."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-violet-500 ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
            />
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Write your note..."
              rows={6}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-violet-500 resize-none ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
            />
            <div className="flex items-center gap-3">
              <Tag size={15} className="text-gray-500" />
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setForm({ ...form, tag: t })}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${form.tag === t ? 'bg-violet-600 text-white' : isDark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={save}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-all"
              >
                <Save size={15} />
                {editing ? 'Update' : 'Save'} Note
              </button>
              <button onClick={resetForm} className={`px-4 py-2 text-sm rounded-xl ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <FileText size={40} className="text-gray-500 mx-auto mb-3" />
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{notes.length === 0 ? 'No notes yet. Create your first note!' : 'No notes match your search.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((note) => (
            <div key={note.id} className={`${card} p-5 flex flex-col`}>
              <div className="flex items-start justify-between mb-2">
                <h3 className={`font-bold text-sm flex-1 mr-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{note.title}</h3>
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(note)} className="p-1.5 rounded-lg text-gray-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all">
                    <Edit3 size={13} />
                  </button>
                  <button onClick={() => del(note.id)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full w-fit mb-3 ${tagColors[note.tag] || tagColors.General}`}>{note.tag}</span>
              <p className={`text-sm flex-1 line-clamp-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{note.content}</p>
              <p className={`text-xs mt-3 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}