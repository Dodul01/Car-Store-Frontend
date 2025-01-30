import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAddCarMutation } from "../../redux/features/Admin/carManagement.api";

const { Option } = Select;
const { TextArea } = Input;

// Cloudinary configuration
const CLOUD_NAME = "dbwrot7po";
const UPLOAD_PRESET = "lkjadsflkjsdafkljasdf";

const AddCar = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [addCar] = useAddCarMutation();

  const handleCloudinaryUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); // Ensure you're passing the raw file object
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Image upload failed");

      const data = await response.json();
      return data.secure_url; // Cloudinary's URL for the uploaded image
    } catch (error) {
      message.error("Image upload failed. Please try again.");
      throw error;
    }
  };

  const onFinish = async (values: any) => {
    if (fileList.length === 0) {
      message.error("Please upload a car image");
      return;
    }

    setLoading(true);
    try {
      // Pass the raw file to Cloudinary
      const imageUrl = await handleCloudinaryUpload(fileList[0].originFileObj);

      const carData = {
        ...values,
        image: imageUrl,
        inStock: values.quantity > 0,
        year: Number(values.year),
        price: Number(values.price),
        quantity: Number(values.quantity),
      };

      await addCar(carData).unwrap();
      message.success("Car added successfully!");
      form.resetFields();
      setFileList([]);
    } catch (err) {
      message.error("Failed to add car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      setFileList([
        {
          uid: "-1",
          name: file.name,
          status: "done",
          url: URL.createObjectURL(file),
          originFileObj: file, // Save the raw file here
        },
      ]);
      return false; // Prevent automatic upload by Ant Design
    },
    onRemove: () => {
      setFileList([]);
    },
    fileList,
    accept: "image/*",
    maxCount: 1,
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "24px auto",
        padding: 24,
        backgroundColor: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please input the brand!" }]}
          >
            <Input placeholder="Enter brand" />
          </Form.Item>

          <Form.Item
            label="Model"
            name="model"
            rules={[{ required: true, message: "Please input the model!" }]}
          >
            <Input placeholder="Enter model" />
          </Form.Item>

          <Form.Item
            label="Year"
            name="year"
            rules={[{ required: true, message: "Please input the year!" }]}
          >
            <InputNumber
              min={1900}
              max={new Date().getFullYear()}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber min={0} prefix="$" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select placeholder="Select category">
              <Option value="Sedan">Sedan</Option>
              <Option value="SUV">SUV</Option>
              <Option value="Truck">Truck</Option>
              <Option value="Coupe">Coupe</Option>
              <Option value="Convertible">Convertible</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input quantity!" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Car Image"
          required
          extra="Upload high-quality car image (JPEG/PNG)"
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>
              {fileList.length > 0 ? fileList[0].name : "Click to Upload"}
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              backgroundColor: "#2c3d34",
              marginRight: 12,
            }}
          >
            Submit
          </Button>
          <Button
            style={{
              backgroundColor: "#2c3d34",
              color: "white",
              marginRight: 12,
            }}
            onClick={() => {
              form.resetFields();
              setFileList([]);
            }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCar;
