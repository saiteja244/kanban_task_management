import React from "react";

const TaskCard = ({ id, title, description, subtasks }) => {
  const noOfCompletedTasks = subtasks.filter((task) => task.isCompleted).length;
  return (
    <div className="task-card mt-2 mb-2 pl-5 pb-5 pt-5">
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
