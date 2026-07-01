const FIELDS = [
  { key: "name", label: "Full Name", placeholder: "John Doe", type: "text", full: true },
  { key: "title", label: "Professional Title", placeholder: "Frontend Developer", type: "text", full: true },
  { key: "email", label: "Email", placeholder: "john@example.com", type: "email" },
  { key: "phone", label: "Phone", placeholder: "+880 1XX-XXXXXXX", type: "text" },
  { key: "location", label: "Location", placeholder: "Dhaka, Bangladesh", type: "text" },
  { key: "linkedin", label: "LinkedIn / Portfolio", placeholder: "linkedin.com/in/john", type: "text" },
];

export default function PersonalInfoForm({ data, updatePersonal }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {FIELDS.map(({ key, label, placeholder, type, full }) => (
          <div key={key} className={full ? "col-span-2" : "col-span-1"}>
            <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
            <input
              type={type}
              value={data[key] || ""}
              onChange={(e) => updatePersonal(key, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
            />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Summary</label>
        <textarea
          value={data.summary || ""}
          onChange={(e) => updatePersonal("summary", e.target.value)}
          placeholder="A brief professional summary..."
          rows={3}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
        />
      </div>
    </div>
  );
}