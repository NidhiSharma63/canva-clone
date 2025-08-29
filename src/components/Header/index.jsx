// Header.jsx
import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full  flex items-center justify-between px-4 py-4 shadow-md bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 text-white">
      {/* Left - Logo + Title */}
      <div className="flex items-center gap-3 ">
        <div className="text-white font-bold rounded-lg text-lg px-2 py-1">
          My Canva
        </div>
      </div>

      {/* Center - Toolbar */}
      {/* <div className="flex items-center gap-2">
        <button
          variant="secondary"
          className="bg-white/20 text-white hover:bg-white/30"
        >
          File
        </button>
        <button
          variant="secondary"
          className="bg-white/20 text-white hover:bg-white/30"
        >
          Edit
        </button>
        <button
          variant="secondary"
          className="bg-white/20 text-white hover:bg-white/30"
        >
          Resize
        </button>
        <button
          variant="secondary"
          className="bg-white/20 text-white hover:bg-white/30 flex items-center gap-1"
        >
          <Plus size={16} /> Add Page
        </button>
      </div> */}

      {/* Right - Share + Download + Profile */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Untitled design"
          className="bg-transparent border-b border-white/40 outline-none text-lg font-medium placeholder-white/70"
        />
        <button className="text-white font-semibold cursor-pointer border-2 border-white/80 rounded px-2 py-1 flex items-center gap-1">
          Download
        </button>
        <div className="w-9 h-9 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold cursor-pointer">
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
