import "./Footer.css";
import logo from "../../assets/Icons/logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">
          <img src={logo} alt="renc logo" />
          <p>Via Colle Salvetti 36</p>
          <p>Ravenna, Andalusia, IT 57100</p>
          <p>+39331 274192</p>
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
        <div className="footer-links">
          <h3>For Renters</h3>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">How it works</a>
            </li>
            <li>
              <a href="#">Our Team</a>
            </li>
            <li>
              <a href="#">FAQ's</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Locations</a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="#">Media & Blog</a>
            </li>
            <li>
              <a href="#">Partners</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Cookies Policy</a>
            </li>
            <li>
              <a href="#">Legal Information</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Monday - Sunday</p>
          <p>8:00 AM - 5:00 PM (PST)</p>
          <p>Hotline:</p>
          <p>+91 863 2677</p>
          <p>Email:</p>
          <p>info@yourcompany.com</p>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2023 renc LLC. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
