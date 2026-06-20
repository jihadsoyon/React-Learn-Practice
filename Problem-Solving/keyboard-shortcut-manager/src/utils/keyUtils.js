// Normalize a KeyboardEvent into a consistent string like "Ctrl+Shift+K"
export function eventToCombo(e) {
  const parts = [];
  if (e.ctrlKey || e.metaKey) parts.push('Ctrl');
  if (e.shiftKey) parts.push('Shift');
  if (e.altKey) parts.push('Alt');

  const key = e.key;
  const ignoredKeys = ['Control', 'Shift', 'Alt', 'Meta'];

  if (!ignoredKeys.includes(key)) {
    const formattedKey = key.length === 1 ? key.toUpperCase() : key;
    parts.push(formattedKey);
  }

  return parts.join('+');
}

export function comboToDisplay(combo) {
  return combo
    .split('+')
    .map((k) => k.trim())
    .join(' + ');
}

export function isComboComplete(combo) {
  const keys = combo.split('+');
  const lastKey = keys[keys.length - 1];
  const modifiers = ['Ctrl', 'Shift', 'Alt'];
  return lastKey && !modifiers.includes(lastKey);
}