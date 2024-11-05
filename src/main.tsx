import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root, {
  StatsDialogProvider,
  ThemeProvider,
} from "src/components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <StatsDialogProvider>
        <Root />
      </StatsDialogProvider>
    </ThemeProvider>
  </StrictMode>
);
