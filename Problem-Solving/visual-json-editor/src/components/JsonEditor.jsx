import { useEffect } from "react";
import { useJsonEditor } from "../hooks/useJsonEditor";
import NodeEditor from "./NodeEditor";
import JsonPreview from "./JsonPreview";

export default function JsonEditor() {
  const {
    data,
    error,
    copied,
    updateValue,
    deleteNode,
    addNode,
    resetData,
    importJson,
    copyJson,
  } = useJsonEditor();

  // Listen for import event from preview panel
  useEffect(() => {
    const handler = (e) => importJson(e.detail);
    document.addEventListener("vje:import", handler);
    return () => document.removeEventListener("vje:import", handler);
  }, [importJson]);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-zinc-800 bg-zinc-900 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-rose-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">
            {"{}"}
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white">Visual JSON Editor</h1>
            <p className="text-xs text-zinc-500">Edit · Nest · Preview · Export</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {error && (
            <span className="text-red-400 text-xs bg-red-950 border border-red-800 px-3 py-1 rounded">
              ⚠ {error}
            </span>
          )}
          <span className="text-xs text-zinc-600">Auto-saved to localStorage</span>
          <button
            onClick={resetData}
            className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </header>

      {/* Split panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Editor */}
        <div className="flex-1 overflow-auto p-6 border-r border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
              Editor
            </h2>
            <button
              onClick={() => addNode([], `field_${Date.now()}`, "value")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 border border-emerald-700 text-emerald-400 text-xs rounded transition-colors"
            >
              <span>+</span> Add Root Field
            </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[200px]">
            <NodeEditor
              nodeKey="root"
              value={data}
              path={[]}
              onUpdate={updateValue}
              onDelete={deleteNode}
              onAdd={addNode}
              depth={0}
            />
          </div>
        </div>

        {/* Right: Preview */}
        <div className="w-[400px] flex-shrink-0 overflow-hidden bg-zinc-900 flex flex-col">
          <JsonPreview data={data} copied={copied} onCopy={copyJson} />
        </div>
      </div>
    </div>
  );
}