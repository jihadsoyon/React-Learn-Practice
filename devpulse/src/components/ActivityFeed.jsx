// src/components/ActivityFeed.jsx
import { motion } from "framer-motion";

const eventMeta = {
  PushEvent:    { icon: "↑", label: "Push" },
  WatchEvent:   { icon: "★", label: "Star" },
  ForkEvent:    { icon: "⑂", label: "Fork" },
  CreateEvent:  { icon: "+", label: "Create" },
  IssuesEvent:  { icon: "!", label: "Issue" },
  PullRequestEvent: { icon: "↔", label: "PR" },
  default:      { icon: "◎", label: "Event" },
};

const ActivityFeed = ({ events }) => {
  if (!events || events.length === 0) return null;

  return (
    <motion.div
      style={{
        padding: "24px",
        borderRadius: "20px",
        background: "#111118",
        border: "1px solid #1e1e2e",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 style={{
        fontWeight: 600, fontSize: "16px", marginBottom: "16px",
        color: "#e2e8f0", fontFamily: "Space Grotesk, sans-serif",
      }}>
        Recent Activity
      </h2>

      <div style={{
        display: "flex", flexDirection: "column", gap: "8px",
        maxHeight: "300px", overflowY: "auto",
        scrollbarWidth: "thin", scrollbarColor: "#1e1e2e transparent",
      }}>
        {events.slice(0, 15).map((event, i) => {
          const meta = eventMeta[event.type] || eventMeta.default;
          return (
            <motion.div
              key={i}
              style={{
                display: "flex", alignItems: "flex-start", gap: "10px",
                padding: "10px 12px", borderRadius: "12px",
                background: "rgba(255,255,255,0.02)",
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ background: "rgba(110,231,183,0.05)" }}
            >
              <div style={{
                width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
                background: "#1e1e2e", color: "#6ee7b7",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontFamily: "JetBrains Mono, monospace",
              }}>
                {meta.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: "12px", fontWeight: 500, color: "#e2e8f0",
                  fontFamily: "Space Grotesk, sans-serif",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {event.repo?.name}
                </p>
                <p style={{
                  fontSize: "11px", color: "#64748b",
                  fontFamily: "JetBrains Mono, monospace", marginTop: "2px",
                }}>
                  {meta.label} · {new Date(event.created_at).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ActivityFeed;