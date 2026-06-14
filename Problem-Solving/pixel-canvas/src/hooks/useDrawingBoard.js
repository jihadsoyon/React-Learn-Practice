import { useState, useCallback } from 'react'
import { saveToStorage, loadFromStorage } from '../utils/localStorage'

const GRID_SIZE = 20   // 20x20 cells
const DEFAULT_COLOR = '#6366f1'
const EMPTY_GRID = () => Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('#1e1e2e'))

export function useDrawingBoard() {
  const [grid, setGrid] = useState(() => loadFromStorage('pixel_grid') || EMPTY_GRID())
  const [past, setPast] = useState([])      // Undo stack
  const [future, setFuture] = useState([])  // Redo stack
  const [brushColor, setBrushColor] = useState(DEFAULT_COLOR)
  const [isDrawing, setIsDrawing] = useState(false)

  // Paint a single cell — pushes current state to past (for Undo)
  const paintCell = useCallback((row, col) => {
    setGrid(prev => {
      if (prev[row][col] === brushColor) return prev // no change, skip

      const newGrid = prev.map(r => [...r])
      newGrid[row][col] = brushColor

      setPast(p => [...p, prev])   // save current for undo
      setFuture([])                // clear redo stack on new action
      saveToStorage('pixel_grid', newGrid)
      return newGrid
    })
  }, [brushColor])

  const undo = useCallback(() => {
    setPast(p => {
      if (p.length === 0) return p
      const previous = p[p.length - 1]
      const rest = p.slice(0, -1)
      setFuture(f => [grid, ...f])
      setGrid(previous)
      saveToStorage('pixel_grid', previous)
      return rest
    })
  }, [grid])

  const redo = useCallback(() => {
    setFuture(f => {
      if (f.length === 0) return f
      const next = f[0]
      const rest = f.slice(1)
      setPast(p => [...p, grid])
      setGrid(next)
      saveToStorage('pixel_grid', next)
      return rest
    })
  }, [grid])

  const clearBoard = useCallback(() => {
    const empty = EMPTY_GRID()
    setPast(p => [...p, grid])
    setFuture([])
    setGrid(empty)
    saveToStorage('pixel_grid', empty)
  }, [grid])

  return {
    grid,
    brushColor,
    setBrushColor,
    paintCell,
    undo,
    redo,
    clearBoard,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    isDrawing,
    setIsDrawing,
    GRID_SIZE,
  }
}