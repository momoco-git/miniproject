import React, { useState } from "react";
import styled from "styled-components";
import { Flex, Input, Button } from "../../elem/index";
import useInput from "../../hooks/useInput";
import { AccountAPI, PostList } from "../../apis/api";
import AlertBar from "../alertbar/Alertbar";
const AddPost = () => {
  const [form, onChange, reset, setForm] = useInput(null);

  const addpost = async () => {
    if (form.title === null) {
      return window.alert("제목을 입력하세요");
    } else if (form.content === null) {
      return window.alert("내용을 적어주세요");
    } else if (form.url === null) {
      return window.alert("url을 입력해주세요");
    } else {
      return PostList.getAddPost(form)
        .then(() => {
          window.alert("추가완료");
        })
        .catch(err => {
          window.alert(String(err));
        });
    }
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
                name="url"
                _onChange={onChange}
              ></Input>

              <Button
                outline={true}
                width="60%"
                mg="20px auto 20px auto"
                _onClick={() => {
                  addpost();
                  console.log(form);
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