import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import TasksBoard from "./components/TasksBoard/TasksBoard";
import ShowSidebarButton from "./components/ShowSidebarButton/ShowSidebarButton";
import ModalOverlay from "./components/ModalOverlay/ModalOverlay";
import { UseAppStateContext } from "./context/AppStateContext";
import { UseModalContext } from "./context/ModalContext";
import { motion, AnimatePresence } from "framer-motion";

import "./index.scss";

function App() {
  const [appState] = UseAppStateContext();
  const [modalData, _] = UseModalContext();

  return (
    <div className="theme--dark">
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
