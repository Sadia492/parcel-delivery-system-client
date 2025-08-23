import LoadingSpinner from "@/components/LoadingSpinner";
import ParcelCard from "@/components/ParcelCard";
import { useGetAllParcelsQuery } from "@/redux/features/parcel/parcel.api";
import type { IParcel } from "@/types";

export default function Parcels() {
  const { data: parcels, isLoading, error } = useGetAllParcelsQuery(undefined);

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  if (error) {
    return (
      <p className="text-center py-8 text-red-500">Failed to load parcels.</p>
    );
  }

  if (!parcels || parcels.length === 0) {
    return (
      <p className="text-center py-8 text-foreground">No parcels found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {parcels?.data?.map((parcel: IParcel) => (
        <ParcelCard key={parcel._id} parcel={parcel} />
      ))}
    </div>
  );
}
