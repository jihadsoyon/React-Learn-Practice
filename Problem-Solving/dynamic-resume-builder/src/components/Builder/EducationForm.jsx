const TEMPLATE = {
  institution: "",
  degree: "",
  field: "",
  startYear: "",
  endYear: "",
  gpa: "",
  description: "",
};

function EducationCard({ item, onUpdate, onRemove }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-3 group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Education Entry</span>
        <button
          onClick={onRemove}
          className="text-slate-600 hover:text-red-400 transition-colors text-xs px-2 py-1 rounded hover:bg-red-400/10"
        >
          ✕ Remove
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { key: "institution", label: "Institution", placeholder: "BUET, Dhaka University...", full: true },
          { key: "degree", label: "Degree", placeholder: "B.Sc, M.Sc, BBA..." },
          { key: "field", label: "Field of Study", placeholder: "Computer Science" },
          { key: "startYear", label: "Start Year", placeholder: "2019" },
          { key: "endYear", label: "End Year", placeholder: "2023 / Present" },
          { key: "gpa", label: "GPA / Grade", placeholder: "3.8 / 4.0" },
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
        <label className="block text-xs text-slate-500 mb-1">Additional Notes</label>
        <textarea
          value={item.description || ""}
          onChange={(e) => onUpdate("description", e.target.value)}
          placeholder="Achievements, honors, relevant coursework..."
          rows={2}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
        />
      </div>
    </div>
  );
}

export default function EducationForm({ data, addItem, updateItem, removeItem }) {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <EducationCard
          key={item.id}
          item={item}
          onUpdate={(field, val) => updateItem("education", item.id, field, val)}
          onRemove={() => removeItem("education", item.id)}
        />
      ))}
      <button
        onClick={() => addItem("education", TEMPLATE)}
        className="w-full py-2.5 border border-dashed border-slate-600 rounded-xl text-sm text-slate-500 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
      >
        + Add Education
      </button>
    </div>
  );
}