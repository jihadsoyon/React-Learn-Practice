import Canvas from './components/Canvas'
import Toolbar from './components/Toolbar'
import { useDrawingBoard } from './hooks/useDrawingBoard'
import './App.css'

export default function App() {
  const board = useDrawingBoard()

  return (
    <div className="app">
      <header className="app-header">
        <span className="logo">🎨 PixelBoard</span>
        <span className="tagline">Draw. Undo. Redo. Repeat.</span>
      </header>
      <main className="app-body">
        <Toolbar board={board} />
        <Canvas board={board} />
      </main>
    </div>
  )
}