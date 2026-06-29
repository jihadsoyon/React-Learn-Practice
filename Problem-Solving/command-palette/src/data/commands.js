import {
  FileText, Search, Settings, Terminal, Code2,
  GitBranch, Package, Palette, Database, Zap,
  Globe, Lock, Bell, User, HelpCircle, Moon,
  Sun, RefreshCw, Download, Upload, Trash2,
  Copy, Share2, BookOpen, Layout, Shield
} from 'lucide-react';

export const COMMANDS = [
  // File commands
  { id: 'new-file', label: 'New File', description: 'Create a new file', icon: FileText, category: 'File', shortcut: ['Ctrl', 'N'] },
  { id: 'open-file', label: 'Open File', description: 'Open an existing file', icon: FileText, category: 'File', shortcut: ['Ctrl', 'O'] },
  { id: 'save-file', label: 'Save File', description: 'Save the current file', icon: Download, category: 'File', shortcut: ['Ctrl', 'S'] },
  { id: 'upload', label: 'Upload Files', description: 'Upload files to workspace', icon: Upload, category: 'File' },
  { id: 'delete', label: 'Delete File', description: 'Delete selected file', icon: Trash2, category: 'File' },

  // View commands
  { id: 'toggle-theme', label: 'Toggle Theme', description: 'Switch between light and dark mode', icon: Moon, category: 'View', shortcut: ['Ctrl', 'Shift', 'T'] },
  { id: 'toggle-sidebar', label: 'Toggle Sidebar', description: 'Show or hide the sidebar', icon: Layout, category: 'View' },
  { id: 'zoom-in', label: 'Zoom In', description: 'Increase interface zoom', icon: Sun, category: 'View' },

  // Code commands
  { id: 'format-code', label: 'Format Code', description: 'Auto-format the current document', icon: Code2, category: 'Code', shortcut: ['Shift', 'Alt', 'F'] },
  { id: 'open-terminal', label: 'Open Terminal', description: 'Launch integrated terminal', icon: Terminal, category: 'Code', shortcut: ['Ctrl', '`'] },
  { id: 'find-replace', label: 'Find & Replace', description: 'Search and replace in document', icon: Search, category: 'Code', shortcut: ['Ctrl', 'H'] },

  // Git commands
  { id: 'git-commit', label: 'Git: Commit', description: 'Stage and commit changes', icon: GitBranch, category: 'Git' },
  { id: 'git-push', label: 'Git: Push', description: 'Push commits to remote', icon: Share2, category: 'Git' },
  { id: 'git-pull', label: 'Git: Pull', description: 'Pull latest changes', icon: RefreshCw, category: 'Git' },

  // Settings commands
  { id: 'settings', label: 'Open Settings', description: 'Configure workspace settings', icon: Settings, category: 'Settings', shortcut: ['Ctrl', ','] },
  { id: 'extensions', label: 'Manage Extensions', description: 'Install or remove extensions', icon: Package, category: 'Settings' },
  { id: 'keyboard-shortcuts', label: 'Keyboard Shortcuts', description: 'View all keyboard shortcuts', icon: Zap, category: 'Settings', shortcut: ['Ctrl', 'K', 'Ctrl', 'S'] },
  { id: 'color-theme', label: 'Color Theme', description: 'Change editor color theme', icon: Palette, category: 'Settings' },

  // Account commands
  { id: 'profile', label: 'View Profile', description: 'View your account profile', icon: User, category: 'Account' },
  { id: 'security', label: 'Security Settings', description: 'Manage passwords and 2FA', icon: Lock, category: 'Account' },
  { id: 'notifications', label: 'Notifications', description: 'Manage notification preferences', icon: Bell, category: 'Account' },

  // Help commands
  { id: 'docs', label: 'Documentation', description: 'Open official documentation', icon: BookOpen, category: 'Help' },
  { id: 'help', label: 'Help Center', description: 'Get help and support', icon: HelpCircle, category: 'Help' },
  { id: 'privacy', label: 'Privacy Policy', description: 'Read our privacy policy', icon: Shield, category: 'Help' },

  // Database
  { id: 'db-connect', label: 'Connect Database', description: 'Add a database connection', icon: Database, category: 'Database' },
  { id: 'db-query', label: 'Run Query', description: 'Execute a database query', icon: Database, category: 'Database' },
  { id: 'network', label: 'Network Inspector', description: 'Monitor network requests', icon: Globe, category: 'Tools' },
  { id: 'copy-path', label: 'Copy File Path', description: 'Copy current file path to clipboard', icon: Copy, category: 'File' },
];

export const CATEGORY_COLORS = {
  'File': 'text-emerald-400 bg-emerald-400/10',
  'View': 'text-sky-400 bg-sky-400/10',
  'Code': 'text-violet-400 bg-violet-400/10',
  'Git': 'text-orange-400 bg-orange-400/10',
  'Settings': 'text-yellow-400 bg-yellow-400/10',
  'Account': 'text-pink-400 bg-pink-400/10',
  'Help': 'text-slate-400 bg-slate-400/10',
  'Database': 'text-cyan-400 bg-cyan-400/10',
  'Tools': 'text-red-400 bg-red-400/10',
};