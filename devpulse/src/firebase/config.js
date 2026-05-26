import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9HZHKj3rfooKl_xGJFrUMBP3rmhAk7B0",
  authDomain: "devpulse-65137.firebaseapp.com",
  projectId: "devpulse-65137",
  storageBucket: "devpulse-65137.firebasestorage.app",
  messagingSenderId: "1004526022041",
  appId: "1:1004526022041:web:966e7d2017d7ff7b1e7708"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope('read:user');
githubProvider.addScope('public_repo');