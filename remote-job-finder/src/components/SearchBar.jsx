import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = ({ value, onChange, onFilterToggle, resultCount }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search job titles, keywords, companies..."
          className="input pl-11 h-12"
        />
      </div>
      <button
        onClick={onFilterToggle}
        className="h-12 px-4 rounded-xl bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-200 flex items-center gap-2 font-medium text-sm flex-shrink-0"
      >
        <SlidersHorizontal size={16} />
        <span className="hidden sm:block">Filters</span>
      </button>
      {resultCount !== undefined && (
        <span className="hidden sm:flex text-sm text-gray-400 whitespace-nowrap">
          <strong className="text-gray-900 dark:text-white mr-1">{resultCount}</strong> results
        </span>
      )}
    </div>
  );
};

export default SearchBar;