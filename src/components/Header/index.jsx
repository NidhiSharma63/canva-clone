// Header.jsx
import useAuth from "@/api/queries/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // shadcn import
import templates from "@/constant/template";
import { useGlobalState } from "@/Providers/GlobalStateProvider";
import { User } from "lucide-react";
import { useCallback } from "react";

export default function Header() {
  const { useLogoutQuery } = useAuth();
  const { setUserSelectedTemplate, userSelectedTemplate } = useGlobalState();
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
      {/* Center */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex gap-2 items-center bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-md font-medium transition">
              <span className="text-white">Template:</span>
              <span className="bg-white text-purple-600 px-2 py-0.5 rounded text-sm">
                {userSelectedTemplate
                  ? templates.find((t) => t.id === userSelectedTemplate)?.name
                  : "Select"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.187l3.71-3.955a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0l-4.24-4.52a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="center"
            className="w-64 bg-white rounded-lg shadow-lg p-2 max-h-80 overflow-y-auto"
          >
            {templates.map((template) => (
              <DropdownMenuItem
                key={template.id}
                className="flex justify-between items-center p-2 rounded-md hover:bg-purple-100 cursor-pointer"
                onClick={() => setUserSelectedTemplate(template.id)}
              >
                <div>
                  <p className="font-medium text-gray-800">{template.name}</p>
                  <p className="text-xs text-gray-500">
                    {template.width}×{template.height}
                  </p>
                </div>
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">
                  {Math.round((template.width / template.height) * 100) / 100}:1
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
