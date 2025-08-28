import { useState } from "react";
import Moveable from "react-moveable";

export default function Canvas({ elements, onDropElement, setElements }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedElement = elements.find((el) => el.id === selectedId);

  return (
    <div
      className="w-[800px] h-[90vh] m-auto bg-white relative border-2 border-amber-400"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropElement}
    >
      {elements.map((el) => (
        <div
          key={el.id}
          data-id={el.id}
          className="absolute cursor-pointer"
          style={{ top: el.y, left: el.x }}
          onClick={() => setSelectedId(el.id)}
        >
          {el.type === "text" && <p className="text-black">Sample Text</p>}
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
          draggable={true}
          resizable={true}
          rotatable={true}
          onDrag={(e) => {
            console.log(e);
            setElements((prev) =>
              prev.map((el) =>
                el.id === selectedId ? { ...el, x: e.left, y: e.top } : el
              )
            );
          }}
          onResize={(e) => {
            setElements((prev) =>
              prev.map((el) =>
                el.id === selectedId
                  ? { ...el, width: e.width, height: e.height }
                  : el
              )
            );
          }}
          onRotate={(e) => {
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
