import { Collapse, Typography, Row, Col } from "antd";
import "./FaqSection.css";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const faqData = [
  {
    question: "How do I book a car?",
    answer:
      "You can easily book a car through our website by selecting your desired vehicle, date, and location.",
  },
  {
    question: "What documents are required?",
    answer:
      "A valid driving license and a government-issued ID are required at the time of booking.",
  },
  {
    question: "Is there a cancellation fee?",
    answer:
      "Cancellations made within 24 hours of pickup time may be subject to a fee depending on the policy.",
  },
  {
    question: "Do you offer insurance?",
    answer:
      "Yes, we provide optional insurance coverage that you can add during the checkout process.",
  },
];

const FaqSection = () => {
  return (
    <div className="faq-section">
      <div className="faq-container">
        <Title level={2} className="faq-title">Frequently Asked Questions</Title>
        <Paragraph className="faq-subtitle">
          Quick answers to common questions about our service.
        </Paragraph>

        <Row justify="center">
          <Col xs={24} sm={24} md={20} lg={16}>
            <Collapse accordion className="faq-collapse">
              {faqData.map((item, index) => (
                <Panel header={item.question} key={index}>
                  <Paragraph>{item.answer}</Paragraph>
                </Panel>
              ))}
            </Collapse>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FaqSection;