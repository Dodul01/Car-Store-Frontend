import { baseApi } from "../../api/baseApi";

const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders/allOrders",
        method: "GET",
      }),
    }),
    deleteOrder: builder.mutation({
      query: (args) => ({
        url: `orders/${args._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `orders/order-status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} = orderManagementApi;
