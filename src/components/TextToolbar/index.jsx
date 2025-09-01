import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  List,
  ListOrdered,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useEditors } from "../../Providers/EditorProvider";

const TextToolbar = () => {
  const { editor } = useEditors();
  const [color, setColor] = useState("#000000");
  const [currentFont, setCurrentFont] = useState("Roboto");
  const [currentSize, setCurrentSize] = useState("16"); // default font size
  const [_, setUpdate] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const handleTransaction = () => {
      setUpdate((u) => u + 1);
    };

    editor.on("transaction", handleTransaction);

    return () => editor.off("transaction", handleTransaction);
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

  const fonts = [
    "Roboto",
    "Montserrat",
    "Lobster",
    "Pacifico",
    "Dancing Script",
    "Oswald",
    "Raleway",
    "Poppins",
    "Playfair Display",
    "Merriweather",
    "Great Vibes",
    "Courier Prime",
  ];

  const fontSizes = [
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
    "28",
    "32",
    "36",
    "48",
    "64",
    "72",
    "",
  ];

  return (
    <div className="flex fixed top-[80px] left-1/2 transform -translate-x-1/2 items-center gap-2 p-2 bg-gray-50 rounded shadow-sm z-50">
      {/* Headings / Paragraph */}
      {headings.map((h) => {
        const isActive = h.level
          ? editor.isActive("heading", { level: h.level })
          : editor.isActive("paragraph");
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

      {/* Font Family Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <p className="text-md cursor-pointer">{currentFont} ▼</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 max-h-60 overflow-auto">
          <DropdownMenuLabel>Select Font</DropdownMenuLabel>
          {fonts.map((f) => (
            <DropdownMenuItem
              key={f}
              onClick={() => {
                setCurrentFont(f);
                editor
                  .chain()
                  .focus()
                  .setMark("textStyle", { fontFamily: f })
                  .run();
              }}
              style={{ fontFamily: f }}
            >
              {f}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Font Size Dropdown */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => {
            const newSize = Math.max(1, parseInt(currentSize) - 1);
            setCurrentSize(newSize.toString());
            editor
              .chain()
              .focus()
              .setMark("textStyle", { fontSize: `${newSize}px` })
              .run();
          }}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={currentSize}
          onChange={(e) => {
            const val = e.target.value;
            setCurrentSize(val);
            if (val)
              editor
                .chain()
                .focus()
                .setMark("textStyle", { fontSize: `${val}px` })
                .run();
          }}
          className="w-14 text-center border rounded px-1 py-0.5"
        />
        <button
          onClick={() => {
            const newSize = parseInt(currentSize) + 1;
            setCurrentSize(newSize.toString());
            editor
              .chain()
              .focus()
              .setMark("textStyle", { fontSize: `${newSize}px` })
              .run();
          }}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
      {/* Ordered List */}
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 px-2 rounded transition ${
          editor.isActive("orderedList") ? "bg-purple-100 text-purple-700" : ""
        }`}
      >
        <ListOrdered size={20} className="text-gray-500" />
      </button>

      {/* Unordered List */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 px-2 rounded transition ${
          editor.isActive("bulletList") ? "bg-purple-100 text-purple-700" : ""
        }`}
      >
        <List size={20} className="text-gray-500" />
      </button>

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
        className="w-6 h-6 p-0 rounded cursor-pointer"
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
