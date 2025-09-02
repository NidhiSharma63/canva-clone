import { createContext, useCallback, useContext, useState } from "react";

const EditorContext = createContext();

export const useEditors = () => useContext(EditorContext);

const EditorProvider = ({ children }) => {
  const [editors, setEditors] = useState({}); // { [elementId]: editor }
  const [activeElementId, setActiveElementId] = useState(null);

  const registerEditor = useCallback((editor, elementId) => {
    setEditors((prev) => ({ ...prev, [elementId]: editor }));
  }, []);

  const unregisterEditor = useCallback((elementId) => {
    setEditors((prev) => {
      const copy = { ...prev };
      delete copy[elementId];
      return copy;
    });
  }, []);

  const setActiveEditor = useCallback((elementId) => {
    setActiveElementId(elementId);
  }, []);

  return (
    <EditorContext.Provider
      value={{
        editors,
        activeElementId,
        activeEditor: editors[activeElementId],
        registerEditor,
        unregisterEditor,
        setActiveEditor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
