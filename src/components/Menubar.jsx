import { useEditors } from "../Providers/EditorProvider";

function MenuBar() {
  const { editor } = useEditors();
  if (!editor) return null;

  const toggleList = (type) => {
    if (!editor) return;
    if (type === "bullet") {
      editor.chain().focus().toggleBulletList().run();
    } else if (type === "ordered") {
      editor.chain().focus().toggleOrderedList().run();
    }
  };

  return (
    <div className="flex gap-2 mb-2 flex-wrap">
      {/* Block types */}
      <button onClick={() => editor.chain().focus().setParagraph().run()}>
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </button>

      {/* Lists */}
      <button onClick={() => toggleList("bullet")}>UL</button>
      <button onClick={() => toggleList("ordered")}>OL</button>

      {/* Code block */}
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        Code
      </button>

      {/* Alignments */}
      <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        Left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        Center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        // className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        Rightss
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        Right
      </button>

      {/* Color picker */}
      <input
        type="color"
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
      />
    </div>
  );
}

export default MenuBar;
