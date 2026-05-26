import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { useJob } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";
import JobCard from "../components/JobCard";
import CompanyModal from "../components/CompanyModal";
import EmptyState from "../components/EmptyState";

const Bookmarks = ({ compareJobs, setCompareJobs }) => {
  const { bookmarks } = useJob();
  const { user } = useAuth();
  const [selectedJob, setSelectedJob] = useState(null);

  // ✅ FIX: toggleCompare function যোগ করা হয়েছে — আগে onCompare prop ছিলই না,
  // তাই "onCompare is not a function" error আসত
  const toggleCompare = (job) => {
    if (!compareJobs || !setCompareJobs) return;
    if (compareJobs.find((j) => j.id === job.id)) {
      setCompareJobs((prev) => prev.filter((j) => j.id !== job.id));
    } else if (compareJobs.length < 3) {
      setCompareJobs((prev) => [...prev, job]);
    } else {
      alert("You can compare maximum 3 jobs at a time!");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-20 flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <div className="w-20 h-20 rounded-3xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-5">
            <Bookmark size={32} className="text-primary-500" />
          </div>
          <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
            Sign in to view saved jobs
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Create an account to bookmark jobs and access them from anywhere.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/login" className="btn-ghost text-sm">
              Sign in
            </Link>
            <Link to="/register" className="btn-primary text-sm">
              Create account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white">
              Saved Jobs
            </h1>
            {bookmarks.length > 0 && (
              <span className="w-7 h-7 rounded-lg bg-primary-500 text-white text-sm font-semibold flex items-center justify-center">
                {bookmarks.length}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Jobs you've bookmarked for later
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <EmptyState
            type="bookmarks"
            onReset={() => window.location.assign("/jobs")}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((job, i) => (
              <div
                key={job.id}
                style={{ animationDelay: `${i * 60}ms` }}
                className="animate-slide-up"
              >
                {/* ✅ FIX: onCompare prop এখন pass করা হচ্ছে */}
                <JobCard
                  job={job}
                  onClick={setSelectedJob}
                  onCompare={toggleCompare}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedJob && (
        <CompanyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default Bookmarks;