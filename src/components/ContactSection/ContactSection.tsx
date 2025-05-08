/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Form, Input, Button, Row, Col, Typography, Space } from "antd";
// import {
//   MailOutlined,
//   EnvironmentOutlined,
//   FacebookOutlined,
//   InstagramOutlined,
//   TwitterOutlined,
// } from "@ant-design/icons";

// const { Title, Paragraph } = Typography;
// const { TextArea } = Input;

// const ContactSection = () => {
//   const onFinish = (values: any) => {
//     console.log("Form Submitted:", values);
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#f0f2f5",
//         padding: "60px 20px",
//         textAlign: "center",
//       }}
//     >
//       <Title level={2} style={{ marginBottom: 8 }}>
//         Contact Us
//       </Title>
//       <Paragraph style={{ color: "#666", marginBottom: 40 }}>
//         We'd love to hear from you. Reach out via the form or our social links.
//       </Paragraph>

//       <Row gutter={[32, 32]} justify="center">
//         {/* Contact Info */}
//         <Col xs={24} md={10}>
//           <Space direction="vertical" size="large" style={{ width: "100%", border: '1px solid black' }}>
//             <h2>Hello</h2>
//           </Space>
//         </Col>

//         {/* Contact Form */}
//         <Col xs={24} md={14}>
//           <Form
//             layout="vertical"
//             onFinish={onFinish}
//             style={{
//               background: "#fff",
//               padding: 24,
//               borderRadius: 12,
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//               maxWidth: 600,
//               margin: "auto",
//             }}
//           >
//             <Form.Item
//               label="Name"
//               name="name"
//               rules={[{ required: true, message: "Please enter your name" }]}
//             >
//               <Input placeholder="Your name" />
//             </Form.Item>

//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[
//                 { required: true, message: "Please enter your email" },
//                 { type: "email", message: "Please enter a valid email" },
//               ]}
//             >
//               <Input placeholder="Your email" />
//             </Form.Item>

//             <Form.Item
//               label="Message"
//               name="message"
//               rules={[{ required: true, message: "Please enter your message" }]}
//             >
//               <TextArea rows={4} placeholder="Write your message..." />
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary" htmlType="submit" block>
//                 Send Message
//               </Button>
//             </Form.Item>
//           </Form>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ContactSection;

import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import illustration from "../../assets/Images/contactIcon.png";

const { Title, Text } = Typography;

const ContactForm = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    messageApi.open({
      type: "success",
      content:
        "Thanks for messaging us we will get back to you as soon as possible.",
    });
  };

  return (
    <Row
      gutter={0}
      style={{
        maxWidth: 1400,
        margin: "60px auto",
        backgroundColor: "#fff",
        borderRadius: 15,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      {contextHolder}
      {/* Left Column - Form */}
      <Col xs={24} md={12} style={{ padding: "40px 50px" }}>
        <div style={{ marginBottom: 40 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            Get in touch
          </Title>
          <Text type="secondary">
            Have a project in mind? Let's work together.
          </Text>
        </div>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="John Doe"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="johndoe@example.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Write your message here..."
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{
                color: "black",
                height: 45,
                fontSize: 16,
                marginTop: 15,
              }}
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </Col>

      {/* Right Column - Illustration */}
      <Col
        xs={0}
        md={12}
        style={{
          backgroundColor: "#FFE8D4",
          padding: 40,
          position: "relative",
          minHeight: 600,
        }}
      >
        <img
          src={illustration}
          alt="Contact Illustration"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "100%",
            maxWidth: 500,
          }}
        />
      </Col>
    </Row>
  );
};

export default ContactForm;
