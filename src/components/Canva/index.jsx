import templates from "@/constant/template.js";
import { useRef, useState } from "react";
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

  const handleWheel = (e) => {
    e.preventDefault();

    // thoda fast zoom factor
    let zoomSpeed = e.ctrlKey ? 0.05 : 0.01;
    let newScale = scale - e.deltaY * zoomSpeed;
    newScale = Math.min(Math.max(newScale, 0.1), 5); // limit zoom (0.1x to 5x)
    setScale(newScale);
  };

  const selectedTemplate = templates.find((t) => t.id === userSelectedTemplate);
  // console.log(elements);
  return (
    <div className="flex flex-1 justify-center items-center h-[90vh] bg-gray-100 overflow-hidden">
      {/* Canvas= Wrapper with Zoom */}
      <div
        onWheel={handleWheel}
        className="relative border-2 border-dashed border-gray-400 bg-white overflow-hidden"
        style={{
          width: `${selectedTemplate?.width || 1200}px`,
          height: `${selectedTemplate?.height || 800}px`,
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
            {el.type === elementsTypes.shape && <RenderShapes el={el} />}
            {/* render image */}
            {el.type === "image" && (
              <img
                src={el.url}
                alt={el.name}
                // width={el.width}
                // height={el.height}
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
              if (selectedElement.shapeId === "circle") {
                const diameter = Math.max(e.width, e.height);

                // 2️⃣ Update target size
                e.target.style.width = `${diameter}px`;
                e.target.style.height = `${diameter}px`;

                // 3️⃣ Keep center same
                const centerX = selectedElement.x + selectedElement.r;
                const centerY = selectedElement.y + selectedElement.r;
                const newX = centerX - diameter / 2;
                const newY = centerY - diameter / 2;

                e.target.style.transform = `translate(${newX}px, ${newY}px) rotate(${
                  selectedElement.rotation || 0
                }deg)`;
              } else {
                const { width, height } = e;
                const [x, y] = e.drag.beforeTranslate;

                e.target.style.width = `${width}px`;
                e.target.style.height = `${height}px`;
                e.target.style.transform = `translate(${x}px, ${y}px) rotate(${
                  selectedElement.rotation || 0
                }deg)`;
              }
            }}
            onResizeEnd={(e) => {
              if (selectedElement.shapeId === "circle") {
                const diameter = Math.max(
                  e.lastEvent.width,
                  e.lastEvent.height
                );
                const r = diameter / 2;

                const centerX = selectedElement.x + selectedElement.r;
                const centerY = selectedElement.y + selectedElement.r;
                const newX = centerX - r;
                const newY = centerY - r;

                setElements((prev) =>
                  prev.map((el) =>
                    el.id === selectedId ? { ...el, x: newX, y: newY, r } : el
                  )
                );
              } else {
                const { width, height } = e.lastEvent;
                const [x, y] = e.lastEvent.drag.beforeTranslate;

                setElements((prev) =>
                  prev.map((el) =>
                    el.id === selectedId ? { ...el, width, height, x, y } : el
                  )
                );
              }
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
