import { Button } from "antd";
import bgImage from "../../assets/Images/BannerImage.webp";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="banner-wrapper">
      <div className="banner-container">
        <img className="banner-image" src={bgImage} alt="Luxury Car Rental" />
        <div className="banner-overlay" />
        <div className="banner-content">
          <h1>Experience Elite Car Rental</h1>
          <p>Unleash sophistication and comfort across Italy’s roads.</p>
          <Button
            onClick={() => navigate("/signUp")}
            style={{
              borderRadius: "20px",
              backgroundColor: "#f2c8a7",
              padding: "8px 24px",
              fontWeight: "600",
              border: "none",
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
