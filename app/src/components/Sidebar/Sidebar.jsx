import React from "react";
import { ReactComponent as Logo } from "../../assets/svgs/logo-dark.svg";
import { ReactComponent as BoardIcon } from "../../assets/svgs/icon-board.svg";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="p-6">
        <Logo className="logo logo-dark" />
      </div>
      <div className="sidebar__items">
        <h2 className="p-6">All Boards</h2>
        <ul>
          <li className="active pt-1 pb-1 mt-1 mb-1">
            <button className="center-vertical">
              <BoardIcon />
              <span className="ml-1">Platform Launch</span>
            </button>
          </li>
          <li className="pt-1 pb-1 mt-1 mb-1">
            <button className="center-vertical">
              <BoardIcon />
              <span className="ml-1">Marketing Plan</span>
            </button>
          </li>
          <li className="pt-1 pb-1 mt-1 mb-1">
            <button className="center-vertical">
              <BoardIcon />
              <span className="ml-1">Roadmap</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
