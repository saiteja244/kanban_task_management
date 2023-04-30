import React from "react";
import { ReactComponent as SidebarHideIcon } from "../../assets/svgs/icon-hide-sidebar.svg";
import { UseAppStateContext } from "../../context/AppStateContext";
import { UseBoardContext } from "../../context/BoardContext";
import BoardButton from "../BoardButton/BoardButton";

const Sidebar = () => {
  const [appContext, setAppContext] = UseAppStateContext();
  const { boardData, changeBoard } = UseBoardContext();

  const handleHideSidebar = () => {
    setAppContext((prevAppContext) => ({
      ...prevAppContext,
      sideBarOpen: false,
    }));
  };

  const handleClick = (id) => {
    changeBoard(id);
  };

  return (
    <>
      <aside className={`sidebar ${appContext.sideBarOpen ? "show" : ""} `}>
        <div className="sidebar__items">
          <div>
            <h2 className="p-6">All Boards ({boardData.length})</h2>
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
            </ul>
          </div>
        </div>
        <div className="ml-2 mb-4">
          <button type="button" onClick={handleHideSidebar}>
            <SidebarHideIcon />
            <span className="ml-2">Hide Sidebar</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
