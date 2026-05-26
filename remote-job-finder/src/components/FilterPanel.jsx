import React from "react";
import { X } from "lucide-react";
import { categories, locations, jobTypes, salaryRanges } from "../data/fakeJobs";

const FilterPanel = ({ filters, onChange, onClear, onClose }) => {
  const update = (key, value) => onChange({ ...filters, [key]: value });

  const Section = ({ title, children }) => (
    <div className="mb-6">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{title}</h4>
      {children}
    </div>
  );

  const Chip = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`text-sm px-3 py-1.5 rounded-xl border font-medium transition-all duration-200 ${
        active
          ? "bg-primary-500 text-white border-primary-500 shadow-md"
          : "border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-400 hover:border-primary-300"
      }`}
    >
      {label}
    </button>
  );

  const activeCount = [
    filters.category !== "All" && filters.category,
    filters.location !== "All" && filters.location,
    filters.type !== "All" && filters.type,
    filters.salary?.label !== "Any" && filters.salary?.label,
  ].filter(Boolean).length;

  return (
    <div className="card p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-semibold text-gray-900 dark:text-white">Filters</h3>
          {activeCount > 0 && (
            <p className="text-xs text-primary-500 mt-0.5">{activeCount} active</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-red-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <Section title="Category">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Chip key={c} label={c} active={filters.category === c} onClick={() => update("category", c)} />
          ))}
        </div>
      </Section>

      <Section title="Location">
        <div className="flex flex-wrap gap-2">
          {locations.map((l) => (
            <Chip key={l} label={l} active={filters.location === l} onClick={() => update("location", l)} />
          ))}
        </div>
      </Section>

      <Section title="Job Type">
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((t) => (
            <Chip key={t} label={t} active={filters.type === t} onClick={() => update("type", t)} />
          ))}
        </div>
      </Section>

      <Section title="Salary Range">
        <div className="flex flex-wrap gap-2">
          {salaryRanges.map((s) => (
            <Chip
              key={s.label}
              label={s.label}
              active={filters.salary?.label === s.label}
              onClick={() => update("salary", s)}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default FilterPanel;