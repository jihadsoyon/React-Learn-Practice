import { useFileTree } from './hooks/useFileTree'
import TreeView from './components/TreeView'

const fileContent = {
  jsx: (name) => `import React from 'react'\n\nconst ${name.replace(/\..+/, '')} = () => {\n  return (\n    <div>\n      <h1>${name}</h1>\n    </div>\n  )\n}\n\nexport default ${name.replace(/\..+/, '')}`,
  js: (name) => `// ${name}\n\nconst main = () => {\n  console.log('Hello from ${name}')\n}\n\nexport default main`,
  css: (name) => `/* ${name} */\n\n.container {\n  display: flex;\n  flex-direction: column;\n}`,
  json: () => `{\n  "name": "my-project",\n  "version": "1.0.0"\n}`,
  md: (name) => `# ${name.replace('.md', '')}\n\nProject documentation here.`,
  default: (name) => `# ${name}\n`,
}

const getFileContent = (name) => {
  const ext = name.split('.').pop()
  const gen = fileContent[ext] || fileContent.default
  return gen(name)
}

function App() {
  const {
    tree, setTree,
    expandedIds,
    selectedId,
    renamingId,
    toggleExpand,
    selectNode,
    addFile,
    addFolder,
    deleteById,
    renameById,
    startRename,
    resetTree,
  } = useFileTree()

  // Find selected node name for mock editor
  const findNode = (nodes, id) => {
    for (const n of nodes) {
      if (n.id === id) return n
      if (n.children?.length) {
        const found = findNode(n.children, id)
        if (found) return found
      }
    }
    return null
  }

  const selectedNode = selectedId ? findNode(tree, selectedId) : null

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#1e1e1e', color: '#cccccc', overflow: 'hidden' }}>
      {/* Activity Bar */}
      <div style={{
        width: 48, background: '#333333', display: 'flex', flexDirection: 'column',
        alignItems: 'center', paddingTop: 8, gap: 4, borderRight: '1px solid #252526',
      }}>
        <ActivityIcon active title="Explorer">
          <FilesIcon />
        </ActivityIcon>
        <ActivityIcon title="Search"><SearchIcon /></ActivityIcon>
        <ActivityIcon title="Git"><GitIcon /></ActivityIcon>
        <ActivityIcon title="Extensions"><ExtIcon /></ActivityIcon>
        <div style={{ flex: 1 }} />
        <ActivityIcon title="Settings"><SettingsIcon /></ActivityIcon>
      </div>

      {/* Sidebar - File Explorer */}
      <div style={{
        width: 260, background: '#252526', borderRight: '1px solid #1e1e1e',
        display: 'flex', flexDirection: 'column', flexShrink: 0,
      }}>
        <TreeView
          tree={tree}
          setTree={setTree}
          expandedIds={expandedIds}
          selectedId={selectedId}
          renamingId={renamingId}
          toggleExpand={toggleExpand}
          selectNode={selectNode}
          addFile={addFile}
          addFolder={addFolder}
          deleteById={deleteById}
          renameById={renameById}
          startRename={startRename}
          resetTree={resetTree}
        />
      </div>

      {/* Main Editor Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Tab bar */}
        <div style={{
          height: 35, background: '#252526', display: 'flex', alignItems: 'center',
          borderBottom: '1px solid #1e1e1e', paddingLeft: 0, overflowX: 'auto',
        }}>
          {selectedNode && selectedNode.type === 'file' && (
            <div style={{
              padding: '0 16px', height: '100%', display: 'flex', alignItems: 'center',
              background: '#1e1e1e', borderRight: '1px solid #252526',
              borderTop: '1px solid #007fd4', fontSize: 13, color: '#ffffff',
              gap: 8, whiteSpace: 'nowrap',
            }}>
              <span style={{ fontSize: 12 }}>📄</span>
              {selectedNode.name}
              <span style={{ color: '#858585', cursor: 'pointer', marginLeft: 4, fontSize: 14 }}>×</span>
            </div>
          )}
        </div>

        {/* Editor content */}
        <div style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
          {selectedNode && selectedNode.type === 'file' ? (
            <div style={{ display: 'flex', flex: 1, fontFamily: 'Consolas, monospace', fontSize: 13 }}>
              {/* Line numbers */}
              <div style={{
                padding: '16px 12px', background: '#1e1e1e', color: '#495970',
                userSelect: 'none', textAlign: 'right', lineHeight: '20px', minWidth: 48,
                borderRight: '1px solid #2d2d2d',
              }}>
                {getFileContent(selectedNode.name).split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              {/* Code */}
              <pre style={{
                margin: 0, padding: '16px', flex: 1, lineHeight: '20px',
                color: '#9cdcfe', background: '#1e1e1e', overflowX: 'auto',
                whiteSpace: 'pre',
              }}>
                <SyntaxHighlight code={getFileContent(selectedNode.name)} />
              </pre>
            </div>
          ) : (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 12,
            }}>
              <div style={{ fontSize: 72, opacity: 0.06 }}>⬡</div>
              <div style={{ fontSize: 28, fontWeight: 300, color: '#3c3c3c', letterSpacing: 4 }}>
                VS CODE EXPLORER
              </div>
              <div style={{ fontSize: 13, color: '#3c3c3c' }}>
                Select a file to preview · Double-click to rename
              </div>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div style={{
          height: 22, background: '#007acc', display: 'flex', alignItems: 'center',
          padding: '0 12px', gap: 16, fontSize: 12, color: '#ffffff',
        }}>
          <span>⎇ main</span>
          <span>Folder Explorer</span>
          <div style={{ flex: 1 }} />
          {selectedNode?.type === 'file' && (
            <span>{selectedNode.name.split('.').pop()?.toUpperCase()}</span>
          )}
          <span>UTF-8</span>
          <span>Ln 1, Col 1</span>
        </div>
      </div>
    </div>
  )
}

// Simple syntax highlight
const SyntaxHighlight = ({ code }) => {
  const lines = code.split('\n')
  return (
    <>
      {lines.map((line, i) => (
        <div key={i} style={{ minHeight: 20 }}>
          {line
            .replace(/</g, '&lt;')
            .split(/(import|from|const|export|default|return|function|let|var|if|else)/g)
            .map((part, j) =>
              ['import', 'from', 'const', 'export', 'default', 'return', 'function', 'let', 'var', 'if', 'else'].includes(part)
                ? <span key={j} style={{ color: '#c586c0' }}>{part}</span>
                : <span key={j}>{part}</span>
            )}
        </div>
      ))}
    </>
  )
}

// Activity bar icons
const ActivityIcon = ({ children, active, title }) => (
  <div title={title} style={{
    width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: active ? '#ffffff' : '#858585', borderLeft: active ? '2px solid #ffffff' : '2px solid transparent',
    opacity: active ? 1 : 0.7,
  }}>
    {children}
  </div>
)

const FilesIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 0H8.5L7 1.5v5H2L0 8.5v14.07L1.5 24h13.07L16 22.57V18h4.93L22 16.57V4.5L17.5 0zm0 2.12L19.88 4.5H17.5V2.12zm-4 20.38H1.5V8.5H7v8.07L8.5 18h5v4.5zm4-6H8.5V1.5h7.5V6h4.5v10.5z" /></svg>
const SearchIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" /></svg>
const GitIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M6 9v6M15.41 16.59L8.59 9.41" strokeLinecap="round" /></svg>
const ExtIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
const SettingsIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" /></svg>

export default App