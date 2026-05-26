import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Zap, Shield, TrendingUp, MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fakeJobs } from "../data/fakeJobs";
import JobCard from "../components/JobCard";
import CompanyModal from "../components/CompanyModal";

const stats = [
  { value: "8,567", label: "Remote jobs available" },
  { value: "1,150", label: "Companies hiring" },
  { value: "99%", label: "Satisfaction rate" },
];

const features = [
  { icon: Globe, title: "Worldwide Remote", desc: "Access jobs from companies across every timezone and continent." },
  { icon: Zap, title: "Instant Alerts", desc: "Get notified the moment a matching job is posted." },
  { icon: Shield, title: "Verified Listings", desc: "Every company is vetted before listing jobs on our platform." },
  { icon: TrendingUp, title: "Salary Insights", desc: "Know your market value with real compensation data." },
];

const Home = () => {
  const { user } = useAuth();
  const [selectedJob, setSelectedJob] = React.useState(null);
  const featured = fakeJobs.filter((j) => j.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-dark-900 pt-24 pb-16">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <span className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse-slow" />
              8,567 new jobs this week
            </span>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-tight mb-6">
              Find the right fit.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-cyan-500">
                Remote-friendly.
              </span>
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              Don't just change jobs. Transform your career. Begin your journey by searching our latest remote career opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/jobs" className="btn-primary flex items-center justify-center gap-2 py-3 px-6 text-base">
                Browse Jobs <ArrowRight size={18} />
              </Link>
              {!user && (
                <Link to="/register" className="btn-ghost flex items-center justify-center gap-2 py-3 px-6 text-base">
                  Create Account
                </Link>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto mt-14">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white">{s.value}</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Featured Jobs</h2>
            <p className="text-sm text-gray-400 mt-1">Hand-picked opportunities from top companies</p>
          </div>
          <Link to="/jobs" className="text-sm text-primary-500 font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((job) => (
            <JobCard key={job.id} job={job} onClick={setSelectedJob} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-14 bg-white dark:bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-3">
              Powerful Features to Streamline Your Search
            </h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Discover key tools designed to simplify and enhance your job search workflow.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-5 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary-500" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-10 w-32 h-32 border-2 border-white rounded-full" />
              <div className="absolute bottom-4 right-10 w-24 h-24 border-2 border-white rounded-full" />
            </div>
            <h2 className="font-display font-bold text-3xl text-white mb-3 relative">
              Ready to find your dream remote job?
            </h2>
            <p className="text-white/80 mb-6 relative">Join 50,000+ professionals already using Remotely.</p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      )}

      {selectedJob && <CompanyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
};

export default Home;