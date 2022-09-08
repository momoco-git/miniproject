import styled from "styled-components";
import Item from "../../components/Item/Item";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { getItems } from "../../apis/api";
import { __getPost } from "../../redux/module/postSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingItem from "../../components/LoadingItem/LoadingItem";
const List = () => {
  const dispatch = useDispatch();
  const postlist = useSelector(state => state.post.list);
  const totalcount = postlist.length;
  const maxpage = Math.ceil(totalcount / 6);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [loadingItem, setLoadingItem] = useState(true);
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

  const loadItems = useCallback(async () => {
    setLoading(true);
    await getItems(page, 6).then(res => {
      setItems(prevState => [...prevState, res.data]);
    });
    setLoading(false);
  }, [page]);

  const loadSkeleton = () => (
    <>
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
    </>
  );

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    loadItems();
    dispatch(__getPost());
  }, [loadItems]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setTimeout(() => {
        setPage(prevState => prevState + 1);
      }, 800);
    } else if (inView && loading) {
      setLoadingItem(false);
    } else {
      setLoadingItem(true);
    }
  }, [inView, loading]);

  return (
    <ListDiv>
      {items &&
        items.map(data =>
          data.map((data, idx) => (
            <ItemDiv key={idx}>
              <Item {...data} key={data.id} ref={ref} />
            </ItemDiv>
          ))
        )}
      {loadingItem ? loadSkeleton() : <EndMessage>end of the page</EndMessage>}
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
  height: 350px;
  box-shadow: 1px 1px 15px grey;
  border-radius: 20px;
  &:hover {
    box-shadow: 5px 5px 5px #9ED2C6;
  }        
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

  top: 100px;
  height: 80px;

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

export default List;

const AddPostButton = styled.div`
  position: fixed;
  right: 20px;
  bottom: 80px;

  padding: 15px;
  background-color: white;
  width: "100px";
  font-size: 2rem;
  font-weight: bold;
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
