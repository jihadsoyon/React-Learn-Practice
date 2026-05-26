// src/hooks/useGitHub.js
import { useState, useCallback } from "react";
import axios from "axios";

const GRAPHQL_QUERY = (username) => `
{
  user(login: "${username}") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

export const useGitHub = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async (username, token = null) => {
    setLoading(true);
    setError(null);
    try {
      const headers = token ? { Authorization: `token ${token}` } : {};

      const [userRes, reposRes, eventsRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${username}`, { headers }),
        axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }),
        axios.get(`https://api.github.com/users/${username}/events?per_page=100`, { headers }),
      ]);

      // Language breakdown
      const langMap = {};
      reposRes.data.forEach((repo) => {
        if (repo.language) langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      });
      const languages = Object.entries(langMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);

      // Try GraphQL for real contribution data (needs token)
      let contributions = [];
      let usedGraphQL = false;

      if (token) {
        try {
          const gqlRes = await axios.post(
            "https://api.github.com/graphql",
            { query: GRAPHQL_QUERY(username) },
            { headers: { Authorization: `bearer ${token}` } }
          );
          const calendar = gqlRes.data?.data?.user?.contributionsCollection?.contributionCalendar;
          if (calendar) {
            contributions = calendar.weeks.flatMap(week =>
              week.contributionDays
                .filter(d => d.contributionCount > 0)
                .map(d => ({ date: d.date, count: d.contributionCount }))
            );
            usedGraphQL = true;
          }
        } catch (_) {
          // GraphQL failed, fall back to events
        }
      }

      if (!usedGraphQL) {
        // Fallback: use events API
        const map = {};
        eventsRes.data.forEach((event) => {
          const date = event.created_at.split("T")[0];
          const weight = event.type === "PushEvent"
            ? (event.payload?.commits?.length || 1)
            : 1;
          map[date] = (map[date] || 0) + weight;
        });
        contributions = Object.entries(map).map(([date, count]) => ({ date, count }));
      }

      return {
        user: userRes.data,
        repos: reposRes.data.slice(0, 20),
        languages,
        contributions,
        events: eventsRes.data,
        totalStars: reposRes.data.reduce((acc, r) => acc + r.stargazers_count, 0),
        topRepos: reposRes.data
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6),
        usedGraphQL,
      };
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch GitHub data");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchUser, loading, error };
};