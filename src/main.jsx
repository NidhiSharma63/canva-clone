import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import EditorProvider from "./Providers/EditorProvider.jsx";
import GlobalStateProvider from "./Providers/GlobalStateProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStateProvider>
      <EditorProvider>
        <App />
      </EditorProvider>
    </GlobalStateProvider>
  </StrictMode>
);
