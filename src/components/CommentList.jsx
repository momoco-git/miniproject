import React, { useEffect, useRef} from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {__getComment, __deleteComment, __updateComment } from '../redux/module/commentSlice';
import AllRounderButton from '../elem/AllRounderButton';

const CommentList = ({ id, commentLike, content }) => {
  const [toggle, setToggle] = useState(false);
  const [formHelper, setFormHelper] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      __getComment()
    )
  },[dispatch])
  const contentInput = useRef(null);
  
  const navigate = useNavigate();
  
  const onCommentHandler = (e) => {
    e.preventDefault();
    if (!contentInput.current.value) {
      return setFormHelper('내용을 입력해주세요.');
    }
    console.log(formHelper);
    dispatch(
      __updateComment({
        id,
        content: contentInput.current.value,
      })
    );
    contentInput.current.value = "";

    setFormHelper("")
    setToggle(false)
    
  };

  const likeHandler = () => {
    const updateLike = {
      id,
      commentLike: !commentLike
    }
    dispatch(__updateComment(updateLike))
  }


  const onDeleteHandler = (e) => {
    e.preventDefault();
    dispatch(__deleteComment(id))
    navigate(0)
  }
  return (
    <>
      <CommentListBox>
        <FormHelper>{formHelper}</FormHelper>
        {toggle ? (
          <>
            <CommentFormInput
              length="160px"
              type="text"
              placeholder="Comment"
              defaultValue={content}
              ref={contentInput}
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
              onClick={onCommentHandler}
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
            <AllRounderButton length={"60px"} buttonName={"삭제"} onClick={onDeleteHandler}/>
          </>
        )}
      </CommentListBox>
    </>
  );
};

export default CommentList;

const CommentListBox = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
`;

const CommentLike = styled.span`
  font-size: 20px;
  color: #fa1e2d;
`;
const Paragraph = styled.p`
  display: inline-block;
  word-wrap: break-word;
  width: ${(props) => props.length};
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