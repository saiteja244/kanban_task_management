import React from "react";
import { ReactComponent as Logo } from "../../assets/svgs/logo-dark.svg";
import { UseAppStateContext } from "../../context/AppStateContext";

const Header = () => {
  const [appState] = UseAppStateContext();

  return (
    <header className="header">
      <div
        className={`logo-container pl-5 center-vertical ${
          appState.sideBarOpen ? "sidebar-open" : ""
        }`}
      >
        <Logo className="logo" />
      </div>
      <div></div>
    </header>
  );
};

export default Header;
