import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Flex, Text, Button } from "../../elem/index";
import { AccountAPI } from "../../apis/api";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  removeCookieName,
  removeCookieNick,
  getCookieNick,
} from "../../redux/Cookie";
function Header() {
  const [isToken, setToken] = useState(false);

  useEffect(() => {
    setToken(getRefreshToken() === undefined ? false : true);
  }, [isToken]);

  const navigate = useNavigate();
  const logout = async () => {
    await AccountAPI.getlogout();
  };
  const nickname = getCookieNick();

  const removeToken = () => {
    removeAccessToken();
    removeRefreshToken();
    removeCookieName();
    removeCookieNick();
  };
  return (
    <Flex between={true} bg="#9ED2C6" pd="4px" mg="0 0 50px 0">
      <Text
        fs="2rem"
        fw="bold"
        onClick={() => {
          navigate("/");
        }}
      >
        마이튜브
      </Text>
      {isToken && (
        <Text fs="1.4rem" fw="bold">
          {nickname}님 환영합니다!
        </Text>
      )}
      <Flex gap="4px" mg=" 0 10px 0 0">
        {isToken ? (
          <Button
            outline={true}
            small={true}
            _onClick={() => {
              navigate("/mypage");
            }}
          >
            MyPage
          </Button>
        ) : (
          ""
        )}
        {isToken ? (
          <Button
            outline={true}
            small={true}
            type="button"
            _onClick={() => {
              removeToken();
              logout();
              navigate("/");
              window.location.reload();
            }}
          >
            로그아웃
          </Button>
        ) : (
          <Button
            outline={true}
            small={true}
            type="button"
            _onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
export default Header;
