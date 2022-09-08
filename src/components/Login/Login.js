import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";

import { idCheck } from "../../regExp";
import { Flex, Input, Button } from "../../elem";
import { useNavigate } from "react-router-dom";
import { AccountAPI, PostList } from "../../apis/api";
import { getUserInfo } from "../../redux/module/userSlice";
import {
  setAccessToken,
  setRefreshToken,
  setCookieName,
  setCookieNick,
} from "../../redux/Cookie";
import useForm from "../../hooks/useForm";
import AlertBar from "../alertbar/Alertbar";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, onChange] = useForm("");
  const [errortext, seterror] = useState(false);
  const [checkForm, setcheckForm] = useState(false);
  const checklogin = () => {
    if (form.username === undefined) {
      return seterror("아이디를 입력해주세요");
    } else if (idCheck(form.username) === false) {
      return seterror("아이디에 특무문자는 들어갈 수 없습니다");
    } else if (form.password === undefined) {
      return seterror("비밀번호를 입력해주세요");
    } else {
      return setcheckForm(true);
    }
  };

  const getlogin = async () => {
    try {
      const res = await AccountAPI.getlogin(form);
      console.log(res);
      if (res.data.success) {
        const { username, nickname, accessToken, refreshToken } =
          res?.data.data;
        dispatch(getUserInfo({ username, nickname }));
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setCookieName(username);
        setCookieNick(nickname);
        window.alert("로그인!");
        navigate("/");
      } else {
        let errormessage = res.data.error.message;
        return seterror(errormessage);
      }
      seterror("");
    } catch (e) {
      seterror(String(e));
    }
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
                    checklogin();
                    checkForm && getlogin();
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


