import React from "react";
import { Route, Routes } from "react-router-dom";
import Detail from "./views/Detail";
import Loginpage from "./views/Loginpage";
import Mainpage from "./views/Mainpage";
import Modifypage from "./views/ModifyPage";
import Signuppage from "./views/Signuppage";
import Addpost from "./views/Addpost";
import MyPage from "./views/Mypage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/modify" element={<Modifypage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/addpost" element={<Addpost />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
