import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import ParcelCard from "@/components/ParcelCard";
import { useGetAllParcelsQuery } from "@/redux/features/parcel/parcel.api";
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
  const { data, isLoading, error } = useGetAllParcelsQuery(undefined);
  const [page, setPage] = useState(1);

  const limit = 6; // parcels per page
  const parcels = data?.data || [];

  // calculate pagination values
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
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">📦 All Parcels</h1>
        <p className="text-muted-foreground lg:w-1/2 w-full mx-auto">
          As an admin, you can view and manage all parcels in the system.
          Monitor delivery statuses, update records, and ensure smooth
          operations.
        </p>
      </div>
      {/* Grid of parcels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {paginatedParcels.map((parcel: IParcel) => (
          <ParcelCard key={parcel._id} parcel={parcel} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* Page Numbers */}
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

            {/* Ellipsis (optional for large page counts) */}
            {totalPages > 6 && <PaginationEllipsis />}

            {/* Next Button */}
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
