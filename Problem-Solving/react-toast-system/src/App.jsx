import ToastContainer from "./components/ToastContainer";
import { ToastProvider, useToast } from "./components/ToastContext";

const Home = () => {
  const { addToast } = useToast();

  return (
    <div className="app">
      <h1>🔔 Custom Toast Notification System</h1>

      <div className="button-group">
        <button
          onClick={() => addToast("Success Notification!", "success")}
        >
          Show Success
        </button>

        <button
          onClick={() => addToast("Error Notification!", "error")}
        >
          Show Error
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <Home />
    </ToastProvider>
  );
}

export default App;