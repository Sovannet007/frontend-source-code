import React from "react";
import {
  BarChartOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const MasterLayout = () => {
  const navigator = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={[
            {
              label: "Category",
              key: "/category",
              icon: <UserOutlined />,
            },
            {
              label: "Brand",
              key: "/brand",
              icon: <VideoCameraOutlined />,
            },
            {
              label: "Unit of Measure",
              key: "/uom",
              icon: <UploadOutlined />,
            },
            {
              label: "Product",
              key: "/product",
              icon: <BarChartOutlined />,
            },
          ]}
          onClick={(p) => {
            navigator(p.key);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <div>Header</div>
            <div>Profile</div>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{}}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MasterLayout;
