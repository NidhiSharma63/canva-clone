// Header.jsx
import useAuth from "@/api/queries/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // shadcn import
import { User } from "lucide-react";
import { useCallback } from "react";

export default function Header() {
  const { useLogoutQuery } = useAuth();
  const { mutate: logout } = useLogoutQuery();
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <header className="w-full flex items-center justify-between px-4 py-4 shadow-md bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 text-white">
      {/* Left - Logo */}
      <div className="flex items-center gap-3 ">
        <div className="text-white font-bold rounded-lg text-lg px-2 py-1">
          My Canva
        </div>
      </div>

      {/* Right - Share + Download + Profile */}
      <div className="flex items-center gap-6">
        <input
          type="text"
          placeholder="Untitled design"
          className="bg-transparent border-b border-white/40 outline-none text-lg font-medium placeholder-white/70"
        />
        <button className="text-white cursor-pointer border border-white/80 rounded px-2 py-1 flex items-center gap-1">
          Download
        </button>

        {/* Profile with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-9 h-9 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold cursor-pointer">
              <User size={20} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
