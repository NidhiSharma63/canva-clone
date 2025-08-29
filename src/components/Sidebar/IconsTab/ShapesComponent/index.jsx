import { useState } from "react";

// Basic shapes data for sidebar
const availableShapes = [
  { id: "rect", type: "rectangle", width: 200, height: 100, fill: "#000000" },
  { id: "circle", type: "circle", r: 60, fill: "#000000" },
  {
    id: "triangle",
    type: "triangle",
    width: 100,
    height: 100,
    fill: "#000000",
  },
  { id: "star", type: "star", size: 100, fill: "#000000" },
  { id: "line", type: "line", width: 160, height: 4, fill: "#000000" },
];

const ShapesComponent = () => {
  const [elements, setElements] = useState([]);

  const handleDragStart = (e, shape) => {
    e.dataTransfer.setData("shape", JSON.stringify(shape));
  };

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

  // Sidebar shape render
  const renderShapePreview = (shape) => {
    switch (shape.type) {
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
            onDragStart={(e) => handleDragStart(e, shape)}
            className="cursor-grab p-1  rounded hover:bg-gray-200"
          >
            {renderShapePreview(shape)}
          </div>
        ))}
      </div>

      {/* Canvas */}
      {/* <div
        className="flex-1 border rounded relative bg-white"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {elements.map((el) => {
          switch (el.type) {
            case "rectangle":
              return (
                <div
                  key={el.id}
                  className="absolute"
                  style={{
                    left: el.x,
                    top: el.y,
                    width: el.width,
                    height: el.height,
                    backgroundColor: el.fill,
                  }}
                />
              );
            case "circle":
              return (
                <div
                  key={el.id}
                  className="absolute rounded-full"
                  style={{
                    left: el.x - el.r,
                    top: el.y - el.r,
                    width: el.r * 2,
                    height: el.r * 2,
                    backgroundColor: el.fill,
                  }}
                />
              );
            case "triangle":
              return (
                <div
                  key={el.id}
                  className="absolute w-0 h-0"
                  style={{
                    left: el.x,
                    top: el.y,
                    borderLeft: `${el.width / 2}px solid transparent`,
                    borderRight: `${el.width / 2}px solid transparent`,
                    borderBottom: `${el.height}px solid ${el.fill}`,
                  }}
                />
              );
            case "star":
              return (
                <div
                  key={el.id}
                  className="absolute"
                  style={{
                    left: el.x - el.size / 2,
                    top: el.y - el.size / 2,
                    width: el.size,
                    height: el.size,
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                    backgroundColor: el.fill,
                  }}
                />
              );
            case "line":
              return (
                <div
                  key={el.id}
                  className="absolute"
                  style={{
                    left: el.x,
                    top: el.y,
                    width: el.width,
                    height: el.height,
                    backgroundColor: el.fill,
                  }}
                />
              );
            default:
              return null;
          }
        })}
      </div> */}
    </div>
  );
};

export default ShapesComponent;
