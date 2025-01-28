import { useState } from "react";
import {
  Layout,
  Button,
  ConfigProvider,
  Space,
  Typography,
  Avatar,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, selectCurrentUser } from "../../redux/features/Auth/authSlice";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f3c6a4",
        },
      }}
    >
      <Layout style={{ background: "#e1d7d2", height: "100vh" }}>
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
        <Layout>
          <Header
            style={{
              padding: "0 16px",
              background: "#2c3d34",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Space>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "18px",
                  color: "#e1d7d2",
                }}
              />
              <Typography.Title
                level={4}
                style={{
                  color: "#e1d7d2",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Dashboard
              </Typography.Title>
            </Space>

            <Space size="middle" align="center">
              <Avatar
                size="default"
                icon={<UserOutlined />}
                style={{ backgroundColor: "#e1d7d2", color: "#2c3d34" }}
              />
              <div style={{ color: "#e1d7d2" }}>
                <Typography.Text
                  strong
                  style={{ display: "block", color: "#e1d7d2" }}
                >
                  {currentUser?.name}
                </Typography.Text>
                <Typography.Text
                  type="secondary"
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#e1d7d2cc",
                  }}
                >
                  {currentUser?.email}
                </Typography.Text>
                <Typography.Text
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#e1d7d2a0",
                    textTransform: "uppercase",
                  }}
                >
                  {currentUser?.role === "seller" ? "User" : "admin"}
                </Typography.Text>
              </div>
              <Button
                type="primary"
                style={{
                  background: "#e1d7d2",
                  color: "#2c3d34",
                  fontWeight: 500,
                  border: "none",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#d1c0b5")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#e1d7d2")
                }
                onClick={() => dispatch(logout())}
              >
                Sign Out
              </Button>
            </Space>
          </Header>
          <Content style={{ margin: "16px", overflow: "scroll" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
