import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import TasksBoard from "./components/TasksBoard/TasksBoard";
import ShowSidebarButton from "./components/ShowSidebarButton/ShowSidebarButton";
import ModalOverlay from "./components/ModalOverlay/ModalOverlay";
import { UseAppStateContext } from "./context/AppStateContext";
import { UseModalContext } from "./context/ModalContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import "./index.scss";

function App() {
  const [appState] = UseAppStateContext();
  const [modalData, _] = UseModalContext();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    console.log("hello");
    if (theme === "dark") {
      document.body.style.backgroundColor = "#20212c";
    } else {
      document.body.style.backgroundColor = "#f4f7fd";
    }
  }, [theme]);

  return (
    <div className={theme === "dark" ? "theme-dark" : "theme-light"}>
      <Header />
      <Sidebar />
      <TasksBoard />
      {!appState.sideBarOpen ? <ShowSidebarButton /> : ""}
      {modalData.isModalDisplayed ? (
        <AnimatePresence>
          <ModalOverlay modalData={modalData} />
        </AnimatePresence>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
