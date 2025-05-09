import { Layout, Menu, MenuProps } from "antd";
import { useAppSelector } from "../../redux/hook";
import { TUser, useCurrentToken } from "../../redux/features/Auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  SELLER: "seller",
};

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, onCollapse }: SidebarProps) => {
  const token = useAppSelector(useCurrentToken);
  let user;
  let sidebarItems;

  if (token) {
    user = verifyToken(token);
  }

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.SELLER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.SELLER);
      break;

    default:
      break;
  }

  return (
    <Sider
      style={{ background: "#2c3d34" }}
      breakpoint="lg"
      collapsedWidth="0"
      collapsible
      collapsed={collapsed}
      trigger={null}
      onCollapse={onCollapse}
    >
      <Link to={"/"}>
        <div
          className="demo-logo-vertical"
          style={{
            height: "64px",
            margin: "16px",
            color: "#e1d7d2",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          <h3>Auto Nest</h3>
        </div>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={sidebarItems as MenuProps["items"]}
        style={{ background: "#2c3d34", color: "#e1d7d2" }}
      />
    </Sider>
  );
};

export default Sidebar;
