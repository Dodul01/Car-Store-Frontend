/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Typography, Image } from "antd";
import { selectCurrentUser } from "../../redux/features/Auth/authSlice";
import { useGetOrdersQuery } from "../../redux/features/User/orderManagement.api";
import { useAppSelector } from "../../redux/hook";

const { Title } = Typography;

const MyCart = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading } = useGetOrdersQuery(user?.email);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: any) => <Image src={text} alt="Car" width={80} />,
    },
    {
      title: "Name",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const dataSource = data?.data.orders.map((order: any) => {
    const carDetails = data?.data.cars.find(
      (car: any) => car._id === order.car
    );
    return {
      key: order._id,
      image: carDetails?.image,
      brand: carDetails?.brand,
      model: carDetails?.model,
      category: carDetails?.category,
      status: order.status,
    };
  });

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        My Cart
      </Title>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}
    </div>
  );
};

export default MyCart;
