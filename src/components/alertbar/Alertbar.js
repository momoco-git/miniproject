import React from "react";
import styled from "styled-components";
import { Text } from "../../elem/index";
const AlertBar = props => {
  return (
    <Alertbar>
      <Text color="white" fs="1.5rem" fw="semi-bold">
        Error : {props.errortext}
      </Text>
    </Alertbar>
  );
};

export default AlertBar;

const Alertbar = styled.div`
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: red;
  padding-top: 5px;
  text-align: center;
  margin: auto;
`;
