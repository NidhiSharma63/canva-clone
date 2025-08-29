import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useEditors } from "../../Providers/EditorProvider";

const TextToolbar = () => {
  const { editor } = useEditors();
  const [color, setColor] = useState("#000000");
  const [_, setUpdate] = useState(0);

  useEffect(() => {
    if (!editor) return;

    editor.on("transaction", () => {
      setUpdate((u) => u + 1); // Force re-render to update editor.isactive state
    });

    return () => editor.off("transaction");
  }, [editor]);

  if (!editor) return null;

  const headings = [
    { label: "H1", level: 1 },
    { label: "H2", level: 2 },
    { label: "H3", level: 3 },
    { label: "H4", level: 4 },
    { label: "H5", level: 5 },
    { label: "P", level: null },
  ];

  const toggleHeading = (level) => {
    if (level) {
      editor.chain().focus().setNode("heading", { level }).run();
    } else {
      editor.chain().focus().setNode("paragraph").run();
    }
  };
  console.log(editor);

  return (
    <div className="flex fixed top-[80px] left-1/2 transform -translate-x-1/2 items-center gap-2 p-2 bg-gray-50 rounded shadow-sm z-50">
      {/* Headings / Paragraph */}
      {headings.map((h) => {
        const isActive = h.level
          ? editor.isActive("heading", { level: h.level })
          : editor.isActive("paragraph");
        // console.log(isActive);
        return (
          <button
            key={h.label}
            onClick={() => toggleHeading(h.level)}
            className={`p-1 px-2 rounded transition ${
              isActive ? "bg-purple-100 text-purple-700 font-bold" : ""
            }`}
          >
            {h.label}
          </button>
        );
      })}

      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 px-2 rounded transition ${
          editor.isActive("bold")
            ? "bg-purple-100 text-purple-700 font-bold"
            : ""
        }`}
      >
        B
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 px-2 rounded italic transition ${
          editor.isActive("italic")
            ? "bg-purple-100 text-purple-700 font-bold"
            : ""
        }`}
      >
        I
      </button>

      {/* Underline */}
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1 px-2 rounded transition ${
          editor.isActive("underline")
            ? "bg-purple-100 text-purple-700 font-bold"
            : ""
        }`}
        style={{ textDecoration: "underline" }}
      >
        U
      </button>

      {/* Text Color Picker */}
      <input
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          editor.chain().focus().setColor(e.target.value).run();
        }}
        className="w-8 h-8 p-0 rounded cursor-pointer"
      />

      {/* Alignment Buttons */}
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-1 rounded transition ${
          editor.isActive({ textAlign: "left" })
            ? "bg-purple-100 text-purple-700 font-bold"
            : ""
        }`}
      >
        <AlignLeft className="text-gray-500" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-1 rounded transition ${
          editor.isActive({ textAlign: "center" })
            ? "bg-purple-100 text-purple-700 font-bold"
            : ""
        }`}
      >
        <AlignCenter className="text-gray-500" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-1 rounded transition ${
          editor.isActive({ textAlign: "right" })
            ? "bg-purple-100 text-purple-700 font-bold"
            : ""
        }`}
      >
        <AlignRight className="text-gray-500" />
      </button>
    </div>
  );
};

export default TextToolbar;
