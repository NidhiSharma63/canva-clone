import { useState } from "react";

// Basic shapes data for sidebar
const availableShapes = [
  {
    shapeId: "rectangle",
    type: "shape",
    width: 200,
    height: 100,
    fill: "#000000",
  },
  { shapeId: "circle", type: "shape", r: 60, fill: "#000000" },
  {
    shapeId: "triangle",
    type: "shape",
    width: 100,
    height: 100,
    fill: "#000000",
  },
  { shapeId: "star", type: "shape", size: 100, fill: "#000000" },
  { shapeId: "line", type: "shape", width: 160, height: 4, fill: "#000000" },
];

/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Sidebar component for shapes. Renders a list of available shapes and allows
   * user to drag and drop them into the canvas.
   *
   * @returns {JSX.Element}
   */
/*******  ffbe0003-956b-4708-8e1e-44a1babb2bdc  *******/
const ShapesComponent = () => {
  const [elements, setElements] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const shape = JSON.parse(e.dataTransfer.getData("shape"));
    const canvasRect = e.target.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    const newShape = { ...shape, id: `shape-${Date.now()}`, x, y };
    setElements((prev) => [...prev, newShape]);
  };

  const handleDragOver = (e) => e.preventDefault();

  // generic drag start
  const handleDragStart = (e, elementType, data = {}) => {
    // set type : "text", "shape", "image", etc
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: elementType, data })
    );
  };
  // Sidebar shape render
  const renderShapePreview = (shape) => {
    switch (shape.shapeId) {
      case "rectangle":
        return (
          <div
            className="rounded"
            style={{
              width: shape.width,
              height: shape.height,
              backgroundColor: shape.fill,
            }}
          />
        );
      case "circle":
        return (
          <div
            className="rounded-full"
            style={{
              width: shape.r * 2,
              height: shape.r * 2,
              backgroundColor: shape.fill,
            }}
          />
        );
      case "triangle":
        return (
          <div
            className="w-0 h-0"
            style={{
              borderLeft: `${shape.width / 2}px solid transparent`,
              borderRight: `${shape.width / 2}px solid transparent`,
              borderBottom: `${shape.height}px solid ${shape.fill}`,
            }}
          />
        );
      case "star":
        return (
          <div
            style={{
              width: shape.size,
              height: shape.size,
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              backgroundColor: shape.fill,
            }}
          />
        );
      case "line":
        return (
          <div
            style={{
              width: shape.width,
              height: shape.height,
              backgroundColor: shape.fill,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 gap-6 h-full">
      {/* Sidebar */}
      <div className=" p-2  rounded bg-gray-50 flex flex-col gap-4 items-center">
        {availableShapes.map((shape) => (
          <div
            key={shape.id}
            draggable
            onDragStart={(e) => handleDragStart(e, "shape", shape)}
            className="cursor-grab p-1  rounded hover:bg-gray-200"
          >
            {renderShapePreview(shape)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShapesComponent;
