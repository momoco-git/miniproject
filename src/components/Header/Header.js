import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Flex, Text, Button } from "../../elem/index";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from "../../redux/Cookie";
function Header() {
  const [isToken, setToken] = useState(false);
  const RefreshToken = getRefreshToken();
  useEffect(() => {
    setToken(getAccessToken() === undefined ? false : true);
  }, [isToken]);

  const navigate = useNavigate();

  const removeToken = () => {
    removeAccessToken();
    removeRefreshToken();
  };
  return (
    <Flex between={true} bg="#9ED2C6" pd="4px" mg="0 0 50px 0">
      <Text fs="2rem" fw="bold">
        APP 이름자리
      </Text>
      <Flex gap="4px" mg=" 0 10px 0 0">
        {isToken && (
          <Button outline={true} small={true}>
            Profile
          </Button>
        )}
        {isToken ? (
          <Button
            outline={true}
            small={true}
            type="button"
            _onClick={() => {
              removeToken();
              navigate("/");
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
