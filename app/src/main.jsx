import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppStateProvider } from "./context/AppStateContext";
import { BoardContextProvider } from "./context/BoardContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppStateProvider>
      <BoardContextProvider>
        <App />
      </BoardContextProvider>
    </AppStateProvider>
  </React.StrictMode>
);
