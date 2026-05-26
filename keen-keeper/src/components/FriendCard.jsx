import { useNavigate } from "react-router";

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

export default function FriendCard({ friend }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="w-14 h-14 rounded-full object-cover"
      />
      <p className="font-semibold text-sm text-gray-800 text-center">{friend.name}</p>
      <p className="text-xs text-gray-500">{friend.days_since_contact}d ago</p>
      <div className="flex flex-wrap justify-center gap-1">
        {friend.tags.map((tag, i) => (
          <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wide ${tagColors[i % tagColors.length]}`}>
            {tag}
          </span>
        ))}
      </div>
      <span className={`text-xs px-3 py-0.5 rounded-full font-semibold capitalize ${statusStyles[friend.status]}`}>
        {friend.status}
      </span>
    </div>
  );
}
