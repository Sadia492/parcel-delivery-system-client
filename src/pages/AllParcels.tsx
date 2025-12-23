import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetAllParcelsQuery } from "@/redux/features/parcel/parcel.api";
import type { IParcel, TParcelStatus } from "@/types";
import {
  Calendar,
  Package,
  MapPin,
  Clock,
  User,
  CheckCircle,
  Truck,
  AlertCircle,
  FileText,
  DollarSign,
  Hash,
  Map,
  CheckCheck,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router";

export default function AllParcels() {
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

  // Status color mapping based on your TParcelStatus
  const statusColors: Record<TParcelStatus, string> = {
    REQUESTED: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
    APPROVED: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    DISPATCHED: "bg-purple-500/20 text-purple-600 border-purple-500/30",
    DELIVERED: "bg-green-500/20 text-green-600 border-green-500/30",
    CANCELED: "bg-red-500/20 text-red-600 border-red-500/30",
  };

  // Status icon mapping
  const statusIcons: Record<TParcelStatus, React.ReactNode> = {
    REQUESTED: <Clock className="w-4 h-4" />,
    APPROVED: <CheckCircle className="w-4 h-4" />,
    DISPATCHED: <Truck className="w-4 h-4" />,
    DELIVERED: <CheckCheck className="w-4 h-4" />,
    CANCELED: <XCircle className="w-4 h-4" />,
  };

  // Parcel type icon mapping
  const parcelTypeIcons: Record<string, React.ReactNode> = {
    PACKAGE: <Package className="w-4 h-4" />,
    DOCUMENT: <FileText className="w-4 h-4" />,
    OTHER: <Package className="w-4 h-4" />,
  };

  // Parcel type labels
  const parcelTypeLabels: Record<string, string> = {
    PACKAGE: "Package",
    DOCUMENT: "Document",
    OTHER: "Other",
  };

  // Format date
  const formatDate = (dateString: string | { $date: string }) => {
    const date = typeof dateString === "string" ? dateString : dateString.$date;
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format timestamp
  const formatDateTime = (dateString: string | { $date: string }) => {
    const date = typeof dateString === "string" ? dateString : dateString.$date;
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get latest status log
  const getLatestStatus = (parcel: IParcel) => {
    if (parcel.statusLogs && parcel.statusLogs.length > 0) {
      const latestLog = parcel.statusLogs[parcel.statusLogs.length - 1];
      return {
        status: latestLog.status,
        timestamp: latestLog.timestamp,
        updatedBy: latestLog.updatedBy,
      };
    }
    return {
      status: parcel.status,
      timestamp: parcel.updatedAt,
      updatedBy: "",
    };
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md p-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
            Failed to Load Parcels
          </h3>
          <p className="text-red-600 dark:text-red-300">
            Unable to fetch parcel data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!parcels || parcels.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md p-8 rounded-xl bg-muted border">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            No Parcels Found
          </h3>
          <p className="text-muted-foreground">
            There are no parcels in the system yet. Check back later or create a
            new parcel to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="w-11/12 mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Package className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            📦 All Parcels
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse through all parcels in our system. Track deliveries, check
            statuses, and stay updated with real-time information.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
              Total: {totalItems} Parcels
            </div>
            <div className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
              Page {page} of {totalPages}
            </div>
            <div className="px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">
              {parcels.filter((p: any) => p.status === "DELIVERED").length}{" "}
              Delivered
            </div>
          </div>
        </div>

        {/* Parcels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedParcels.map((parcel: IParcel) => {
            const latestStatus = getLatestStatus(parcel);

            return (
              <div
                key={parcel._id}
                className="group bg-card hover:shadow-xl transition-all duration-300 rounded-2xl border overflow-hidden hover:-translate-y-1"
              >
                {/* Header with Tracking ID */}
                <div className="px-6 pt-6 pb-4 bg-gradient-to-r from-muted/30 to-transparent">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono text-sm font-medium text-muted-foreground">
                        {parcel.trackingId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
                      {parcelTypeIcons[parcel.parcelType]}
                      <span className="text-sm font-medium">
                        {parcelTypeLabels[parcel.parcelType]}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${
                      statusColors[parcel.status] ||
                      "bg-gray-500/20 text-gray-600 border-gray-500/30"
                    }`}
                  >
                    {statusIcons[parcel.status]}
                    {parcel.status}
                  </div>
                </div>

                {/* Parcel Details */}
                <div className="px-6 pb-6">
                  {/* Price and Weight */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Fee</p>
                        <p className="text-xl font-bold text-foreground">
                          ${parcel.fee}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Weight</p>
                        <p className="text-lg font-semibold text-foreground">
                          {parcel.weight} kg
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">From</p>
                        <p className="font-medium text-foreground line-clamp-2">
                          {parcel.fromAddress}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Map className="w-5 h-5 text-muted-foreground mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">To</p>
                        <p className="font-medium text-foreground line-clamp-2">
                          {parcel.toAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Created</span>
                      </div>
                      <span className="font-medium">
                        {formatDate(parcel.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Last Updated</span>
                      </div>
                      <span className="font-medium">
                        {formatDateTime(latestStatus.timestamp)}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-4 border-t" />

                  {/* Status Log Count */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Status Updates</span>
                    </div>
                    <span className="font-medium">
                      {parcel.statusLogs?.length || 0} updates
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/parcel/${parcel._id}`}
                      className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors text-center"
                    >
                      Parcel Details
                    </Link>
                  </div>
                </div>

                {/* Bottom accent based on status */}
                <div
                  className={`h-1 ${
                    parcel.status === "DELIVERED"
                      ? "bg-gradient-to-r from-green-500 to-green-400"
                      : parcel.status === "DISPATCHED"
                      ? "bg-gradient-to-r from-purple-500 to-purple-400"
                      : parcel.status === "APPROVED"
                      ? "bg-gradient-to-r from-blue-500 to-blue-400"
                      : parcel.status === "REQUESTED"
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                      : "bg-gradient-to-r from-red-500 to-red-400"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mb-8">
            <Pagination>
              <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={
                      page === 1
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-primary hover:text-primary-foreground"
                    }
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
                  .map((pg) => (
                    <PaginationItem key={pg}>
                      <PaginationLink
                        href="#"
                        isActive={pg === page}
                        onClick={() => setPage(pg)}
                        className={
                          pg === page
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-primary/10"
                        }
                      >
                        {pg}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {/* Ellipsis */}
                {totalPages > 6 && page < totalPages - 2 && (
                  <PaginationEllipsis />
                )}

                {/* Next Button */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-primary hover:text-primary-foreground"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            {/* Page Info */}
            <div className="text-center mt-4 text-muted-foreground text-sm">
              Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of{" "}
              {totalItems} parcels
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
