import { Command, Search } from 'lucide-react';
import { useCommandPalette } from './hooks/useCommandPalette';
import CommandPalette from './components/CommandPalette';

export default function App() {
  const { isOpen, open, close, inputRef } = useCommandPalette();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 select-none">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-2">
          <Command size={11} /> VS Code / Notion Style
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          <span className="text-slate-100">Command</span>{' '}
          <span className="text-indigo-400">Palette</span>
        </h1>
        <p className="text-slate-500 text-sm max-w-xs">
          Blazing-fast command launcher with fuzzy search, keyboard nav & recent history.
        </p>
      </div>

      {/* Trigger button */}
      <button
        onClick={open}
        className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-200 text-sm text-slate-400 hover:text-slate-300"
        aria-label="Open command palette"
      >
        <Search size={15} />
        <span>Search commands…</span>
        <div className="flex items-center gap-1 ml-2">
          <kbd className="kbd-key">Ctrl</kbd>
          <kbd className="kbd-key">K</kbd>
        </div>
      </button>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-2 max-w-sm">
        {['Fuzzy Search', 'Keyboard Nav', 'Recent History', 'Local Storage', 'ARIA Accessible'].map(f => (
          <span key={f} className="text-xs px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-500">
            {f}
          </span>
        ))}
      </div>

      <CommandPalette isOpen={isOpen} onClose={close} inputRef={inputRef} />
    </div>
  );
}