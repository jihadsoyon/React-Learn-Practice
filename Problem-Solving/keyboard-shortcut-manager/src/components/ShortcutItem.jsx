import { Pencil, Trash2, Zap } from 'lucide-react';
import { comboToDisplay } from '../utils/keyUtils';

export default function ShortcutItem({ shortcut, onEdit, onDelete }) {
  return (
    <div className="group flex items-center justify-between bg-surface border border-border rounded-xl px-4 py-3 hover:bg-surface-hover transition">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <Zap size={16} />
        </div>
        <div>
          <p className="font-medium text-text">{shortcut.name}</p>
          <p className="text-xs text-text-muted">{shortcut.action}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <kbd className="px-2.5 py-1 text-xs font-mono bg-bg border border-border rounded-md text-text-muted">
          {comboToDisplay(shortcut.combo)}
        </kbd>
        <button
          onClick={() => onEdit(shortcut)}
          className="p-1.5 rounded-md text-text-muted hover:text-primary hover:bg-primary/10 transition opacity-0 group-hover:opacity-100"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(shortcut.id)}
          className="p-1.5 rounded-md text-text-muted hover:text-danger hover:bg-danger/10 transition opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}