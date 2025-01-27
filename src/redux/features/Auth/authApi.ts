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
  }),
});

export const { useLogInMutation, useRegisterMutation } = authApi;
