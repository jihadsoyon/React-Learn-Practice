import React, { useState } from "react";
import { X, Target, TrendingUp, BookOpen, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { fakeJobs } from "../data/fakeJobs";

// Skill → category mapping for learning resources
const RESOURCES = {
  React: "https://react.dev",
  "Node.js": "https://nodejs.org/en/learn",
  Python: "https://docs.python.org/3/tutorial/",
  Figma: "https://help.figma.com",
  TypeScript: "https://www.typescriptlang.org/docs/",
  "Next.js": "https://nextjs.org/learn",
  "UX Design": "https://www.nngroup.com/articles/",
  Go: "https://go.dev/learn/",
  Kubernetes: "https://kubernetes.io/docs/tutorials/",
  SQL: "https://mode.com/sql-tutorial/",
  "Machine Learning": "https://developers.google.com/machine-learning/crash-course",
  AWS: "https://aws.amazon.com/training/",
  Swift: "https://developer.apple.com/tutorials/swiftui",
  SEO: "https://developers.google.com/search/docs",
  "Content Strategy": "https://contentmarketinginstitute.com",
  Terraform: "https://developer.hashicorp.com/terraform/tutorials",
  "CI/CD": "https://docs.github.com/en/actions",
  "Design Systems": "https://storybook.js.org",
  Leadership: "https://www.coursera.org/courses?query=leadership",
  "Data Analysis": "https://www.kaggle.com/learn",
};

// Extract all unique skills/tags from jobs
const ALL_JOB_SKILLS = [
  ...new Set(fakeJobs.flatMap((j) => [...j.tags, ...j.requirements])),
].slice(0, 40);

const SUGGESTED_USER_SKILLS = [
  "React", "Node.js", "Python", "Figma", "TypeScript", "Next.js",
  "UX Design", "SQL", "Machine Learning", "AWS", "Swift", "SEO",
];

const SkillGapAnalyzer = () => {
  const [userSkills, setUserSkills] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [targetJob, setTargetJob] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [expandedJob, setExpandedJob] = useState(null);

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !userSkills.includes(trimmed)) {
      setUserSkills((prev) => [...prev, trimmed]);
      setAnalyzed(false);
    }
    setInputVal("");
  };

  const removeSkill = (skill) => {
    setUserSkills((prev) => prev.filter((s) => s !== skill));
    setAnalyzed(false);
  };

  const analyze = () => {
    if (userSkills.length === 0) return;
    setAnalyzed(true);
  };

  // Per-job gap analysis
  const jobAnalysis = fakeJobs.map((job) => {
    const required = [
      ...job.tags,
      ...job.requirements.map((r) => {
        // Extract skill keywords from requirement strings
        const words = r.split(" ");
        return words.find((w) => w.length > 3) || words[0];
      }),
    ];
    const userSkillsLower = userSkills.map((s) => s.toLowerCase());
    const matched = required.filter((req) =>
      userSkillsLower.some(
        (us) =>
          req.toLowerCase().includes(us) || us.includes(req.toLowerCase())
      )
    );
    const missing = required.filter(
      (req) =>
        !userSkillsLower.some(
          (us) =>
            req.toLowerCase().includes(us) || us.includes(req.toLowerCase())
        )
    );
    const score =
      required.length > 0 ? Math.round((matched.length / required.length) * 100) : 0;
    return { job, matched, missing: [...new Set(missing)], score, required };
  });

  const sorted = [...jobAnalysis].sort((a, b) => b.score - a.score);
  const topMatches = sorted.slice(0, 3);
  const allMissingSkills = [
    ...new Set(sorted.flatMap((j) => j.missing)),
  ].slice(0, 12);

  const getScoreColor = (score) => {
    if (score >= 70) return "text-green-400";
    if (score >= 40) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
          <Target size={20} className="text-cyan-400" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-white">
            Skill Gap Analyzer
          </h2>
          <p className="text-xs text-gray-400">
            See exactly what skills you need for each job
          </p>
        </div>
      </div>

      {/* Skill Input */}
      <div className="bg-dark-800 rounded-2xl p-5 border border-dark-600">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Your Current Skills
        </label>
        <div className="min-h-[52px] bg-dark-700 border border-dark-600 rounded-xl p-3 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-cyan-500 mb-3">
          {userSkills.map((skill) => (
            <span
              key={skill}
              className="bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-sm px-3 py-1 rounded-lg flex items-center gap-1"
            >
              {skill}
              <button onClick={() => removeSkill(skill)}>
                <X size={13} />
              </button>
            </span>
          ))}
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === ",") && inputVal.trim()) {
                e.preventDefault();
                addSkill(inputVal);
              }
            }}
            placeholder={userSkills.length === 0 ? "Type a skill and press Enter..." : ""}
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 min-w-[140px] text-sm"
          />
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTED_USER_SKILLS.filter((s) => !userSkills.includes(s)).map((s) => (
            <button
              key={s}
              onClick={() => addSkill(s)}
              className="text-xs px-3 py-1.5 rounded-xl bg-dark-600 border border-dark-500 text-gray-400 hover:border-cyan-500 hover:text-cyan-400 transition-all"
            >
              + {s}
            </button>
          ))}
        </div>

        <button
          onClick={analyze}
          disabled={userSkills.length === 0}
          className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Target size={18} />
          Analyze My Skill Gaps
        </button>
      </div>

      {/* Results */}
      {analyzed && (
        <div className="space-y-4 animate-fade-in">
          {/* Top Job Matches */}
          <div className="bg-dark-800 rounded-2xl p-5 border border-dark-600">
            <p className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-cyan-400" />
              Your Best Job Matches
            </p>
            <div className="space-y-3">
              {topMatches.map(({ job, matched, missing, score }) => (
                <div key={job.id} className="bg-dark-700 rounded-xl overflow-hidden">
                  {/* Job row */}
                  <button
                    onClick={() =>
                      setExpandedJob(expandedJob === job.id ? null : job.id)
                    }
                    className="w-full flex items-center gap-3 p-3 hover:bg-dark-600 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg overflow-hidden bg-dark-600 flex items-center justify-center flex-shrink-0">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML = `<span class="text-sm font-bold text-gray-400">${job.company[0]}</span>`;
                        }}
                      />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {job.title}
                      </p>
                      <p className="text-xs text-gray-400">{job.company}</p>
                    </div>
                    {/* Score bar */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="w-20 h-1.5 bg-dark-500 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getScoreBg(score)} transition-all`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className={`text-sm font-bold w-10 text-right ${getScoreColor(score)}`}>
                        {score}%
                      </span>
                      {expandedJob === job.id ? (
                        <ChevronUp size={14} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={14} className="text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {expandedJob === job.id && (
                    <div className="px-4 pb-4 border-t border-dark-600 pt-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-green-400 font-medium mb-2 flex items-center gap-1">
                          <CheckCircle size={12} /> You have ({matched.length})
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {matched.slice(0, 6).map((s, i) => (
                            <span key={i} className="text-xs bg-green-500/15 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-lg">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-red-400 font-medium mb-2 flex items-center gap-1">
                          <AlertCircle size={12} /> Missing ({missing.length})
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {missing.slice(0, 6).map((s, i) => (
                            <span key={i} className="text-xs bg-red-500/15 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-lg">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills to Learn */}
          {allMissingSkills.length > 0 && (
            <div className="bg-dark-800 rounded-2xl p-5 border border-dark-600">
              <p className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                <BookOpen size={16} className="text-amber-400" />
                Skills to Learn Next
              </p>
              <p className="text-xs text-gray-400 mb-4">
                These skills unlock the most job opportunities for you
              </p>
              <div className="grid grid-cols-2 gap-2">
                {allMissingSkills.map((skill, i) => (
                  <a
                    key={i}
                    href={RESOURCES[skill] || `https://www.google.com/search?q=learn+${encodeURIComponent(skill)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-dark-700 hover:bg-dark-600 rounded-xl border border-dark-600 hover:border-amber-500/40 transition-all group"
                  >
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {skill}
                    </span>
                    <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* All jobs score grid */}
          <div className="bg-dark-800 rounded-2xl p-5 border border-dark-600">
            <p className="text-sm font-semibold text-white mb-4">
              All Jobs — Match Overview
            </p>
            <div className="space-y-2">
              {sorted.map(({ job, score }) => (
                <div key={job.id} className="flex items-center gap-3">
                  <p className="text-xs text-gray-400 w-36 truncate flex-shrink-0">
                    {job.title}
                  </p>
                  <div className="flex-1 h-2 bg-dark-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getScoreBg(score)} transition-all`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold w-8 text-right ${getScoreColor(score)}`}>
                    {score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGapAnalyzer;