import React, { useState } from "react";
import styled from "styled-components";
import { Flex, Input, Button, Text } from "../../elem";
import useInput from "../../hooks/useInput";
import { AccountAPI, PostList } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import { idCheck } from "../../regExp";
import AlertBar from "../alertbar/Alertbar";
function Signup() {
  const navigate = useNavigate();
  const [form, onChange, reset, setForm] = useInput(null);
  const [errortext, seterror] = useState(null);
  const postAccount = async () => {
    if (form.username === null) {
      return seterror("아이디를 입력해주세요");
    } else if (idCheck(form.username) === false) {
      return seterror("아이디에 특무문자는 들어갈 수 없습니다");
    } else if (form.nickname === null) {
      return seterror("닉네임을 입력해주세요");
    } else if (form.password === null) {
      return seterror("비밀번호를 입력해주세요");
    } else if (form.password !== form.passwordCheck) {
      return seterror("비밀번호가 일치하지 않습니다.");
    }
    AccountAPI.getSignInAccount(form)
      .then(() => {
        window.alert("가입완료!");
        navigate("/");
      })
      .catch(err => {
        seterror(String(err));
      });
  };

  return (
    <>
      <Screen>
        {errortext && <AlertBar errortext={errortext} />}
        <Wrap>
          <Flex center="center">
            <Logincantainer>
              <FormBox>
                <>
                  <Input
                    placeholder="아이디를 입력하세요"
                    name="username"
                    _onChange={onChange}
                  ></Input>
                </>
                <Input
                  placeholder="닉네임를 입력하세요"
                  name="nickname"
                  _onChange={onChange}
                ></Input>
                <Input
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                  name="password"
                  _onChange={onChange}
                ></Input>
                <Input
                  placeholder="비밀번호를 한번더 입력하세요"
                  name="passwordCheck"
                  _onChange={onChange}
                  type="password"
                ></Input>

                <Button
                  outline={true}
                  width="60%"
                  mg="20px auto 20px auto"
                  _onClick={() => {
                    postAccount();
                  }}
                >
                  회원가입
                </Button>
              </FormBox>
            </Logincantainer>
          </Flex>
        </Wrap>
      </Screen>
    </>
  );
}

export default Signup;
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
