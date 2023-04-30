import React from "react";
import TaskCard from "../TaskCard/TaskCard";

const Column = ({ id, name, tasks }) => {
  return (
    <article className="column">
      <div>
        <h3>{name}</h3>
      </div>
      <div>
        <ul>
          {tasks.map((task) => {
            const { id, title, description, subtasks, status } = task;
            return (
              <TaskCard
                key={id}
                columnName={name}
                title={title}
                description={description}
                subtasks={subtasks}
                status={status}
                id={id}
              />
            );
          })}
        </ul>
      </div>
    </article>
  );
};

export default Column;
