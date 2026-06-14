import { Undo2, Redo2, Trash2 } from 'lucide-react'
import ColorPicker from './ColorPicker'

export default function Toolbar({ board }) {
  const { undo, redo, clearBoard, canUndo, canRedo } = board

  return (
    <aside className="toolbar">
      <ColorPicker board={board} />

      <div className="toolbar-divider" />

      <div className="toolbar-actions">
        <button
          className="tool-btn"
          onClick={undo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={20} />
          <span>Undo</span>
        </button>

        <button
          className="tool-btn"
          onClick={redo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={20} />
          <span>Redo</span>
        </button>

        <button
          className="tool-btn danger"
          onClick={clearBoard}
          title="Clear Board"
        >
          <Trash2 size={20} />
          <span>Clear</span>
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="stack-info">
        <div className="stack-badge">
          <span className="badge-label">Undo</span>
          <span className="badge-count">{board.past?.length ?? 0}</span>
        </div>
        <div className="stack-badge">
          <span className="badge-label">Redo</span>
          <span className="badge-count">{board.future?.length ?? 0}</span>
        </div>
      </div>
    </aside>
  )
}