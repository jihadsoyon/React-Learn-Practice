import { Keyboard } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center mb-4">
        <Keyboard size={24} className="text-text-muted" />
      </div>
      <p className="text-text font-medium">No shortcuts yet</p>
      <p className="text-text-muted text-sm mt-1">
        Press <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-xs">Ctrl + K</kbd> to create one
      </p>
    </div>
  );
}