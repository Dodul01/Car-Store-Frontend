/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Typography, Card, Divider } from "antd";
import { useRegisterMutation } from "../../redux/features/Auth/authApi";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  interface SignUpFormValues {
    name: string;
    email: string;
    password: string;
  }

  const handleForm = async (value: SignUpFormValues) => {
    const toastId = toast.loading("Creating account...");
    try {
      const userInfo = {
        name: value.name,
        email: value.email,
        password: value.password,
      };

      const res = await register(userInfo).unwrap();
      console.log(res);

      toast.success("Account created successfully!", {
        id: toastId,
        duration: 2000,
      });
      navigate("/signIn");
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "24px",
      }}
    >
      <Card
        hoverable
        style={{
          width: "100%",
          maxWidth: "480px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Title level={3} style={{ marginBottom: 8 }}>
            Create New Account
          </Title>
          <Text type="secondary">Join our community and get started</Text>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleForm}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="John Doe"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="example@email.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="●●●●●●●●"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              style={{ background: "#f3c6a4", color: "black" }}
              block
            >
              Create Account
            </Button>
          </Form.Item>

          <Divider style={{ marginBottom: 24 }}>
            Already have an account?
          </Divider>

          <div style={{ textAlign: "center" }}>
            <Text type="secondary">
              Return to{" "}
              <Link to="/signIn" style={{ fontWeight: 500 }}>
                Sign In
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
