import React, { useState, useEffect } from "react";

import { UseAppStateContext } from "../../context/AppStateContext";

import Nav from "../Nav/Nav";

const Sidebar = () => {
  const [appState, setAppState] = UseAppStateContext();

  return (
    <>
      <aside className={`sidebar ${appState.sideBarOpen ? "show" : ""} `}>
        <Nav />
      </aside>
    </>
  );
};

export default Sidebar;
