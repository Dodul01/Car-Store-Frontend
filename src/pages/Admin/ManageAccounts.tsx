/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Table, Button, Spin, Tag, notification } from "antd";
import {
  useGetAllUsersQuery,
  useUpdateUserIsBlockMutation,
} from "../../redux/features/Admin/userManagement.api";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { selectCurrentUser, TUser } from "../../redux/features/Auth/authSlice";
import { useAppSelector } from "../../redux/hook";

const ManageAccounts = () => {
  const {
    data: users,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllUsersQuery(null);
  const [updateUserIsBlock] = useUpdateUserIsBlockMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleBlockToggle = async (user: TUser) => {
    setLoadingId(user?._id as unknown as string);
    try {
      const response = await updateUserIsBlock({
        email: user.email,
      }).unwrap();
      refetch();
      if (response.data.result.isActive === true) {
        notification.success({
          message: "Success",
          description: "User unblocked successfully",
        });
      } else {
        notification.success({
          message: "Success",
          description: "User blocked successfully",
        });
      }
      
    } catch (err: any) {
      notification.error({
        message: "Error",
        description: err.data?.message || "Failed to perform operation",
      });
    } finally {
      setLoadingId(null);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "success" : "error"}>
          {isActive ? "Active" : "Blocked"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, user: TUser) => (
        <Button
          type="default"
          danger={user?.isActive}
          onClick={() => handleBlockToggle(user)}
          loading={loadingId === String(user._id)}
          disabled={user._id === currentUser?._id}
          icon={
            user._id === currentUser?._id ? <ExclamationCircleOutlined /> : null
          }
        >
          {user.isActive ? "Block User" : "Unblock User"}
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Manage User Accounts
      </h2>

      <Spin spinning={isLoading || isFetching}>
        <Table
          columns={columns}
          dataSource={users?.data.allUsers || []}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
          bordered
          rowClassName={(record) =>
            record._id === currentUser?._id ? "bg-blue-50" : ""
          }
        />
      </Spin>
    </div>
  );
};

export default ManageAccounts;
