import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import ShortcutForm from './components/ShortcutForm';
import ShortcutList from './components/ShortcutList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useShortcutListener } from './hooks/useShortcutListener';

const DEFAULT_SHORTCUTS = [
  { id: crypto.randomUUID(), name: 'Scroll to Top', combo: 'Ctrl+Shift+T', action: 'scrollTop' },
  { id: crypto.randomUUID(), name: 'Show Greeting', combo: 'Ctrl+Shift+G', action: 'alert' },
];

export default function App() {
  const [shortcuts, setShortcuts] = useLocalStorage('shortcuts', DEFAULT_SHORTCUTS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState(null);

  // Open create form globally with Ctrl+K
  useEffect(() => {
    function handleGlobalKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setEditingShortcut(null);
        setIsFormOpen(true);
      }
      if (e.key === 'Escape') {
        setIsFormOpen(false);
      }
    }
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  // Trigger saved shortcut actions (disabled while form is open)
  useShortcutListener(shortcuts, !isFormOpen);

  const handleSave = useCallback((shortcut) => {
    setShortcuts((prev) => {
      const exists = prev.find((s) => s.id === shortcut.id);
      if (exists) {
        return prev.map((s) => (s.id === shortcut.id ? shortcut : s));
      }
      return [...prev, shortcut];
    });
    setIsFormOpen(false);
    setEditingShortcut(null);
  }, [setShortcuts]);

  const handleEdit = useCallback((shortcut) => {
    setEditingShortcut(shortcut);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((id) => {
    setShortcuts((prev) => prev.filter((s) => s.id !== id));
  }, [setShortcuts]);

  return (
    <div className="min-h-screen bg-bg px-4 py-10">
      <div className="max-w-xl mx-auto">
        <Header onAddNew={() => { setEditingShortcut(null); setIsFormOpen(true); }} count={shortcuts.length} />
        <ShortcutList shortcuts={shortcuts} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {isFormOpen && (
        <ShortcutForm
          initialData={editingShortcut}
          onSave={handleSave}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}