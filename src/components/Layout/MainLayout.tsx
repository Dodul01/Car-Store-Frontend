import { useState } from "react";
import {
  Layout,
  Button,
  ConfigProvider,
  Space,
  Typography,
  Avatar,
  Menu,
  Dropdown,
} from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, selectCurrentUser } from "../../redux/features/Auth/authSlice";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menu = (
    <Menu>
      {currentUser?.role !== "admin" && (
        <Menu.Item
          key="profile"
          icon={<ProfileOutlined />}
          onClick={() => navigate("/seller/profile-settings")}
        >
          Profile
        </Menu.Item>
      )}
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => dispatch(logout())}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

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

            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Space size="middle" style={{ cursor: "pointer" }}>
                <Avatar
                  size="default"
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#e1d7d2", color: "#2c3d34" }}
                />
              </Space>
            </Dropdown>
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
