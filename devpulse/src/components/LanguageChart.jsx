// src/components/LanguageChart.jsx
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6ee7b7", "#818cf8", "#f472b6", "#fb923c", "#38bdf8", "#a3e635"];

const LanguageChart = ({ languages }) => {
  if (!languages || languages.length === 0) return null;
  const total = languages.reduce((s, l) => s + l.count, 0);

  return (
    <motion.div
      style={{
        padding: "24px",
        borderRadius: "20px",
        background: "#111118",
        border: "1px solid #1e1e2e",
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 style={{
        fontWeight: 600, fontSize: "16px", marginBottom: "20px",
        color: "#e2e8f0", fontFamily: "Space Grotesk, sans-serif",
      }}>
        Language Breakdown
      </h2>

      <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
        {/* Pie chart */}
        <div style={{ flexShrink: 0 }}>
          <ResponsiveContainer width={150} height={150}>
            <PieChart>
              <Pie
                data={languages}
                dataKey="count"
                nameKey="name"
                innerRadius={42}
                outerRadius={70}
                strokeWidth={0}
              >
                {languages.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#111118",
                  border: "1px solid #1e1e2e",
                  borderRadius: "10px",
                  color: "#e2e8f0",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Language bars */}
        <div style={{ flex: 1, minWidth: "160px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {languages.map((lang, i) => {
            const pct = Math.round((lang.count / total) * 100);
            return (
              <motion.div
                key={lang.name}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div style={{
                  width: "9px", height: "9px", borderRadius: "50%",
                  background: COLORS[i % COLORS.length], flexShrink: 0,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "12px", color: "#e2e8f0", fontFamily: "Space Grotesk, sans-serif" }}>
                      {lang.name}
                    </span>
                    <span style={{ fontSize: "11px", color: "#64748b", fontFamily: "JetBrains Mono, monospace" }}>
                      {pct}%
                    </span>
                  </div>
                  <div style={{ height: "4px", borderRadius: "4px", background: "#1e1e2e", overflow: "hidden" }}>
                    <motion.div
                      style={{ height: "100%", borderRadius: "4px", background: COLORS[i % COLORS.length] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageChart;