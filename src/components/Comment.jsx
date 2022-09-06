import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { __deleteComment, __updateComment } from "../redux/module/commentSlice";
import AllRounderButton from "../elem/AllRounderButton";
const Comment = ({ content, commentLike, id }) => {
  const [formHelper, setFormHelper] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [updateComment, onChangeCommentHandler, setUpdateComment] = useInput();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    setUpdateComment(content);
  }, [content, setUpdateComment]);
  const likeHandler = () => {
    const toggleLike = {
      id,
      commentLike: !commentLike,
    };
    dispatch(__updateComment(toggleLike));
    if(!commentLike)alert("좋아요!")
  };
  const updateHandler = () => {
    if (!updateComment) {return setFormHelper("댓글을 입력해주세요.")}
    const editComment = {
      id,
      content: updateComment,
    };
    dispatch(__updateComment(editComment));
    setToggle(!toggle);
  };
  const deleteHandler = () => {
    dispatch(__deleteComment(id))
    navigate(0)
  }
  
  return (
    <>
      <FormHelper>{formHelper}</FormHelper>
      <CommentListBox>
        {toggle ? (
          <>
            <CommentFormInput
              length="160px"
              type="text"
              placeholder="Comment"
              onChange={onChangeCommentHandler}
              defaultValue={content}
            />
            <Paragraph length="240px">{}</Paragraph>
            <AllRounderButton
              length={"60px"}
              buttonName={"취소"}
              onClick={() => {
                setToggle(!toggle);
                setFormHelper(false)
              }}
            />
            <AllRounderButton
              length={"60px"}
              buttonName={"저장"}
              onClick={updateHandler}
            />
          </>
        ) : (
          <>
            <Paragraph length="240px">{content}</Paragraph>
            {commentLike ? (
              <CommentLike onClick={likeHandler}>♥️</CommentLike>
            ) : (
              <CommentLike onClick={likeHandler}>♡</CommentLike>
            )}
            <AllRounderButton
              length={"60px"}
              buttonName={"수정"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
            <AllRounderButton length={"60px"} buttonName={"삭제"} onClick={deleteHandler}/>
          </>
        )}
      </CommentListBox>
    </>
  );
};

export default Comment;

const CommentLike = styled.span`
  font-size: 20px;
  color: #fa1e2d;
`;
const Paragraph = styled.p`
  display: inline-block;
  word-wrap: break-word;
  width: ${(props) => props.length};
`;
const CommentListBox = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
`;
const FormHelper = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #fa1e2d;
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
