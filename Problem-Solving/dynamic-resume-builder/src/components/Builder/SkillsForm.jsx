import { useState } from "react";

const TEMPLATE = { category: "", items: [] };

const LEVEL_COLORS = {
  Beginner: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Advanced: "bg-green-500/20 text-green-400 border-green-500/30",
  Expert: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

function SkillCard({ item, onUpdate, onRemove }) {
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState("Intermediate");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    onUpdate("items", [...(item.items || []), { name: newSkill.trim(), level: newLevel }]);
    setNewSkill("");
  };

  const removeSkill = (i) => {
    onUpdate("items", item.items.filter((_, idx) => idx !== i));
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Skill Group</span>
        <button
          onClick={onRemove}
          className="text-slate-600 hover:text-red-400 transition-colors text-xs px-2 py-1 rounded hover:bg-red-400/10"
        >✕ Remove</button>
      </div>
      <div>
        <label className="block text-xs text-slate-500 mb-1">Category Name</label>
        <input
          type="text"
          value={item.category || ""}
          onChange={(e) => onUpdate("category", e.target.value)}
          placeholder="Frontend, Backend, Tools..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
        />
      </div>
      <div className="flex flex-wrap gap-2 min-h-8">
        {(item.items || []).map((skill, i) => (
          <span
            key={i}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${LEVEL_COLORS[skill.level] || LEVEL_COLORS.Intermediate}`}
          >
            {skill.name}
            <button onClick={() => removeSkill(i)} className="hover:opacity-70 transition-opacity">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
          placeholder="React, Node.js, Figma..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
        />
        <select
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
        >
          {Object.keys(LEVEL_COLORS).map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <button
          onClick={addSkill}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-2 rounded-lg transition-colors"
        >Add</button>
      </div>
    </div>
  );
}

export default function SkillsForm({ data, addItem, updateItem, removeItem }) {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <SkillCard
          key={item.id}
          item={item}
          onUpdate={(field, val) => updateItem("skills", item.id, field, val)}
          onRemove={() => removeItem("skills", item.id)}
        />
      ))}
      <button
        onClick={() => addItem("skills", TEMPLATE)}
        className="w-full py-2.5 border border-dashed border-slate-600 rounded-xl text-sm text-slate-500 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
      >
        + Add Skill Group
      </button>
    </div>
  );
}