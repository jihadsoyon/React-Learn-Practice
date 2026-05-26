import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-700 text-white px-4 py-3 rounded-lg shadow-lg animate-slide-up">
      <CheckCircle size={18} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}