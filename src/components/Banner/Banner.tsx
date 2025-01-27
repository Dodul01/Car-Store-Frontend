import { Button } from "antd";
import bgImage from "../../assets/Images/BannerImage.webp";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <img className="banner-image" src={bgImage} alt="Luxury Car Rental" />
      <div className="banner-content">
        <h1>Luxury car rental in Italy</h1>
        <p>Drive in style and comfort with our premium car rentals.</p>
        <Button style={{ borderRadius: "16px", border: '1px solid black', background: '#f2c8a7'}} className="rent-now-btn">
          Rent Now
        </Button>
      </div>
    </div>
  );
};

export default Banner;
