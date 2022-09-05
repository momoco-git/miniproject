import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getComment } from "../redux/module/commentSlice";
import Comment from "./Comment";

const CommentList = ({id}) => {
  const dispatch = useDispatch();
  const getComment = useSelector((state) => state.comments.comments.filter((comment)=>comment.postId === id));
  // const getComment = list.find((comment)=>comment.musicId===id)
  useEffect(() => {
    dispatch(__getComment());
  }, [dispatch]);
  return (
    <>
        {getComment.map((comment)=>(
        <Comment {...comment} key={comment.id}/>
        ))}
    </>
  );
};

export default CommentList;