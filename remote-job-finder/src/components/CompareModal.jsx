import React from "react";
import { X } from "lucide-react";

const CompareModal = ({ jobs, onClose }) => {
  if (!jobs || jobs.length < 2) return null;

  const fields = [
    { label: "Company", key: "company" },
    { label: "Location", key: "location" },
    { label: "Type", key: "type" },
    { label: "Salary", key: "salary" },
    { label: "Posted", key: "postedAgo" },
  ];

  const formatSalary = (s) =>
    `${s.currency}${Math.round(s.min / 1000)}k - ${s.currency}${Math.round(s.max / 1000)}k`;

  // ✅ FIX: Logo error handler — broken image সরিয়ে centered fallback letter দেখাবে
  const handleLogoError = (e, companyName) => {
    e.target.style.display = "none";
    const parent = e.target.parentNode;
    parent.classList.add("flex", "items-center", "justify-center");
    parent.innerHTML = `<span class="text-xl font-bold text-gray-500 dark:text-gray-400">${companyName[0]}</span>`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-dark-800 w-full max-w-5xl rounded-3xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-dark-700 flex items-center justify-between">
          <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white">
            Compare Jobs
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Cards */}
        <div className="overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, idx) => (
              <div
                key={job.id}
                className={`border border-gray-200 dark:border-dark-600 rounded-2xl p-5 ${
                  idx === 0 ? "ring-2 ring-primary-500" : ""
                }`}
              >
                {/* Company Header */}
                <div className="flex items-center gap-3 mb-4">
                  {/* ✅ FIX: Logo container — bg এবং fallback letter properly centered */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-700 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-full h-full object-cover"
                      onError={(e) => handleLogoError(e, job.company)}
                    />
                  </div>
                  <div>
                    {/* ✅ FIX: Title এবং company name এ explicit text color — আগে dark mode এ কালো দেখাত */}
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <p className="text-primary-500 text-sm">{job.company}</p>
                  </div>
                </div>

                {/* Fields */}
                <div className="space-y-3 text-sm">
                  {fields.map((field) => (
                    <div
                      key={field.key}
                      className="flex justify-between border-b border-gray-100 dark:border-dark-700 pb-2 last:border-0"
                    >
                      {/* ✅ FIX: Label color explicit করা হয়েছে */}
                      <span className="text-gray-500 dark:text-gray-400">
                        {field.label}
                      </span>
                      {/* ✅ FIX: Value color explicit করা হয়েছে — আগে dark mode এ কালো দেখাত */}
                      <span className="font-medium text-right text-gray-900 dark:text-white">
                        {field.key === "salary"
                          ? formatSalary(job.salary)
                          : job[field.key]}
                      </span>
                    </div>
                  ))}

                  {/* Key Skills */}
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      Key Skills
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          // ✅ FIX: Tag text color explicit — আগে dark mode এ কালো দেখাত
                          className="text-xs bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-dark-700 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            💡 Pro tip: Click "Apply Now" on the best match
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;