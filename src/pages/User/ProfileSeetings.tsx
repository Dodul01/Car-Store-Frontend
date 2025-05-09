// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { Form, Input, Button, message } from "antd";
// import { LockOutlined } from "@ant-design/icons";
// import { useUpdatePasswordMutation } from "../../redux/features/Auth/authApi";
// import { useAppSelector } from "../../redux/hook";
// import { selectCurrentUser } from "../../redux/features/Auth/authSlice";

// const ProfileSettings = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [updatePassword] = useUpdatePasswordMutation();
//   const user = useAppSelector(selectCurrentUser) as { _id: string } | null;

//   const onFinish = async (values: {
//     currentPassword: string;
//     newPassword: string;
//   }) => {
//     setLoading(true);
//     try {
//       if (!user?._id) {
//         message.error("User not authenticated!");
//         return;
//       }

//       const response = await updatePassword({
//         id: user._id,
//         currentPassword: values.currentPassword,
//         newPassword: values.newPassword,
//       }).unwrap();

//       message.success(response.message);
//       form.resetFields();
//     } catch (error: any) {
//       message.error(
//         error?.data?.message || "Failed to update password. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log(user);

//   return (
//     <div
//       style={{
//         maxWidth: "500px",
//         margin: "50px auto",
//         padding: "20px",
//         background: "#fff",
//         borderRadius: "8px",
//         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//         Update Password
//       </h2>
//       <Form
//         form={form}
//         name="profile-settings"
//         onFinish={onFinish}
//         layout="vertical"
//         validateTrigger="onBlur"
//       >
//         <Form.Item
//           label="Current Password"
//           name="currentPassword"
//           rules={[
//             { required: true, message: "Please enter your current password!" },
//           ]}
//         >
//           <Input.Password
//             prefix={<LockOutlined />}
//             placeholder="Enter your current password"
//             size="large"
//           />
//         </Form.Item>

//         <Form.Item
//           label="New Password"
//           name="newPassword"
//           rules={[
//             { required: true, message: "Please enter your new password!" },
//             { min: 6, message: "Password must be at least 6 characters long!" },
//           ]}
//         >
//           <Input.Password
//             prefix={<LockOutlined />}
//             placeholder="Enter your new password"
//             size="large"
//           />
//         </Form.Item>

//         <Form.Item
//           label="Confirm New Password"
//           name="confirmPassword"
//           dependencies={["newPassword"]}
//           rules={[
//             { required: true, message: "Please confirm your new password!" },
//             ({ getFieldValue }) => ({
//               validator(_, value) {
//                 if (!value || getFieldValue("newPassword") === value) {
//                   return Promise.resolve();
//                 }
//                 return Promise.reject(
//                   new Error("The two passwords do not match!")
//                 );
//               },
//             }),
//           ]}
//         >
//           <Input.Password
//             prefix={<LockOutlined />}
//             placeholder="Confirm your new password"
//             size="large"
//           />
//         </Form.Item>

//         <Form.Item style={{ textAlign: "center" }}>
//           <Button
//             htmlType="submit"
//             size="large"
//             loading={loading}
//             style={{ width: "100%", background: "#425a4f", color: "white" }}
//           >
//             Update Password
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default ProfileSettings;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Avatar,
  Typography,
  Row,
  Col,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useUpdatePasswordMutation } from "../../redux/features/Auth/authApi";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/Auth/authSlice";

const { Title, Text } = Typography;

const ProfileSettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updatePassword] = useUpdatePasswordMutation();
  const user = useAppSelector(selectCurrentUser) as {
    _id: string;
    email: string;
  } | null;

  const onFinish = async (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setLoading(true);
    try {
      if (!user?._id) {
        message.error("User not authenticated!");
        return;
      }

      const response = await updatePassword({
        id: user._id,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }).unwrap();

      message.success(response.message);
      form.resetFields();
    } catch (error: any) {
      message.error(
        error?.data?.message || "Failed to update password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const userEmail = user?.email || "unknown@example.com";
  const userName = userEmail.split("@")[0].replace(/\./g, " ");

  return (
    <div>
      {/* Profile Info */}
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "0 0 8px 8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginBottom: "24px",
        }}
      >
        <Row gutter={16} align="middle">
          <Col flex="none">
            <Avatar size={80} icon={<UserOutlined />} />
          </Col>
          <Col flex="auto">
            <Title level={4} style={{ margin: 0 }}>
              {userName.charAt(0).toUpperCase() + userName.slice(1)}
            </Title>
            <Text type="secondary">
              <MailOutlined /> {userEmail}
            </Text>
            <br />
            <Text type="secondary">
              <PhoneOutlined /> +1 (555) 123-4567
            </Text>
          </Col>
        </Row>
      </div>

      {/* Password Form */}
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={4} style={{ marginBottom: "20px" }}>
          Update Password
        </Title>

        <Form
          form={form}
          name="profile-settings"
          onFinish={onFinish}
          layout="vertical"
          validateTrigger="onBlur"
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please enter your current password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your current password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your new password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your new password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              size="large"
              loading={loading}
              style={{ width: "100%", background: "#425a4f", color: "white" }}
            >
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProfileSettings;
