// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button, Form, Input } from "antd";
// import { useLogInMutation } from "../../redux/features/Auth/authApi";
// import { verifyToken } from "../../utils/verifyToken";
// import { useAppDispatch } from "../../redux/hook";
// import { setUser } from "../../redux/features/Auth/authSlice";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// const SignIn: React.FC = () => {
//   const [form] = Form.useForm();
//   const [logIn] = useLogInMutation();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   interface SignInFormValues {
//     email: string;
//     password: string;
//   }

//   const handleForm = async (value: SignInFormValues) => {
//     const toastId = toast.loading("Signing in...");
//     try {
//       const userInfo = {
//         email: value.email,
//         password: value.password,
//       };

//       const res = await logIn(userInfo).unwrap();
//       const user = verifyToken(res.data.token);

//       dispatch(setUser({ user: user, token: res.data.token }));
//       toast.success("Sign in successfully.", { id: toastId, duration: 2000 });

//       if (user?.role === "seller") {
//         navigate("/all-cars");
//       }

//       if (user?.role === "admin") {
//         navigate("/admin/dashboard");
//       }
//     } catch (error: any) {
//       console.log(error);
//       toast.error(error?.data?.message || "Something went wrong", { id: toastId, duration: 2000 });
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f4f4f4",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#ffffff",
//           padding: "30px",
//           borderRadius: "12px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           maxWidth: "400px",
//           width: "100%",
//         }}
//       >
//         <h2 style={{ textAlign: "center", color: "#333333" }}>Sign In</h2>
//         <Form layout="vertical" form={form} onFinish={handleForm}>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: "Please enter your email!" },
//               { type: "email", message: "Please enter a valid email!" },
//             ]}
//           >
//             <Input placeholder="Enter your email" />
//           </Form.Item>
//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: "Please enter your password!" }]}
//           >
//             <Input.Password placeholder="Enter your password" />
//           </Form.Item>
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               style={{
//                 width: "100%",
//                 backgroundColor: "#f3c6a4",
//                 borderColor: "#f3c6a4",
//                 color: "black",
//               }}
//             >
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Typography, Card, Divider } from "antd";
import { useLogInMutation } from "../../redux/features/Auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/Auth/authSlice";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const adminCredential = {
  email: "systemAdmin@gmail.com",
  password: "systemAdmin",
};
const customerCredential = {
  email: "allendodul6@gmail.com",
  password: "12345678",
};

const SignIn: React.FC = () => {
  const [form] = Form.useForm();
  const [logIn, { isLoading }] = useLogInMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  interface SignInFormValues {
    email: string;
    password: string;
  }

  const handleForm = async (value: SignInFormValues) => {
    const toastId = toast.loading("Signing in...");
    try {
      const userInfo = {
        email: value.email,
        password: value.password,
      };

      const res = await logIn(userInfo).unwrap();
      const user = verifyToken(res.data.token);

      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success("Sign in successfully.", { id: toastId, duration: 2000 });

      const redirectPath =
        user?.role === "admin"
          ? "/admin/dashboard"
          : user?.role === "seller"
          ? "/all-cars"
          : "/";
      navigate(redirectPath);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleAdminCredential = () => {
    form.setFieldsValue(adminCredential);
  };

  const handleCustomarCredential = () => {
    form.setFieldsValue(customerCredential);
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
            Welcome Back
          </Title>
          <Text type="secondary">Sign in to manage your account</Text>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Button onClick={handleCustomarCredential} type="dashed">
            Customar Credentials
          </Button>
          <Button onClick={handleAdminCredential} type="dashed">
            Admin Credentials
          </Button>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleForm}
          autoComplete="off"
        >
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
            rules={[{ required: true, message: "Please enter your password" }]}
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
              style={{ background: "#F3C6A4", color: "black" }}
              htmlType="submit"
              size="large"
              loading={isLoading}
              block
            >
              Sign In
            </Button>
          </Form.Item>

          <Divider style={{ marginBottom: 24 }}>or</Divider>

          <div style={{ textAlign: "center" }}>
            <Text type="secondary">
              Don't have an account?{" "}
              <Link to="/signup" style={{ fontWeight: 500 }}>
                Create account
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
