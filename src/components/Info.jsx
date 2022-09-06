import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __deletePost, __updatePost } from "../redux/module/postSlice";
import Button from "../elem/Button";
import useInput from "../hooks/useInput";


const Info = ({ id, body, nick, coverUrl, like }) => {
  const [toggle, setToggle] = useState(false);
  const [formHelper, setFormHelper] = useState(false);
  const [updateBody, onChangeBodyHandler, setUpdateBody] = useInput();
  const [updateNick, onChangeNickHandler, setUpdateNick] = useInput();
  const [updateCoverUrl, onChangeCoverUrlHandler, setUpdateCoverUrl] = useInput();

  useEffect(() => {
    setUpdateBody(body);
  }, [body, setUpdateBody]);

  useEffect(() => {
    setUpdateNick(nick);
  }, [nick, setUpdateNick]);

  useEffect(() => {
    setUpdateCoverUrl(coverUrl);
  }, [coverUrl, setUpdateCoverUrl]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateHandler = (e) => {
    e.preventDefault();
    if(!updateBody){return setFormHelper("You Must Enter Artist to Proceed")}
    if(!updateNick){return setFormHelper("You Must Enter Title to Proceed")}
    if(!updateCoverUrl){return setFormHelper("You Must Enter Image URL to Proceed")}
    const updatePost = {
      id,
      body: updateBody,
      nick: updateNick,
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
    if(!like)alert("liked!")
  }
  
  const deleteHandler = (e) => {
    e.preventDefault()
    dispatch(__deletePost(id))
    alert(nick+" has been successfully deleted!")
    navigate(-1)
  }

  return (
    <StInfoContainer>
      <StAlbumSet>
        <StAlbumImg src={coverUrl} />
        <StArtist>{body}</StArtist>
        <StTiltle>{nick}</StTiltle>
      </StAlbumSet>
      <StButtonSet>
        {like ? <StLike onClick={likeHandler}>♥️</StLike> : <StLike onClick={likeHandler}>♡</StLike>}
        <Button
          onClick={() => {
            navigate(-1);
          }}
          buttonName={"Go Back"}
        />
      </StButtonSet>
      <StButtonSet>
        {toggle ? (
          <EditDiv>
            <h3>Edit</h3>
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
              onChange={onChangeNickHandler}
              type="text"
              placeholder="Nick"
              defaultValue={nick}
            />
            <InputBox
              length="300px"
              onChange={onChangeCoverUrlHandler}
              type="text"
              placeholder="Cover URL"
              defaultValue={coverUrl}
            />
            <Button onClick={updateHandler} buttonName={"Submit"} />
          </EditDiv>
        ) : null}
        {toggle ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              setToggle(!toggle);
              setFormHelper("")
            }}
            buttonName={"Close"}
          />
        ) : (
          <Button
            onClick={(e) => {
              e.preventDefault();
              setToggle(!toggle);
            }}
            buttonName={"Edit"}
          />
        )}
      </StButtonSet>
      <StButtonSet>
        <Button buttonName={"Delete"} onClick={deleteHandler}/>
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