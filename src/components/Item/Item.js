import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __updatePost } from "../../redux/module/postSlice";
import { Like, CoverImg, Nick, Body } from "../../elem/post";

const Item = React.forwardRef((post, ref) => {
  const { id, body, nick, like, coverUrl } = post
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const likeHandler = (e) => {
    e.preventDefault()
    const updateLike = {
      id,
      like: !like
    }
    dispatch(__updatePost(updateLike))
    if(!like)alert("liked!")
  };

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
      <Nick>{nick}</Nick>
      <Body>{body}</Body>
      <div ref={ref}/>
    </div>
  );
});

// const CoverImg = styled.img`
//   width: 250px;
//   height: 250px;
//   margin: 20px auto 0;
//   object-fit: cover;
// `;
// const Nick = styled.h2`
//   font-size: 17px;
// `;
// const Body = styled.h1`
//   font-size: 25px;
// `;
// const Like = styled.div`
//   position: absolute;
//   background-color: white;
//   height: 30px;
//   width: 30px;
//   font-size: 24px;
//   transform: translate(30%, 770%);
//   border-radius: 50%;
//   color: #fa1e2d;
//   box-shadow: 3px 3px 10px black;
// `;
export default Item;
