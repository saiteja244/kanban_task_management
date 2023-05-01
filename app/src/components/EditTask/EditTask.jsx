import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UseModalContext } from "../../context/ModalContext";
import { ReactComponent as CrossIcon } from "../../assets/svgs/icon-cross.svg";
import { nanoid } from "nanoid";
import { UseBoardContext } from "../../context/BoardContext";
import Status from "../Status/Status";

const EditTask = () => {
  const [modalData] = UseModalContext();
  const { boardData } = UseBoardContext();
  const { id, title, description, status, subtasks } = modalData.modalContent;
  const [taskInfo, setTaskInfo] = useState({
    activeStatus: status,
    options: boardData.activeBoard.columns.reduce((arr, column) => {
      if (!arr.includes(column.name)) {
        arr.push(column.name);
      }
      return arr;
    }, []),
    subtaskOptions: subtasks,
    description: description || "",
    taskInfoTitle: title,
  });

  const handleFormChange = (e) => {
    const inputID = e.target.id;
    setTaskInfo((prevTaskInfo) => {
      let newTitle, newDescription;
      if (inputID.includes("title")) {
        newTitle = e.target.value;
        return {
          ...prevTaskInfo,
          taskInfoTitle: newTitle,
        };
      } else if (inputID.includes("description")) {
        newDescription = e.target.value;
        return {
          ...prevTaskInfo,
          description: newDescription,
        };
      } else if (inputID.includes("subtask")) {
        const subTaskID = inputID.split("subtasks-")[1];

        const arrCopy = [...prevTaskInfo.subtaskOptions];

        const subTaskToChange = arrCopy.find(
          (subtask) => subtask.id === subTaskID
        );

        subTaskToChange.title = e.target.value;

        // Find the subtask to be updated in subtask array.
        // Use arr.splice to inject to replace old subtask with new
        for (let i = 0; i < arrCopy.length; i++) {
          let obj = arrCopy[i];

          if (arrCopy.indexOf(obj.id) !== -1) {
            arrCopy.splice(i, 1, subTaskToChange);
            i--;
          }
        }

        return {
          ...prevTaskInfo,
          arrCopy,
        };
      }
    });
  };

  const removeSubTask = (id) => {
    setTaskInfo((prevTaskInfo) => ({
      ...prevTaskInfo,
      subtaskOptions: prevTaskInfo.subtaskOptions.filter(
        (subtask) => subtask.id !== id
      ),
    }));
  };

  const addNewSubTask = () => {
    setTaskInfo((prevTaskInfo) => {
      const newSubtask = {
        id: nanoid(),
        title: "",
        isCompleted: false,
      };

      const newSubtaskOptions = prevTaskInfo.subtaskOptions.push(newSubtask);

      return {
        ...prevTaskInfo,
        newSubtaskOptions,
      };
    });
  };

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal pr-7 pl-7 pt-5 pb-5"
      >
        <div className="modal-header">
          <h5>Edit Task</h5>
          <form className="modal-form">
            <div className="form-group mt-1 mb-1">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className="p-1 mt-1"
                value={taskInfo.taskInfoTitle || ""}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group mt-1 mb-1">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="p-1 mt-1"
                cols="30"
                rows="5"
                value={taskInfo.description || ""}
                onChange={handleFormChange}
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              ></textarea>
            </div>
            <div className="form-group mt-1 mb-1">
              <label htmlFor="subtasks">Subtasks</label>
              {taskInfo.subtaskOptions.map((subtask) => {
                const { id, title } = subtask;
                return (
                  <div className="subtask-input__container mt-1" key={id}>
                    <input
                      type="text"
                      id={`subtasks-${id}`}
                      className="p-1"
                      value={title}
                      onChange={handleFormChange}
                    />
                    <button type="button" onClick={() => removeSubTask(id)}>
                      <CrossIcon className="ml-1" />
                    </button>
                  </div>
                );
              })}
              <div className="modal-btn--fw mt-1">
                <button
                  className="pt-1 pb-1"
                  type="button"
                  onClick={addNewSubTask}
                >
                  &#43; Add New Subtask
                </button>
              </div>
            </div>
            <div className="form-group mt-1 mb-1">
              <Status
                options={taskInfo.options}
                activeStatus={taskInfo.activeStatus}
              />
            </div>
          </form>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};

export default EditTask;
