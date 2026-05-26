import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Bookmarks from "./pages/Bookmarks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AIMatch from "./pages/AIMatch";
import Insights from "./pages/Insights";
import CompareModal from "./components/CompareModal";
import LiveJobToast from "./components/LiveJobToast";
import { useLiveJobAlerts } from "./components/useLiveJobAlerts";

// Inner component so hooks work inside BrowserRouter context
const AppInner = () => {
  const [compareJobs, setCompareJobs] = React.useState([]);
  const { alerts, dismiss } = useLiveJobAlerts(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/jobs"
            element={
              <Jobs
                compareJobs={compareJobs}
                setCompareJobs={setCompareJobs}
              />
            }
          />
          {/* ✅ Bookmarks — compareJobs props pass হচ্ছে */}
          <Route
            path="/bookmarks"
            element={
              <Bookmarks
                compareJobs={compareJobs}
                setCompareJobs={setCompareJobs}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ai-match" element={<AIMatch />} />
          {/* ✅ NEW: Insights page — Salary Chart + Skill Gap Analyzer */}
          <Route path="/insights" element={<Insights />} />
          <Route
            path="*"
            element={
              <div className="text-center pt-32">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                  404
                </h1>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />

      {/* Compare Modal */}
      {compareJobs.length > 1 && (
        <CompareModal
          jobs={compareJobs}
          onClose={() => setCompareJobs([])}
        />
      )}

      {/* ✅ NEW: Live Job Alert Toasts — bottom-right এ দেখাবে */}
      <LiveJobToast alerts={alerts} onDismiss={dismiss} />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <JobProvider>
          <AppInner />
        </JobProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;