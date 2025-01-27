// import { Button } from "antd";
// import { Link } from "react-router-dom";
// import "./Nav.css";

// const Nav = () => {
//   return (
//     <nav className="nav-container">
//       <h2>AutoNest</h2>
//       <div className="link-container">
//         <Link className="link" to={"/"}>Home</Link>
//         <Link className="link" to={"/all-cars"}>All Cars</Link>
//         <Link className="link" to={"/about-us"}>Gallery</Link>
//         <Link className="link" to={"/about-us"}>About</Link>
//       </div>

//       <Button style={{ borderRadius: "16px", border: '1px solid black', background: '#f2c8a7'}}>Sign In</Button>
//     </nav>
//   );
// };

// export default Nav;

import { useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "../Nav/Nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="nav-container">
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
      </div>

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

      {/* Mobile Menu Button */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
      </div>
    </nav>
  );
};

export default Nav;
