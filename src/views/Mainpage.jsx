import React from "react";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import List from "../components/List/List";

export default function MainPage() {
  React.useEffect(() => {}, []);
  return (
    <Layout>
      <Header />
      <List />
    </Layout>
  );
}
