import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGitHub } from "../hooks/useGitHub";
import { useFirestore } from "../hooks/useFirestore";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6ee7b7","#818cf8","#f472b6","#fb923c","#38bdf8","#a3e635"];

const Dashboard = ({ username, onBack }) => {
  const { fetchUser, loading, error } = useGitHub();
  const { cacheUser, getCachedUser } = useFirestore();
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const cached = await getCachedUser(username);
      if (cached) { setData(cached); return; }
      const result = await fetchUser(username);
      if (result) { setData(result); await cacheUser(username, result); }
    };
    load();
  }, [username]);

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0a0a0f" }}>
      <motion.div style={{ textAlign:"center" }}
        animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:1.5, repeat:Infinity }}>
        <div style={{ fontSize:"48px", marginBottom:"16px" }}>⚡</div>
        <p style={{ color:"#6ee7b7", fontFamily:"JetBrains Mono, monospace", fontSize:"14px" }}>
          Analyzing @{username}...
        </p>
      </motion.div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0a0a0f" }}>
      <div style={{ textAlign:"center" }}>
        <p style={{ color:"#f87171", fontSize:"18px", marginBottom:"16px" }}>⚠ {error}</p>
        <button onClick={onBack} style={{ color:"#6ee7b7", background:"none", border:"none", cursor:"pointer", fontFamily:"JetBrains Mono, monospace" }}>
          ← go back
        </button>
      </div>
    </div>
  );

  if (!data) return null;
  const { user, topRepos, languages, totalStars } = data;

  const card = {
    background:"#111118", border:"1px solid #1e1e2e", borderRadius:"16px", padding:"24px",
  };

  return (
    <motion.div style={{ minHeight:"100vh", background:"#0a0a0f", paddingTop:"96px", paddingBottom:"64px" }}
      initial={{ opacity:0 }} animate={{ opacity:1 }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 24px" }}>

        {/* Back */}
        <motion.button onClick={onBack}
          style={{ background:"none", border:"none", color:"#64748b", cursor:"pointer", marginBottom:"32px", fontFamily:"JetBrains Mono, monospace", fontSize:"14px", display:"flex", alignItems:"center", gap:"8px" }}
          whileHover={{ color:"#6ee7b7", x:-4 }}>
          ← back
        </motion.button>

        {/* Profile Card */}
        <motion.div style={{ ...card, display:"flex", gap:"24px", alignItems:"flex-start", marginBottom:"32px", flexWrap:"wrap" }}
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <img src={user.avatar_url} alt={user.login}
            style={{ width:"96px", height:"96px", borderRadius:"16px", border:"2px solid #6ee7b7" }} />
          <div style={{ flex:1 }}>
            <h1 style={{ fontSize:"24px", fontWeight:700, color:"#e2e8f0", fontFamily:"Space Grotesk, sans-serif", marginBottom:"4px" }}>
              {user.name || user.login}
            </h1>
            <p style={{ color:"#6ee7b7", fontFamily:"JetBrains Mono, monospace", fontSize:"13px", marginBottom:"8px" }}>
              @{user.login}
            </p>
            {user.bio && <p style={{ color:"#64748b", fontSize:"14px", marginBottom:"12px", fontFamily:"Space Grotesk, sans-serif" }}>{user.bio}</p>}
            <div style={{ display:"flex", gap:"20px", flexWrap:"wrap" }}>
              {user.location && <span style={{ color:"#64748b", fontSize:"13px", fontFamily:"JetBrains Mono, monospace" }}>📍 {user.location}</span>}
              {user.company && <span style={{ color:"#64748b", fontSize:"13px", fontFamily:"JetBrains Mono, monospace" }}>🏢 {user.company}</span>}
              <span style={{ color:"#64748b", fontSize:"13px", fontFamily:"JetBrains Mono, monospace" }}>👥 {user.followers} followers</span>
            </div>
          </div>
          <motion.a href={user.html_url} target="_blank" rel="noopener noreferrer"
            style={{ padding:"10px 20px", borderRadius:"12px", background:"#6ee7b7", color:"#0a0a0f", fontWeight:700, fontSize:"14px", textDecoration:"none", fontFamily:"Space Grotesk, sans-serif" }}
            whileHover={{ scale:1.05 }}>
            View GitHub →
          </motion.a>
        </motion.div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"16px", marginBottom:"32px" }}>
          {[
            { label:"Public Repos", value:user.public_repos, icon:"📁" },
            { label:"Total Stars", value:totalStars, icon:"⭐" },
            { label:"Followers", value:user.followers, icon:"👥" },
            { label:"Following", value:user.following, icon:"🔔" },
          ].map((s, i) => (
            <motion.div key={i} style={card}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
              whileHover={{ borderColor:"#6ee7b7", y:-2 }}>
              <p style={{ fontSize:"28px", marginBottom:"4px" }}>{s.icon}</p>
              <p style={{ fontSize:"32px", fontWeight:700, color:"#6ee7b7", fontFamily:"JetBrains Mono, monospace" }}>
                {s.value?.toLocaleString()}
              </p>
              <p style={{ fontSize:"13px", color:"#64748b", fontFamily:"Space Grotesk, sans-serif" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Language Chart */}
        {languages?.length > 0 && (
          <motion.div style={{ ...card, marginBottom:"32px" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}>
            <h2 style={{ fontSize:"18px", fontWeight:600, color:"#e2e8f0", fontFamily:"Space Grotesk, sans-serif", marginBottom:"24px" }}>
              Language Breakdown
            </h2>
            <div style={{ display:"flex", alignItems:"center", gap:"32px", flexWrap:"wrap" }}>
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={languages} dataKey="count" nameKey="name" innerRadius={50} outerRadius={80} strokeWidth={0}>
                    {languages.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background:"#111118", border:"1px solid #1e1e2e", borderRadius:"12px", color:"#e2e8f0" }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"12px" }}>
                {languages.map((lang, i) => {
                  const total = languages.reduce((s,l) => s+l.count, 0);
                  const pct = Math.round(lang.count/total*100);
                  return (
                    <div key={lang.name} style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                      <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:COLORS[i%COLORS.length], flexShrink:0 }} />
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:"13px", marginBottom:"4px" }}>
                          <span style={{ color:"#e2e8f0", fontFamily:"Space Grotesk, sans-serif" }}>{lang.name}</span>
                          <span style={{ color:"#64748b", fontFamily:"JetBrains Mono, monospace" }}>{pct}%</span>
                        </div>
                        <div style={{ height:"4px", borderRadius:"4px", background:"#1e1e2e", overflow:"hidden" }}>
                          <motion.div style={{ height:"100%", borderRadius:"4px", background:COLORS[i%COLORS.length] }}
                            initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ duration:0.8, delay:i*0.1 }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Top Repos */}
        <h2 style={{ fontSize:"18px", fontWeight:600, color:"#e2e8f0", fontFamily:"Space Grotesk, sans-serif", marginBottom:"16px" }}>
          Top Repositories
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"16px" }}>
          {topRepos?.map((repo, i) => (
            <motion.a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
              style={{ ...card, textDecoration:"none", display:"block" }}
              initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ delay:i*0.08 }}
              whileHover={{ borderColor:"#6ee7b7", y:-3 }}>
              <h3 style={{ color:"#e2e8f0", fontWeight:600, fontSize:"15px", marginBottom:"8px", fontFamily:"Space Grotesk, sans-serif" }}>
                {repo.name}
              </h3>
              <p style={{ color:"#64748b", fontSize:"13px", marginBottom:"16px", fontFamily:"Space Grotesk, sans-serif", lineHeight:1.5 }}>
                {repo.description || "No description"}
              </p>
              <div style={{ display:"flex", gap:"16px", fontSize:"12px", color:"#64748b", fontFamily:"JetBrains Mono, monospace" }}>
                {repo.language && <span>● {repo.language}</span>}
                <span>★ {repo.stargazers_count}</span>
                <span>⑂ {repo.forks_count}</span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default Dashboard;