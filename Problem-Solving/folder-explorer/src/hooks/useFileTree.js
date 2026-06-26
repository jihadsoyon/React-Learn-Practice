import { useState, useEffect, useCallback } from 'react'
import { initialTree } from '../data/initialTree'
import { addNode, deleteNode, renameNode, genId } from '../utils/treeUtils'

const STORAGE_KEY = 'folder-explorer-tree'

export const useFileTree = () => {
  const [tree, setTree] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialTree
    } catch {
      return initialTree
    }
  })

  const [expandedIds, setExpandedIds] = useState(new Set(['1', '2']))
  const [selectedId, setSelectedId] = useState(null)
  const [renamingId, setRenamingId] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tree))
  }, [tree])

  const toggleExpand = useCallback((id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const selectNode = useCallback((id) => {
    setSelectedId(id)
  }, [])

  const addFile = useCallback((parentId) => {
    const name = 'new-file.js'
    const newNode = { id: genId(), name, type: 'file', children: [] }
    setTree((prev) => addNode(prev, parentId, newNode))
    setExpandedIds((prev) => new Set([...prev, parentId]))
    // Trigger rename immediately
    setTimeout(() => setRenamingId(newNode.id), 50)
  }, [])

  const addFolder = useCallback((parentId) => {
    const newNode = { id: genId(), name: 'new-folder', type: 'folder', children: [] }
    setTree((prev) => addNode(prev, parentId, newNode))
    setExpandedIds((prev) => new Set([...prev, parentId]))
    setTimeout(() => setRenamingId(newNode.id), 50)
  }, [])

  const deleteById = useCallback((id) => {
    setTree((prev) => deleteNode(prev, id))
    setSelectedId((prev) => (prev === id ? null : prev))
  }, [])

  const renameById = useCallback((id, newName) => {
    if (newName?.trim()) {
      setTree((prev) => renameNode(prev, id, newName.trim()))
    }
    setRenamingId(null)
  }, [])

  const startRename = useCallback((id) => {
    setRenamingId(id)
  }, [])

  const resetTree = useCallback(() => {
    setTree(initialTree)
    setExpandedIds(new Set(['1', '2']))
    setSelectedId(null)
  }, [])

  return {
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
  }
}