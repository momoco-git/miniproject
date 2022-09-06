import React, { useState } from "react";
import styled from "styled-components";
// import logo from "./testgif.gif";
import { idCheck } from "../../regExp";
import { Flex, Input, Button } from "../../elem";
import { useNavigate } from "react-router-dom";
import { AccountAPI, PostList } from "../../apis/api";
import {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
} from "../../redux/Cookie";
import useInput from "../../hooks/useInput";
import AlertBar from "../alertbar/Alertbar";
function Login() {
  const navigate = useNavigate();
  const [form, onChange] = useInput("");
  const [errortext, seterror] = useState("");
  const getlogin = async () => {
    if (form.username === "") {
      return seterror("아이디를 입력해주세요");
    } else if (idCheck(form.username) === false) {
      return seterror("아이디에 특무문자는 들어갈 수 없습니다");
    } else if (form.password === "") {
      return seterror("비밀번호를 입력해주세요");
    } else {
      //요기 백이랑 연결하면 데이터 가져오는거 바꾸기
      const response = await AccountAPI.getlogin(form).catch(err => {
        seterror(String(err));
      });

      setAccessToken(response.data.AccessToken);
      setRefreshToken(response.data.RefreshToken);
      seterror("");
    }
  };

  const getpost = async () => {
    const response = await PostList.getPostList();
    console.log(response);
  };
  return (
    <Screen>
      {errortext && <AlertBar errortext={errortext} wd="50%" mg="auto" />}
      <Wrap>
        <Flex center="center">
          <Logincantainer>
            <FormBox>
              <Input
                placeholder="아이디를 입력하세요"
                _onChange={onChange}
                name="username"
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
                    console.log(window.location.origin);
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
                    getpost();
                  }}
                >
                  회원가입하러 가기
                </Button>
              </ButtonContainer>
            </FormBox>
          </Logincantainer>
        </Flex>
      </Wrap>
    </Screen>
  );
}

export default Login;
const Screen = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;
  background: url("https://media3.giphy.com/media/l3vRaLSB7dP96NTWw/giphy.gif?cid=ecf05e476qxtpw0s8zhebwfj2l486wxipuurta6nfq1dldbi&rid=giphy.gif&ct=g");
  background-size: cover;
`;
const Logincantainer = styled.div`
  width: 40%;
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
