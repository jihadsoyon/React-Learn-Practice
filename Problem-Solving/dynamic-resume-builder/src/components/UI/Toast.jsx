export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-2xl border animate-in fade-in slide-in-from-bottom-4 duration-300
        ${toast.type === "error"
          ? "bg-red-900/80 text-red-200 border-red-700/50"
          : "bg-green-900/80 text-green-200 border-green-700/50"
        }`}
    >
      {toast.type === "error" ? "🗑 " : "✓ "}{toast.msg}
    </div>
  );
}