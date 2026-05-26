import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchJobs } from "../data/fakeJobs";
import JobCard from "../components/JobCard";
import SkeletonCard from "../components/SkeletonCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import CompanyModal from "../components/CompanyModal";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const defaultFilters = {
  category: "All",
  location: "All",
  type: "All",
  salary: { label: "Any", min: 0, max: Infinity },
};

const Jobs = ({ compareJobs, setCompareJobs }) => {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await fetchJobs({ query, ...filters }, page, 6);
      setJobs(result.jobs);
      setTotalPages(result.pages);
      setTotal(result.total);
    } catch {
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  }, [query, filters, page]);

  useEffect(() => { setPage(1); }, [query, filters]);
  useEffect(() => { load(); }, [load]);

  const clearFilters = () => {
    setFilters(defaultFilters);
    setQuery("");
    setPage(1);
  };

  const toggleCompare = (job) => {
    if (compareJobs.find(j => j.id === job.id)) {
      setCompareJobs(prev => prev.filter(j => j.id !== job.id));
    } else if (compareJobs.length < 3) {
      setCompareJobs(prev => [...prev, job]);
    } else {
      alert("You can compare maximum 3 jobs at a time!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user && (
          <div className="mb-6 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-2xl p-4 text-sm">
            👋 Guest Mode •{" "}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 underline">
              Sign up
            </Link>{" "}
            for full features
          </div>
        )}

        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-white">
            Find Remote Jobs
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Discover opportunities that match your skills and lifestyle
          </p>
        </div>

        <SearchBar
          value={query}
          onChange={setQuery}
          onFilterToggle={() => setShowFilters(!showFilters)}
          resultCount={total}
        />

        {showFilters && (
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onClear={clearFilters}
            onClose={() => setShowFilters(false)}
          />
        )}

        {!loading && (
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Showing {jobs.length} of {total} jobs
          </p>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <EmptyState type="search" onReset={clearFilters} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={setSelectedJob}
                onCompare={toggleCompare}
              />
            ))}
          </div>
        )}

        {/* ✅ FIX: Pagination — আগে ছিলই না, এখন যোগ করা হয়েছে */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-400 disabled:opacity-40 hover:border-primary-500 hover:text-primary-500 transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                  p === page
                    ? "bg-primary-500 text-white shadow-md"
                    : "border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-400 disabled:opacity-40 hover:border-primary-500 hover:text-primary-500 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {selectedJob && (
        <CompanyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default Jobs;