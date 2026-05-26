import React from "react";
import { MapPin, Bookmark, BookmarkCheck, Plus } from "lucide-react";
import { useJob } from "../context/JobContext";

const JobCard = ({ job, onClick, onCompare }) => {
  const { toggleBookmark, isBookmarked } = useJob();
  const bookmarked = isBookmarked(job.id);

  const formatSalary = (s) => {
    const fmt = (n) => (n >= 1000 ? `${Math.round(n / 1000)}k` : n);
    return `${s.currency}${fmt(s.min)} - ${s.currency}${fmt(s.max)}`;
  };

  // ✅ FIX: Logo error handler — flex centering যোগ করা হয়েছে যাতে fallback letter সুন্দরভাবে দেখায়
  const handleLogoError = (e) => {
    e.target.style.display = "none";
    const parent = e.target.parentNode;
    parent.classList.add("flex", "items-center", "justify-center");
    parent.innerHTML = `<span class="text-lg font-bold text-gray-500 dark:text-gray-400">${job.company[0]}</span>`;
  };

  return (
    <div
      className="card p-5 cursor-pointer group animate-slide-up relative hover:shadow-xl transition-all"
      onClick={() => onClick(job)}
    >
      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        {/* Bookmark */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(job);
          }}
          className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
            bookmarked
              ? "bg-primary-500 text-white"
              : "bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-700"
          }`}
        >
          {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>

        {/* ✅ FIX: Compare (+) button — text color এখন সবসময় visible, আগে কালো ছিল dark mode এ */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (typeof onCompare === "function") onCompare(job);
          }}
          className="w-9 h-9 rounded-2xl flex items-center justify-center bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 text-gray-500 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-500 transition-all"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        {/* ✅ FIX: Logo container — bg এবং fallback text এখন সঠিকভাবে centered */}
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-700 flex items-center justify-center flex-shrink-0">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-full h-full object-cover"
            onError={handleLogoError}
          />
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{job.company}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {job.companySize} employees
          </p>
        </div>
      </div>

      <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-3 pr-16 group-hover:text-primary-500">
        {job.title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-5">
        <span
          className={`tag ${
            job.type === "Full-time"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
          }`}
        >
          {job.type}
        </span>
        <span className="tag bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
          <MapPin size={10} className="inline mr-1" />
          {job.location}
        </span>
        {job.tags.slice(0, 2).map((tag, i) => (
          <span
            key={i}
            className="tag bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-end pt-4 border-t border-gray-100 dark:border-dark-700">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Salary</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {formatSalary(job.salary)}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(job);
          }}
          className="btn-primary text-sm px-5 py-2"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;