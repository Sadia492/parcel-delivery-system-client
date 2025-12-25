import { apiSlice } from "../api/apiSlice";

export const metaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardMeta: builder.query({
      query: () => ({ url: "/api/meta/dashboard", method: "GET" }),
      providesTags: ["Meta"],
    }),

    getAdminMeta: builder.query({
      query: () => ({ url: "/api/meta/dashboard/admin", method: "GET" }),
      providesTags: ["Meta"],
    }),
    getSenderMeta: builder.query({
      query: () => ({ url: "/api/meta/dashboard/sender", method: "GET" }),
      providesTags: ["Meta"],
    }),
    getReceiverMeta: builder.query({
      query: () => ({ url: "/api/meta/dashboard/receiver", method: "GET" }),
      providesTags: ["Meta"],
    }),
    getChartsMeta: builder.query({
      query: () => ({ url: "/api/meta/charts", method: "GET" }),
      providesTags: ["Meta"],
    }),
    getHeroMeta: builder.query({
      query: () => ({ url: "/api/meta/hero-stats", method: "GET" }),
      providesTags: ["Meta"],
    }),
  }),
});

export const {
  useGetDashboardMetaQuery,
  useGetAdminMetaQuery,
  useGetSenderMetaQuery,
  useGetReceiverMetaQuery,
  useGetChartsMetaQuery,
  useGetHeroMetaQuery,
} = metaApi;
