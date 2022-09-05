import styled from "styled-components";
import Post from "../Post/Post";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getPosts } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import Loadingpost from "../Loadingpost/Loadingpost";

const Postlist = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [Loadingpost, setLoadingpost] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({
    threshold: 1,
  });
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const loadPosts = useCallback(async () => {
    setLoading(true);
    await getPosts(page, 6).then(res => {
      setPosts(prevState => [...prevState, res]);
    });
    setLoading(false);
  }, [page]);

  const loadSkeleton = () => (
    <>
      {/* <Loadingpost />
      <Loadingpost />
      <Loadingpost />
      <Loadingpost />
      <Loadingpost />
      <Loadingpost /> */}
    </>
  );

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setTimeout(() => {
        setPage(prevState => prevState + 1);
      }, 800);
    } else if (inView && loading) {
      setLoadingpost(false);
    } else {
      setLoadingpost(true);
    }
  }, [inView, loading]);

  return (
    <ListDiv>
      {posts &&
        posts.map(post =>
          post.map((post, idx) => (
            <ItemDiv key={idx}>
              <Post {...post} key={post.id} ref={ref} />
            </ItemDiv>
          ))
        )}
      {Loadingpost ? loadSkeleton() : <EndMessage>end of the page</EndMessage>}
      <ToTheTopButton onClick={scrollToTop}>TOP</ToTheTopButton>
      <AddPostButton
        onClick={() => {
          navigate("/addpost");
        }}
      >
        +
      </AddPostButton>
    </ListDiv>
  );
};
const ItemDiv = styled.div`
  background-color: white;
  margin: 20px auto;
  width: 250px;
  height: 400px;
  box-shadow: 1px 1px 15px grey;
`;
const ListDiv = styled.div`
  width: 800px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;
const ToTheTopButton = styled.button`
  position: fixed;
  right: 20px;
  top: 80px;
  margin: 5px 2px;
  padding: 15px;
  background-color: transparent;
  width: "100px";
  font-size: 20px;
  color: #764abc;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  transition: 0.5s;
  &:hover {
    background-color: #764abc;
    color: white;
  }
`;
const EndMessage = styled.h1`
  margin: 100px auto;
`;

const AddPostButton = styled.div`
  position: fixed;
  right: 20px;
  bottom: 80px;

  padding: 15px;
  background-color: white;
  width: "100px";
  font-size: 2rem;
  color: #764abc;
  cursor: pointer;
  border-radius: 100px;
  border: none;
  transition: 0.5s;
  &:hover {
    background-color: #764abc;
    color: white;
  }
`;
export default Postlist;
