import React from "react";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import Postlist from "../components/Postlist/Postlist";

export default function MainPage() {
  React.useEffect(() => {}, []);
  return (
    <Layout>
      <Header />
      <Postlist />
    </Layout>
  );
}
