import styled from "styled-components";
import Item from "../../components/Item/Item";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { getItems } from "../../apis/api";
import LoadingItem from "../../components/LoadingItem/LoadingItem";
const List = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
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
    await getItems(page, 8).then(res => {
      setItems(prevState => [...prevState, res]);
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
      <LoadingItem />
      <LoadingItem />
    </>
  );

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    loadItems();
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
    console.log(items);
  }, [inView, loading]);

  return (
    <ListDiv>
      {items &&
        items.map(post =>
          post.map((post, idx) => (
            <ItemDiv key={idx}>
              <Item {...post} key={post.id} ref={ref} />
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
  background-color: #11ffee00;  /* 완전 투명 */
  margin: 20px auto;
  width: 250px;
  height: 400px;
  box-shadow: 1px 1px 15px grey;
  border-radius: 30px;
  &:hover {
    background-color: #764abc;
    background-color: hsla(50, 33%, 25%, 0.75);
    color: white;
  }
`;
const ListDiv = styled.div`
  width: 1100px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;
const ToTheTopButton = styled.button`
  position: fixed;
  right: 20px;
  top: 825px;
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

export default List;

const AddPostButton = styled.div`
  position: fixed;
  right: 20px;
  bottom: 80px;

  padding: 15px;
  background-color: transparent;
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
