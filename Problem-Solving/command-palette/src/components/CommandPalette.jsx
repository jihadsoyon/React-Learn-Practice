import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Clock, X, Trash2 } from 'lucide-react';
import { COMMANDS } from '../data/commands';
import { searchCommands } from '../utils/fuzzySearch';
import { useRecentCommands } from '../hooks/useRecentCommands';
import CommandItem from './CommandItem';
import EmptyState from './EmptyState';

export default function CommandPalette({ isOpen, onClose, inputRef }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);
  const { recent, addRecent, clearRecent } = useRecentCommands();

  // Compute filtered results
  const showRecent = !query.trim() && recent.length > 0;
  const displayCommands = showRecent
    ? recent.map(id => COMMANDS.find(c => c.id === id)).filter(Boolean)
    : searchCommands(COMMANDS, query);

  // Reset on open/query change
  useEffect(() => { setActiveIndex(0); }, [query, isOpen]);
  useEffect(() => { if (!isOpen) setQuery(''); }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.querySelector('[aria-selected="true"]');
    item?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const executeCommand = useCallback((cmd) => {
    addRecent(cmd.id);
    onClose();
    // In real app: dispatch action, router navigate, etc.
    console.log('Executing command:', cmd.id);
  }, [addRecent, onClose]);

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(i => Math.min(i + 1, displayCommands.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (displayCommands[activeIndex]) executeCommand(displayCommands[activeIndex]);
        break;
      case 'Escape':
        onClose();
        break;
      default:
        break;
    }
  }, [activeIndex, displayCommands, executeCommand, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="overlay-bg fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="palette-glass animate-palette-in w-full max-w-[600px] rounded-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
          <Search size={16} className="text-slate-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="search-input flex-1 text-sm text-slate-200 placeholder:text-slate-600"
            placeholder="Search commands…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-autocomplete="list"
            aria-controls="cmd-listbox"
            aria-activedescendant={displayCommands[activeIndex] ? `cmd-${displayCommands[activeIndex].id}` : undefined}
            spellCheck={false}
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-600 hover:text-slate-400 transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
          <kbd className="kbd-key hidden sm:block">ESC</kbd>
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium uppercase tracking-wider">
            {showRecent
              ? <><Clock size={11} /> Recent</>
              : <><Search size={11} /> {query ? `Results (${displayCommands.length})` : 'All Commands'}</>
            }
          </div>
          {showRecent && (
            <button
              onClick={clearRecent}
              className="text-xs text-slate-600 hover:text-slate-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 size={10} /> Clear
            </button>
          )}
        </div>

        {/* List */}
        <div
          id="cmd-listbox"
          role="listbox"
          ref={listRef}
          className="overflow-y-auto max-h-[360px] pb-2"
          aria-label="Commands"
        >
          {displayCommands.length === 0 ? (
            <EmptyState query={query} />
          ) : (
            displayCommands.map((cmd, idx) => (
              <CommandItem
                key={cmd.id}
                command={cmd}
                isActive={idx === activeIndex}
                onMouseEnter={() => setActiveIndex(idx)}
                onSelect={() => executeCommand(cmd)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.05] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1"><kbd className="kbd-key">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="kbd-key">↵</kbd> select</span>
            <span className="flex items-center gap-1"><kbd className="kbd-key">ESC</kbd> close</span>
          </div>
          <span className="text-xs text-slate-700 hidden sm:block">
            {displayCommands.length} command{displayCommands.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}