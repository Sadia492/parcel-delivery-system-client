import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔑 Register User
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: "/api/user",
        method: "POST",
        body: userInfo,
      }),
    }),

    // 🔑 Login User
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "/api/user/login",
        method: "POST",
        body: userInfo,
        headers: {
          "Content-Type": "application/json", // Ensure JSON content type
        },
      }),
    }),

    // 🔑 Refresh Token
    refreshToken: builder.mutation({
      query: () => ({
        url: "/api/users/refresh-token",
        method: "POST",
      }),
    }),

    // 🔑 Logout
    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // 👤 Get Current User Details
    userInfo: builder.query({
      query: () => ({
        url: `/api/user/me`, // backend requires id in path
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => ({ url: "/api/user", method: "GET" }),
      providesTags: ["User"],
    }),

    blockUser: builder.mutation({
      query: (id) => ({
        url: `/api/user/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    unblockUser: builder.mutation({
      query: (id) => ({
        url: `/api/user/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useUserInfoQuery,
  useGetUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = authApi;
