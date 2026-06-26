import TreeNode from './TreeNode'
import { FilePlusIcon, FolderPlusIcon } from './icons/Icons'
import { genId } from '../utils/treeUtils'

const ROOT_ID = '__root__'

const TreeView = ({
  tree,
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
  setTree,
}) => {
  // Add to root level
  const addRootFile = () => {
    const newNode = { id: genId(), name: 'new-file.js', type: 'file', children: [] }
    setTree((prev) => [...prev, newNode])
    setTimeout(() => startRename(newNode.id), 50)
  }

  const addRootFolder = () => {
    const newNode = { id: genId(), name: 'new-folder', type: 'folder', children: [] }
    setTree((prev) => [...prev, newNode])
    setTimeout(() => startRename(newNode.id), 50)
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Explorer Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #3c3c3c',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#bbbbbb', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Explorer
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button title="New File" onClick={addRootFile} style={headerBtn}>
            <FilePlusIcon />
          </button>
          <button title="New Folder" onClick={addRootFolder} style={headerBtn}>
            <FolderPlusIcon />
          </button>
          <button
            title="Reset to default"
            onClick={resetTree}
            style={{ ...headerBtn, fontSize: '10px', color: '#858585', padding: '3px 6px' }}
          >
            ↺
          </button>
        </div>
      </div>

      {/* Project name bar */}
      <div
        style={{
          padding: '6px 12px',
          fontSize: '11px',
          fontWeight: 700,
          color: '#bbbbbb',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          cursor: 'default',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <ChevronOpen />
        MY-PROJECT
      </div>

      {/* Tree */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        {tree.length === 0 ? (
          <div style={{ padding: '20px 16px', fontSize: '12px', color: '#555' }}>
            No files yet. Add one above ↑
          </div>
        ) : (
          tree.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              depth={0}
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
            />
          ))
        )}
      </div>
    </div>
  )
}

const headerBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '3px 4px',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  color: '#858585',
}

const ChevronOpen = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M4 2.5l4 3.5-4 3.5" stroke="#858585" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }} />
  </svg>
)

export default TreeView