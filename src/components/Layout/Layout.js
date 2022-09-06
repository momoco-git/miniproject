import styled from "styled-components";

const Layout = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};

export default Layout;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: #f7ecde;
`;
