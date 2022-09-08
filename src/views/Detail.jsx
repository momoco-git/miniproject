import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import React, { useEffect } from "react";
import Info from "../components/Info";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getPost } from "../redux/module/postSlice";
import Video from "../components/Video";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isLoading, error, list } = useSelector(state => state.posts);

  const getPost = list.find(post => post.id === id);
  useEffect(() => {
    dispatch(__getPost(id));
  }, [dispatch]);
  if (isLoading) {
    return <div>Loading . . .</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <DetailPage>
      <Header />
      <DetailComment>
        <Video id={id} />
        <Info postid={id} />
      </DetailComment>
      <CommentForm id={id} />
      <DetailComment>
        <CommentList id={id} />
      </DetailComment>
    </DetailPage>
  );
};
const DetailPage = styled.div`
  max-width: 1000px;
  min-width: 800px;
  background-color: #f7ecde;
  margin: auto;
`;
const DetailComment = styled.div`
  width: 60%;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  box-shadow: 15px 15px 15px gray;
`;
export default Detail;
