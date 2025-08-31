import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "./index.css";
import EditorProvider from "./Providers/EditorProvider.jsx";
import GlobalStateProvider from "./Providers/GlobalStateProvider.jsx";


export const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStateProvider>
        <EditorProvider>
          <App />
        </EditorProvider>
      </GlobalStateProvider>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
