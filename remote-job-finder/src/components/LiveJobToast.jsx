import React, { useEffect, useState } from "react";
import { X, Zap, MapPin, DollarSign } from "lucide-react";

const SingleToast = ({ alert, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slide in
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => onDismiss(alert.alertId), 300);
  };

  const formatSalary = (s) =>
    `${s.currency}${Math.round(s.min / 1000)}k–${s.currency}${Math.round(s.max / 1000)}k`;

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      }`}
    >
      <div className="bg-dark-800 border border-primary-500/30 rounded-2xl p-4 shadow-2xl shadow-black/40 w-80 relative overflow-hidden">
        {/* Glow line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-violet-500 to-fuchsia-500" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Zap size={13} className="text-primary-400" />
            <span className="text-xs font-semibold text-primary-400 uppercase tracking-wide">
              New Job Alert
            </span>
            {/* Live dot */}
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">Live</span>
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Job Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-dark-700 flex items-center justify-center flex-shrink-0">
            <img
              src={alert.companyLogo}
              alt={alert.company}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.innerHTML = `<span class="text-base font-bold text-gray-400">${alert.company[0]}</span>`;
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-white text-sm truncate">
              {alert.title}
            </p>
            <p className="text-xs text-gray-400">{alert.company}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mt-3">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <MapPin size={11} />
            {alert.location}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <DollarSign size={11} />
            {formatSalary(alert.salary)}
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {alert.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-dark-700 text-gray-400 px-2 py-0.5 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Progress bar (auto-dismiss countdown) */}
        <div className="mt-3 h-0.5 bg-dark-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500/60 rounded-full"
            style={{
              animation: "shrink 6s linear forwards",
            }}
          />
        </div>

        <style>{`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
};

const LiveJobToast = ({ alerts, onDismiss }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 items-end">
      {alerts.map((alert) => (
        <SingleToast key={alert.alertId} alert={alert} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

export default LiveJobToast;