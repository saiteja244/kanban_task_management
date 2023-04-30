import React from "react";
import { ReactComponent as Logo } from "../../assets/svgs/logo-dark.svg";
import { UseAppStateContext } from "../../context/AppStateContext";
import { UseBoardContext } from "../../context/BoardContext";

const Header = () => {
  const [appState] = UseAppStateContext();
  const { boardData } = UseBoardContext();

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
      <div className="header__content">
        <h2 className="ml-2">{boardData.activeBoard.name}</h2>
      </div>
    </header>
  );
};

export default Header;
