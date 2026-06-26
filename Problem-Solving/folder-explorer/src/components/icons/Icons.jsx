export const FolderIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    {open ? (
      <path
        d="M1.5 3.5h4l1.5 1.5H14v8h-13v-9.5z"
        fill="#dcb67a"
        stroke="#dcb67a"
        strokeWidth="0.3"
      />
    ) : (
      <path
        d="M1.5 3.5h4l1.5 1.5H14v8h-13v-9.5z"
        fill="#c09553"
        stroke="#c09553"
        strokeWidth="0.3"
      />
    )}
  </svg>
)

export const ChevronIcon = ({ open }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s ease' }}
  >
    <path d="M4 2.5l4 3.5-4 3.5" stroke="#858585" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const FileIcon = ({ ext }) => {
  const colors = {
    jsx: '#61dafb', tsx: '#61dafb', js: '#f7df1e', ts: '#3178c6',
    css: '#42a5f5', html: '#e34c26', json: '#ffa726', md: '#78909c',
    svg: '#ff7043', png: '#ab47bc', jpg: '#ab47bc', gif: '#ab47bc',
    env: '#66bb6a', gitignore: '#858585',
  }
  const color = colors[ext] || '#858585'
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
      <path d="M2 1h7l3 3v11H2V1z" fill={color} opacity="0.15" stroke={color} strokeWidth="0.8" />
      <path d="M9 1v3h3" stroke={color} strokeWidth="0.8" fill="none" />
    </svg>
  )
}

export const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path d="M3 4h10M6 4V2h4v2M5 4v9h6V4" stroke="#f48771" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const PencilIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path d="M11 2l3 3-9 9H2v-3L11 2z" stroke="#858585" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const FilePlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M9 1H3a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V6L9 1z" stroke="#858585" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M9 1v5h5" stroke="#858585" strokeWidth="1.2" fill="none" />
    <path d="M8 10v4M6 12h4" stroke="#858585" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

export const FolderPlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M1 3.5h4l1.5 1.5H15v8H1v-9.5z" stroke="#858585" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M8 7v4M6 9h4" stroke="#858585" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)