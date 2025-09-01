import templates from "@/constant/template.js";
import { useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";
import { elementsTypes } from "../../constant/Elements.js";
import { useGlobalState } from "../../Providers/GlobalStateProvider.jsx";
import RenderShapes from "../renderShapes/index.jsx";
import TiptapEditorComponent from "../TiptapEditorComponent.jsx";

const Canvas = () => {
  const [selectedId, setSelectedId] = useState(null);
  const positionsRef = useRef({});
  const [scale, setScale] = useState(1);
  const { elements, handleDrop, setElements, userSelectedTemplate } =
    useGlobalState();

  const selectedElement = elements?.find((el) => el.id === selectedId);

  const selectedTemplate = templates.find((t) => t.id === userSelectedTemplate);

  // Wheel zoom
  useEffect(() => {
    const canvas = document.getElementById("canvas-wrapper");

    const handleWheel = (e) => {
      e.preventDefault();
      let zoomSpeed = e.ctrlKey ? 0.05 : 0.01;
      let newScale = scale - e.deltaY * zoomSpeed;
      newScale = Math.min(Math.max(newScale, 0.1), 5);
      setScale(newScale);
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, [scale]);

  // Delete selected element
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        setElements((prev) => prev.filter((el) => el.id !== selectedId));
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, setElements]);

  return (
    <div className="flex flex-1 justify-center items-center h-[90vh] bg-gray-100 overflow-hidden">
      <div
        id="canvas-wrapper"
        className="relative border-2 border-dashed border-gray-400 bg-white overflow-hidden"
        style={{
          width: `${selectedTemplate?.width || 1200}px`,
          height: `${selectedTemplate?.height || 800}px`,
          transform: `scale(${scale})`,
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {elements?.map((el) => (
          <div
            key={el.id}
            data-id={el.id}
            className="absolute cursor-pointer"
            style={{
              transform: `translate(${el.x}px, ${el.y}px) rotate(${
                el.rotation || 0
              }deg)`,
              width: el.width || el.size,
              height: el.height || el.size,
              textAlign: el.align,
            }}
            onClick={() => setSelectedId(el.id)}
          >
            {/* text */}
            {el.type === elementsTypes.text && (
              <TiptapEditorComponent element={el} setElements={setElements} />
            )}
            {el.type === elementsTypes.shape && <RenderShapes el={el} />}
            {el.type === "image" && (
              <img
                src={el.url}
                alt={el.name}
                className="object-cover h-full w-full"
              />
            )}
          </div>
        ))}

        {selectedElement && (
          <Moveable
            target={document.querySelector(`[data-id='${selectedId}']`)}
            draggable
            resizable
            rotatable
            onDrag={(e) => {
              const [x, y] = e.beforeTranslate;
              positionsRef.current[selectedId] = { x, y };
              e.target.style.transform = `translate(${x}px, ${y}px) rotate(${
                selectedElement.rotation || 0
              }deg)`;

              // Real-time state update
              setElements((prev) =>
                prev.map((el) => (el.id === selectedId ? { ...el, x, y } : el))
              );
            }}
            onResize={(e) => {
              if (
                selectedElement.shapeId === "circle" ||
                selectedElement.shapeId === "star"
              ) {
                const diameter = Math.max(e.width, e.height);

                // Update DOM size
                e.target.style.width = `${diameter}px`;
                e.target.style.height = `${diameter}px`;

                // Center adjustment
                const centerX =
                  selectedElement.x +
                  (selectedElement.r || selectedElement.size / 2);
                const centerY =
                  selectedElement.y +
                  (selectedElement.r || selectedElement.size / 2);
                const newX = centerX - diameter / 2;
                const newY = centerY - diameter / 2;
                e.target.style.transform = `translate(${newX}px, ${newY}px) rotate(${
                  selectedElement.rotation || 0
                }deg)`;

                // Real-time state
                setElements((prev) =>
                  prev.map((el) =>
                    el.id === selectedId
                      ? {
                          ...el,
                          x: newX,
                          y: newY,
                          r:
                            selectedElement.shapeId === "circle"
                              ? diameter / 2
                              : el.r,
                          size:
                            selectedElement.shapeId === "star"
                              ? diameter
                              : el.size,
                        }
                      : el
                  )
                );
              } else {
                const { width, height } = e;
                const [x, y] = e.drag.beforeTranslate;

                e.target.style.width = `${width}px`;
                e.target.style.height = `${height}px`;
                e.target.style.transform = `translate(${x}px, ${y}px) rotate(${
                  selectedElement.rotation || 0
                }deg)`;

                setElements((prev) =>
                  prev.map((el) =>
                    el.id === selectedId ? { ...el, width, height, x, y } : el
                  )
                );
              }
            }}
            onResizeEnd={() => {}}
            onRotate={(e) => {
              e.target.style.transform = `translate(${selectedElement.x}px, ${selectedElement.y}px) rotate(${e.beforeRotate}deg)`;
            }}
            onRotateEnd={(e) => {
              setElements((prev) =>
                prev.map((el) =>
                  el.id === selectedId
                    ? { ...el, rotation: e.beforeRotate }
                    : el
                )
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Canvas;
