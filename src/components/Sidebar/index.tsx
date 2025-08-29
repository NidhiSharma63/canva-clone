// Sidebar.jsx

import { useState } from "react";
import IconsTab from "./IconsTab";
import ImagesComponent from "./IconsTab/ImagesComponent";
import ShapesComponent from "./IconsTab/ShapesComponent";
import TextComponent from "./IconsTab/TextComponent";

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
        <div className="w-64 relative z-[1] bg-white shadow-2xl h-full m-auto rounded px-4 py-8">
          {activeTab === "text" && <TextComponent />}
          {activeTab === "images" && <ImagesComponent />}
          {activeTab === "shapes" && <ShapesComponent />}
          {activeTab === "project" && <div>📑 Manage Projects</div>}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
