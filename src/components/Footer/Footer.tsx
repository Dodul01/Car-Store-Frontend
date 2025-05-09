import "./Footer.css";
import logo from "../../assets/Icons/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img src={logo} alt="renc logo" className="footer-logo" />
          <p>Via Colle Salvetti 36</p>
          <p>Ravenna, Andalusia, IT 57100</p>
          <p>+39 331 274192</p>
          <ul className="social-icons">
            <li>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about-us"}>About Us</Link>
            </li>
            <li>
              <Link to={"/all-cars"}>All Cars</Link>
            </li>
            <li>
              <Link to={"/all-blogs"}>All Blogs</Link>
            </li>
            <li>
              <Link to={"/our-team"}>Our Team</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Cookies Policy</a>
            </li>
            <li>
              <a href="#">Legal Info</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Monday - Sunday</p>
          <p>8:00 AM - 5:00 PM (PST)</p>
          <p>Hotline: +91 863 2677</p>
          <p>Email: info@yourcompany.com</p>
        </div>
      </div>

      <div className="copyright">
        <p>&copy; 2025 renc LLC. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
