import { useRef } from 'react'

export default function Canvas({ board }) {
  const { grid, paintCell, isDrawing, setIsDrawing, GRID_SIZE } = board
  const lastCellRef = useRef(null)

  const getCellFromEvent = (e, container) => {
    const rect = container.getBoundingClientRect()
    const cellSize = rect.width / GRID_SIZE
    const col = Math.floor((e.clientX - rect.left) / cellSize)
    const row = Math.floor((e.clientY - rect.top) / cellSize)
    if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
      return { row, col }
    }
    return null
  }

  const handleMouseDown = (e) => {
    setIsDrawing(true)
    const cell = getCellFromEvent(e, e.currentTarget)
    if (cell) {
      lastCellRef.current = `${cell.row}-${cell.col}`
      paintCell(cell.row, cell.col)
    }
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return
    const cell = getCellFromEvent(e, e.currentTarget)
    if (cell) {
      const key = `${cell.row}-${cell.col}`
      if (key !== lastCellRef.current) {
        lastCellRef.current = key
        paintCell(cell.row, cell.col)
      }
    }
  }

  const handleMouseUp = () => setIsDrawing(false)
  const handleMouseLeave = () => setIsDrawing(false)

  // Touch support
  const handleTouchMove = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    const synth = { clientX: touch.clientX, clientY: touch.clientY, currentTarget: e.currentTarget }
    const cell = getCellFromEvent(synth, e.currentTarget)
    if (cell) {
      const key = `${cell.row}-${cell.col}`
      if (key !== lastCellRef.current) {
        lastCellRef.current = key
        paintCell(cell.row, cell.col)
      }
    }
  }

  return (
    <div className="canvas-wrapper">
      <div
        className="pixel-grid"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={(e) => { setIsDrawing(true); handleTouchMove(e) }}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDrawing(false)}
      >
        {grid.map((row, rIdx) =>
          row.map((color, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              className="pixel-cell"
              style={{ backgroundColor: color }}
            />
          ))
        )}
      </div>
    </div>
  )
}