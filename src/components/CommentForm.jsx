import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {  useParams } from "react-router-dom";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { __addComment } from "../redux/module/commentSlice";
import Button from "../elem/Button";

const CommentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [formHelper, setFormHelper] = useState("");
  const [userName, onChangeUserNameHandler, setUserName] = useInput();
  const [content, onChangeContentHandler, setContent] = useInput();

  const commentHandler = () => {
    if (!userName) {return setFormHelper("You Must Enter Username to Proceed")}
    if (!content) {return setFormHelper("You Must Enter Comment to Proceed")}
    const postComment = {
      postId: id,
      username: userName,
      content: content,
      commentLike: false,
    };
    dispatch(__addComment(postComment));
    setUserName("");
    setContent("");
    setFormHelper("")
  };

  return (
      <CommentFormBox>
      <FormHelper>{formHelper}</FormHelper>
        <div>
          <CommentFormInput
            length="200px"
            type="text"
            placeholder="Username"
            value={userName || ""}
            onChange={onChangeUserNameHandler}
          />
          <CommentFormInput
            length="400px"
            type="text"
            placeholder="Comment"
            value={content || ""}
            onChange={onChangeContentHandler}
          />
        </div>
        <Button buttonName={"Submit"} onClick={commentHandler} />
      </CommentFormBox>
  );
};

export default CommentForm;
const CommentFormBox = styled.div`
  width: 450px;
  margin: 20px auto;
  box-shadow: 5px 5px 20px #999;
`;

const CommentFormInput = styled.input`
  margin: 15px;
  width: ${(props) => props.length};
  font-size: 18px;
  border: none;
  text-align: center;
  :focus {
    outline: none;
  }
  &::placeholder {
    color: #aaa;
  }
`;
const FormHelper = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #fa1e2d;
`;
