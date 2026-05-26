// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGitHub } from "../hooks/useGitHub";
import { useFirestore } from "../hooks/useFirestore";
import HeroSection from "../components/HeroSection";
import StatCard from "../components/StatCard";
import LanguageChart from "../components/LanguageChart";
import ContributionGraph from "../components/ContributionGraph";
import RepoCard from "../components/RepoCard";
import ActivityFeed from "../components/ActivityFeed";
import Footer from "../components/Footer";

const Profile = ({ username, token, onBack }) => {
  const { fetchUser, loading, error } = useGitHub();
  const { cacheUser, getCachedUser } = useFirestore();
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      // If token provided, skip cache (get fresh real data)
      if (!token) {
        const cached = await getCachedUser(username);
        if (cached) { setData(cached); return; }
      }
      const result = await fetchUser(username, token);
      if (result) {
        setData(result);
        if (!token) await cacheUser(username, result);
      }
    };
    load();
  }, [username, token]);

  if (loading) return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#0a0a0f",
    }}>
      <motion.div
        style={{ textAlign: "center" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.div
          style={{ fontSize: "48px", marginBottom: "16px", display: "inline-block" }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >⚡</motion.div>
        <p style={{ color: "#6ee7b7", fontFamily: "JetBrains Mono, monospace", fontSize: "14px" }}>
          Analyzing @{username}...
        </p>
      </motion.div>
    </div>
  );

  if (error) return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#0a0a0f",
    }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#f87171", fontSize: "18px", marginBottom: "16px" }}>⚠ {error}</p>
        <button onClick={onBack} style={{
          color: "#6ee7b7", background: "none", border: "none",
          cursor: "pointer", fontFamily: "JetBrains Mono, monospace", fontSize: "14px",
        }}>← go back</button>
      </div>
    </div>
  );

  if (!data) return null;
  const { user, topRepos, languages, totalStars, contributions, events, usedGraphQL } = data;

  return (
    <motion.div
      style={{ minHeight: "100vh", background: "#0a0a0f" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "88px 24px 40px" }}>

        {/* Back button */}
        <motion.button
          onClick={onBack}
          style={{
            background: "none", border: "none", color: "#64748b", cursor: "pointer",
            marginBottom: "24px", fontFamily: "JetBrains Mono, monospace", fontSize: "13px",
            display: "flex", alignItems: "center", gap: "6px", padding: 0,
          }}
          whileHover={{ color: "#6ee7b7", x: -4 }}
        >
          ← back
        </motion.button>

        <HeroSection user={user} totalStars={totalStars} />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px", marginBottom: "24px",
        }}>
          <StatCard label="Public Repos" value={user.public_repos} icon="📁" delay={0} />
          <StatCard label="Total Stars"  value={totalStars}         icon="⭐" delay={0.08} />
          <StatCard label="Followers"    value={user.followers}     icon="👥" delay={0.16} />
          <StatCard label="Following"    value={user.following}     icon="🔔" delay={0.24} />
        </div>

        <ContributionGraph contributions={contributions} usedGraphQL={usedGraphQL} />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px", marginBottom: "32px",
        }}>
          {languages?.length > 0 && <LanguageChart languages={languages} />}
          {events?.length > 0    && <ActivityFeed  events={events} />}
        </div>

        {topRepos?.length > 0 && (
          <>
            <h2 style={{
              fontSize: "17px", fontWeight: 600, color: "#e2e8f0",
              fontFamily: "Space Grotesk, sans-serif", marginBottom: "16px",
            }}>
              Top Repositories
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: "16px",
            }}>
              {topRepos.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} delay={i * 0.07} />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </motion.div>
  );
};

export default Profile;