import "./Testimonial.css";
import { useState } from "react";

const testimonials = [
  {
    image:
      "https://images.prismic.io/profilephotos/ZnuI65bWFbowe25__wellington-profile-photos-corporate-portrait-headshots-Ben-closeup.jpg?ixlib=vue-2.9.0&auto=format%2C%20compress&w=689",
    title: "Help us improve our productivity",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    author: "Samantha William",
    position: "Senior Designer at Design Studio",
  },
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Exceptional Service!",
    content:
      "I have had an amazing experience with their services. Their attention to detail and customer support is outstanding!",
    author: "John Doe",
    position: "CEO at TechCorp",
  },
  {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Highly Recommend",
    content:
      "I would highly recommend this service to anyone looking for efficiency and reliability. They exceeded my expectations.",
    author: "Emily Johnson",
    position: "Project Manager at Design Studio",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const { image, title, content, author, position } =
    testimonials[currentIndex];

  return (
    <div className="testimonial-section">
      <div className="testimonial-image">
        <img
          style={{ height: "400px", objectFit: "contain" }}
          src={image}
          alt="Customer Testimonial"
        />
        <div className="quote-icon">&ldquo;</div>
      </div>
      <div className="testimonial-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <p className="testimonial-author">
          {author}
          <br />
          {position}
        </p>
        <div style={{display: 'flex', gap: '6px', cursor: 'pointer'}} className="testimonial-arrows">
          <div onClick={prevTestimonial} className="arrow">
            &larr;
          </div>
          <div onClick={nextTestimonial} className="arrow">
            &rarr;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
