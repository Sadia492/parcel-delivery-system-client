// src/redux/features/admin/admin.api.ts

import { apiSlice } from "../api/apiSlice";

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllParcels: builder.query({
      query: () => ({ url: "/api/parcel", method: "GET" }),
      providesTags: ["Parcel"],
    }),

    updateParcelStatus: builder.mutation({
      query: ({ parcelId, status }) => ({
        url: `/api/parcel/status/${parcelId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Parcel"],
    }),

    blockParcel: builder.mutation({
      query: ({
        parcelId,
        block,
        note,
      }: {
        parcelId: string;
        block: boolean;
        note?: string;
      }) => ({
        url: `/api/parcel/block/${parcelId}`,
        method: "PATCH",
        body: { block, note },
      }),
      invalidatesTags: ["Parcel"],
    }),
    getIncomingParcels: builder.query({
      query: () => ({ url: "/api/parcel/incoming", method: "GET" }),
      providesTags: ["Parcel"],
    }),
    getSenderParcels: builder.query({
      query: () => ({ url: "/api/parcel/me", method: "GET" }),
      providesTags: ["Parcel"],
    }),
    // Get delivery history for Receiver
    getDeliveryHistory: builder.query({
      query: () => ({ url: "/api/parcel/history", method: "GET" }),
      providesTags: ["Parcel"],
    }),
    getTrackParcel: builder.query({
      query: () => ({ url: "/api/parcel/track", method: "GET" }),
      providesTags: ["Parcel"],
    }),
    // Confirm delivery
    confirmDelivery: builder.mutation({
      query: ({ parcelId }) => ({
        url: `/api/parcel/confirm-delivery/${parcelId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),
    cancelParcel: builder.mutation({
      query: ({ parcelId }) => ({
        url: `/api/parcel/cancel/${parcelId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),

    // ✅ Create Parcel
    createParcel: builder.mutation({
      query: (parcelData: {
        receiverId: string;
        fromAddress: string;
        toAddress: string;
        parcelType: string;
        weight: number;
        note?: string;
      }) => ({
        url: "/api/parcel",
        method: "POST",
        body: parcelData,
      }),
      invalidatesTags: ["Parcel"],
    }),
  }),
});

export const {
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
  useGetIncomingParcelsQuery,
  useGetDeliveryHistoryQuery,
  useGetTrackParcelQuery,
  useGetSenderParcelsQuery,
  useConfirmDeliveryMutation,
  useCancelParcelMutation,
  useCreateParcelMutation,
} = parcelApi;
