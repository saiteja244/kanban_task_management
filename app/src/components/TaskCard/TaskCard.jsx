import React from "react";
import { UseModalContext } from "../../context/ModalContext";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

const TaskCard = ({
  id,
  columnName,
  title,
  description,
  status,
  subtasks,
  index,
  dragStyle = null,
}) => {
  const noOfCompletedTasks = subtasks.filter((task) => task.isCompleted).length;
  const [modalData, setModalData] = UseModalContext();
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({
      id: id,
      data: {
        index: index,
        status: status,
      },
    });

  const dragStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...dragStyle,
  };

  return (
    <li
      className="task-card mt-2 mb-2 p-5"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={dragStyles}
    >
      <div
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
              columnName,
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
    </li>
  );
};

export default TaskCard;
