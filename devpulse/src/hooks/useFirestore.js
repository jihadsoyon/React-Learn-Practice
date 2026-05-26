// src/hooks/useFirestore.js
import { db } from "../firebase/config";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export const useFirestore = () => {
  const cacheUser = async (username, data) => {
    try {
      await setDoc(doc(db, "github_cache", username), {
        ...data,
        cachedAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Cache error:", e);
    }
  };

  const getCachedUser = async (username) => {
    try {
      const snap = await getDoc(doc(db, "github_cache", username));
      if (!snap.exists()) return null;
      
      const data = snap.data();
      const cacheAge = Date.now() - data.cachedAt?.toMillis();
      // Cache expires after 30 minutes
      if (cacheAge > 30 * 60 * 1000) return null;
      
      return data;
    } catch (e) {
      return null;
    }
  };

  return { cacheUser, getCachedUser };
};