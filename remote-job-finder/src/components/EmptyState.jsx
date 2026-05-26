import React from "react";
import { Search, Bookmark } from "lucide-react";

const EmptyState = ({ type = "search", onReset }) => {
  const configs = {
    search: {
      icon: Search,
      title: "No jobs found",
      desc: "Try adjusting your filters or search query to find more results.",
      action: "Clear filters",
    },
    bookmarks: {
      icon: Bookmark,
      title: "No saved jobs yet",
      desc: "Bookmark jobs you're interested in and they'll appear here.",
      action: "Browse jobs",
    },
  };
  const { icon: Icon, title, desc, action } = configs[type];

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center mb-5">
        <Icon size={32} className="text-gray-300 dark:text-dark-500" />
      </div>
      <h3 className="font-display font-semibold text-gray-900 dark:text-white text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-400 max-w-xs mb-6">{desc}</p>
      {onReset && (
        <button onClick={onReset} className="btn-primary text-sm">
          {action}
        </button>
      )}
    </div>
  );
};

export default EmptyState;