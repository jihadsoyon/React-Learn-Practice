import { NavLink } from "react-router";
import { Home, Clock, BarChart2 } from "lucide-react";

export default function Navbar() {
  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/timeline", label: "Timeline", icon: Clock },
    { to: "/stats", label: "Stats", icon: BarChart2 },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-bold text-lg text-gray-900 tracking-tight">KeenKeeper</span>
        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
