import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users/all-users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    updateUserIsBlock: builder.mutation({
      query: (args) => ({
        url: `/users/block-user/${args.email}`,
        method: "PUT",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useUpdateUserIsBlockMutation , useGetAllUsersQuery} = userManagementApi;
