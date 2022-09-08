import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useSelector } from "react-redux";
function Video({ id }) {
  const data = useSelector(state => state.posts.list);
  const detaildata = data.filter(x => x.id === parseInt(id));

  return (
    <PlayerWrapper>
      <ReactPlayer
        className="react-player"
        url={detaildata[0]?.youtubeUrl}
        width="100%"
        height="100%"
        muted={false}
        controls={true}
        volume={true}
        playing={true}
        loop={true}
      />
    </PlayerWrapper>
  );
}
export default Video;

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */;
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
