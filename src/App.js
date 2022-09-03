import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Detail from "./views/Detail";
import Loginpage from "./views/Loginpage";
import Mainpage from "./views/Mainpage";
import Modifypage from "./views/ModifyPage";
import Signin from "./views/Signin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/modify" element={<Modifypage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
