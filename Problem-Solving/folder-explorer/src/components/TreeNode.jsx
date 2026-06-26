import { useState, useRef, useEffect } from 'react'
import { FolderIcon, ChevronIcon, FileIcon, TrashIcon, PencilIcon, FilePlusIcon, FolderPlusIcon } from './icons/Icons'
import { getExtension } from '../utils/treeUtils'

const TreeNode = ({
  node,
  depth,
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
}) => {
  const isFolder = node.type === 'folder'
  const isOpen = expandedIds.has(node.id)
  const isSelected = selectedId === node.id
  const isRenaming = renamingId === node.id
  const [hover, setHover] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isRenaming])

  const handleRenameKey = (e) => {
    if (e.key === 'Enter') renameById(node.id, e.target.value)
    if (e.key === 'Escape') renameById(node.id, node.name)
  }

  const indent = depth * 12

  return (
    <div>
      {/* Row */}
      <div
        className="flex items-center group cursor-pointer select-none"
        style={{
          paddingLeft: `${indent + 4}px`,
          paddingRight: '8px',
          paddingTop: '2px',
          paddingBottom: '2px',
          backgroundColor: isSelected ? '#094771' : hover ? '#2a2d2e' : 'transparent',
          borderLeft: isSelected ? '1px solid #007fd4' : '1px solid transparent',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          selectNode(node.id)
          if (isFolder) toggleExpand(node.id)
        }}
        onDoubleClick={() => !isFolder && startRename(node.id)}
      >
        {/* Chevron for folders */}
        <span className="flex items-center" style={{ width: 16, minWidth: 16, marginRight: 2 }}>
          {isFolder ? <ChevronIcon open={isOpen} /> : null}
        </span>

        {/* Icon */}
        <span className="flex items-center mr-1.5">
          {isFolder
            ? <FolderIcon open={isOpen} />
            : <FileIcon ext={getExtension(node.name)} />}
        </span>

        {/* Name or rename input */}
        {isRenaming ? (
          <input
            ref={inputRef}
            defaultValue={node.name}
            onBlur={(e) => renameById(node.id, e.target.value)}
            onKeyDown={handleRenameKey}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#3c3c3c',
              border: '1px solid #007fd4',
              color: '#cccccc',
              fontSize: '13px',
              padding: '0 4px',
              outline: 'none',
              borderRadius: '2px',
              width: '140px',
              fontFamily: 'Consolas, monospace',
            }}
          />
        ) : (
          <span
            style={{
              fontSize: '13px',
              color: isSelected ? '#ffffff' : '#cccccc',
              flex: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {node.name}
          </span>
        )}

        {/* Action buttons — show on hover/select */}
        {(hover || isSelected) && !isRenaming && (
          <span
            className="flex items-center gap-0.5 ml-2"
            onClick={(e) => e.stopPropagation()}
          >
            {isFolder && (
              <>
                <button
                  title="New File"
                  onClick={() => addFile(node.id)}
                  style={actionBtn}
                >
                  <FilePlusIcon />
                </button>
                <button
                  title="New Folder"
                  onClick={() => addFolder(node.id)}
                  style={actionBtn}
                >
                  <FolderPlusIcon />
                </button>
              </>
            )}
            <button
              title="Rename"
              onClick={() => startRename(node.id)}
              style={actionBtn}
            >
              <PencilIcon />
            </button>
            <button
              title="Delete"
              onClick={() => deleteById(node.id)}
              style={{ ...actionBtn, color: '#f48771' }}
            >
              <TrashIcon />
            </button>
          </span>
        )}
      </div>

      {/* Recursive children */}
      {isFolder && isOpen && node.children?.length > 0 && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
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
          ))}
        </div>
      )}
    </div>
  )
}

const actionBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '2px 3px',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  color: '#858585',
}

export default TreeNode