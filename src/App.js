import React from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./component/Topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Reg from "./pages/register/Reg";
import { Context } from "./context/Context";

function App() {
  // const user = false;  going to fetch from context instead now
  const { user } = useContext(Context); //using in topbar also
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/write" element={user ? <Write /> : <Reg />} />
        <Route path="/settings" element={user ? <Settings /> : <Reg />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Reg />} />
      </Routes>
    </Router>
  );
}

export default App;
