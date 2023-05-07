import React, { useState, useEffect } from "react";
import { ReactComponent as SidebarHideIcon } from "../../assets/svgs/icon-hide-sidebar.svg";
import { ReactComponent as BoardIcon } from "../../assets/svgs/icon-board.svg";
import { UseAppStateContext } from "../../context/AppStateContext";
import { UseBoardContext } from "../../context/BoardContext";
import { UseModalContext } from "../../context/ModalContext";
import BoardButton from "../BoardButton/BoardButton";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

const Sidebar = () => {
  const [appState, setAppState] = UseAppStateContext();
  const [_, setModalData] = UseModalContext();
  const { boardData, changeBoard } = UseBoardContext();

  const [themeSwitchChecked, setThemeSwitchChecked] = useState(true);

  useEffect(() => {
    setAppState((prevAppState) => {
      let newTheme;
      if (themeSwitchChecked) {
        newTheme = "dark";
      } else {
        newTheme = "light";
      }

      return {
        ...prevAppState,
        theme: newTheme,
      };
    });
  }, [themeSwitchChecked]);

  const handleHideSidebar = () => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      sideBarOpen: false,
    }));
  };

  const handleClick = (id) => {
    changeBoard(id);
  };

  const handleCreateBoard = () => {
    setModalData({
      isModalDisplayed: true,
      modalToRender: "create-board",
      modalContent: {},
    });
  };

  return (
    <>
      <aside className={`sidebar ${appState.sideBarOpen ? "show" : ""} `}>
        <div className="sidebar__items">
          <div>
            <h2 className="p-6">
              All Boards ({boardData.boardCollection.length})
            </h2>
            <ul>
              {boardData.boardCollection.map((board) => {
                const { id, name } = board;
                return (
                  <BoardButton
                    key={id}
                    id={id}
                    name={name}
                    handleClick={handleClick}
                  />
                );
              })}
              <button
                className="center-vertical create-board"
                type="button"
                onClick={handleCreateBoard}
              >
                <BoardIcon />
                <span className="ml-2"> &#43; Create New Board</span>
              </button>
            </ul>
          </div>
        </div>
        <div className="mb-2">
          <div className="ml-2 mr-2 mb-1">
            <ThemeSwitch
              checked={themeSwitchChecked}
              handleCheck={() => setThemeSwitchChecked(!themeSwitchChecked)}
            />
          </div>
          <div className="mb-1">
            <button
              type="button"
              onClick={handleHideSidebar}
              className="sidebar-btn pl-6 pt-2 pb-2"
            >
              <SidebarHideIcon />
              <span className="ml-2">Hide Sidebar</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
