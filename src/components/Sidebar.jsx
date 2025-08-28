export default function Sidebar({ onDragStart }) {
  return (
    <div className="w-48 bg-gray-100 p-4 border-r">
      <p
        className="p-2 bg-white rounded shadow mb-2 cursor-grab"
        draggable
        onDragStart={(e) => onDragStart(e, "text")}
      >
        Text
      </p>
      <p
        className="p-2 bg-white rounded shadow cursor-grab"
        draggable
        onDragStart={(e) => onDragStart(e, "rectangle")}
      >
        Rectangle
      </p>
    </div>
  );
}
