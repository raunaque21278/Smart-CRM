import { Bell, Search, MessageCircle } from "lucide-react";

function Navbar() {
  const userName = localStorage.getItem("user_name") || "User";
  const userRole = localStorage.getItem("user_role") || "USER";

  return (
    <header className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
      <div className="relative w-96">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />

        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center gap-5">
        <Bell className="text-gray-600 cursor-pointer" />
        <MessageCircle className="text-gray-600 cursor-pointer" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="text-sm font-semibold">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;