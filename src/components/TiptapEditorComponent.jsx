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
];

const TiptapEditorComponent = ({ element, setElements }) => {
  const { registerEditor, unregisterEditor } = useEditors();

  const editor = useEditor({
    extensions,
    content: element?.content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log(html, html === "<p></p>");
      setElements((prev) =>
        prev.map((item) =>
          item.id === element.id
            ? { ...item, content: html === "<p></p>" ? "<p>Text</p>" : html }
            : item
        )
      );
    },
  });
  useEffect(() => {
    if (editor) registerEditor(editor);
    return () => {
      unregisterEditor();
    };
  }, [editor, registerEditor, unregisterEditor]);

  return (
    <EditorContent
      editor={editor}
      className="editor-content w-full z-10 relative"
    />
  );
};

export default TiptapEditorComponent;
