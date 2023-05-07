import { useState, createContext, useContext } from "react";

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    sideBarOpen: true,
    theme: "dark",
  });

  return (
    <AppStateContext.Provider value={[appState, setAppState]}>
      {children}
    </AppStateContext.Provider>
  );
};

export const UseAppStateContext = () => {
  return useContext(AppStateContext);
};
