import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./components/Root";
import { ThemeProvider } from "./components/Root/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </StrictMode>
);
