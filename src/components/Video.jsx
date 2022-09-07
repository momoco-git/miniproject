import React from 'react';
import ReactPlayer from 'react-player';
import styled from "styled-components";

function Video(){
    
  return(
    <PlayerWrapper>
    <ReactPlayer 
      className="react-player" 
      url="https://www.youtube.com/watch?v=GapXQj2ttdY" 
      width="100%" 
      height="100%" 
      muted={true} 
      playing={true} 
      loop={true} />
  </PlayerWrapper>
  )
  
}export default Video

const PlayerWrapper = styled.div`
    position: relative;
    padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */;
    .react-player {
      position: absolute;
      top: 0;
      left: 0;
    }
  `;
