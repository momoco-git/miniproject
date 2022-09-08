import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __updatePost } from "../../redux/module/postSlice";
import ReactPlayer from "react-player";

const Item = React.forwardRef((post, ref) => {
  const { id, content, title, like, youtubeUrl, youtubeThumbnailUrl } = post;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const likeHandler = e => {
    e.preventDefault();
    const updateLike = {
      id,
      like: !like,
    };
    window.location.reload();

    dispatch(__updatePost(updateLike));
    if (!like) alert("좋아요!");
    else alert("좋아요 취소!");
  };

  return (
    <div>
      <div
        onClick={() => {
          navigate("/detail/" + id);
        }}
        // src={youtubeThumbnailUrl}
      >
        <PlayerWrapper
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
        >
          {/* <ReactPlayer
            className="react-player"
            url={youtubeUrl}
            width="100%"
            height="100%"
            muted={true}
            playing={true}
            loop={true}
            //  light mode={true}
          /> */}
          {isHovering ? (
            <ReactPlayer
              className="react-player"
              url={youtubeUrl}
              width="100%"
              height="100%"
              muted={true}
              playing={true}
              loop={true}
              pip={false}
            />
          ) : (
            <YoutubeThumbnail src={youtubeThumbnailUrl} />
          )}
        </PlayerWrapper>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </div>
      <div ref={ref} />
    </div>
  );
});

const Thumbnail = styled.img`
  width: 100% /* Player ratio: 100 / (1280 / 720) */;
  height: 142px;
  position: absolute;
  top: 30px;
  &:hover {
    box-shadow: 10px 10px 10px gray;
  }
`;
const Title = styled.h2`
  font-size: 17px;
  text-align: center;
  font-weight: bold;
  margin-top: 40px;
`;
const Content = styled.h1`
  font-size: 15px;
  text-align: center;
  margin-top: 30px;
`;
const Like = styled.div`
  position: absolute;
  background-color: white;
  font-weight: border;
  height: 5;
  width: 5;
  margin-top: 200px;
  font-size: 20px;
  transform: translate(10px, 100px);
  border-radius: 10%;
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
const YoutubeThumbnail = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export default Item;
