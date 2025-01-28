import { Button, Form, Input } from "antd";
import { useRegisterMutation } from "../../redux/features/Auth/authApi";

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const [register] = useRegisterMutation();

  interface SignUpFormValues {
    name: string;
    email: string;
    password: string;
  }

  const handleForm = async (value: SignUpFormValues) => {
    try {
      const userInfo = {
        name: value.name,
        email: value.email,
        password: value.password,
      };

      const res = await register(userInfo).unwrap();
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333333" }}>Sign Up</h2>
        <Form layout="vertical" form={form} onFinish={handleForm}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                backgroundColor: "#f3c6a4",
                borderColor: "#f3c6a4",
                color: "black",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
