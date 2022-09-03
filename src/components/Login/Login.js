import React from "react";
import styled from "styled-components";
import { Flex, Input, Button } from "../../elem";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
function Login() {
  const navigate = useNavigate();
  return (
    <Flex center="center">
      <Logincantainer>
        <FormBox>
          <Input placeholder="아이디를 입력하세요"></Input>

          <Input placeholder="비밀번호를 입력하세요" type="password"></Input>

          <ButtonContainer>
            <Button width="60%" outline={true} mg="auto">
              로그인
            </Button>
            <Button
              outline={true}
              width="60%"
              mg="auto"
              _onClick={() => {
                navigate("/signin");
              }}
            >
              회원가입하러 가기
            </Button>
          </ButtonContainer>
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;



