import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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

    const newElement = {
      id: uuidv4(),
      type,
      x,
      y,
      rotation: 0,
      width: 100,
      height: 50,
      content: "<p>Nidhi</p>",
      background: "",
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
