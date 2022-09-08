import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __updatePost } from "../../redux/module/postSlice";
import ReactPlayer from 'react-player';


const Item = React.forwardRef((data, ref) => {
  const { id, content, title, like, youtubeUrl, youtubeThumbnailUrl } = data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(0);
  return (
    <div>
        <div onClick={() => {
         navigate("/detail/" + id);
       }}
       src={youtubeUrl}>
        <PlayerWrapper
              onMouseOver={() => setIsHovering(1)}
              onMouseOut={() => setIsHovering(0)}
            >
              <Thumbnail src={youtubeThumbnailUrl} />
                  {isHovering ? (
                  <ReactPlayer 
                  className="react-player" 
                  url={youtubeUrl} 
                  width="100%" 
                  height="100%"
                  muted={true} 
                  playing={true} 
                  loop={true}
                  />
                  ) : (
                  ""
                )}
          </PlayerWrapper>
      <Title>{title}</Title>
      <Content>{content}</Content>
      </div>
      <div ref={ref}/>
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
const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */;
  .react-player {
    position: absolute;
    top: 30px;
    left: 0;
  }
  &:hover {
  box-shadow: 10px 10px 10px ;
  }        

  `;
export default Item;
