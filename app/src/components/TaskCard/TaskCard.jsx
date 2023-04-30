import React from "react";
import { UseModalContext } from "../../context/ModalContext";

const TaskCard = ({ id, title, description, status, subtasks }) => {
  const noOfCompletedTasks = subtasks.filter((task) => task.isCompleted).length;
  const [modalData, setModalData] = UseModalContext();

  return (
    <div
      className="task-card mt-2 mb-2 p-5"
      role="button"
      onClick={() => {
        setModalData(() => ({
          ...modalData,
          isModalDisplayed: true,
          modalToRender: "task-detail",
          modalContent: {
            title,
            description,
            subtasks,
            status,
            id,
          },
        }));
      }}
    >
      <div className="card-details">
        <h4>{title}</h4>
        <p>
          {noOfCompletedTasks} of {subtasks.length} subtasks
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
