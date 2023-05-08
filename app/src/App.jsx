import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import TasksBoard from "./components/TasksBoard/TasksBoard";
import ShowSidebarButton from "./components/ShowSidebarButton/ShowSidebarButton";
import ModalOverlay from "./components/ModalOverlay/ModalOverlay";
import { UseAppStateContext } from "./context/AppStateContext";
import { UseModalContext } from "./context/ModalContext";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useWindowWidth } from "./hooks/UseWindowWidth";

import "./index.scss";

function App() {
  const [appState, setAppState] = UseAppStateContext();
  const [modalData] = UseModalContext();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (appState.theme === "dark") {
      document.body.style.backgroundColor = "#20212c";
    } else {
      document.body.style.backgroundColor = "#f4f7fd";
    }
  }, [appState.theme]);

  useEffect(() => {
    if (windowWidth <= 768) {
      setAppState({
        ...appState,
        isMobileDevice: true,
      });
    } else {
      setAppState({
        ...appState,
        isMobileDevice: false,
      });
    }
  }, [windowWidth]);

  return (
    <div className={appState.theme === "dark" ? "theme-dark" : "theme-light"}>
      <Header />
      {!appState.isMobileDevice ? <Sidebar /> : ""}

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
