import styled from "styled-components";
import Item from "../../components/Item/Item";
import React, { useCallback, useEffect, useState } from "react";
import { PostList } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import { getItems } from "../../apis/api";
import { __getPost } from "../../redux/module/postSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingItem from "../../components/LoadingItem/LoadingItem";
import { getRefreshToken, getCookieName } from "../../redux/Cookie";
const List = () => {
  const dispatch = useDispatch();
  const postlist = useSelector(state => state.posts.list);
  const totalcount = postlist.length;
  const maxpage = Math.ceil(totalcount / 6);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [loadingItem, setLoadingItem] = useState(true);
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const username = getCookieName();
  const loadItems = useCallback(async () => {
    const data = await PostList.getPostList();
    const mypost = data.data.data.filter(x => x.username === username);
    setItems(mypost);
    setLoading(true);
  }, []);

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <ListDiv>
      {loading ? (
        items.map((post, idx) => (
          <ItemDiv key={idx}>
            <Item {...post} key={post.id} />
          </ItemDiv>
        ))
      ) : (
        <Loadingg>...Loding</Loadingg>
      )}

      <ToTheTopButton onClick={scrollToTop}>TOP</ToTheTopButton>
      {getRefreshToken() && (
        <AddPostButton
          onClick={() => {
            navigate("/addpost");
          }}
        >
          +
        </AddPostButton>
      )}
    </ListDiv>
  );
};
const Loadingg = styled.div`
  font-size: 2rem;
`;

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
