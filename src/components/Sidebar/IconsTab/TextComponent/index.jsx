import { elementsTypes } from "../../../../constant/Elements";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 px-3.5 border border-gray-800 hover:bg-gray-100  rounded-md transition  hover:shadow-sm"
    >
      <div>{children}</div>
    </button>
  );
};

const TextComponent = () => {
  // generic drag start
  const handleDragStart = (e, elementType, data = {}) => {
    // set type : "text", "shape", "image", etc
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: elementType, data })
    );
  };

  return (
    <div className="flex gap-6 mb-2 items-center justify-center flex-wrap">
      {/* Block types */}

      <h1
        className="cursor-pointer text-2xl py-2 px-8 rounded font-bold border border-gray-600"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, elementsTypes.h1, {
            content: "Add a heading",
          })
        }
      >
        Add a heading
      </h1>

      <h4
        className="cursor-pointer text-lg py-2  px-4 rounded font-medium border-1 border-gray-600"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, elementsTypes.h4, {
            content: "Add a sub heading",
          })
        }
      >
        Add a sub heading
      </h4>
      <p
        className="cursor-pointer text-sm p-2 rounded  border-1 border-gray-600 "
        draggable
        onDragStart={(e) =>
          handleDragStart(e, elementsTypes.p, {
            content: "Add a little bit of body text",
          })
        }
      >
        Add a little bit of body text
      </p>
    </div>
  );
};

export default TextComponent;
