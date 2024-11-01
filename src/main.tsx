import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root, {
  StatsDialog,
  StatsDialogProvider,
  ThemeProvider,
} from "src/components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <StatsDialogProvider>
        <Root />
        <StatsDialog />
      </StatsDialogProvider>
    </ThemeProvider>
  </StrictMode>
);
