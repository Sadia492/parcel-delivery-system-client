// src/redux/features/admin/admin.api.ts

import { apiSlice } from "../api/apiSlice";

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllParcels: builder.query({
      query: () => ({ url: "/api/parcels", method: "GET" }),
      providesTags: ["Parcel"],
    }),

    updateParcelStatus: builder.mutation({
      query: ({ parcelId, status }) => ({
        url: `/api/parcels/status/${parcelId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Parcel"],
    }),

    blockParcel: builder.mutation({
      query: (parcelId) => ({
        url: `/api/parcels/block/${parcelId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),
  }),
});

export const {
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
} = parcelApi;
