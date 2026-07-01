import { useState } from "react";

const TEMPLATE = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  current: false,
  location: "",
  bullets: [""],
};

function BulletList({ bullets = [""], onChange }) {
  const updateBullet = (i, val) => {
    const next = [...bullets];
    next[i] = val;
    onChange(next);
  };
  const addBullet = () => onChange([...bullets, ""]);
  const removeBullet = (i) => onChange(bullets.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      <label className="block text-xs text-slate-500">Key Responsibilities / Achievements</label>
      {bullets.map((b, i) => (
        <div key={i} className="flex gap-2 items-start">
          <span className="text-slate-600 mt-2.5 text-xs">•</span>
          <input
            type="text"
            value={b}
            onChange={(e) => updateBullet(i, e.target.value)}
            placeholder="Developed a feature that improved performance by 40%..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
          />
          {bullets.length > 1 && (
            <button
              onClick={() => removeBullet(i)}
              className="text-slate-600 hover:text-red-400 transition-colors mt-2 text-xs"
            >✕</button>
          )}
        </div>
      ))}
      <button
        onClick={addBullet}
        className="text-xs text-slate-500 hover:text-blue-400 transition-colors"
      >
        + Add bullet
      </button>
    </div>
  );
}

function ExperienceCard({ item, onUpdate, onRemove }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Experience Entry</span>
        <button
          onClick={onRemove}
          className="text-slate-600 hover:text-red-400 transition-colors text-xs px-2 py-1 rounded hover:bg-red-400/10"
        >
          ✕ Remove
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { key: "company", label: "Company", placeholder: "Acme Corp", full: true },
          { key: "role", label: "Job Title", placeholder: "Senior Developer", full: true },
          { key: "startDate", label: "Start Date", placeholder: "Jan 2022" },
          { key: "endDate", label: "End Date", placeholder: "Present" },
          { key: "location", label: "Location", placeholder: "Dhaka / Remote", full: true },
        ].map(({ key, label, placeholder, full }) => (
          <div key={key} className={full ? "col-span-2" : "col-span-1"}>
            <label className="block text-xs text-slate-500 mb-1">{label}</label>
            {key === "endDate" ? (
              <div className="space-y-1">
                <input
                  type="text"
                  value={item.current ? "Present" : item[key] || ""}
                  onChange={(e) => onUpdate(key, e.target.value)}
                  placeholder={placeholder}
                  disabled={item.current}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all disabled:opacity-50"
                />
                <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.current || false}
                    onChange={(e) => {
                      onUpdate("current", e.target.checked);
                      if (e.target.checked) onUpdate("endDate", "Present");
                    }}
                    className="accent-blue-500"
                  />
                  Currently working here
                </label>
              </div>
            ) : (
              <input
                type="text"
                value={item[key] || ""}
                onChange={(e) => onUpdate(key, e.target.value)}
                placeholder={placeholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
              />
            )}
          </div>
        ))}
      </div>
      <BulletList
        bullets={item.bullets || [""]}
        onChange={(val) => onUpdate("bullets", val)}
      />
    </div>
  );
}

export default function ExperienceForm({ data, addItem, updateItem, removeItem }) {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <ExperienceCard
          key={item.id}
          item={item}
          onUpdate={(field, val) => updateItem("experience", item.id, field, val)}
          onRemove={() => removeItem("experience", item.id)}
        />
      ))}
      <button
        onClick={() => addItem("experience", TEMPLATE)}
        className="w-full py-2.5 border border-dashed border-slate-600 rounded-xl text-sm text-slate-500 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
      >
        + Add Experience
      </button>
    </div>
  );
}