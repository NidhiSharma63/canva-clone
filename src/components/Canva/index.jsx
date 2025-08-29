import { useRef, useState } from "react";
import Moveable from "react-moveable";
import { elementsTypes } from "../../constant/Elements.js";
import { useGlobalState } from "../../Providers/GlobalStateProvider.jsx";
import TiptapEditorComponent from "../TiptapEditorComponent.jsx";

const Canvas = () => {
  const [selectedId, setSelectedId] = useState(null);
  const positionsRef = useRef({});
  const [scale, setScale] = useState(1);
  const { elements, handleDrop, setElements } = useGlobalState();

  const selectedElement = elements?.find((el) => el.id === selectedId);

  const handleWheel = (e) => {
    e.preventDefault();

    // zoom factor
    let zoomSpeed = e.ctrlKey ? 0.01 : 0.001;
    let newScale = scale - e.deltaY * zoomSpeed;
    newScale = Math.min(Math.max(newScale, 0.2), 5); // limit zoom
    setScale(newScale);
  };

  return (
    <div className="flex flex-1 justify-center items-center h-[90vh] bg-gray-100 overflow-hidden">
      {/* Canvas= Wrapper with Zoom */}
      <div
        onWheel={handleWheel}
        className="relative border-2 border-dashed border-gray-400 bg-white"
        style={{
          width: "1200px", // fixed for export
          height: "800px", // fixed for export
          transform: `scale(${scale})`,
          transformOrigin: "center center",
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
              width: el.width,
              height: el.height,
              textAlign: el.align,
            }}
            onClick={() => setSelectedId(el.id)}
          >
            {(el.type === elementsTypes.h1 ||
              el.type === elementsTypes.h4 ||
              el.type === elementsTypes.p) && (
              <TiptapEditorComponent
                element={el}
                setElements={setElements}
                selectedId={selectedId}
              />
            )}
            {el.type === "rectangle" && (
              <div
                className="bg-blue-400"
                style={{ width: el.width || 80, height: el.height || 50 }}
              ></div>
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
              const x = e.beforeTranslate[0];
              const y = e.beforeTranslate[1];
              positionsRef.current[selectedId] = { x, y };
              e.target.style.transform = `translate(${x}px, ${y}px) rotate(${
                selectedElement.rotation || 0
              }deg)`;
            }}
            onDragEnd={() => {
              const pos = positionsRef.current[selectedId];
              if (!pos) return;
              setElements((prev) =>
                prev.map((el) =>
                  el.id === selectedId ? { ...el, x: pos.x, y: pos.y } : el
                )
              );
            }}
            onResize={(e) => {
              const { width, height } = e;
              const [x, y] = e.drag.beforeTranslate;
              e.target.style.width = `${width}px`;
              e.target.style.height = `${height}px`;
              e.target.style.transform = `translate(${x}px, ${y}px) rotate(${
                selectedElement.rotation || 0
              }deg)`;
            }}
            onResizeEnd={(e) => {
              const { width, height } = e.lastEvent;
              const [x, y] = e.lastEvent.drag.beforeTranslate;
              setElements((prev) =>
                prev.map((el) =>
                  el.id === selectedId ? { ...el, width, height, x, y } : el
                )
              );
            }}
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
