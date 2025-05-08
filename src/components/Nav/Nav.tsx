// import { useState } from "react";
// import { Button } from "antd";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
// import "../Nav/Nav.css";
// import { useAppDispatch, useAppSelector } from "../../redux/hook";
// import { logout, selectCurrentUser } from "../../redux/features/Auth/authSlice";

// const Nav = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = useAppSelector(selectCurrentUser);
//   const dispatch = useAppDispatch();

//   return (
//     <nav
//       style={{
//         background: location.pathname === "/" ? "transparent" : "#0d0d0d",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//       }}
//       className="nav-container"
//     >
//       <Link to="/" style={{ textDecoration: "none" }}>
//         <h2 style={{ color: "#f2c8a7", fontWeight: 700 }}>AutoNest</h2>
//       </Link>

//       <div className={`link-container ${menuOpen ? "open" : ""}`}>
//         <Link className="link" to="/">
//           Home
//         </Link>
//         <Link className="link" to="/all-cars">
//           All Cars
//         </Link>
//         <Link className="link" to="/about-us">
//           About Us
//         </Link>
//         {user?.role === "seller" && (
//           <Link className="link" to="/seller/dashboard">
//             Dashboard
//           </Link>
//         )}
//         {user?.role === "admin" && (
//           <Link className="link" to="/admin/dashboard">
//             Dashboard
//           </Link>
//         )}
//       </div>

//       <Button
//         onClick={() => (user ? dispatch(logout()) : navigate("/signIn"))}
//         style={{
//           borderRadius: "20px",
//           padding: "6px 18px",
//           background: "#f2c8a7",
//           border: "none",
//           fontWeight: 600,
//         }}
//       >
//         {user ? "Sign Out" : "Sign In"}
//       </Button>

//       <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
//         {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
//       </div>
//     </nav>
//   );
// };

// export default Nav;

import { useEffect, useState } from "react";
import { Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "../Nav/Nav.css";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, selectCurrentUser } from "../../redux/features/Auth/authSlice";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  // function to handle scroll
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true); // change when scrolled more thn 100px
    } else {
      setIsScrolled(false);
    }
  };

  // attach scroll event listener when component mounts
  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const handleAuth = () => {
    if (user) {
      dispatch(logout());
    } else {
      navigate("/signIn");
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className="nav-container"
      // style={{
      //   background: location.pathname === "/" ? "transparent" : "#0d0d0d",
      //   boxShadow:
      //     location.pathname === "/" ? "none" : "0 2px 8px rgba(0,0,0,0.15)",
      // }}
      style={{
        background:
          isScrolled || location.pathname !== "/" ? "#0d0d0d" : "transparent",
        boxShadow:
          isScrolled || location.pathname !== "/"
            ? "0 2px 8px rgba(0,0,0,0.15)"
            : "none",
      }}
    >
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          AutoNest
        </Link>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/all-cars"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            All Cars
          </Link>
          <Link
            to="/about-us"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          {user?.role === "seller" && (
            <Link
              to="/seller/dashboard"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <Button className="auth-button" onClick={handleAuth}>
            {user ? "Sign Out" : "Sign In"}
          </Button>
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
