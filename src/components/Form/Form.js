import React, { useState } from "react";
import styled from "styled-components";
import { Flex, Input, Button } from "../../elem/index";
import useInput from "../../hooks/useInput";
import { AccountAPI, List } from "../../apis/api";
import AlertBar from "../alertbar/Alertbar";
const AddPost = () => {
  const [form, onChange, reset, setForm] = useInput("null");
  const [errortext, seterror] = useState(true);
  const addpost = async () => {
    if (form.title === "") {
      return seterror("제목을 입력하세요");
    } else if (form.content === null) {
      return seterror("내용을 적어주세요");
    } else if (form.url === null) {
      return seterror("url을 입력해주세요");
    } else {
      //   return PostList.getAddPost(form)
      //     .then(() => {
      //       window.alert("추가완료");
      //     })
      //     .catch(err => {
      //       seterror(String(err));
      //     });
    }
  };
  return (
    <>
      {errortext && <AlertBar errortext={errortext} />}
      <Flex center={true} wd="60%" hi="60%" mg="100px auto">
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
              }}
            >
              추가하기
            </Button>
          </FormBox>
        </Logincantainer>
      </Flex>
    </>
  );
};

export default AddPost;

const Logincantainer = styled.div`
  width: 80%;
  height: 100%;

  border: 5px solid #9ed2c6;
  border-radius: 30px;
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
