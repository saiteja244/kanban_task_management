import React from "react";
import TaskDetail from "../TaskDetail/TaskDetail";
import EditTask from "../EditTask/EditTask";
import { motion } from "framer-motion";
import { UseModalContext } from "../../context/ModalContext";
import { UseBoardContext } from "../../context/BoardContext";

const ModalOverlay = ({ modalData }) => {
  const [_, setModalData] = UseModalContext();
  const { boardData, setBoardData } = UseBoardContext();

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setModalData((prevData) => ({
        ...prevData,
        isModalDisplayed: false,
        modalToRender: "",
      }));
    }
  };

  return (
    <motion.div
      key={"overlay-animate"}
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={closeModal}
      exit={{ opacity: 0 }}
    >
      {modalData.modalToRender === "task-detail" ? (
        <TaskDetail modalData={modalData} />
      ) : modalData.modalToRender === "edit-task" ? (
        <EditTask modalData={modalData} />
      ) : (
        ""
      )}
    </motion.div>
  );
};

export default ModalOverlay;
