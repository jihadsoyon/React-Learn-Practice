import { useState } from 'react';
import { User, Mail, FileText, Save, Lock, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '' });
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-violet-500 transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`;
  const card = `rounded-2xl border p-6 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Profile</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage your account information</p>
      </div>

      <div className={card}>
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-violet-600/30">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.name}</h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{user?.email}</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <User size={14} /> Full Name
            </label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <Mail size={14} /> Email
            </label>
            <input type="email" value={user?.email} disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
          </div>
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <FileText size={14} /> Bio
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Tell something about yourself..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <Lock size={14} /> Update Password
            </label>
            <input type="password" placeholder="New password (leave blank to keep current)" className={inputClass} />
          </div>

          <button
            onClick={save}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
              saved ? 'bg-green-600 text-white' : 'bg-violet-600 hover:bg-violet-700 text-white'
            }`}
          >
            {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}