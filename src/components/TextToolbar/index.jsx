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
  const { activeEditor, activeElementId } = useEditors();

  // Toolbar states
  const [color, setColor] = useState("#000000");
  const [currentFont, setCurrentFont] = useState("Roboto");
  const [currentSize, setCurrentSize] = useState(16);
  const [currentHeading, setCurrentHeading] = useState(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [currentAlign, setCurrentAlign] = useState("left");
  const [listType, setListType] = useState(null);

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

  const headings = [
    { label: "H1", level: 1 },
    { label: "H2", level: 2 },
    { label: "H3", level: 3 },
    { label: "H4", level: 4 },
    { label: "H5", level: 5 },
    { label: "P", level: null },
  ];

  // Toggle heading
  const toggleHeading = (level) => {
    if (!activeEditor) return;
    if (level) activeEditor.chain().focus().setNode("heading", { level }).run();
    else activeEditor.chain().focus().setNode("paragraph").run();
  };

  // Sync toolbar state with editor selection / element
  // Sync toolbar state with editor selection / element
  useEffect(() => {
    if (!activeEditor) return;

    const syncToolbar = () => {
      const { state } = activeEditor;
      const { selection } = state;
      let align = "left";
      let node = null;
      // Try to get the node at selection
      if (selection.$from) {
        node = selection.$from.node(selection.$from.depth);
      }
      if (node && node.attrs && node.attrs.textAlign) {
        align = node.attrs.textAlign;
      } else {
        // fallback to editor's attribute
        const attr = activeEditor.getAttributes("textAlign");
        if (attr && attr.textAlign) align = attr.textAlign;
      }

      const textStyle = activeEditor.getAttributes("textStyle");
      setCurrentFont(textStyle.fontFamily || "Roboto");
      setCurrentSize(textStyle.fontSize ? parseInt(textStyle.fontSize) : 16);
      setColor(textStyle.color || "#000000");

      const heading = activeEditor.getAttributes("heading");
      setCurrentHeading(heading.level || null);

      setIsBold(activeEditor.isActive("bold"));
      setIsItalic(activeEditor.isActive("italic"));
      setIsUnderline(activeEditor.isActive("underline"));

      setCurrentAlign(align || "left");
    };

    // Expose syncToolbar for use in button handlers
    activeEditor.syncToolbar = syncToolbar;

    syncToolbar();
    activeEditor.on("selectionUpdate", syncToolbar);
    return () => activeEditor.off("selectionUpdate", syncToolbar);
  }, [activeEditor, activeElementId]);

  if (!activeEditor) return null;

  return (
    <div className="flex fixed top-[80px] left-1/2 transform -translate-x-1/2 items-center gap-2 p-2 bg-gray-50 rounded shadow-sm z-50">
      {/* Headings / Paragraph */}
      {/* {headings.map((h) => (
        <button
          key={h.label}
          onClick={() => toggleHeading(h.level)}
          className={`p-1 px-2 rounded transition ${
            currentHeading === h.level
              ? "bg-purple-100 text-purple-700 font-bold"
              : ""
          }`}
        >
          {h.label}
        </button>
      ))} */}

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
                activeEditor
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

      {/* Font Size */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => {
            const newSize = Math.max(1, currentSize - 1);
            setCurrentSize(newSize);
            activeEditor
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
            const val = parseInt(e.target.value) || 1;
            setCurrentSize(val);
            activeEditor
              .chain()
              .focus()
              .setMark("textStyle", { fontSize: `${val}px` })
              .run();
          }}
          className="w-14 text-center border rounded px-1 py-0.5"
        />
        <button
          onClick={() => {
            const newSize = currentSize + 1;
            setCurrentSize(newSize);
            activeEditor
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

      {/* Lists */}
      <button
        onClick={() => {
          activeEditor.chain().focus().toggleOrderedList().run();
          setListType("orderedList");
          setTimeout(() => {
            if (activeEditor.syncToolbar) activeEditor.syncToolbar();
            activeEditor.emit && activeEditor.emit("selectionUpdate");
          }, 0);
        }}
        className={`p-1 px-2 rounded transition ${(() => {
          const { state } = activeEditor;
          const { selection } = state;
          let isOrdered = false;
          for (let d = selection.$from.depth; d > 0; d--) {
            const node = selection.$from.node(d);
            if (node.type.name === "orderedList") {
              isOrdered = true;
              break;
            }
          }
          return isOrdered ||
            activeEditor.isActive("orderedList") ||
            activeEditor.isActive("listItem", { type: "orderedList" }) ||
            listType === "orderedList"
            ? "bg-purple-100 text-purple-700 font-bold"
            : "";
        })()}`}
      >
        <ListOrdered size={20} className="text-gray-500" />
      </button>
      <button
        onClick={() => {
          activeEditor.chain().focus().toggleBulletList().run();
          setListType("bulletList");
          setTimeout(() => {
            if (activeEditor.syncToolbar) activeEditor.syncToolbar();
            activeEditor.emit && activeEditor.emit("selectionUpdate");
          }, 0);
        }}
        className={`p-1 px-2 rounded transition ${(() => {
          const { state } = activeEditor;
          const { selection } = state;
          let isBullet = false;
          for (let d = selection.$from.depth; d > 0; d--) {
            const node = selection.$from.node(d);
            if (node.type.name === "bulletList") {
              isBullet = true;
              break;
            }
          }
          return isBullet ||
            activeEditor.isActive("bulletList") ||
            activeEditor.isActive("listItem", { type: "bulletList" }) ||
            listType === "bulletList"
            ? "bg-purple-100 text-purple-700 font-bold"
            : "";
        })()}`}
      >
        <List size={20} className="text-gray-500" />
      </button>

      {/* Marks */}
      <button
        onClick={() => activeEditor.chain().focus().toggleBold().run()}
        className={`p-1 px-2 rounded transition ${
          isBold ? "bg-purple-100 text-purple-700 font-bold" : ""
        }`}
      >
        B
      </button>
      <button
        onClick={() => activeEditor.chain().focus().toggleItalic().run()}
        className={`p-1 px-2 rounded italic transition ${
          isItalic ? "bg-purple-100 text-purple-700 font-bold" : ""
        }`}
      >
        I
      </button>
      <button
        onClick={() => activeEditor.chain().focus().toggleUnderline().run()}
        className={`p-1 px-2 rounded transition ${
          isUnderline ? "bg-purple-100 text-purple-700 font-bold" : ""
        }`}
        style={{ textDecoration: "underline" }}
      >
        U
      </button>

      {/* Color */}
      <input
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          activeEditor.chain().focus().setColor(e.target.value).run();
        }}
        className="w-6 h-6 p-0 rounded cursor-pointer"
      />

      {/* Alignment */}
      <button
        onClick={() => {
          setCurrentAlign("left");
          activeEditor.chain().focus().setTextAlign("left").run();
        }}
        className={`p-1 rounded transition ${
          currentAlign === "left"
            ? "bg-purple-100 text-purple-700 font-bold"
            : ""
        }`}
      >
        <AlignLeft className="text-gray-500" />
      </button>
      <button
        onClick={() => {
          setCurrentAlign("center");
          activeEditor.chain().focus().setTextAlign("center").run();
        }}
        className={`p-1 rounded transition ${
          currentAlign === "center"
            ? "bg-purple-100 text-purple-700 font-bold"
            : ""
        }`}
      >
        <AlignCenter className="text-gray-500" />
      </button>
      <button
        onClick={() => {
          setCurrentAlign("right");
          activeEditor.chain().focus().setTextAlign("right").run();
        }}
        className={`p-1 rounded transition ${
          currentAlign === "right"
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
