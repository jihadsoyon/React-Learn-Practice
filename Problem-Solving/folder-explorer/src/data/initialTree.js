export const initialTree = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        children: [
          { id: '3', name: 'App.jsx', type: 'file', children: [] },
          { id: '4', name: 'Header.jsx', type: 'file', children: [] },
        ],
      },
      {
        id: '5',
        name: 'hooks',
        type: 'folder',
        children: [
          { id: '6', name: 'useAuth.js', type: 'file', children: [] },
        ],
      },
      { id: '7', name: 'index.css', type: 'file', children: [] },
      { id: '8', name: 'main.jsx', type: 'file', children: [] },
    ],
  },
  {
    id: '9',
    name: 'public',
    type: 'folder',
    children: [
      { id: '10', name: 'vite.svg', type: 'file', children: [] },
    ],
  },
  { id: '11', name: 'package.json', type: 'file', children: [] },
  { id: '12', name: 'vite.config.js', type: 'file', children: [] },
  { id: '13', name: 'README.md', type: 'file', children: [] },
]