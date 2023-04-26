import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import ShowSidebarButton from "./components/ShowSidebarButton/ShowSidebarButton";
import { UseAppStateContext } from "./context/AppStateContext";

import "./index.scss";

function App() {
  const [appState] = UseAppStateContext();
  return (
    <div className="theme--dark">
      <Header />
      <Sidebar />
      {!appState.sideBarOpen ? <ShowSidebarButton /> : ""}
    </div>
  );
}

export default App;
