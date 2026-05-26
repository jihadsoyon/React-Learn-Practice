import { useToast } from "./ToastContext";
import Toast from "./Toast";

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </div>
  );
};

export default ToastContainer;