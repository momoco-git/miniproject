import styled from "styled-components";

const Layout = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};

export default Layout;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: 100%;
  background-color: #f7ecde;
`;
