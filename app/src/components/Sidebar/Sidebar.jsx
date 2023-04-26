import React, { useState } from "react";
import { ReactComponent as SidebarHideIcon } from "../../assets/svgs/icon-hide-sidebar.svg";
import { ReactComponent as BoardIcon } from "../../assets/svgs/icon-board.svg";

const Sidebar = () => {
  return (
    <aside className="sidebar show">
      <div className="sidebar__items">
        <div>
          <h2 className="p-6">All Boards</h2>
          <ul>
            <li className="active pt-1 pb-1 mt-1 mb-1">
              <button className="center-vertical">
                <BoardIcon />
                <span className="ml-2">Platform Launch</span>
              </button>
            </li>
            <li className="pt-1 pb-1 mt-1 mb-1">
              <button className="center-vertical">
                <BoardIcon />
                <span className="ml-2">Marketing Plan</span>
              </button>
            </li>
            <li className="pt-1 pb-1 mt-1 mb-1">
              <button className="center-vertical">
                <BoardIcon />
                <span className="ml-2">Roadmap</span>
              </button>
            </li>
            <li className="pt-1 pb-1 mt-1 mb-1 add-board">
              <button className="center-vertical">
                <BoardIcon />

                <span className="ml-2 ">+ Create New Board</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="ml-2 mb-4">
        <button>
          <SidebarHideIcon />
          <span className="ml-2">Hide Sidebar</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
