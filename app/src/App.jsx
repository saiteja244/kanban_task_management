import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import "./index.scss";

function App() {
  return (
    <div className="theme--dark">
      <Header />
      <Sidebar />
    </div>
  );
}

export default App;
