import { Navigate, Outlet } from "react-router-dom";
import "./App.css";

import Header from "./main/header/header";

function App() {
  const login = localStorage.getItem("login");
  return (
    <>
      {login === "false" && <Navigate to="/login" />}
      {login === "true" && (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;
