import { useState } from "react";

export default function JsonPreview({ data, copied, onCopy }) {
  const [importing, setImporting] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");

  const jsonStr = JSON.stringify(data, null, 2);

  // Syntax highlight
  const highlighted = jsonStr.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      if (/^".*":$/.test(match)) return `<span class="text-amber-400">${match}</span>`;
      if (/^"/.test(match)) return `<span class="text-emerald-400">${match}</span>`;
      if (/true|false/.test(match)) return `<span class="text-violet-400">${match}</span>`;
      if (/null/.test(match)) return `<span class="text-zinc-500">${match}</span>`;
      return `<span class="text-sky-400">${match}</span>`;
    }
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700">
        <span className="text-zinc-300 text-sm font-semibold tracking-wide">JSON Preview</span>
        <div className="flex gap-2">
          <button
            onClick={() => setImporting(!importing)}
            className="px-3 py-1 text-xs rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-300 transition-colors"
          >
            {importing ? "Cancel" : "Import"}
          </button>
          <button
            onClick={onCopy}
            className={`px-3 py-1 text-xs rounded transition-colors font-medium ${
              copied
                ? "bg-emerald-700 text-white"
                : "bg-zinc-700 hover:bg-zinc-600 text-zinc-300"
            }`}
          >
            {copied ? "✓ Copied!" : "Copy JSON"}
          </button>
        </div>
      </div>

      {/* Import panel */}
      {importing && (
        <div className="px-4 py-3 border-b border-zinc-700 bg-zinc-900">
          <textarea
            value={importText}
            onChange={(e) => { setImportText(e.target.value); setImportError(""); }}
            placeholder='Paste JSON here… e.g. {"key": "value"}'
            rows={4}
            className="w-full bg-zinc-800 border border-zinc-600 text-zinc-200 rounded px-3 py-2 text-xs font-mono resize-none focus:outline-none focus:border-sky-500"
          />
          {importError && <p className="text-red-400 text-xs mt-1">{importError}</p>}
          <button
            onClick={() => {
              try {
                JSON.parse(importText);
                // call parent import
                document.dispatchEvent(new CustomEvent("vje:import", { detail: importText }));
                setImporting(false);
                setImportText("");
              } catch {
                setImportError("Invalid JSON — fix and try again.");
              }
            }}
            className="mt-2 px-4 py-1 bg-sky-700 hover:bg-sky-600 text-white text-xs rounded transition-colors"
          >
            Import JSON
          </button>
        </div>
      )}

      {/* Code */}
      <div className="flex-1 overflow-auto p-4">
        <pre
          className="text-xs font-mono leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>

      {/* Stats footer */}
      <div className="px-4 py-2 border-t border-zinc-700 flex gap-4 text-xs text-zinc-500">
        <span>{jsonStr.length} chars</span>
        <span>{jsonStr.split("\n").length} lines</span>
        <span>{JSON.stringify(data).length} bytes</span>
      </div>
    </div>
  );
}