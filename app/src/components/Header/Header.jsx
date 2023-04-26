import React from "react";
import { ReactComponent as Logo } from "../../assets/svgs/logo-dark.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container pl-5 center-vertical sidebar-open">
        <Logo className="logo" />
      </div>
    </header>
  );
};

export default Header;
