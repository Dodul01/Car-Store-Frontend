import Banner from "../../components/Banner/Banner";
import BestSelling from "../../components/BestSelling/BestSelling";
import BlogSection from "../../components/BlogSection/BlogSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import FaqSection from "../../components/FaqSection/FaqSection";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Testimonial from "../../components/Testimonial/Testimonial";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <FeaturedProducts />
      <BlogSection />
      <BestSelling />
      <Testimonial />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default Home;
