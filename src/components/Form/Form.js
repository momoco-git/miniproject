import React, { useState } from "react";
import styled from "styled-components";
import { Flex, Input, Button } from "../../elem/index";
import useForm from "../../hooks/useForm";
import { AccountAPI, PostList } from "../../apis/api";
import AlertBar from "../alertbar/Alertbar";
import { useDispatch } from "react-redux";
import { __addPost } from "../../redux/module/postSlice";
import { useNavigate } from "react-router-dom";
const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, onChange, reset, setForm] = useForm("");
  const [checkForm, setcheckForm] = useState(false);
  const [onebutton, setonebutton] = useState(false);
  const checkpost = async () => {
    if (form.title === undefined) {
      return window.alert("제목을 입력하세요");
    } else if (form.content === undefined) {
      return window.alert("내용을 적어주세요");
    } else if (form.youtubeUrl === undefined) {
      return window.alert("url을 입력해주세요");
    } else {
      return setcheckForm(true);
    }
  };
  const addpost = async () => {
    setonebutton(true);
    const res = await PostList.getAddPost(form).catch(e =>
      window.alert(String(e))
    );
    if (res.data.success) {
      window.alert("저장되었습니다!");
      navigate(-1);
    } else {
      window.alert(res.data.error.message);
    }
    setonebutton(false);
  };
  return (
    <>
      <Flex center={true} wd="60%" hi="60%" mg="auto">
        <Viewcontainer>
          <Logincantainer>
            <FormBox>
              <>
                <Input
                  placeholder="제목을 입력하세요"
                  name="title"
                  _onChange={onChange}
                ></Input>
              </>
              <Input
                multiLine={true}
                placeholder="내용을 입력하세요"
                name="content"
                _onChange={onChange}
              ></Input>
              <Input
                placeholder="추천해주실 영상 URL을 입력해주세요"
                name="youtubeUrl"
                _onChange={onChange}
              ></Input>

              <Button
                outline={true}
                disable={onebutton}
                width="60%"
                mg="20px auto 20px auto"
                _onClick={() => {
                  checkpost();
                  checkForm && addpost();
                }}
              >
                추가하기
              </Button>
            </FormBox>
          </Logincantainer>
        </Viewcontainer>
      </Flex>
    </>
  );
};

export default AddPost;

const Logincantainer = styled.div`
  width: 80%;
  height: 50%;

  border: 5px solid #9ed2c6;
  border-radius: 30px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Viewcontainer = styled.div`
  width: 100%;
  height: 89vh;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.div`
  width: 70%;
  height: 100%;
  margin: 10px auto 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
