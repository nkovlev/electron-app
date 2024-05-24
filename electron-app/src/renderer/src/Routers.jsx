//import HashRouter from react-router-dom
import { HashRouter as Router, Route, Routes } from "react-router-dom";
//modules import
import SideBar from "./modules/SideBar";
import ContactsList from "./modules/ContactsList";
import Chat from "./modules/Chat";
import Register from "./modules/Register";
import LogIn from "./modules/LogIn";
import Start from "./modules/Start";

const Routers = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex">
                <Start />
              </div>
            }
          />
          <Route
            path="/messages"
            element={
              <div className="flex w-screen h-screen">
                <SideBar />
                <ContactsList />
                <div className="flex-1">
                  <Chat />
                </div>
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div className="flex w-screen h-screen">
                <LogIn />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="flex w-screen h-screen">
                <Register />
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default Routers;
