import React from "react";
import styled from "styled-components";
import { Flex, Input, Button } from "../../elem";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Link } from 'react-router-dom'
=======
import { AccountAPI } from "../../apis/api";
import {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
} from "../../redux/Cookie";
import useInput from "../../hooks/useInput";
>>>>>>> main
function Login() {
  const navigate = useNavigate();
  const [form, onChange, reset, setForm] = useInput();
  const getlogin = async () => {
    //요기 백이랑 연결하면 데이터 가져오는거 바꾸기
    const response = await AccountAPI.getlogin({
      userName: form.userName,
      password: form.password,
    });
    setAccessToken(response.data[0].AccessToken);
    setRefreshToken(response.data[1].RefreshToken);
    let tests = getAccessToken();
    console.log(tests);
  };

  return (
    <Wrap>
      <Flex center="center">
        <Logincantainer>
          <FormBox>
            <Input
              placeholder="아이디를 입력하세요"
              _onChange={onChange}
              name="userName"
            ></Input>

            <Input
              placeholder="비밀번호를 입력하세요"
              type="password"
              name="password"
              _onChange={onChange}
            ></Input>

            <ButtonContainer>
              <Button
                width="60%"
                outline={true}
                mg="auto"
                _onClick={() => {
                  getlogin();
                }}
              >
                로그인
              </Button>
              <Button
                outline={true}
                width="60%"
                mg="auto"
                _onClick={() => {
                  navigate("/signup");
                }}
              >
                회원가입하러 가기
              </Button>
            </ButtonContainer>
          </FormBox>
        </Logincantainer>
      </Flex>
    </Wrap>
  );
}

export default Login;

const Wrap = styled.div`
  width: 100%;
`;
const Logincantainer = styled.div`
  width: 40%;
  height: 60%;

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



