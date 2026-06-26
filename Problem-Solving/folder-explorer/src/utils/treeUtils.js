// Generate unique ID
export const genId = () => Math.random().toString(36).slice(2, 9)

// Deep clone
export const deepClone = (tree) => JSON.parse(JSON.stringify(tree))

// Add node under a parent
export const addNode = (tree, parentId, newNode) => {
  return tree.map((node) => {
    if (node.id === parentId) {
      return { ...node, children: [...node.children, newNode] }
    }
    if (node.children?.length) {
      return { ...node, children: addNode(node.children, parentId, newNode) }
    }
    return node
  })
}

// Delete node by ID
export const deleteNode = (tree, targetId) => {
  return tree
    .filter((node) => node.id !== targetId)
    .map((node) => ({
      ...node,
      children: node.children?.length ? deleteNode(node.children, targetId) : [],
    }))
}

// Rename node by ID
export const renameNode = (tree, targetId, newName) => {
  return tree.map((node) => {
    if (node.id === targetId) return { ...node, name: newName }
    if (node.children?.length) {
      return { ...node, children: renameNode(node.children, targetId, newName) }
    }
    return node
  })
}

// Get file extension
export const getExtension = (name) => {
  const parts = name.split('.')
  return parts.length > 1 ? parts.pop().toLowerCase() : ''
}