import { useState } from "react";
import { Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "../Nav/Nav.css";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, selectCurrentUser } from "../../redux/features/Auth/authSlice";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  return (
    <nav
      style={
        location.pathname === "/"
          ? { background: "transparent" }
          : { background: "#425a4f" }
      }
      className="nav-container"
    >
      <h2>AutoNest</h2>

      <div className={`link-container ${menuOpen ? "open" : ""}`}>
        <Link className="link" to={"/"} onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          className="link"
          to={"/all-cars"}
          onClick={() => setMenuOpen(false)}
        >
          All Cars
        </Link>
        <Link
          className="link"
          to={"/gallery"}
          onClick={() => setMenuOpen(false)}
        >
          Gallery
        </Link>
        <Link
          className="link"
          to={"/about-us"}
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>

        {user?.role === "seller" ? (
          <Link
            className="link"
            to={"seller/dashboard"}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        ) : (
          <Link
            className="link"
            to={"/admin/dashboard"}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        )}
      </div>

      {user ? (
        <Button
          onClick={() => dispatch(logout())}
          style={{
            borderRadius: "16px",
            border: "1px solid black",
            background: "#f2c8a7",
          }}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          onClick={() => navigate("/signIn")}
          style={{
            borderRadius: "16px",
            border: "1px solid black",
            background: "#f2c8a7",
          }}
        >
          Sign In
        </Button>
      )}

      {/* Mobile Menu Button */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
      </div>
    </nav>
  );
};

export default Nav;
