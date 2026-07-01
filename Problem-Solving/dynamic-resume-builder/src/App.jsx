import { useState } from "react";
import { useResumeStore } from "./hooks/useResumeStore";
import SectionPanel from "./components/Builder/SectionPanel";
import ResumePreview from "./components/Preview/ResumePreview";
import Toast from "./components/UI/Toast";

export default function App() {
  const {
    resume,
    toast,
    updatePersonal,
    addItem,
    updateItem,
    removeItem,
    reorderSections,
    resetResume,
  } = useResumeStore();

  const [previewMode, setPreviewMode] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handlers = { updatePersonal, addItem, updateItem, removeItem };

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview {
            position: absolute;
            left: 0; top: 0;
            width: 100%;
            padding: 20mm 20mm;
            box-shadow: none;
          }
        }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 h-14 border-b border-slate-800 flex items-center justify-between px-5 bg-slate-950/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-bold">R</div>
            <span className="font-semibold text-sm tracking-tight">Resume Builder</span>
            <span className="hidden sm:inline text-xs text-slate-600 border border-slate-800 rounded px-1.5 py-0.5">Auto-saved</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Mobile toggle */}
            <button
              onClick={() => setPreviewMode((v) => !v)}
              className="sm:hidden text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {previewMode ? "✏️ Edit" : "👁 Preview"}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors font-medium"
            >
              <span>🖨</span> Print / PDF
            </button>
            <button
              onClick={() => {
                if (confirm("Clear all resume data?")) resetResume();
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-900/50 hover:text-red-400 text-slate-400 transition-colors"
            >
              Reset
            </button>
          </div>
        </header>

        {/* Main split layout */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left: Builder Panel */}
          <div
            className={`w-full sm:w-[400px] lg:w-[440px] flex-shrink-0 border-r border-slate-800 bg-slate-950 overflow-hidden flex flex-col
              ${previewMode ? "hidden sm:flex" : "flex"}
            `}
          >
            <SectionPanel
              resume={resume}
              handlers={handlers}
              sectionOrder={resume.sectionOrder}
              onReorder={reorderSections}
            />
          </div>

          {/* Right: Preview Panel */}
          <div
            className={`flex-1 overflow-auto bg-slate-900
              ${!previewMode ? "hidden sm:block" : "block"}
            `}
          >
            {/* Preview header bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Live Preview
              </span>
              <span className="text-xs text-slate-600">A4 format</span>
            </div>

            {/* A4 page container */}
            <div className="p-6 flex justify-center min-h-full">
              <div
                className="w-full max-w-[794px] min-h-[1123px] bg-white rounded-sm shadow-2xl"
                style={{ aspectRatio: "1 / 1.414" }}
              >
                <ResumePreview resume={resume} />
              </div>
            </div>
          </div>
        </main>

        <Toast toast={toast} />
      </div>
    </>
  );
}