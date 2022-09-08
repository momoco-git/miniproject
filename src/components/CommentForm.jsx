import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { __addComment } from "../redux/module/commentSlice";
import AllRounderButton from "../elem/AllRounderButton";
import { CommentAPI } from "../apis/api";
const CommentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [formHelper, setFormHelper] = useState("");
  const [comment, onChangeCommentHandler, setComment] = useInput();

  const commentHandler = async () => {
    if (!comment) {
      return setFormHelper("댓글을 입력하세요.");
    }
    const postComment = {
      postId: parseInt(id),
      content: comment,
    };

    const res = await CommentAPI.post(postComment);

    // dispatch(__addComment(postComment));
    setComment("");
    window.location.reload();
  };

  return (
    <CommentFormBox>
      <FormHelper>{formHelper}</FormHelper>
      <div>
        <CommentFormInput
          length="60%"
          type="text"
          placeholder="댓글"
          value={comment || ""}
          onChange={onChangeCommentHandler}
        />
      </div>
      <Button onClick={commentHandler}>저장</Button>
    </CommentFormBox>
  );
};

export default CommentForm;
const CommentFormBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 0px auto 10px auto;
  box-shadow: 5px 5px 20px #999;
  border-radius: 30px;
`;

const CommentFormInput = styled.input`
  margin: 15px;

  width: 60vh;
  height: 50%;
  font-size: 18px;
  border: none;
  border-bottom: 3px solid #f7ecde;

  text-align: center;
  :focus {
    outline: none;
  }
  &::placeholder {
    color: #aaa;
  }
`;
const FormHelper = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 20px;
  color: #fa1e2d;
`;
const Button = styled.button`
  margin: 5px 2px;

  background-color: transparent;
  width: ${props => props.length || "100px"};
  height: 35px;
  font-size: 15px;
  color: #764abc;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  transition: 0.5s;
  &:hover {
    background-color: #f7ecde;
    color: black;
  }
`;
