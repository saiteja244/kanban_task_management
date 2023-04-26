import React from "react";
import Column from "../Column/Column";
import { UseAppStateContext } from "../../context/AppStateContext";
import { UseBoardContext } from "../../context/BoardContext";

const TasksBoard = () => {
  const [appState] = UseAppStateContext();
  const { activeBoard } = UseBoardContext();

  return (
    <main
      className={`tasksboard__main ${
        appState.sideBarOpen ? "translate-sidebar" : ""
      }`}
    >
      {activeBoard.columns.map((column) => {
        const { id, name, tasks } = column;
        return <Column key={id} id={id} name={name} tasks={tasks} />;
      })}
    </main>
  );
};

export default TasksBoard;
