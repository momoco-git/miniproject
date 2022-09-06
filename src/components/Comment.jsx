import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { __deleteComment, __updateComment } from "../redux/module/commentSlice";
import Button from "../elem/Button";
const Comment = ({ username, content, commentLike, id }) => {
  const [formHelper, setFormHelper] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [updateUsername, onChangeUsernameHandler, setUpdateUsernme] =
    useInput();
  const [updateComment, onChangeCommentHandler, setUpdateComment] = useInput();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    setUpdateUsernme(username);
  }, [username, setUpdateUsernme]);

  useEffect(() => {
    setUpdateComment(content);
  }, [content, setUpdateComment]);
  const likeHandler = () => {
    const toggleLike = {
      id,
      commentLike: !commentLike,
    };
    dispatch(__updateComment(toggleLike));
    if(!commentLike)alert("liked Comment!")
  };
  const updateHandler = () => {
    if (!updateUsername) {return setFormHelper("You Must Enter Username to Proceed")}
    if (!updateComment) {return setFormHelper("You Must Enter Comment to Proceed")}
    const editComment = {
      id,
      username: updateUsername,
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
              length="90px"
              type="text"
              placeholder="Username"
              onChange={onChangeUsernameHandler}
              defaultValue={username}
            />
            <CommentFormInput
              length="160px"
              type="text"
              placeholder="Comment"
              onChange={onChangeCommentHandler}
              defaultValue={content}
            />
            <Paragraph length="240px">{}</Paragraph>
            <Button
              length={"60px"}
              buttonName={"cancel"}
              onClick={() => {
                setToggle(!toggle);
                setFormHelper(false)
              }}
            />
            <Button
              length={"60px"}
              buttonName={"submit"}
              onClick={updateHandler}
            />
          </>
        ) : (
          <>
            <Paragraph length="100px">{username}</Paragraph>
            <Paragraph length="240px">{content}</Paragraph>
            {commentLike ? (
              <CommentLike onClick={likeHandler}>♥️</CommentLike>
            ) : (
              <CommentLike onClick={likeHandler}>♡</CommentLike>
            )}
            <Button
              length={"60px"}
              buttonName={"edit"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
            <Button length={"60px"} buttonName={"delete"} onClick={deleteHandler}/>
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
