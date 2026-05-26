import { useState, useEffect } from "react";
import { Plus, Users, CheckCircle, AlertCircle, Zap } from "lucide-react";
import FriendCard from "../components/FriendCard";
import friendsData from "../data/friends.json";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a fetch delay
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const total = friends.length;
  const onTrack = friends.filter((f) => f.status === "on-track").length;
  const needAttention = friends.filter((f) => f.status !== "on-track").length;
  const interactions = 12; // static sample count

  const summaryCards = [
    { label: "Total Friends", value: total, icon: Users },
    { label: "On Track", value: onTrack, icon: CheckCircle },
    { label: "Need Attention", value: needAttention, icon: AlertCircle },
    { label: "Interactions This Month", value: interactions, icon: Zap },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner */}
      <section className="bg-white py-12 px-4 text-center border-b border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Friends to keep close in your life</h1>
        <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">
          <Plus size={16} /> Add a Friend
        </button>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8">
          {summaryCards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Friends Grid */}
      <section className="max-w-6xl mx-auto w-full px-4 py-8 flex-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Friends</h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading your friends...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}