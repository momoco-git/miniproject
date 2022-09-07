import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __updatePost } from "../../redux/module/postSlice";
import ReactPlayer from 'react-player';

const Item = React.forwardRef((post, ref) => {
  const { id, body, title, like, coverUrl } = post
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(0);
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
  


  return (
    <div>
      {like ? (
        <Like onClick={likeHandler}>♥️</Like>
      ) : (
        <Like onClick={likeHandler}>♡</Like>
      )}
        <div onClick={() => {
         navigate("/detail/" + id);
       }}
       src={coverUrl}>
        <PlayerWrapper
              onMouseOver={() => setIsHovering(1)}
              onMouseOut={() => setIsHovering(0)}
            >
              <ReactPlayer 
               className="react-player" 
               url={coverUrl} 
               width="100%" 
               height="100%" 
               muted={true} 
               playing={true} 
               loop={true}
              //  light mode={true}
              />
                {isHovering ? (
                  <ReactPlayer 
                  className="react-player" 
                  url={coverUrl} 
                  width="100%" 
                  height="100%" 
                  muted={true} 
                  playing={true} 
                  loop={true}
                  pip={false} />
                  ) : (
                  ""
                )}
          </PlayerWrapper>
      <Title>{title}</Title>
      <Body>{body}</Body>
      </div>
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
const PlayerWrapper = styled.div`
    position: relative;
    padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */;
    .react-player {
      position: absolute;
      top: 0;
      left: 0;
    }
  `;
export default Item;
