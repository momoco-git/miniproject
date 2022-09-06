import React from "react";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import Mypostlist from "../components/Mypage/Mypostlist";

export default function MyPage() {
  React.useEffect(() => {}, []);
  return (
    <Layout>
      <Header />
      <Mypostlist></Mypostlist>
    </Layout>
  );
}
