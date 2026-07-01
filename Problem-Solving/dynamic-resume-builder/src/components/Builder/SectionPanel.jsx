import { useState, useRef } from "react";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";

const SECTION_META = {
  personal: { label: "Personal Info", icon: "👤", color: "text-blue-400" },
  education: { label: "Education", icon: "🎓", color: "text-green-400" },
  experience: { label: "Experience", icon: "💼", color: "text-orange-400" },
  skills: { label: "Skills", icon: "⚡", color: "text-yellow-400" },
  projects: { label: "Projects", icon: "🚀", color: "text-purple-400" },
};

export default function SectionPanel({ resume, handlers, sectionOrder, onReorder }) {
  const [activeSection, setActiveSection] = useState("personal");
  const dragIndex = useRef(null);
  const [dragOver, setDragOver] = useState(null);

  const { updatePersonal, addItem, updateItem, removeItem } = handlers;

  const renderForm = (section) => {
    switch (section) {
      case "personal":
        return <PersonalInfoForm data={resume.personal} updatePersonal={updatePersonal} />;
      case "education":
        return <EducationForm data={resume.education} addItem={addItem} updateItem={updateItem} removeItem={removeItem} />;
      case "experience":
        return <ExperienceForm data={resume.experience} addItem={addItem} updateItem={updateItem} removeItem={removeItem} />;
      case "skills":
        return <SkillsForm data={resume.skills} addItem={addItem} updateItem={updateItem} removeItem={removeItem} />;
      case "projects":
        return <ProjectsForm data={resume.projects} addItem={addItem} updateItem={updateItem} removeItem={removeItem} />;
      default:
        return null;
    }
  };

  const handleDragStart = (i) => { dragIndex.current = i; };
  const handleDragOver = (e, i) => { e.preventDefault(); setDragOver(i); };
  const handleDrop = (i) => {
    if (dragIndex.current !== null && dragIndex.current !== i) {
      onReorder(dragIndex.current, i);
    }
    dragIndex.current = null;
    setDragOver(null);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Section Tabs */}
      <div className="flex-shrink-0 px-4 pt-4 pb-2">
        <p className="text-xs text-slate-500 mb-2 flex items-center gap-1.5">
          <span>⠿</span> Drag tabs to reorder resume sections
        </p>
        <div className="space-y-1">
          {sectionOrder.map((sec, i) => {
            const meta = SECTION_META[sec];
            return (
              <div
                key={sec}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDrop={() => handleDrop(i)}
                onDragEnd={() => { dragIndex.current = null; setDragOver(null); }}
                onClick={() => setActiveSection(sec)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all select-none
                  ${activeSection === sec
                    ? "bg-blue-600/20 border border-blue-500/30"
                    : "hover:bg-slate-800 border border-transparent"
                  }
                  ${dragOver === i ? "scale-[1.02] opacity-70 bg-slate-700/50" : ""}
                `}
              >
                <span className="text-slate-600 cursor-grab active:cursor-grabbing text-sm">⠿</span>
                <span className="text-base">{meta.icon}</span>
                <span className={`text-sm font-medium ${activeSection === sec ? "text-white" : "text-slate-400"}`}>
                  {meta.label}
                </span>
                {activeSection === sec && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Form */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4 scrollbar-thin">
        <div className="mb-3">
          <h2 className={`text-sm font-semibold ${SECTION_META[activeSection]?.color}`}>
            {SECTION_META[activeSection]?.icon} {SECTION_META[activeSection]?.label}
          </h2>
        </div>
        {renderForm(activeSection)}
      </div>
    </div>
  );
}   