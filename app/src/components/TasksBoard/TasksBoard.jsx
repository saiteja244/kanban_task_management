import React from "react";
import Column from "../Column/Column";
import { UseAppStateContext } from "../../context/AppStateContext";
import { UseModalContext } from "../../context/ModalContext";
import { UseBoardContext } from "../../context/BoardContext";

const TasksBoard = () => {
  const [appState] = UseAppStateContext();
  const { boardData } = UseBoardContext();
  const [_, setModalData] = UseModalContext();

  const testVal = "No Boards";

  return (
    <main
      className={`tasksboard__main ${
        appState.sideBarOpen ? "translate-sidebar" : ""
      } ${
        appState.sideBarOpen && testVal === "No Boards" ? "narrow-width" : ""
      }`}
    >
      {boardData.activeBoard.name !== "No Boards" ? (
        boardData.activeBoard.columns.map((column) => {
          const { id, name, tasks } = column;
          return <Column key={id} id={id} name={name} tasks={tasks} />;
        })
      ) : (
        <div className="no-boards-alert--container">
          <h3>You have no boards. Create a board to get started.</h3>
          <button
            className="create-board-btn pl-5 pr-5 pt-2 pb-2 mt-2"
            onClick={() =>
              setModalData({
                modalToRender: "create-board",
                isModalDisplayed: true,
                modalContent: {},
              })
            }
          >
            &#43; Create New Board
          </button>
        </div>
      )}
    </main>
  );
};

export default TasksBoard;
