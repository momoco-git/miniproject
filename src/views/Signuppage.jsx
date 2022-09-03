import React from "react";
import styled from "styled-components";
import Signup from "../components/Signup/Signup";
export default function Signuppage() {
  React.useEffect(() => {}, []);
  return (
    <Backgound>
      <Signup />
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
