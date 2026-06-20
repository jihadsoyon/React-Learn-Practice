import { useState, useEffect, useRef } from 'react';
import { eventToCombo, comboToDisplay } from '../utils/keyUtils';
import { X, Keyboard } from 'lucide-react';

const ACTIONS = [
  { value: 'alert', label: 'Show Alert' },
  { value: 'scrollTop', label: 'Scroll to Top' },
  { value: 'scrollBottom', label: 'Scroll to Bottom' },
  { value: 'console', label: 'Log to Console' },
  { value: 'reload', label: 'Reload Page' },
];

export default function ShortcutForm({ initialData, onSave, onClose }) {
  const [name, setName] = useState(initialData?.name || '');
  const [combo, setCombo] = useState(initialData?.combo || '');
  const [action, setAction] = useState(initialData?.action || 'alert');
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState('');
  const captureRef = useRef(null);

  useEffect(() => {
    if (!isCapturing) return;

    function handleCapture(e) {
      e.preventDefault();
      const newCombo = eventToCombo(e);
      if (newCombo) setCombo(newCombo);
    }

    window.addEventListener('keydown', handleCapture);
    return () => window.removeEventListener('keydown', handleCapture);
  }, [isCapturing]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return setError('Name is required');
    if (!combo) return setError('Please capture a key combo');

    onSave({
      id: initialData?.id || crypto.randomUUID(),
      name: name.trim(),
      combo,
      action,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Keyboard size={20} className="text-primary" />
            {initialData ? 'Edit Shortcut' : 'New Shortcut'}
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-text transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-text-muted mb-1 block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Open Search"
              className="w-full bg-bg border border-border rounded-lg px-3 py-2 outline-none focus:border-primary transition"
            />
          </div>

          <div>
            <label className="text-sm text-text-muted mb-1 block">Key Combo</label>
            <button
              type="button"
              onClick={() => setIsCapturing(true)}
              onBlur={() => setIsCapturing(false)}
              className={`w-full border rounded-lg px-3 py-2 text-left transition ${
                isCapturing
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-bg text-text'
              }`}
            >
              {isCapturing
                ? 'Press keys now...'
                : combo
                ? comboToDisplay(combo)
                : 'Click to capture shortcut'}
            </button>
          </div>

          <div>
            <label className="text-sm text-text-muted mb-1 block">Action</label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg px-3 py-2 outline-none focus:border-primary transition"
            >
              {ACTIONS.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-danger text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-border text-text-muted hover:bg-surface-hover transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}