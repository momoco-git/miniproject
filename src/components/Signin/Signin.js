import React, { useState } from "react";
import styled from "styled-components";
import { Flex, Input, Button, Text } from "../../elem";
import { Link } from 'react-router-dom'

function Login() {
  const [correctID, setcorrectID] = useState(false);
  const [correctPW, setcorrectPW] = useState(false);
  return (
    <Flex center="center">
      <Logincantainer>
        <FormBox>
          <>
            <Input placeholder="아이디를 입력하세요"></Input>
            {correctID ? (
              <Text color="red" fs="0.8rem">
                "아이디가 중복되었습니다"
              </Text>
            ) : (
              ""
            )}
          </>
          <Input placeholder="닉네임를 입력하세요"></Input>
          <Input placeholder="비밀번호를 입력하세요" type="password"></Input>
          <Input
            placeholder="비밀번호를 한번더 입력하세요"
            type="password"
          ></Input>

          <Button outline={true} width="60%" mg="20px auto 20px auto">
            회원가입
          </Button>
        </FormBox>
      </Logincantainer>
    </Flex>
  );
}

export default Login;

const Logincantainer = styled.div`
  width: 60%;
  height: 60%;

  border: 5px solid #9ed2c6;
  border-radius: 30px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.form`
  width: 70%;
  margin: 10px auto 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


