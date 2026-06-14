const PALETTE = [
  '#6366f1', '#ec4899', '#f59e0b', '#10b981',
  '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4',
  '#f97316', '#84cc16', '#ffffff', '#1e1e2e',
]

export default function ColorPicker({ board }) {
  const { brushColor, setBrushColor } = board

  return (
    <div className="color-picker">
      <p className="picker-label">Brush Color</p>
      <div className="palette-grid">
        {PALETTE.map(color => (
          <button
            key={color}
            className={`color-swatch ${brushColor === color ? 'active' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setBrushColor(color)}
            title={color}
          />
        ))}
      </div>
      <div className="custom-color">
        <label htmlFor="custom-picker">Custom</label>
        <input
          id="custom-picker"
          type="color"
          value={brushColor}
          onChange={e => setBrushColor(e.target.value)}
        />
      </div>
      <div className="current-color" style={{ backgroundColor: brushColor }} />
    </div>
  )
}