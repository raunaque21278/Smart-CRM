import {
  LayoutDashboard,
  Users,
  TrendingUp,
  BadgeDollarSign,
  Ticket,
  LogOut,
  BarChart3,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("user_name") || "SmartCRM";
  const userRole = localStorage.getItem("user_role");

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Contacts", icon: Users, path: "/contacts" },
    { name: "Leads", icon: TrendingUp, path: "/leads" },
    { name: "Deals", icon: BadgeDollarSign, path: "/deals" },
    { name: "Tickets", icon: Ticket, path: "/tickets" },
  ];

  const adminMenu = [
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const renderMenu = (items) =>
    items.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-indigo-600 text-white shadow"
                : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`
          }
        >
          <Icon size={20} />
          <span>{item.name}</span>
        </NavLink>
      );
    });

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm p-5">
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">
        {userName}
      </h1>

      <nav className="space-y-2">
        {renderMenu(menu)}

        {userRole === "ADMIN" && (
          <>
            <p className="text-xs text-gray-400 mt-6 mb-2 px-4">ADMIN</p>
            {renderMenu(adminMenu)}
          </>
        )}
      </nav>

      <button
        onClick={handleLogout}
        className="absolute bottom-6 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;