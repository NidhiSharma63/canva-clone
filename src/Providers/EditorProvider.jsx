import { createContext, useCallback, useContext, useState } from "react";

const EditorContext = createContext();

export const useEditors = () => useContext(EditorContext);

const EditorProvider = ({ children }) => {
  const [editor, setEditor] = useState(null); // { elementId: editor }

  const registerEditor = useCallback((editor) => {
    setEditor(editor);
  }, []);

  const unregisterEditor = useCallback(() => {
    setEditor(null);
  }, []);

  return (
    <EditorContext.Provider
      value={{ editor, registerEditor, unregisterEditor }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
