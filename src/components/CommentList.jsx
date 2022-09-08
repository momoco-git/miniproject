import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { api } from "../axios/axios";
import { getCookieName } from "../redux/Cookie";
import {
  __getComment,
  __deleteComment,
  __updateComment,
  getComment,
} from "../redux/module/commentSlice";
import AllRounderButton from "../elem/AllRounderButton";

const CommentList = props => {
  const data = useSelector(state => state.posts.list);
  const commentdata = useSelector(state => state.comment.comment);

  const { id } = useParams();
  const predata = data?.filter(x => x.id === parseInt(id));
  const commentList = predata[0]?.commentList;
  const commentOwner = getCookieName();

  const [toggle, setToggle] = useState(false);
  const [formHelper, setFormHelper] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComment(commentList));
  }, [commentList]);

  const commentInput = useRef(null);

  const navigate = useNavigate();

  const onCommentHandler = e => {
    e.preventDefault();
    if (!commentInput.current.value) {
      return setFormHelper("내용을 입력해주세요.");
    }

    dispatch(
      __updateComment({
        id,
        comment: commentInput.current.value,
      })
    );
    commentInput.current.value = "";

    setFormHelper("");
    setToggle(false);
  };

  const onDeleteHandler = async commentid => {
    window.confirm("댓글을 삭제하시겠습니까?");
    const res = await api.delete(`/api/auth/comment/${commentid}`);
    window.location.reload();
  };
  return (
    <>
      <CommentListBox>
        <FormHelper>{formHelper}</FormHelper>

        {commentList?.length <= 0 ? (
          <div> 댓글이 없습니다!</div>
        ) : (
          <>
            {commentList?.map((x, idx) => {
              return (
                <React.Fragment key={x?.id}>
                  <CommentFlex>
                    <CommnetBox>
                      <Div>
                        <Usernamebox>{x?.nickname}</Usernamebox>
                        <Commentin> {x?.content}</Commentin>
                      </Div>
                      {commentOwner === x?.username ? (
                        <AllRounderButton
                          length={"60px"}
                          buttonName={"삭제"}
                          onClick={() => {
                            onDeleteHandler(x.id);
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </CommnetBox>
                    <hr />
                  </CommentFlex>
                </React.Fragment>
              );
            })}
          </>
        )}
      </CommentListBox>
    </>
  );
};

export default CommentList;

const Div = styled.div`
  margin-left: 10px;
`;


const CommentListBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-comment: space-around; */
  align-items: center;
  margin: auto;
  background-color: #fcfcfc;
  border-radius: 20px;
`;

const CommentFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;


const FormHelper = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #fa1e2d;
`;
const CommentFormInput = styled.input`
  margin: 15px;
  width: ${props => props.length};
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
const CommnetBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  justify-content: space-between;
  align-items: center;
`;
const Commentin = styled.div`
  text-align: left;
  width: 100%;
`;
const Usernamebox = styled.div`
  font-size: 0.6rem;
  font-weight: bolder;
`;
