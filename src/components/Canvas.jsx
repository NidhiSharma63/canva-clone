import { useRef, useState } from "react";
import Moveable from "react-moveable";
import TiptapEditorComponent from "./TiptapEditorComponent";

export default function Canvas({ elements, onDropElement, setElements }) {
  const [selectedId, setSelectedId] = useState(null);
  const positionsRef = useRef({}); // live positions

  const selectedElement = elements.find((el) => el.id === selectedId);

  return (
    <div
      className="w-[800px] h-[90vh] m-auto bg-white relative border-2 border-dashed border-amber-400"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropElement}
    >
      {elements.map((el) => (
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
          {el.type === "text" && (
            <TiptapEditorComponent
              element={el}
              setElements={setElements}
              selectedId={selectedId}
            />
          )}
          {el.type === "shape" && (
            <div
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
                el.id === selectedId ? { ...el, rotation: e.beforeRotate } : el
              )
            );
          }}
        />
      )}
    </div>
  );
}
