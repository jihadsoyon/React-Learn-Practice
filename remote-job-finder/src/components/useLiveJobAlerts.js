import { useState, useEffect, useCallback, useRef } from "react";
import { fakeJobs } from "../data/fakeJobs";

// New fake jobs that simulate "live" arriving jobs
const INCOMING_JOBS = [
  {
    id: 101,
    title: "React Native Developer",
    company: "Linear",
    companyLogo: "https://logo.clearbit.com/linear.app",
    location: "Remote",
    type: "Full-time",
    salary: { min: 120000, max: 180000, currency: "$" },
    category: "Engineering",
    tags: ["React Native", "Mobile", "TypeScript"],
  },
  {
    id: 102,
    title: "Brand Designer",
    company: "Loom",
    companyLogo: "https://logo.clearbit.com/loom.com",
    location: "Remote",
    type: "Full-time",
    salary: { min: 90000, max: 140000, currency: "$" },
    category: "Design",
    tags: ["Branding", "Figma", "Remote"],
  },
  {
    id: 103,
    title: "Growth Engineer",
    company: "Superhuman",
    companyLogo: "https://logo.clearbit.com/superhuman.com",
    location: "Hybrid",
    type: "Full-time",
    salary: { min: 150000, max: 220000, currency: "$" },
    category: "Engineering",
    tags: ["Growth", "A/B Testing", "SQL"],
  },
  {
    id: 104,
    title: "AI Product Manager",
    company: "Replit",
    companyLogo: "https://logo.clearbit.com/replit.com",
    location: "Remote",
    type: "Full-time",
    salary: { min: 160000, max: 230000, currency: "$" },
    category: "Product",
    tags: ["AI", "Product", "Remote"],
  },
  {
    id: 105,
    title: "Design Systems Lead",
    company: "Framer",
    companyLogo: "https://logo.clearbit.com/framer.com",
    location: "Remote",
    type: "Full-time",
    salary: { min: 130000, max: 190000, currency: "$" },
    category: "Design",
    tags: ["Design Systems", "Figma", "Remote"],
  },
];

export const useLiveJobAlerts = (enabled = true) => {
  const [alerts, setAlerts] = useState([]);
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  const dismiss = useCallback((id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const dismissAll = useCallback(() => setAlerts([]), []);

  useEffect(() => {
    if (!enabled) return;

    // Show first alert after 4s, then every 12s
    const showNext = () => {
      const job = INCOMING_JOBS[indexRef.current % INCOMING_JOBS.length];
      indexRef.current += 1;

      const alert = {
        ...job,
        alertId: Date.now(),
        postedAgo: "Just now",
      };

      setAlerts((prev) => [alert, ...prev].slice(0, 4)); // max 4 toasts

      // Auto dismiss after 6s
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.alertId !== alert.alertId));
      }, 6000);
    };

    const initial = setTimeout(() => {
      showNext();
      timerRef.current = setInterval(showNext, 12000);
    }, 4000);

    return () => {
      clearTimeout(initial);
      clearInterval(timerRef.current);
    };
  }, [enabled]);

  return { alerts, dismiss, dismissAll };
};