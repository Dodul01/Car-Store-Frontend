import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Row,
  Col,
  Card,
  Image,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetFeaturndCarsQuery } from "../../redux/features/productApi";
import {
  useDeleteCarMutation,
  useUpdateCarMutation,
} from "../../redux/features/Admin/carManagement.api";

const ManageCar = () => {
  const { data, isLoading, error } = useGetFeaturndCarsQuery(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedCar, setSelectedCar] = useState<any>();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [deleteCar] = useDeleteCarMutation();
  const [updateCar] = useUpdateCarMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = (car: any) => {
    setSelectedCar(car);
    form.setFieldsValue(car);
    setIsEditModalVisible(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditSubmit = async (values: any) => {
    try {
      const args = {
        id: selectedCar._id,
        data: values,
      };

      const result = await updateCar(args).unwrap();

      if (result.status) {
        message.success("Car updated successfully");
      }

      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Update Error:", error);

      message.error("Update failed");
    }
  };

  const handleDeleteConfirm = async (data) => {
    try {
      const result = await deleteCar({ _id: data._id }).unwrap();

      if (result.data.deletedCount == 1) {
        message.success("Car deleted successfully");
        setIsDeleteModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      message.error("Delete failed");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string | undefined) => (
        <Image
          src={image}
          alt="Car"
          width={60}
          height={40}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: { toLocaleString: () => any }) =>
        `$${price.toLocaleString()}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
            style={{ backgroundColor: "#2c3d34", borderColor: "#2c3d34" }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedCar(record);
              setIsDeleteModalVisible(true);
            }}
          />
        </div>
      ),
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load data</p>;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Manage Cars"
            bordered={false}
            style={{ borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          >
            <Table
              dataSource={data?.data}
              columns={columns}
              rowKey="id"
              scroll={{ x: true }}
              pagination={{ pageSize: 6 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal
        title="Edit Car Details"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        destroyOnClose
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
          initialValues={selectedCar}
        >
          {/* Brand and Category */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Brand"
                name="brand"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="Sedan">Sedan</Select.Option>
                  <Select.Option value="SUV">SUV</Select.Option>
                  <Select.Option value="Truck">Truck</Select.Option>
                  <Select.Option value="Coupe">Coupe</Select.Option>
                  <Select.Option value="Convertible">Convertible</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Year, Model, and Quantity */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Year" name="year" rules={[{ required: true }]}>
                <InputNumber
                  min={1900}
                  max={new Date().getFullYear()}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Model"
                name="model"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Price */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} prefix="$" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Description */}
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>

          {/* Action Buttons */}
          <Row justify="end" gutter={8}>
            <Col>
              <Button onClick={() => setIsEditModalVisible(false)}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#2c3d34", borderColor: "#2c3d34" }}
              >
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        onOk={() => handleDeleteConfirm(selectedCar)}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete {selectedCar?.brand}{" "}
          {selectedCar?.model}?
        </p>
      </Modal>
    </div>
  );
};

export default ManageCar;
