import React, { useRef, useEffect } from "react";
import { ReactComponent as SidebarHideIcon } from "../../assets/svgs/icon-hide-sidebar.svg";
import { ReactComponent as BoardIcon } from "../../assets/svgs/icon-board.svg";
import { UseAppStateContext } from "../../context/AppStateContext";
import { UseBoardContext } from "../../context/BoardContext";
import { UseModalContext } from "../../context/ModalContext";
import BoardButton from "../BoardButton/BoardButton";

const Sidebar = () => {
  const [appContext, setAppContext] = UseAppStateContext();
  const [_, setModalData] = UseModalContext();
  const { boardData, changeBoard } = UseBoardContext();

  const sideBarRef = useRef();

  useEffect(() => {
    console.log(sideBarRef.current.getBoundingClientRect());
  }, [appContext.sideBarOpen]);

  const handleHideSidebar = () => {
    setAppContext((prevAppContext) => ({
      ...prevAppContext,
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
      <aside
        className={`sidebar ${appContext.sideBarOpen ? "show" : ""} `}
        ref={sideBarRef}
      >
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
