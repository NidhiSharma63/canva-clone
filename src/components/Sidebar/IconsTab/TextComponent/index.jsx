import { useEditors } from "../../../../Providers/EditorProvider";

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
  const editor = useEditors();
  if (!editor) return null;
  const toggleList = (type) => {
    if (type === "bullet") {
      editor.chain().focus().toggleBulletList().run();
    } else if (type === "ordered") {
      editor.chain().focus().toggleOrderedList().run();
    }
  };
  return (
    <div className="flex gap-6 mb-2 flex-wrap">
      {/* Block types */}

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </Button>
      <Button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        H2
      </Button>
      <Button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
      >
        H3
      </Button>
      <Button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 4 }).run();
        }}
      >
        H4
      </Button>
      <Button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 5 }).run();
        }}
      >
        H5
      </Button>
      <Button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 6 }).run();
        }}
      >
        H6
      </Button>
      <Button onClick={() => editor.chain().focus().setParagraph().run()}>
        Paragraph
      </Button>
      {/* Lists */}
      <Button onClick={() => toggleList("bullet")}>UL</Button>
      <Button onClick={() => toggleList("ordered")}>OL</Button>
    </div>
  );
};

export default TextComponent;
