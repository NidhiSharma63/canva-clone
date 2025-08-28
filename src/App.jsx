import { useEffect, useState } from "react";
import Canvas from "./components/Canvas.jsx";
import Sidebar from "./components/Sidebar.jsx";
const App = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    console.log(elements, "elements");
    // JSON.stringify(elements);
    if (elements.length > 0) {
      localStorage.setItem("elements", JSON.stringify(elements));
    }
  }, [elements]);

  // set elements from local storage
  useEffect(() => {
    const storedElements = localStorage.getItem("elements");
    if (storedElements) {
      setElements(JSON.parse(storedElements));
    }
  }, []);
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("elementType", type);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("elementType");
    if (!type) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement = {
      id: Date.now().toString(),
      type,
      x,
      y,
    };

    setElements((prev) => [...prev, newElement]);
  };
  return (
    <div className="flex h-screen">
      <Sidebar onDragStart={handleDragStart} />
      <Canvas
        elements={elements}
        onDropElement={handleDrop}
        setElements={setElements}
      />
    </div>
  );
};

export default App;
