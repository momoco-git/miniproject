import React from "react";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";

export default function MainPage() {
  React.useEffect(() => {}, []);
  return (
    <Layout>
      <Header />
      <div>메인페이지</div>
    </Layout>
  );
}
