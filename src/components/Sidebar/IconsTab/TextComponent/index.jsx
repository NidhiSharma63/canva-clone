import { elementsTypes } from "../../../../constant/Elements";

const TextComponent = () => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        type: elementsTypes.text,
        data: {
          content: "<p>Edit your text</p>", // default text
        },
      })
    );
  };

  return (
    <div className="flex gap-6 mb-2 items-center justify-center flex-wrap">
      <div
        className="cursor-pointer text-sm p-2 rounded border border-gray-600"
        draggable
        onDragStart={handleDragStart}
      >
        ➕ Add Text
      </div>
    </div>
  );
};

export default TextComponent;
