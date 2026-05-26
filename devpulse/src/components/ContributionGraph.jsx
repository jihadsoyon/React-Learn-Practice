// src/components/ContributionGraph.jsx
import { motion } from "framer-motion";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const getColor = (count) => {
  if (!count || count === 0) return "#161b22";
  if (count <= 2)  return "#0e4429";
  if (count <= 5)  return "#006d32";
  if (count <= 10) return "#26a641";
  if (count <= 20) return "#39d353";
  return "#6ee7b7";
};

const getLast52Weeks = (contributions) => {
  const contribMap = {};
  contributions.forEach(({ date, count }) => { contribMap[date] = count; });

  const weeks = [];
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  start.setDate(start.getDate() - start.getDay());

  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      const dateStr = date.toISOString().split("T")[0];
      week.push({ date: dateStr, count: contribMap[dateStr] || 0 });
    }
    weeks.push(week);
  }
  return weeks;
};

const ContributionGraph = ({ contributions = [], usedGraphQL = false }) => {
  const weeks = getLast52Weeks(contributions);
  const total = contributions.reduce((s, c) => s + c.count, 0);

  const monthLabels = [];
  weeks.forEach((week, wi) => {
    const d = new Date(week[0].date);
    if (d.getDate() <= 7) {
      monthLabels.push({ index: wi, label: MONTHS[d.getMonth()] });
    }
  });

  const CELL = 13;
  const GAP = 2;

  return (
    <motion.div
      style={{
        padding: "24px", borderRadius: "20px",
        background: "#111118", border: "1px solid #1e1e2e",
        marginBottom: "24px",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "8px",
      }}>
        <h2 style={{
          fontWeight: 600, fontSize: "16px", color: "#e2e8f0",
          fontFamily: "Space Grotesk, sans-serif", margin: 0,
        }}>
          Contribution Activity
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            fontSize: "11px", color: "#64748b",
            fontFamily: "JetBrains Mono, monospace",
          }}>
            {total.toLocaleString()} {usedGraphQL ? "contributions" : "events"} in the last year
          </span>
          {usedGraphQL ? (
            <span style={{
              fontSize: "10px", color: "#6ee7b7",
              fontFamily: "JetBrains Mono, monospace",
              padding: "2px 8px", borderRadius: "6px",
              border: "1px solid #6ee7b740",
              background: "#6ee7b710",
            }}>
              ✓ real data
            </span>
          ) : (
            <span style={{
              fontSize: "10px", color: "#f59e0b",
              fontFamily: "JetBrains Mono, monospace",
              padding: "2px 8px", borderRadius: "6px",
              border: "1px solid #f59e0b40",
              background: "#f59e0b10",
            }}>
              ⚠ events only
            </span>
          )}
        </div>
      </div>

      {/* Graph scroll container */}
      <div style={{ overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ minWidth: "660px", display: "inline-block" }}>

          {/* Month labels */}
          <div style={{ display: "flex", marginLeft: "34px", marginBottom: "6px" }}>
            {weeks.map((_, wi) => {
              const lbl = monthLabels.find(m => m.index === wi);
              return (
                <div key={wi} style={{
                  width: `${CELL + GAP}px`,
                  fontSize: "10px",
                  color: lbl ? "#8b949e" : "transparent",
                  fontFamily: "JetBrains Mono, monospace",
                  flexShrink: 0, userSelect: "none",
                }}>
                  {lbl?.label || "."}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex" }}>
            {/* Day labels */}
            <div style={{
              display: "flex", flexDirection: "column",
              gap: `${GAP}px`, marginRight: "6px", flexShrink: 0,
            }}>
              {DAYS.map((day, di) => (
                <div key={day} style={{
                  height: `${CELL}px`, width: "28px",
                  fontSize: "9px",
                  color: di % 2 === 1 ? "#8b949e" : "transparent",
                  fontFamily: "JetBrains Mono, monospace",
                  display: "flex", alignItems: "center",
                  userSelect: "none",
                }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Cell grid */}
            <div style={{ display: "flex", gap: `${GAP}px` }}>
              {weeks.map((week, wi) => (
                <div key={wi} style={{
                  display: "flex", flexDirection: "column", gap: `${GAP}px`,
                }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={`${day.date}: ${day.count} ${usedGraphQL ? "contribution" : "event"}${day.count !== 1 ? "s" : ""}`}
                      style={{
                        width: `${CELL}px`, height: `${CELL}px`,
                        borderRadius: "2px",
                        background: getColor(day.count),
                        border: day.count === 0 ? "1px solid #21262d" : "none",
                        flexShrink: 0, cursor: "default",
                        transition: "transform 0.1s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = "scale(1.4)";
                        e.currentTarget.style.position = "relative";
                        e.currentTarget.style.zIndex = "10";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.zIndex = "auto";
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div style={{
            display: "flex", alignItems: "center", gap: "4px",
            marginTop: "12px", justifyContent: "flex-end",
          }}>
            <span style={{ fontSize: "10px", color: "#64748b", fontFamily: "JetBrains Mono, monospace", marginRight: "4px" }}>
              Less
            </span>
            {[0, 2, 5, 10, 20].map(v => (
              <div key={v} style={{
                width: `${CELL}px`, height: `${CELL}px`, borderRadius: "2px",
                background: getColor(v),
                border: v === 0 ? "1px solid #21262d" : "none",
              }} />
            ))}
            <span style={{ fontSize: "10px", color: "#64748b", fontFamily: "JetBrains Mono, monospace", marginLeft: "4px" }}>
              More
            </span>
          </div>
        </div>
      </div>

      {/* Footer note */}
      {!usedGraphQL && (
        <p style={{
          marginTop: "12px", fontSize: "10px", color: "#475569",
          fontFamily: "JetBrains Mono, monospace", textAlign: "right",
        }}>
          For full contribution history → use "Continue with GitHub" or add a token
        </p>
      )}
    </motion.div>
  );
};

export default ContributionGraph;