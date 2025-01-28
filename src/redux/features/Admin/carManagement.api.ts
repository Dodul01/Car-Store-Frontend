import { baseApi } from "../../api/baseApi";

const carManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCar: builder.mutation({
      query: (data) => ({
        url: "/cars",
        method: "POST",
        body: data,
      }),
    }),
    updateCar: builder.mutation({
      query: (args) => ({
        url: `cars/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["cars"],
    }),
    deleteCar: builder.mutation({
      query: (args) => ({
        url: `cars/${args._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cars"],
    }),
  }),
});

export const { useAddCarMutation, useUpdateCarMutation, useDeleteCarMutation } =
  carManagementApi;
