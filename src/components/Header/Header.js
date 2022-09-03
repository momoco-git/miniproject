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
export default function Header() {
  const [isToken, setToken] = useState(false);

  useEffect(() => {
    setToken(getAccessToken() === undefined ? false : true);
    console.log("변경");
  });
  const navigate = useNavigate;
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
            onClick={() => {
              removeAccessToken();
              removeRefreshToken();
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
