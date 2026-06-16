import { useState } from "react";
import { getType, parseValue } from "../utils/jsonHelpers";

const TYPE_COLORS = {
  string: "text-emerald-400",
  number: "text-sky-400",
  boolean: "text-violet-400",
  null: "text-zinc-500",
  object: "text-amber-400",
  array: "text-rose-400",
};

const VALUE_TYPES = ["string", "number", "boolean", "null", "object", "array"];

export default function NodeEditor({ nodeKey, value, path, onUpdate, onDelete, onAdd, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(depth > 1);
  const [editingKey, setEditingKey] = useState(false);
  const [newKey, setNewKey] = useState(String(nodeKey));
  const [addingField, setAddingField] = useState(false);
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");
  const [newFieldType, setNewFieldType] = useState("string");
  const [keyError, setKeyError] = useState("");

  const type = getType(value);
  const isComplex = type === "object" || type === "array";
  const indent = depth * 16;

  const handleValueChange = (e) => {
    let raw = e.target.value;
    if (type === "boolean") {
      onUpdate(path, raw === "true");
    } else if (type === "number") {
      const num = Number(raw);
      if (!isNaN(num)) onUpdate(path, num);
    } else {
      onUpdate(path, raw);
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    onUpdate(path, parseValue("", newType));
  };

  const handleAddField = () => {
    if (!newFieldKey && type !== "array") {
      setKeyError("Key cannot be empty");
      return;
    }
    if (type === "object" && value.hasOwnProperty(newFieldKey)) {
      setKeyError("Key already exists");
      return;
    }
    const parsed = parseValue(newFieldValue, newFieldType);
    onAdd(path, newFieldKey, parsed);
    setNewFieldKey("");
    setNewFieldValue("");
    setNewFieldType("string");
    setAddingField(false);
    setKeyError("");
  };

  const renderValue = () => {
    if (type === "boolean") {
      return (
        <select
          value={String(value)}
          onChange={handleValueChange}
          className="bg-zinc-800 border border-zinc-600 text-violet-400 rounded px-2 py-0.5 text-sm font-mono focus:outline-none focus:border-violet-500"
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      );
    }
    if (type === "null") {
      return <span className="text-zinc-500 text-sm italic">null</span>;
    }
    if (type === "number") {
      return (
        <input
          type="number"
          value={value}
          onChange={handleValueChange}
          className="bg-zinc-800 border border-zinc-600 text-sky-400 rounded px-2 py-0.5 text-sm font-mono w-28 focus:outline-none focus:border-sky-500"
        />
      );
    }
    if (type === "string") {
      return (
        <input
          type="text"
          value={value}
          onChange={handleValueChange}
          className="bg-zinc-800 border border-zinc-600 text-emerald-400 rounded px-2 py-0.5 text-sm font-mono min-w-[120px] max-w-xs focus:outline-none focus:border-emerald-500"
        />
      );
    }
    return null;
  };

  return (
    <div className="select-none" style={{ marginLeft: `${indent}px` }}>
      <div className="flex items-center gap-2 py-1 group">
        {/* Collapse toggle */}
        {isComplex && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-4 h-4 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            {collapsed ? "▶" : "▼"}
          </button>
        )}
        {!isComplex && <span className="w-4" />}

        {/* Key */}
        <span className={`text-sm font-mono ${TYPE_COLORS[type]}`}>
          {String(nodeKey)}
        </span>
        <span className="text-zinc-600 text-sm">:</span>

        {/* Type badge */}
        <span className={`text-xs px-1.5 py-0.5 rounded bg-zinc-800 ${TYPE_COLORS[type]} opacity-70`}>
          {type}
        </span>

        {/* Value editor */}
        {!isComplex && renderValue()}

        {/* Complex summary */}
        {isComplex && collapsed && (
          <span className="text-zinc-500 text-xs italic">
            {type === "array"
              ? `[${value.length} items]`
              : `{${Object.keys(value).length} keys}`}
          </span>
        )}

        {/* Action buttons (appear on hover) */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
          {/* Change type */}
          <select
            value={type}
            onChange={handleTypeChange}
            className="bg-zinc-800 border border-zinc-700 text-zinc-400 rounded text-xs px-1 py-0.5 focus:outline-none"
          >
            {VALUE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Add child (for objects/arrays) */}
          {isComplex && (
            <button
              onClick={() => { setAddingField(true); setCollapsed(false); }}
              title="Add field"
              className="w-6 h-6 flex items-center justify-center rounded bg-zinc-700 hover:bg-emerald-700 text-emerald-400 text-xs transition-colors"
            >+</button>
          )}

          {/* Delete */}
          {path.length > 0 && (
            <button
              onClick={() => onDelete(path)}
              title="Delete"
              className="w-6 h-6 flex items-center justify-center rounded bg-zinc-700 hover:bg-red-700 text-red-400 text-xs transition-colors"
            >✕</button>
          )}
        </div>
      </div>

      {/* Children */}
      {isComplex && !collapsed && (
        <div className="border-l border-zinc-700 ml-2">
          {type === "object" &&
            Object.entries(value).map(([k, v]) => (
              <NodeEditor
                key={k}
                nodeKey={k}
                value={v}
                path={[...path, k]}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAdd={onAdd}
                depth={depth + 1}
              />
            ))}
          {type === "array" &&
            value.map((v, i) => (
              <NodeEditor
                key={i}
                nodeKey={i}
                value={v}
                path={[...path, String(i)]}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAdd={onAdd}
                depth={depth + 1}
              />
            ))}

          {/* Add field inline form */}
          {addingField && (
            <div
              className="flex flex-wrap items-center gap-2 py-2 px-2 bg-zinc-900 border border-zinc-700 rounded-lg mt-1 ml-4"
            >
              {type === "object" && (
                <div className="flex flex-col">
                  <input
                    placeholder="key"
                    value={newFieldKey}
                    onChange={(e) => { setNewFieldKey(e.target.value); setKeyError(""); }}
                    className="bg-zinc-800 border border-zinc-600 text-amber-400 rounded px-2 py-0.5 text-sm font-mono w-28 focus:outline-none focus:border-amber-500"
                  />
                  {keyError && <span className="text-red-400 text-xs mt-0.5">{keyError}</span>}
                </div>
              )}
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
                className="bg-zinc-800 border border-zinc-600 text-zinc-300 rounded px-2 py-0.5 text-sm focus:outline-none"
              >
                {VALUE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {!["object", "array", "null"].includes(newFieldType) && (
                <input
                  placeholder="value"
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  className="bg-zinc-800 border border-zinc-600 text-emerald-400 rounded px-2 py-0.5 text-sm font-mono w-32 focus:outline-none focus:border-emerald-500"
                />
              )}
              <button
                onClick={handleAddField}
                className="px-3 py-0.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-sm transition-colors"
              >Add</button>
              <button
                onClick={() => { setAddingField(false); setKeyError(""); }}
                className="px-3 py-0.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded text-sm transition-colors"
              >Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}