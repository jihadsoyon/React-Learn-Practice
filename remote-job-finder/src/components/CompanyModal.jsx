import React, { useState, useEffect } from "react";
import {
  X, MapPin, Users, Clock, Bookmark, BookmarkCheck, ExternalLink,
  CheckCircle, Star, Briefcase, DollarSign, Loader, Trophy
} from "lucide-react";
import { useJob } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const typeColors = {
  "Full-time": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Internship: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Part-time": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Contract: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

const CompanyModal = ({ job, onClose }) => {
  const { toggleBookmark, isBookmarked } = useJob();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applicationStage, setApplicationStage] = useState("initial");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const formatSalary = (s) => {
    const fmt = (n) => n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`;
    return `${fmt(s.min)} – ${fmt(s.max)} / year`;
  };

  const handleApply = () => {
    if (!user) {
      onClose();
      navigate("/login");
      return;
    }
    setApplicationStage("applying");
    setTimeout(() => {
      setApplicationStage("success");
    }, 1800);
  };

  const bookmarked = isBookmarked(job.id);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <div className="bg-white dark:bg-dark-800 w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up relative" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-dark-800 px-6 pt-6 pb-4 border-b border-gray-100 dark:border-dark-700 z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 dark:bg-dark-700 flex-shrink-0">
                <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML = `<span class="text-2xl font-bold text-gray-400 flex items-center justify-center w-full h-full">${job.company[0]}</span>`;
                }} />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">{job.title}</h2>
                <p className="text-primary-500 font-medium">{job.company}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</div>
            <div className="flex items-center gap-1.5"><Users size={14} /> {job.companySize} employees</div>
            <div className="flex items-center gap-1.5"><Clock size={14} /> {job.postedAgo}</div>
            <div className="flex items-center gap-1.5"><DollarSign size={14} /> {formatSalary(job.salary)}</div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`tag ${typeColors[job.type] || "bg-gray-100 text-gray-600"}`}>{job.type}</span>
            {job.tags.map((t) => (
              <span key={t} className="tag bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400">{t}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          <section>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><Briefcase size={18} className="text-primary-500" /> About the Role</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{job.description}</p>
          </section>

          <section>
            <h3 className="font-semibold mb-3">Requirements</h3>
            <ul className="space-y-2">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-dark-800 px-6 py-5 border-t border-gray-100 dark:border-dark-700 flex items-center gap-3">
          <button
            onClick={() => toggleBookmark(job)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${bookmarked ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-dark-700 text-gray-500"}`}
          >
            {bookmarked ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
          </button>

          <button
            onClick={handleApply}
            disabled={applicationStage !== "initial"}
            className="flex-1 btn-primary py-3.5 text-base font-semibold flex items-center justify-center gap-2"
          >
            {applicationStage === "initial" && <>🚀 Apply with AI Boost</>}
            {applicationStage === "applying" && <><Loader size={20} className="animate-spin" /> AI Tailoring Application...</>}
            {applicationStage === "success" && <>🎉 Application Sent!</>}
          </button>
        </div>

        {/* Success Overlay */}
        {applicationStage === "success" && (
          <div className="absolute inset-0 bg-white/95 dark:bg-dark-800/95 flex items-center justify-center rounded-3xl z-20">
            <div className="text-center px-8">
              <Trophy size={70} className="mx-auto mb-6 text-green-500" />
              <h3 className="text-2xl font-bold mb-2">Application Submitted Successfully!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Your AI-optimized application has been sent to <strong>{job.company}</strong></p>
              <button onClick={onClose} className="btn-primary px-10 py-3">Back to Jobs</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyModal;