import { Button } from "antd";
import bgImage from "../../assets/Images/BannerImage.webp";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="banner-container">
      <img className="banner-image" src={bgImage} alt="Luxury Car Rental" />
      <div className="banner-content">
        <h1>Luxury car shop in Italy</h1>
        <p>Drive in style and comfort with our premium cars.</p>
        <Button
          onClick={() => navigate("/signUp")}
          style={{
            borderRadius: "16px",
            border: "1px solid black",
            background: "#f2c8a7",
          }}
          className="rent-now-btn"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Banner;
