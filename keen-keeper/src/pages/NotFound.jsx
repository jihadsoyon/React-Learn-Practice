import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="text-xl font-semibold text-gray-700">Page not found</p>
      <p className="text-gray-500 text-sm">The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-2 bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
}
