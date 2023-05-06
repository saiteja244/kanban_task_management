import React, { useState } from "react";
import { ReactComponent as Logo } from "../../assets/svgs/logo-dark.svg";
import { ReactComponent as EllipsisIcon } from "../../assets/svgs/icon-vertical-ellipsis.svg";
import { UseAppStateContext } from "../../context/AppStateContext";
import { UseModalContext } from "../../context/ModalContext";
import { UseBoardContext } from "../../context/BoardContext";
import Tooltip from "../Tooltip/Tooltip";
import { nanoid } from "nanoid";

const Header = () => {
  const [appState] = UseAppStateContext();
  const [_, setModalData] = UseModalContext();
  const { boardData } = UseBoardContext();

  const [showTooltip, setShowTooltip] = useState(false);

  const handleNewTaskModal = () => {
    setModalData({
      isModalDisplayed: true,
      modalToRender: "new-task",
      modalContent: {
        id: nanoid(),
      },
    });
  };

  const handleEditTooltipClicked = () => {
    setModalData({
      isModalDisplayed: true,
      modalToRender: "edit-board",
      modalContent: {
        id: boardData.activeBoard.id,
        name: boardData.activeBoard.name,
        columns: boardData.activeBoard.columns,
      },
    });

    setShowTooltip(false);
  };

  const handleDelete = () => {
    setModalData({
      modalToRender: "delete-board",
      isModalDisplayed: true,
      modalContent: {
        id: boardData.activeBoard.id,
        itemTitle: boardData.activeBoard.name,
      },
    });

    setShowTooltip(false);
  };

  return (
    <header className="header">
      <div
        className={`logo-container pl-5 center-vertical ${
          appState.sideBarOpen ? "sidebar-open" : ""
        }`}
      >
        <h1>
          <Logo className="logo" />
        </h1>
      </div>
      <div className="header__content pl-8 pr-8">
        <h2>{boardData.activeBoard.name}</h2>
        <div className="header__content--btns">
          <button
            className="add-task-btn pr-3 pl-3 pb-2 pt-2 mr-2"
            type="button"
            onClick={handleNewTaskModal}
          >
            &#43; Add New Task
          </button>
          <button
            type="button"
            className="tooltip-btn"
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <EllipsisIcon className="ml-2" />
          </button>
          {showTooltip ? (
            <Tooltip
              val="board"
              handleEditTooltipClicked={handleEditTooltipClicked}
              handleDelete={handleDelete}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
