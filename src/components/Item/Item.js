import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __updatePost } from "../../redux/module/postSlice";
// import { Like, CoverImg, Title, Body } from "../../elem/Post";

const Item = React.forwardRef((post, ref) => {
  const { id, body, title, like, coverUrl } = post
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const likeHandler = (e) => {
    e.preventDefault()
    const updateLike = {
      id,
      like: !like
    }
    window.location.reload();
    dispatch(__updatePost(updateLike))
    if(!like)alert("좋아요!") 
    else alert("좋아요 취소!")
  }; 
  console.log(coverUrl)

  return (
    <div>
      {like ? (
        <Like onClick={likeHandler}>♥️</Like>
      ) : (
        <Like onClick={likeHandler}>♡</Like>
      )}
      <CoverImg
        onClick={() => {
          navigate("/detail/" + id);
        }}
        src={coverUrl}
      />
      <Title>{title}</Title>
      <Body>{body}</Body>
      <div ref={ref}/>
    </div>
  );
});

const CoverImg = styled.img`
  width: 250px;
  height: 250px;
  margin: 20px auto 0;
  object-fit: cover;
`;
const Title = styled.h2`
  font-size: 17px;
  text-align: center;
  font-weight: bold;
`;
const Body = styled.h1`
  font-size: 20px;
  text-align: center;
`;
const Like = styled.div`
  position: absolute;
  background-color: white;
  height: 30px;
  width: 30px;
  font-size: 24px;
  transform: translate(30%, 770%);
  border-radius: 50%;
  color: #fa1e2d;
  box-shadow: 3px 3px 10px black;
   &:hover {
    background-color: #764abc;
    color: white;
  }
`;
export default Item;
