import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { useEditors } from "../Providers/EditorProvider";

const extensions = [
  StarterKit,
  TextStyleKit,
  TextAlign.configure({
    types: ["heading", "paragraph", "listItem", "bulletList", "orderedList"],
  }),
  Placeholder.configure({
    placeholder: "Type here...",
  }),
];

const TiptapEditorComponent = ({ element, setElements }) => {
  const { registerEditor, unregisterEditor, setActiveEditor } = useEditors();
  // console.log(element);

  const editor = useEditor({
    extensions,
    content: element?.content,
    onUpdate: ({ editor }) => {
      let html = editor.getHTML();
      if (
        html === "<p></p>" ||
        html.trim() === "" ||
        html === "<h1></h1>" ||
        html === "<h2></h2>" ||
        html === "<h3></h3>" ||
        html === "<h4></h4>" ||
        html === "<h5></h5>" ||
        html === "<h6></h6>" ||
        html === "<ol></ol>" ||
        html === "<ul></ul>" ||
        html === "<li></li>"
      ) {
        editor.commands.setContent("<p>\u200B</p>");
      }
      setElements((prev) =>
        prev.map((item) =>
          item.id === element.id
            ? { ...item, content: html === "<p></p>" ? "" : html }
            : item
        )
      );
    },
  });
  useEffect(() => {
    if (editor && element?.id) registerEditor(editor, element.id);
    return () => {
      if (element?.id) unregisterEditor(element.id);
    };
  }, [editor, element?.id, registerEditor, unregisterEditor]);

  // Set active editor on focus/click
  useEffect(() => {
    if (!editor || !element?.id) return;
    const handleFocus = () => setActiveEditor(element.id);
    editor.on("focus", handleFocus);
    return () => editor.off("focus", handleFocus);
  }, [editor, element?.id, setActiveEditor]);

  return (
    <EditorContent
      editor={editor}
      className="editor-content w-full z-10 relative"
    />
  );
};

export default TiptapEditorComponent;
