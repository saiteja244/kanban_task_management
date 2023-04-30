import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppStateProvider } from "./context/AppStateContext";
import { BoardContextProvider } from "./context/BoardContext";
import { ModalContextProvider } from "./context/ModalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalContextProvider>
      <AppStateProvider>
        <BoardContextProvider>
          <App />
        </BoardContextProvider>
      </AppStateProvider>
    </ModalContextProvider>
  </React.StrictMode>
);
