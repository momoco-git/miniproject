import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __deletePost, __updatePost } from "../redux/module/postSlice";
import useInput from "../hooks/useInput";
import AllRounderButton from "../elem/AllRounderButton";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { getCookieNick } from "../redux/Cookie";
import { PostList } from "../apis/api";
const Info = postid => {
  const data = useSelector(state => state.posts.list);
  const datalist = data?.filter(post => {
    return post.id === parseInt(postid.postid);
  });
  const { id, title, content, youtubeUrl, nickname } = datalist[0]
    ? datalist[0]
    : "";

  const [toggle, setToggle] = useState(false);
  const [formHelper, setFormHelper] = useState(false);
  const [updatecontent, onChangecontentHandler, setUpdatecontent] = useInput();
  const [updateTitle, onChangeTitleHandler, setUpdateTitle] = useInput();
  const [updateyoutubeUrl, onChangeyoutubeUrlHandler, setUpdateyoutubeUrl] =
    useInput();
  // const URL = "https://www.youtube.com/watch?v=" + "{...coverUrl}"
  useEffect(() => {
    setUpdateTitle(title);
  }, [title, setUpdateTitle]);

  useEffect(() => {
    setUpdatecontent(content);
  }, [content, setUpdatecontent]);

  useEffect(() => {
    setUpdateyoutubeUrl(youtubeUrl);
  }, [youtubeUrl, setUpdateyoutubeUrl]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateHandler = e => {
    e.preventDefault();
    if (!updateTitle) {
      return setFormHelper("제목을 입력하세요");
    }
    if (!updatecontent) {
      return setFormHelper("내용을 입력하세요");
    }
    if (!updateyoutubeUrl) {
      return setFormHelper("URL을 입력하세요");
    }
    const updatePost = {
      id: parseInt(postid.postid),
      title: updateTitle,
      content: updatecontent,
      youtubeUrl: updateyoutubeUrl,
    };

    dispatch(__updatePost(updatePost));
    setToggle(!toggle);
    // window.location.reload();
  };

  const deleteHandler = async () => {
    window.confirm("삭제하시겠습니까?");
    await PostList.getDeletePost(id);
    // dispatch(__deletePost(id));
    alert(title + " 삭제완료!");
    navigate("/");
  };
  return (
    <StInfoContainer>
      <StAlbumSet>
        <p>작성자 : {nickname}</p>
        <Title>{title}</Title>
        <hr />
        <Body>{content}</Body>
      </StAlbumSet>
      <StButtonSet>
        <AllRounderButton
          onClick={() => {
            navigate(-1);
          }}
          buttonName={"돌아가기"}
        />
      </StButtonSet>
      {nickname === getCookieNick() && (
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
                onChange={onChangecontentHandler}
                type="text"
                placeholder="내용"
                defaultValue={content}
              />
              <InputBox
                length="300px"
                onChange={onChangeyoutubeUrlHandler}
                type="text"
                placeholder="Cover URL"
                defaultValue={youtubeUrl}
              />
              <AllRounderButton onClick={updateHandler} buttonName={"저장"} />
            </EditDiv>
          ) : null}
          {toggle ? (
            <AllRounderButton
              onClick={e => {
                e.preventDefault();
                setToggle(!toggle);
                setFormHelper("");
              }}
              buttonName={"닫기"}
            />
          ) : (
            <AllRounderButton
              onClick={e => {
                e.preventDefault();
                setToggle(!toggle);
              }}
              buttonName={"수정"}
            />
          )}
        </StButtonSet>
      )}
      <StButtonSet>
        {nickname === getCookieNick() && (
          <AllRounderButton buttonName={"삭제"} onClick={deleteHandler} />
        )}
      </StButtonSet>
    </StInfoContainer>
  );
};

export default Info;

const StInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  width : 60%
  min-width : 800px;
  margin : 50px auto;
`;
const StAlbumSet = styled.div`
  margin: 30px 0 0 0;
  width: 100%;
`;
const StAlbumImg = styled.img`
  width: 450px;
  height: 450px;
  object-fit: cover;
`;

const Body = styled.h2`
  text-align: left;
`;

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
  width: ${props => props.length};
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
