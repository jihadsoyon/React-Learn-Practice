// src/components/HabitForm.jsx
import { useState } from "react";

const COLORS = [
  { name: "violet", hex: "#8b5cf6" },
  { name: "sky", hex: "#38bdf8" },
  { name: "emerald", hex: "#34d399" },
  { name: "rose", hex: "#fb7185" },
  { name: "amber", hex: "#fbbf24" },
  { name: "fuchsia", hex: "#e879f9" },
];

const ICONS = ["💪", "📚", "🧘", "🏃", "💧", "🥗", "😴", "✍️", "🎯", "🎸"];

const HabitForm = ({ onAdd, onClose }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0].hex);
  const [icon, setIcon] = useState(ICONS[0]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd(name.trim(), color, icon);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a2e] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-5">New Habit</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Habit name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-violet-500 transition mb-5"
        />

        {/* Icon Picker */}
        <p className="text-white/50 text-xs mb-2 uppercase tracking-widest">Icon</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {ICONS.map((ic) => (
            <button
              key={ic}
              onClick={() => setIcon(ic)}
              className={`w-10 h-10 rounded-xl text-xl transition ${
                icon === ic
                  ? "bg-white/20 ring-2 ring-violet-500"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {ic}
            </button>
          ))}
        </div>

        {/* Color Picker */}
        <p className="text-white/50 text-xs mb-2 uppercase tracking-widest">Color</p>
        <div className="flex gap-3 mb-6">
          {COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => setColor(c.hex)}
              style={{ backgroundColor: c.hex }}
              className={`w-8 h-8 rounded-full transition ${
                color === c.hex ? "ring-2 ring-offset-2 ring-offset-[#1a1a2e] ring-white scale-110" : ""
              }`}
            />
          ))}
        </div>

        {/* Preview */}
        <div
          className="flex items-center gap-3 rounded-xl p-3 mb-6"
          style={{ backgroundColor: color + "22", border: `1px solid ${color}44` }}
        >
          <span className="text-2xl">{icon}</span>
          <span className="text-white font-medium">{name || "Your habit"}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex-1 py-3 rounded-xl text-white font-semibold transition disabled:opacity-30"
            style={{ backgroundColor: color }}
          >
            Add Habit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitForm;