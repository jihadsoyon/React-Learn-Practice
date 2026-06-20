import { useEffect, useRef } from 'react';
import { eventToCombo } from '../utils/keyUtils';

// Listens globally and triggers matching shortcut actions
export function useShortcutListener(shortcuts, enabled = true) {
  const shortcutsRef = useRef(shortcuts);
  shortcutsRef.current = shortcuts;

  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e) {
      const combo = eventToCombo(e);

      const matched = shortcutsRef.current.find(
        (s) => s.combo.toLowerCase() === combo.toLowerCase()
      );

      if (matched) {
        e.preventDefault();
        triggerAction(matched);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);
}

function triggerAction(shortcut) {
  switch (shortcut.action) {
    case 'alert':
      window.alert(`🔥 Shortcut Triggered: ${shortcut.name}`);
      break;
    case 'scrollTop':
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
    case 'scrollBottom':
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      break;
    case 'console':
      console.log(`Shortcut fired: ${shortcut.name}`);
      break;
    case 'reload':
      window.location.reload();
      break;
    default:
      console.log(`No handler for action: ${shortcut.action}`);
  }
}