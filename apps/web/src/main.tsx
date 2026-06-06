import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { OscarSessionProvider } from "./stores/useOscarSession";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OscarSessionProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </OscarSessionProvider>
  </StrictMode>,
);
