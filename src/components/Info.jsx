import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __deletePost, __updatePost } from "../redux/module/postSlice";
import Button from "../elem/Button";
import useInput from "../hooks/useInput";
import AllRounderButton from '../elem/AllRounderButton';


const Info = ({ id, body, title, coverUrl, like }) => {
  const [toggle, setToggle] = useState(false);
  const [formHelper, setFormHelper] = useState(false);
  const [updateBody, onChangeBodyHandler, setUpdateBody] = useInput();
  const [updateTitle, onChangeTitleHandler, setUpdateTitle] = useInput();
  const [updateCoverUrl, onChangeCoverUrlHandler, setUpdateCoverUrl] = useInput();

  useEffect(() => {
    setUpdateBody(body);
  }, [body, setUpdateBody]);

  useEffect(() => {
    setUpdateTitle(title);
  }, [title, setUpdateTitle]);

  useEffect(() => {
    setUpdateCoverUrl(coverUrl);
  }, [coverUrl, setUpdateCoverUrl]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateHandler = (e) => {
    e.preventDefault();
    if(!updateBody){return setFormHelper("제목을 입력하셍쇼.")}
    if(!updateTitle){return setFormHelper("내용을 입력하세요.")}
    if(!updateCoverUrl){return setFormHelper("URL을 입력하세요.")}
    const updatePost = {
      id,
      body: updateBody,
      title: updateTitle,
      coverUrl: updateCoverUrl,
    };
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
    alert(title+" has been successfully deleted!")
    navigate(-1)
  }

  return (
    <StInfoContainer>
      <StAlbumSet>
        
        <StArtist>{body}</StArtist>
        <StTiltle>{title}</StTiltle>
      </StAlbumSet>
      <StButtonSet>
        {like ? <StLike onClick={likeHandler}>♥️</StLike> : <StLike onClick={likeHandler}>♡</StLike>}
        <AllRounderButton
          onClick={() => {
            navigate(-1);
          }}
          buttonName={"뒤로가기"}
        />
      </StButtonSet>
      <StButtonSet>
        {toggle ? (
          <EditDiv>
            <h3>수정</h3>
            <FormHelper>{formHelper}</FormHelper>
            <InputBox
              length="300px"
              onChange={onChangeBodyHandler}
              type="text"
              placeholder="Body"
              defaultValue={body}
            />
            <InputBox
              length="300px"
              onChange={onChangeTitleHandler}
              type="text"
              placeholder="Title"
              defaultValue={title}
            />
            <InputBox
              length="300px"
              onChange={onChangeCoverUrlHandler}
              type="text"
              placeholder="Cover URL"
              defaultValue={coverUrl}
            />
            <Button onClick={updateHandler} buttonName={"저장"} />
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

const StArtist = styled.h2``;

const StTiltle = styled.h2``;

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