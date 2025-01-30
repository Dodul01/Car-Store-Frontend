import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/logIn",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "users/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    updatePassword: builder.mutation<
      { message: string },
      {
        id: string;
        currentPassword: string;
        newPassword: string;
      }
    >({
      query: (credentials) => ({
        url: `auth/update-password/${credentials.id}`,
        method: "PUT",
        body: {
          currentPassword: credentials.currentPassword,
          newPassword: credentials.newPassword,
        },
      }),
    }),
  }),
});

export const {
  useLogInMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
} = authApi;
