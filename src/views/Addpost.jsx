import React from "react";
import AddPost from "../components/Form/Form";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";

export default function Addpost() {
  React.useEffect(() => {}, []);
  return (
    <Layout>
      <Header />
      <AddPost></AddPost>
    </Layout>
  );
}
