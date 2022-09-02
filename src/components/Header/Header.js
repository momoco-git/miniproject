import React from "react";
import styled from "styled-components";
import { Flex, Button, Text } from "../../elem/index";
export default function Header() {
  React.useEffect(() => {}, []);
  return (
    <Flex between={true} bg="#9ED2C6" pd="4px" mg="0 0 50px 0">
      <Text fs="2rem" fw="bold">
        APP 이름자리
      </Text>
      <Flex gap="4px" mg=" 0 10px 0 0">
        <Button outline={true} small={true}>
          Profile
        </Button>
        <Button outline={true} small={true}>
          로그인
        </Button>
      </Flex>
    </Flex>
  );
}
