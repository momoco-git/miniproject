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
  const { isLoading, error, list } = useSelector((state) => state.posts);
  const getPost = list.find((data) => data.id === id);
  useEffect(() => {
    dispatch(__getPost());
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
        <Video/>
        <Info {...getPost} />
      </DetailComment>
      <DetailComment>
        <CommentList id={id} />
      </DetailComment>
      <CommentForm />
    </DetailPage>
  );
};
const DetailPage = styled.div`
  max-width: 1000px;
  min-width: 800px;
  margin: auto;
`;
const DetailComment = styled.div`
  width: 450px;
  margin: auto;
  box-shadow: 5px 5px 10px #999;
`;
export default Detail
