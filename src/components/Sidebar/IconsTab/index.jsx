import { Folder, Image, LayoutTemplate, Shapes, Type } from "lucide-react";
const IconsTab = ({ activeTab, toggleTab }) => {
  return (
    <div className="w-20 h-full flex flex-col items-center py-4 gap-6 bg-white border-r border-gray-200">
      <button
        onClick={() => toggleTab("layers")}
        className="flex flex-col items-center gap-1"
      >
        <div
          className={`p-2 rounded-md transition ${
            activeTab === "layers"
              ? "bg-gray-200 shadow-sm"
              : "hover:bg-gray-100 hover:shadow-sm"
          }`}
        >
          <LayoutTemplate size={22} className="text-gray-500" />
        </div>
        <span className="text-xs text-gray-500">Design</span>
      </button>

      <button
        onClick={() => toggleTab("text")}
        className="flex flex-col items-center gap-1"
      >
        <div
          className={`p-2 rounded-md transition ${
            activeTab === "text"
              ? "bg-gray-200 shadow-sm"
              : "hover:bg-gray-100 hover:shadow-sm"
          }`}
        >
          <Type size={22} className="text-gray-500" />
        </div>
        <span className="text-xs text-gray-500">Text</span>
      </button>

      <button
        onClick={() => toggleTab("images")}
        className="flex flex-col items-center gap-1"
      >
        <div
          className={`p-2 rounded-md transition ${
            activeTab === "images"
              ? "bg-gray-200 shadow-sm"
              : "hover:bg-gray-100 hover:shadow-sm"
          }`}
        >
          <Image size={22} className="text-gray-500" />
        </div>
        <span className="text-xs text-gray-500">Images</span>
      </button>

      <button
        onClick={() => toggleTab("shapes")}
        className="flex flex-col items-center gap-1"
      >
        <div
          className={`p-2 rounded-md transition ${
            activeTab === "shapes"
              ? "bg-gray-200 shadow-sm"
              : "hover:bg-gray-100 hover:shadow-sm"
          }`}
        >
          <Shapes size={22} className="text-gray-500" />
        </div>
        <span className="text-xs text-gray-500">Shapes</span>
      </button>

      <button
        onClick={() => toggleTab("projects")}
        className="flex flex-col items-center gap-1"
      >
        <div
          className={`p-2 rounded-md transition ${
            activeTab === "projects"
              ? "bg-gray-200 shadow-sm"
              : "hover:bg-gray-100 hover:shadow-sm"
          }`}
        >
          <Folder size={22} className="text-gray-500" />
        </div>
        <span className="text-xs text-gray-500">Projects</span>
      </button>
    </div>
  );
};

export default IconsTab;
