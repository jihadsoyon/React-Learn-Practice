import React, { useState } from "react";
import { BarChart2, Target } from "lucide-react";
import SalaryInsights from "../components/SalaryInsights";
import SkillGapAnalyzer from "../components/SkillGapAnalyzer";

const TABS = [
  {
    id: "salary",
    label: "Salary Insights",
    icon: <BarChart2 size={16} />,
    color: "text-primary-400",
    activeBg: "bg-primary-500",
  },
  {
    id: "skills",
    label: "Skill Gap",
    icon: <Target size={16} />,
    color: "text-cyan-400",
    activeBg: "bg-cyan-600",
  },
];

const Insights = () => {
  const [activeTab, setActiveTab] = useState("salary");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-white">
            Career Insights
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Understand the market & find your skill gaps
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-dark-800 rounded-2xl mb-8 w-fit border border-gray-200 dark:border-dark-600">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? `${tab.activeBg} text-white shadow-md`
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in" key={activeTab}>
          {activeTab === "salary" && <SalaryInsights />}
          {activeTab === "skills" && <SkillGapAnalyzer />}
        </div>
      </div>
    </div>
  );
};

export default Insights;