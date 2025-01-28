import { baseApi } from "../../api/baseApi";

const revinueManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevinue: builder.query({
      query: () => ({
        url: "/orders/revenue",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRevinueQuery } = revinueManagementApi;
