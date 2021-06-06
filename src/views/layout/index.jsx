import React from "react";
import { connect } from "react-redux";
import Content from "./Content";
import Header from "./Header";
import Sider from "./Sider";
import { Layout } from "antd";
const Main = (props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <Content />
      </Layout>
    </Layout>
  );
};
export default connect((state) => state.settings)(Main);
