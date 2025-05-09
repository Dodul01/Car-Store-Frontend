// import { useEffect, useState } from "react";
// import { Button } from "antd";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
// import "../Nav/Nav.css";
// import { useAppDispatch, useAppSelector } from "../../redux/hook";
// import { logout, selectCurrentUser } from "../../redux/features/Auth/authSlice";

// const Nav = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = useAppSelector(selectCurrentUser);
//   const dispatch = useAppDispatch();

//   // function to handle scroll
//   const handleScroll = () => {
//     if (window.scrollY > 100) {
//       setIsScrolled(true); // change when scrolled more thn 100px
//     } else {
//       setIsScrolled(false);
//     }
//   };

//   // attach scroll event listener when component mounts
//   useEffect(() => {
//     if (location.pathname === "/") {
//       window.addEventListener("scroll", handleScroll);
//     }

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [location.pathname]);

//   const handleAuth = () => {
//     if (user) {
//       dispatch(logout());
//     } else {
//       navigate("/signIn");
//     }
//     setMenuOpen(false);
//   };

//   return (
//     <nav
//       className="nav-container"
//       style={{
//         background:
//           isScrolled || location.pathname !== "/" ? "#0d0d0d" : "transparent",
//         boxShadow:
//           isScrolled || location.pathname !== "/"
//             ? "0 2px 8px rgba(0,0,0,0.15)"
//             : "none",
//       }}
//     >
//       <div className="nav-inner">
//         <Link to="/" className="nav-logo">
//           AutoNest
//         </Link>

//         <div className={`nav-links ${menuOpen ? "open" : ""}`}>
//           <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
//             Home
//           </Link>
//           <Link
//             to="/all-cars"
//             className="nav-link"
//             onClick={() => setMenuOpen(false)}
//           >
//             All Cars
//           </Link>
//           <Link
//             to="/all-blogs"
//             className="nav-link"
//             onClick={() => setMenuOpen(false)}
//           >
//             Blogs
//           </Link>
//           <Link
//             to="/our-team"
//             className="nav-link"
//             onClick={() => setMenuOpen(false)}
//           >
//             Our team
//           </Link>
//           <Link
//             to="/about-us"
//             className="nav-link"
//             onClick={() => setMenuOpen(false)}
//           >
//             About Us
//           </Link>
//           {user?.role === "seller" && (
//             <Link
//               to="/seller/dashboard"
//               className="nav-link"
//               onClick={() => setMenuOpen(false)}
//             >
//               Dashboard
//             </Link>
//           )}
//           {user?.role === "admin" && (
//             <Link
//               to="/admin/dashboard"
//               className="nav-link"
//               onClick={() => setMenuOpen(false)}
//             >
//               Dashboard
//             </Link>
//           )}
//           <Button className="auth-button" onClick={handleAuth}>
//             {user ? "Sign Out" : "Sign In"}
//           </Button>
//         </div>

//         <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
//         </div>
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

const carCategories = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Convertible",
  "Truck",
  "Electric",
];

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 100);
  };

  const handleAuth = () => {
    if (user) {
      dispatch(logout());
    } else {
      navigate("/signIn");
    }
    setMenuOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/all-cars?category=${encodeURIComponent(category)}`);
    setMegaMenuOpen(false);
    setMenuOpen(false);
  };

  return (
    <nav
      className="nav-container"
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

          <div
            className="nav-link mega-trigger"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            All Cars
            {megaMenuOpen && (
              <div className="mega-menu">
                {carCategories.map((category) => (
                  <div
                    key={category}
                    className="mega-menu-item"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/all-blogs"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Blogs
          </Link>
          <Link
            to="/our-team"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Our team
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