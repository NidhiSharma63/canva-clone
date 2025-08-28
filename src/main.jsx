import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import EditorProvider from "./Providers/EditorProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EditorProvider>
      <App />
    </EditorProvider>
  </StrictMode>
);
