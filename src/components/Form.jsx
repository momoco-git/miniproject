import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __addPost } from "../redux/module/postSlice";
import { nanoid } from "@reduxjs/toolkit";
import AllRounderButton from "./AllRounderButton";
import useInput from "../hooks/useInput";

const Form = (props) => {
  const [body, onChangeBodyHandler] = useInput();
  const [nick, onChangeNickHandler] = useInput();
  const [CoverUrl, onChangeCoverUrlHandler] = useInput();

  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [formHelper, setFormHelper] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if(!nick){return setFormHelper("You Must Enter Artist to Proceed")}
    if(!body){return setFormHelper("You Must Enter Title to Proceed")}
    if(!CoverUrl){return setFormHelper("You Must Enter Image URL to Proceed")}
    const addMusic = {
      id: nanoid(),
      body: body,
      nick: nick,
      coverUrl: CoverUrl,
      like: false
    };
    dispatch(__addPost(addMusic));
    setToggle(!toggle);
    alert(nick+" by "+body+" has successfully Registered!")
  };
  return (
    <>
      <Formed>
        {toggle ? (
          <div>
            <FormHelper>{formHelper}</FormHelper>
            <InputBox
              length="300px"
              type="text"
              placeholder="Body"
              onChange={onChangeBodyHandler}
              />
            <InputBox
              length="300px"
              type="text"
              placeholder="Nick"
              onChange={onChangeNickHandler}
            />
            <InputBox
              length="500px"
              type="text"
              placeholder="Cover URL"
              onChange={onChangeCoverUrlHandler}
            />
            <AllRounderButton onClick={submitHandler} buttonName={"Submit"} />
          </div>
        ) : null}
      </Formed>
      {toggle ? (
        <AllRounderButton
          onClick={(e) => {
            e.preventDefault();
            setToggle(!toggle);
            setFormHelper("");
          }}
          buttonName={"Close"}
        />
      ) : (
        <AllRounderButton
          onClick={(e) => {
            e.preventDefault();
            setToggle(!toggle);
          }}
          buttonName={"Open Form"}
        />
      )}
    </>
  );
};

export default Form;

const Formed = styled.form`
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 5px 5px 10px #999;
`;

const InputBox = styled.input`
  margin: 20px;
  padding: 8px 10px;
  font-size: 20px;
  border: none;
  text-align: center;
  :focus {
    outline: none;
  }
  width: ${(props) => props.length};
  &::placeholder {
    color: #aaa;
  }
`;
const FormHelper = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #fa1e2d;
`;
