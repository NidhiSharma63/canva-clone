import { useEffect, useState } from "react";
import Canvas from "./components/Canvas.jsx";
import MenuBar from "./components/Menubar.jsx";
import Sidebar from "./components/Sidebar.jsx";

const dummyJson = [
  {
    id: "1",
    type: "text",
    x: 100,
    y: 100,
    rotation: 45,
    width: 100,
    height: 50,
    background: "red",
  },
  {
    id: "2",
    type: "rectangle",
    x: 200,
    y: 200,
    rotation: 45,
    width: 100,
    height: 50,
    background: "red",
  },
];
const App = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    console.log(elements);
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
      content: "<p>Text</p>",
      rotation: 0,
      width: 100,
      height: 50,
    };

    setElements((prev) => [...prev, newElement]);
  };
  return (
    <div className="flex h-screen">
      <Sidebar onDragStart={handleDragStart} />
      <div className="flex flex-col">
        <MenuBar />
        <Canvas
          elements={elements}
          onDropElement={handleDrop}
          setElements={setElements}
        />
      </div>
    </div>
  );
};

export default App;
