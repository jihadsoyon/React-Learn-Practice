import { Search } from 'lucide-react';

export default function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-3">
        <Search size={20} className="text-slate-500" />
      </div>
      <p className="text-sm font-medium text-slate-400">No results for</p>
      <p className="text-sm text-slate-500 mt-1">
        "<span className="text-indigo-400">{query}</span>"
      </p>
      <p className="text-xs text-slate-600 mt-3">Try a different keyword</p>
    </div>
  );
}