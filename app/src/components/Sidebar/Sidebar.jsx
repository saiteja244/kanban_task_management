import React from "react";
import { ReactComponent as Logo } from "../../assets/svgs/logo-dark.svg";

const Sidebar = () => {
  return (
    <aside className="sidebar p-2">
      <Logo className="logo logo-dark" />
    </aside>
  );
};

export default Sidebar;
