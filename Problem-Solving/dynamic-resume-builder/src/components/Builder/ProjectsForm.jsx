const TEMPLATE = {
  name: "",
  description: "",
  tech: [],
  liveUrl: "",
  repoUrl: "",
  date: "",
};

function ProjectCard({ item, onUpdate, onRemove }) {
  const [newTech, setNewTech] = useState("");

  const addTech = () => {
    if (!newTech.trim()) return;
    onUpdate("tech", [...(item.tech || []), newTech.trim()]);
    setNewTech("");
  };

  const removeTech = (i) => {
    onUpdate("tech", item.tech.filter((_, idx) => idx !== i));
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Project Entry</span>
        <button
          onClick={onRemove}
          className="text-slate-600 hover:text-red-400 transition-colors text-xs px-2 py-1 rounded hover:bg-red-400/10"
        >✕ Remove</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { key: "name", label: "Project Name", placeholder: "AI StudyMate", full: true },
          { key: "date", label: "Date", placeholder: "2024 / Jan–Mar 2024" },
          { key: "liveUrl", label: "Live URL", placeholder: "https://project.netlify.app" },
          { key: "repoUrl", label: "GitHub URL", placeholder: "https://github.com/you/project" },
        ].map(({ key, label, placeholder, full }) => (
          <div key={key} className={full ? "col-span-2" : "col-span-1"}>
            <label className="block text-xs text-slate-500 mb-1">{label}</label>
            <input
              type="text"
              value={item[key] || ""}
              onChange={(e) => onUpdate(key, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
            />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-xs text-slate-500 mb-1">Description</label>
        <textarea
          value={item.description || ""}
          onChange={(e) => onUpdate("description", e.target.value)}
          placeholder="What this project does and why it matters..."
          rows={2}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
        />
      </div>
      <div>
        <label className="block text-xs text-slate-500 mb-2">Tech Stack</label>
        <div className="flex flex-wrap gap-2 mb-2 min-h-6">
          {(item.tech || []).map((t, i) => (
            <span key={i} className="flex items-center gap-1 px-2.5 py-0.5 bg-slate-700 rounded-full text-xs text-slate-300">
              {t}
              <button onClick={() => removeTech(i)} className="hover:text-red-400 transition-colors">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTech()}
            placeholder="React, Node.js, MongoDB..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
          />
          <button
            onClick={addTech}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-2 rounded-lg transition-colors"
          >Add</button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function ProjectsForm({ data, addItem, updateItem, removeItem }) {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <ProjectCard
          key={item.id}
          item={item}
          onUpdate={(field, val) => updateItem("projects", item.id, field, val)}
          onRemove={() => removeItem("projects", item.id)}
        />
      ))}
      <button
        onClick={() => addItem("projects", TEMPLATE)}
        className="w-full py-2.5 border border-dashed border-slate-600 rounded-xl text-sm text-slate-500 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
      >
        + Add Project
      </button>
    </div>
  );
}