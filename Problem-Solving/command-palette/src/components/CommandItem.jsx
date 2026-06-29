import { CATEGORY_COLORS } from '../data/commands';

export default function CommandItem({ command, isActive, onSelect, onMouseEnter }) {
  const Icon = command.icon;
  const categoryStyle = CATEGORY_COLORS[command.category] || 'text-slate-400 bg-slate-400/10';
  const segments = command._labelSegments || [{ text: command.label, highlight: false }];

  return (
    <div
      role="option"
      aria-selected={isActive}
      onMouseEnter={onMouseEnter}
      onClick={onSelect}
      className={`
        cmd-item-hover cmd-item-inactive flex items-center gap-3 px-4 py-2.5 cursor-pointer
        ${isActive ? 'cmd-item-active !border-l-indigo-500' : 'hover:bg-white/[0.03]'}
      `}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${categoryStyle}`}>
        <Icon size={15} />
      </div>

      {/* Label + Description */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-100 flex items-center gap-2">
          <span>
            {segments.map((seg, i) =>
              seg.highlight
                ? <mark key={i} className="bg-indigo-500/30 text-indigo-300 rounded px-[1px]">{seg.text}</mark>
                : <span key={i}>{seg.text}</span>
            )}
          </span>
          <span className={`badge ${categoryStyle} hidden sm:inline-block`}>
            {command.category}
          </span>
        </div>
        <div className="text-xs text-slate-500 truncate mt-0.5">{command.description}</div>
      </div>

      {/* Keyboard shortcut */}
      {command.shortcut && (
        <div className="flex items-center gap-1 flex-shrink-0 hidden sm:flex">
          {command.shortcut.map((key, i) => (
            <kbd key={i} className="kbd-key">{key}</kbd>
          ))}
        </div>
      )}

      {/* Arrow indicator */}
      {isActive && (
        <div className="flex-shrink-0 text-indigo-400 text-xs">↵</div>
      )}
    </div>
  );
}