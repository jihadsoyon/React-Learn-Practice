import { Plus, Keyboard } from 'lucide-react';

export default function Header({ onAddNew, count }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Keyboard size={20} />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-text">Shortcut Manager</h1>
          <p className="text-xs text-text-muted">{count} shortcut{count !== 1 ? 's' : ''} configured</p>
        </div>
      </div>

      <button
        onClick={onAddNew}
        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition text-sm"
      >
        <Plus size={16} />
        New
        <kbd className="ml-1 px-1.5 py-0.5 text-[10px] bg-white/20 rounded">Ctrl+K</kbd>
      </button>
    </div>
  );
}