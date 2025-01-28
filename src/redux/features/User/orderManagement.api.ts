import { baseApi } from "../../api/baseApi";

const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    orderCar: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
    }),
    getOrders: builder.query({
      query: (email) => ({
        url: `/orders/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useOrderCarMutation, useGetOrdersQuery } = orderManagementApi;
