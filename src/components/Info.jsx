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
        <P>작성자 : {nickname}</P>
        <Title>{title}</Title>
        <hr />
        <Body>{content}</Body>
      </StAlbumSet>
      <StButtonSet>
        <AllRounderButton
          onClick={() => {
            navigate(-1);
          }}
          buttonName={"메인으로"}
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
  /* display: flex;
  flex-wrap: wrap;
  min-width: 800px; */
  margin: 50px auto;
`;
const StAlbumSet = styled.div`
  margin-top: 5px;
  width: 600px;
  border-radius: 20px;
  text-align: center;
`;

const Body = styled.h2`
  text-align: center;
  font-size: 20px;
`;

const Title = styled.h2`
font-weight: bolder;
`;

const P = styled.h2`
font-size: 10px;
`;

const StButtonSet = styled.div`
  width: 100px;
  border-radius: 20px;
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
  box-shadow: 15px 15px 15px #999;
  background-color: white;
`;
const FormHelper = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #fa1e2d;
`;


