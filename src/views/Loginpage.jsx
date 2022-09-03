import React from "react";
import Login from "../components/Login/Login";
import styled from "styled-components";
export default function LoginPage() {
  React.useEffect(() => {}, []);
  return (
    <Backgound>
      <Login />
    </Backgound>
  );
}

const Backgound = styled.div`
  width: 100vw;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
