import ShortcutItem from './ShortcutItem';
import EmptyState from './EmptyState';

export default function ShortcutList({ shortcuts, onEdit, onDelete }) {
  if (shortcuts.length === 0) return <EmptyState />;

  return (
    <div className="space-y-2">
      {shortcuts.map((s) => (
        <ShortcutItem key={s.id} shortcut={s} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}