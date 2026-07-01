import { useState, useRef } from "react";

export default function DraggableSection({
  sections,
  onReorder,
  renderSection,
  activeSection,
  onSectionClick,
}) {
  const dragIndex = useRef(null);
  const [dragOver, setDragOver] = useState(null);

  const handleDragStart = (i) => {
    dragIndex.current = i;
  };

  const handleDragOver = (e, i) => {
    e.preventDefault();
    setDragOver(i);
  };

  const handleDrop = (i) => {
    if (dragIndex.current !== null && dragIndex.current !== i) {
      onReorder(dragIndex.current, i);
    }
    dragIndex.current = null;
    setDragOver(null);
  };

  const handleDragEnd = () => {
    dragIndex.current = null;
    setDragOver(null);
  };

  return (
    <div className="space-y-1">
      {sections.map((sec, i) => (
        <div
          key={sec}
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={(e) => handleDragOver(e, i)}
          onDrop={() => handleDrop(i)}
          onDragEnd={handleDragEnd}
          className={`transition-all ${dragOver === i ? "scale-[1.02] opacity-80" : ""}`}
        >
          {renderSection(sec, i)}
        </div>
      ))}
    </div>
  );
}