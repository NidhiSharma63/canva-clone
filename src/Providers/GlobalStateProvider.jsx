import templates from "@/constant/template";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { elementsTypes, textElementsConstant } from "../constant/Elements";
// Create Context
const GlobalStateContext = createContext(null);

// Provider Component
const GlobalStateProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  const [userSelectedTemplate, setUserSelectedTemplate] = useState(
    templates[0].id
  );
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
    const dropped = JSON.parse(e.dataTransfer.getData("application/json"));
    const type = dropped.type;
    const data = dropped.data;
    if (!type) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (
      type === elementsTypes.h1 ||
      type === elementsTypes.h4 ||
      type === elementsTypes.p
    ) {
      const newElement = {
        id: uuidv4(),
        type,
        x,
        y,
        content: data.content,
        ...textElementsConstant,
      };

      setElements((prev) => [...prev, newElement]);
      return;
    }

    if (type === elementsTypes.shape) {
      const newShape = { ...data, id: uuidv4(), x, y, rotation: 0 };
      setElements((prev) => [...prev, newShape]);
      return;
    }

    if (type === elementsTypes.image) {
      console.log("inserted image");
      const newElement = {
        id: uuidv4(),
        type: "image",
        url: data.url,
        name: data.name,
        x: e.clientX,
        y: e.clientY,
        width: 200,
        height: 200,
        rotation: 0,
      };

      setElements((prev) => [...prev, newElement]);
    }
  };

  return (
    <GlobalStateContext.Provider
      value={{
        elements,
        setElements,
        handleDrop,
        userSelectedTemplate,
        setUserSelectedTemplate,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook for easy usage
export const useGlobalState = () => useContext(GlobalStateContext);

export default GlobalStateProvider;
