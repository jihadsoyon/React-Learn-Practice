import React, { useState, useRef } from "react";
import {
  Sparkles,
  X,
  Loader,
  Upload,
  RotateCcw,
  TrendingUp,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { fakeJobs } from "../data/fakeJobs";
import { useAuth } from "../context/AuthContext";

const SUGGESTED_SKILLS = [
  "React", "Node.js", "Python", "Figma", "TypeScript", "Next.js",
  "UX Design", "Product Management", "Go", "Kubernetes", "SQL",
  "Machine Learning", "Swift", "Content Strategy", "SEO", "AWS",
];

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level (0–2 yrs)" },
  { value: "mid", label: "Mid Level (2–5 yrs)" },
  { value: "senior", label: "Senior Level (5+ yrs)" },
];

// Match score এর উপর ভিত্তি করে label
const getMatchLabel = (score) => {
  if (score >= 90) return { label: "Perfect Match", color: "text-green-500" };
  if (score >= 80) return { label: "Strong Match", color: "text-primary-500" };
  return { label: "Good Match", color: "text-amber-500" };
};

// ✅ FIX: analyzeMatch function — এটা fakeJobs থেকে real matching করে results বানায়
const analyzeMatch = (userSkills, experience) => {
  const skillsLower = userSkills.map((s) => s.toLowerCase());

  return fakeJobs
    .map((job) => {
      const jobKeywords = [
        ...job.tags.map((t) => t.toLowerCase()),
        job.category.toLowerCase(),
        job.title.toLowerCase(),
      ];

      const matchedSkills = skillsLower.filter((skill) =>
        jobKeywords.some((kw) => kw.includes(skill) || skill.includes(kw))
      );

      const baseScore = Math.min(
        95,
        60 + matchedSkills.length * 10 + Math.floor(Math.random() * 10)
      );

      const expBonus =
        experience === "senior" && job.title.toLowerCase().includes("senior")
          ? 5
          : experience === "entry" && job.type === "Internship"
          ? 5
          : 0;

      const finalScore = Math.min(99, baseScore + expBonus);

      return {
        jobId: job.id,
        job,
        matchScore: finalScore,
        matchedSkills,
        reason: matchedSkills.length > 0
          ? `Matches your ${matchedSkills.slice(0, 2).join(" & ")} skills`
          : `Good opportunity for ${experience} level`,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);
};

const AIJobMatch = ({ onJobClick }) => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [experience, setExperience] = useState("mid");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const inputRef = useRef(null);

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed) && skills.length < 10) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setInputVal("");
    inputRef.current?.focus();
  };

  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputVal.trim()) {
      e.preventDefault();
      addSkill(inputVal);
    }
    if (e.key === "Backspace" && !inputVal && skills.length > 0) {
      removeSkill(skills[skills.length - 1]);
    }
  };

  const handleAnalyze = () => {
    if (!user) {
      setError("Please sign in to use full AI Job Matching.");
      return;
    }
    if (skills.length === 0) {
      setError("Please add at least one skill.");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      const matched = analyzeMatch(skills, experience);
      setResults(matched);
      setLoading(false);
    }, 1600);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setTimeout(() => {
        setSkills(["React", "TypeScript", "Tailwind CSS", "Node.js"]);
      }, 1000);
    }
  };

  const handleReset = () => {
    setResults(null);
    setSkills([]);
    setExperience("mid");
    setResumeFile(null);
    setError("");
  };

  return (
    <div className="max-w-2xl mx-auto pt-8 pb-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Sparkles size={32} className="text-white" />
        </div>
        <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-2">
          AI Dream Job Matcher
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Powered by smart matching algorithm
        </p>
      </div>

      {/* Input Form */}
      {!results && (
        <div className="card p-8">
          {/* Resume Upload */}
          <div className="border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-2xl p-8 text-center mb-8 hover:border-primary-500 transition-colors">
            <Upload size={32} className="mx-auto mb-4 text-gray-400" />
            {resumeFile ? (
              <div className="flex items-center justify-center gap-2 text-green-500 font-medium">
                <CheckCircle size={20} />
                <span>{resumeFile.name} uploaded — skills extracted!</span>
              </div>
            ) : (
              <>
                <p className="font-medium text-gray-900 dark:text-white mb-1">
                  Upload your Resume
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  AI will automatically extract your skills
                </p>
                <label className="btn-ghost cursor-pointer inline-block px-6 py-3">
                  Choose PDF / DOCX
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>

          {/* Skills Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Skills
            </label>
            <div className="min-h-[52px] bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-xl p-3 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-primary-500">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-primary-600 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-1"
                >
                  {skill}
                  <button onClick={() => removeSkill(skill)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
              <input
                ref={inputRef}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  skills.length === 0 ? "Type skill and press Enter..." : ""
                }
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 min-w-[140px]"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {skills.length}/10 skills added
            </p>
          </div>

          {/* Suggested Skills */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Suggested:
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_SKILLS.filter((s) => !skills.includes(s))
                .slice(0, 10)
                .map((s) => (
                  <button
                    key={s}
                    onClick={() => addSkill(s)}
                    className="text-xs px-3 py-1.5 rounded-xl border border-gray-200 dark:border-dark-600 hover:border-primary-500 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-all"
                  >
                    + {s}
                  </button>
                ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Experience Level
            </label>
            <div className="flex gap-2">
              {EXPERIENCE_LEVELS.map((lvl) => (
                <button
                  key={lvl.value}
                  onClick={() => setExperience(lvl.value)}
                  className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all ${
                    experience === lvl.value
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600"
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading || skills.length === 0}
            className="w-full btn-primary py-4 text-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              <Sparkles size={20} />
            )}
            {loading ? "Analyzing your profile..." : "Find My Best Matches"}
          </button>
        </div>
      )}

      {/* ✅ FIX: Results section — আগে শুধু "Results loaded successfully!" text ছিল,
          এখন actual job cards সুন্দরভাবে দেখাচ্ছে */}
      {results && (
        <div className="space-y-4 animate-fade-in">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white">
                Your Top Matches
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Based on your {skills.length} skill{skills.length > 1 ? "s" : ""} •{" "}
                {EXPERIENCE_LEVELS.find((l) => l.value === experience)?.label}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-500 transition-colors"
            >
              <RotateCcw size={15} />
              Redo
            </button>
          </div>

          {results.map((match, i) => {
            const { label, color } = getMatchLabel(match.matchScore);
            return (
              <div
                key={match.jobId}
                className="card p-5 hover:shadow-lg transition-all cursor-pointer group"
                style={{ animationDelay: `${i * 80}ms` }}
                onClick={() => onJobClick && onJobClick(match.job)}
              >
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-700 flex items-center justify-center flex-shrink-0">
                    <img
                      src={match.job.companyLogo}
                      alt={match.job.company}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const p = e.target.parentNode;
                        p.classList.add("flex", "items-center", "justify-center");
                        p.innerHTML = `<span class="text-lg font-bold text-gray-500 dark:text-gray-400">${match.job.company[0]}</span>`;
                      }}
                    />
                  </div>

                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors truncate">
                        {match.job.title}
                      </h4>
                      {/* Match Score Badge */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <TrendingUp size={14} className={color} />
                        <span className={`text-sm font-bold ${color}`}>
                          {match.matchScore}%
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {match.job.company} • {match.job.location}
                    </p>

                    {/* Match label + reason */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-dark-700 ${color}`}>
                        {label}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {match.reason}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {match.job.tags.slice(0, 3).map((tag, ti) => (
                        <span
                          key={ti}
                          className="text-xs px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-gray-400 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1"
                  />
                </div>

                {/* Salary + Apply */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-dark-700">
                  <div>
                    <p className="text-xs text-gray-400">Salary</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {match.job.salary.currency}
                      {match.job.salary.min >= 1000
                        ? `${Math.round(match.job.salary.min / 1000)}k`
                        : match.job.salary.min}{" "}
                      –{" "}
                      {match.job.salary.currency}
                      {match.job.salary.max >= 1000
                        ? `${Math.round(match.job.salary.max / 1000)}k`
                        : match.job.salary.max}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onJobClick && onJobClick(match.job);
                    }}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AIJobMatch;