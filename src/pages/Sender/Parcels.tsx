import { useState } from "react";
import { CreateParcelDialog } from "@/components/CreateParcelDialog";
import LoadingSpinner from "@/components/LoadingSpinner";
import ParcelCard from "@/components/ParcelCard";
import { useGetSenderParcelsQuery } from "@/redux/features/parcel/parcel.api";
import type { IParcel } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Parcels() {
  const { data, isLoading, error } = useGetSenderParcelsQuery(undefined);
  const [page, setPage] = useState(1);

  const limit = 6; // number of parcels per page
  const parcels = data?.data || [];

  // pagination values
  const totalItems = parcels.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedParcels = parcels.slice(startIndex, endIndex);

  if (isLoading) return <LoadingSpinner />;

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
    <div className="p-4">
      <h1 className="text-2xl font-bold text-foreground text-center">
        📦 My Parcels
      </h1>
      <p className="text-muted-foreground lg:w-1/2 w-full mx-auto text-center">
        Manage all the parcels you have created. Create new requests, check
        statuses, and cancel shipments if needed.
      </p>
      {/* Create parcel dialog */}
      <div className="pb-4">
        <CreateParcelDialog />
      </div>

      {/* Parcels grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {paginatedParcels.map((parcel: IParcel) => (
          <ParcelCard key={parcel._id} parcel={parcel} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <PaginationItem key={pg}>
                <PaginationLink
                  href="#"
                  isActive={pg === page}
                  onClick={() => setPage(pg)}
                >
                  {pg}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 6 && <PaginationEllipsis />}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
