import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { useEditors } from "../Providers/EditorProvider";

const extensions = [TextStyleKit, StarterKit];

const TiptapEditorComponent = ({ element, setElements }) => {
  const { registerEditor, unregisterEditor } = useEditors();

  const editor = useEditor({
    extensions,
    content: element?.content || "",
    onUpdate: ({ editor }) => {
      setElements((prev) =>
        prev.map((item) =>
          item.id === element.id ? { ...item, content: editor.getHTML() } : item
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
      style={{ width: "100%", height: "100%" }}
      className="editor-content"
    />
  );
};

export default TiptapEditorComponent;
