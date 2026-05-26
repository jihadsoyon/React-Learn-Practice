import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Phone, MessageSquare, Video, Clock, Archive, Trash2, Pencil } from "lucide-react";
import Toast from "../components/Toast";
import { useTimeline } from "../context/TimeLineContext";
import friendsData from "../data/friends.json";

const statusStyles = {
  overdue: "bg-red-100 text-red-700",
  "almost due": "bg-yellow-100 text-yellow-700",
  "on-track": "bg-green-100 text-green-700",
};

const tagColors = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-orange-100 text-orange-700",
  "bg-teal-100 text-teal-700",
];

export default function FriendDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();
  const [toast, setToast] = useState(null);

  const friend = friendsData.find((f) => f.id === parseInt(id));

  if (!friend) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Friend not found.</p>
        <button onClick={() => navigate("/")} className="text-green-700 underline text-sm">Go Home</button>
      </div>
    );
  }

  const handleCheckIn = (type) => {
    addEntry({ type, friendName: friend.name, title: `${capitalize(type)} with ${friend.name}` });
    setToast(`${capitalize(type)} logged with ${friend.name}!`);
  };

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="max-w-6xl mx-auto w-full px-4 py-8 flex-1">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center gap-3">
            <img src={friend.picture} alt={friend.name} className="w-20 h-20 rounded-full object-cover" />
            <h1 className="text-xl font-bold text-gray-900">{friend.name}</h1>
            <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${statusStyles[friend.status]}`}>
              {friend.status}
            </span>
            <div className="flex flex-wrap justify-center gap-1">
              {friend.tags.map((tag, i) => (
                <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium uppercase ${tagColors[i % tagColors.length]}`}>
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 italic">"{friend.bio}"</p>
            <p className="text-sm text-gray-500">{friend.email}</p>

            <div className="w-full border-t border-gray-100 mt-2 pt-4 flex flex-col gap-2">
              <button className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <Clock size={14} /> Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <Archive size={14} /> Archive
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-red-100 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{friend.days_since_contact}</p>
                <p className="text-xs text-gray-500 mt-1">Days Since Contact</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{friend.goal}</p>
                <p className="text-xs text-gray-500 mt-1">Goal (Days)</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-base font-bold text-gray-900">{friend.next_due_date}</p>
                <p className="text-xs text-gray-500 mt-1">Next Due</p>
              </div>
            </div>

            {/* Relationship Goal */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">Relationship Goal</p>
                <button className="text-xs text-green-700 flex items-center gap-1 hover:underline">
                  <Pencil size={12} /> Edit
                </button>
              </div>
              <p className="text-sm text-gray-600">Connect every <strong>{friend.goal} days</strong></p>
            </div>

            {/* Quick Check-In */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-700 mb-4">Quick Check-In</p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleCheckIn("call")}
                  className="flex flex-col items-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  <Phone size={18} className="text-green-700" /> Call
                </button>
                <button
                  onClick={() => handleCheckIn("text")}
                  className="flex flex-col items-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  <MessageSquare size={18} className="text-green-700" /> Text
                </button>
                <button
                  onClick={() => handleCheckIn("video")}
                  className="flex flex-col items-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  <Video size={18} className="text-green-700" /> Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
