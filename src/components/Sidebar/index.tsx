// Sidebar.jsx

import { useState } from "react";
import IconsTab from "./IconsTab";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <div className="flex h-full">
      {/* Left narrow sidebar */}
      <IconsTab activeTab={activeTab} toggleTab={toggleTab} />

      {/* Right side dynamic panel */}
      {activeTab && (
        <div className="w-80 relative z-10 bg-white shadow-2xl h-full m-auto rounded p-4">
          {activeTab === "text" && <div>✍️ Add Text options here</div>}
          {activeTab === "images" && <div>🖼️ Upload/Select Images</div>}
          {activeTab === "shapes" && <div>🔺 Shapes library</div>}
          {activeTab === "project" && <div>📑 Manage Projects</div>}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
