import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __deletePost, __updatePost } from "../redux/module/postSlice";
import useInput from "../hooks/useInput";
import AllRounderButton from "../elem/AllRounderButton";
import ReactPlayer from 'react-player';


const Info = ({ id, title, content, youtubeUrl, like }) => {
    const [toggle, setToggle] = useState(false);
    const [formHelper, setFormHelper] = useState(false);
    const [updateBody, onChangeBodyHandler, setUpdateBody] = useInput();
    const [updateTitle, onChangeTitleHandler, setUpdateTitle] = useInput();
    const [updateCoverUrl, onChangeCoverUrlHandler, setUpdateCoverUrl] = useInput();
    useEffect(() => {
      setUpdateTitle(title);
    }, [title, setUpdateTitle]);
  
    useEffect(() => {
      setUpdateBody(content);
    }, [content, setUpdateBody]);
  
    useEffect(() => {
      setUpdateCoverUrl(youtubeUrl);
    }, [youtubeUrl, setUpdateCoverUrl]);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const updateHandler = (e) => {
      e.preventDefault();
      if(!updateTitle){return setFormHelper("제목을 입력하세요")}
      if(!updateBody){return setFormHelper("내용을 입력하세요")}
      if(!updateCoverUrl){return setFormHelper("URL을 입력하세요")}
      const updatePost = {
        id,
        title: updateTitle,
        content: updateBody,
        youtubeUrl: updateCoverUrl,
      };
      window.location.reload();
      dispatch(__updatePost(updatePost));
      setToggle(!toggle);
    };
    const likeHandler = () => {
      const updateLike = {
        id,
        like:!like
      }
      dispatch(__updatePost(updateLike))
      if(!like)alert("좋아요!")
    }
    
    const deleteHandler = (e) => {
      e.preventDefault()
      dispatch(__deletePost(id))
      alert(title+" 삭제완료!")
      navigate(-1)
    }
    return (
        <StInfoContainer>
          <StAlbumSet>
          <PlayerWrapper>
            <ReactPlayer 
              className="react-player" 
              url={youtubeUrl} 
              width="100%" 
              height="100%" 
              muted={false}
              playing={true} 
              loop={true} 
              controls={true}
              volume={true}               
              playbackRate={true}/>
          </PlayerWrapper>
            <Title>{title}</Title>
            <Content>{content}</Content>
          </StAlbumSet>
          <StButtonSet>
            {like ? <StLike onClick={likeHandler}>♥️</StLike> : <StLike onClick={likeHandler}>♡</StLike>}
            <AllRounderButton
              onClick={() => {
                navigate(-1);
              }}
              buttonName={"돌아가기"}
            />
          </StButtonSet>
          <StButtonSet>
            {toggle ? (
              <EditDiv>
                <h3>수정하기</h3>
                <FormHelper>{formHelper}</FormHelper>
                <InputBox
                  length="300px"
                  onChange={onChangeTitleHandler}
                  type="text"
                  placeholder="제목"
                  defaultValue={title}
                />
                <InputBox
                  length="300px"
                  onChange={onChangeBodyHandler}
                  type="text"
                  placeholder="내용"
                  defaultValue={content}
                />
                <InputBox
                  length="300px"
                  onChange={onChangeCoverUrlHandler}
                  type="text"
                  placeholder="Cover URL"
                  defaultValue={youtubeUrl}
                />
                <AllRounderButton onClick={updateHandler} buttonName={"저장"} />
              </EditDiv>
            ) : null}
            {toggle ? (
              <AllRounderButton
                onClick={(e) => {
                  e.preventDefault();
                  setToggle(!toggle);
                  setFormHelper("")
                }}
                buttonName={"닫기"}
              />
            ) : (
              <AllRounderButton
                onClick={(e) => {
                  e.preventDefault();
                  setToggle(!toggle);
                }}
                buttonName={"수정"}
              />
            )}
          </StButtonSet>
          <StButtonSet>
            <AllRounderButton buttonName={"삭제"} onClick={deleteHandler}/>
          </StButtonSet>
        </StInfoContainer>
      );
    };
    
    export default Info;

const StInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  min-width: 800px;
  margin: 50px auto;
`;
const StAlbumSet = styled.div`
  margin: 30px 0 0 0;
  width: 450px;
`;
const StAlbumImg = styled.img`
  width: 450px;
  height: 450px;
  object-fit: cover;
`;

const Content = styled.h2`
text-align: center;`

const Title = styled.h2``;

const StButtonSet = styled.div`
  width: 450px;
`;

const StLike = styled.div`
  font-size: 40px;
  color: #fa1e2d;
`;
const InputBox = styled.input`
  margin: 30px;
  padding: 8px 10px;
  font-size: 20px;
  border: none;
  text-align: center;
  :focus {
    outline: none;
  }
  width: ${(props) => props.length};
  &::placeholder {
    color: #aaa;
  }
`;
const EditDiv = styled.div`
  box-shadow: 5px 5px 10px #999;
`;
const FormHelper = styled.div`
margin-top: 10px;
font-size: 20px;
color: #fa1e2d;
`
const PlayerWrapper = styled.div`
    position: relative;
    padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */;
    .react-player {
      position: absolute;
      top: 0;
      left: 0;
    }
  `;