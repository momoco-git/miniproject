import React from "react";
import styled from "styled-components";
const AllRounderButton = ({length, onClick, buttonName }) => {
  return <Button length={length} onClick={onClick}>{buttonName}</Button>;
};
const Button = styled.button`
  margin: 5px 2px;
  padding: 10px;
  background-color: transparent;
  width: ${(props) => props.length || "100px"};
  height: 35px;
  font-size: 15px;
  color: #764abc;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  transition: 0.5s;
  &:hover {
    background-color: #764abc;
    color: white;
  }
`;

export default AllRounderButton;
