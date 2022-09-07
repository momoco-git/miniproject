import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {  useParams } from "react-router-dom";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { __addComment } from "../redux/module/commentSlice";
import AllRounderButton from "../elem/AllRounderButton";

const CommentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [formHelper, setFormHelper] = useState("");
  const [comment, onChangeCommentHandler, setComment] = useInput();

  const commentHandler = () => {
    if (!comment) {return setFormHelper("댓글을 입력하세요.")}
    const postComment = {
      postId: id,
      comment: comment,
      commentLike: false,
    };
    dispatch(__addComment(postComment));
    setComment("");
    setFormHelper("")
  };

  return (
      <CommentFormBox>
      <FormHelper>{formHelper}</FormHelper>
        <div>
          <CommentFormInput
            length="400px"
            type="text"
            placeholder="댓글"
            value={comment || ""}
            onChange={onChangeCommentHandler}
          />
        </div>
        <AllRounderButton buttonName={"저장"} onClick={commentHandler} />
      </CommentFormBox>
  );
};

export default CommentForm;
const CommentFormBox = styled.div`
  width: 450px;
  margin: 20px auto;
  box-shadow: 5px 5px 20px #999;
  border-radius: 30px;
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
