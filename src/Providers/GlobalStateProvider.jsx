import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { elementsTypes } from "../constant/Elements";
// Create Context
const GlobalStateContext = createContext(null);

// Provider Component
const GlobalStateProvider = ({ children }) => {
  const [elements, setElements] = useState([]);

  // Save to localStorage whenever elements change
  useEffect(() => {
    if (elements.length > 0) {
      localStorage.setItem("elements", JSON.stringify(elements));
    }
  }, [elements]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedElements = localStorage.getItem("elements");
    if (storedElements) {
      setElements(JSON.parse(storedElements));
    }
  }, []);

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("elementType");
    if (!type) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const content =
      elementsTypes[type] === elementsTypes.h1
        ? "<h1>Add a heading</h1>"
        : elementsTypes[type] === elementsTypes.h4
        ? "<h4>Add a sub heading</h4>"
        : elementsTypes[type] === elementsTypes.p
        ? "<p>Add a little bit of body text</p>"
        : "";
    const newElement = {
      id: uuidv4(),
      type,
      x,
      y,
      content,
    };

    setElements((prev) => [...prev, newElement]);
  };

  return (
    <GlobalStateContext.Provider value={{ elements, setElements, handleDrop }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// 3️⃣ Custom hook for easy usage
export const useGlobalState = () => useContext(GlobalStateContext);

export default GlobalStateProvider;
