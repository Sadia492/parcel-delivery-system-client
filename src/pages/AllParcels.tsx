import { useState, useMemo, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
import type { IParcel, TParcelStatus } from "@/types";
import {
  Calendar,
  Package,
  MapPin,
  Clock,
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
  Search,
  Filter,
  SortAsc,
  X,
  User,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type FilterOptions = {
  status: TParcelStatus | "ALL";
  parcelType: "ALL" | "PACKAGE" | "DOCUMENT" | "OTHER";
  priceRange: { min: number; max: number } | null;
  searchQuery: string;
};

type SortOption =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "weight-low"
  | "weight-high";

export default function AllParcels() {
  const { data, isLoading, error } = useGetTrackParcelQuery(undefined);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    status: "ALL",
    parcelType: "ALL",
    priceRange: null,
    searchQuery: "",
  });
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const limit = 8; // parcels per page
  const parcels = data?.data || [];

  // Status options (using your actual TParcelStatus)
  const statusOptions: Array<TParcelStatus | "ALL"> = [
    "ALL",
    "REQUESTED",
    "APPROVED",
    "DISPATCHED",
    "DELIVERED",
    "CANCELED",
  ];

  // Parcel type options
  const parcelTypeOptions = ["ALL", "PACKAGE", "DOCUMENT", "OTHER"];

  // Price ranges based on your data
  const priceRanges = [
    { label: "Any Price", value: null },
    { label: "Under $50", value: { min: 0, max: 50 } },
    { label: "$50 - $200", value: { min: 50, max: 200 } },
    { label: "$200 - $500", value: { min: 200, max: 500 } },
    { label: "Over $500", value: { min: 500, max: Infinity } },
  ];

  // Sort options
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "weight-low", label: "Weight: Low to High" },
    { value: "weight-high", label: "Weight: High to Low" },
  ];

  // Helper function to extract user info
  const getUserInfo = (userData: any): { name?: string; email?: string } => {
    if (!userData) return {};

    if (typeof userData === "object") {
      // Handle the structure from your example
      if (userData.$oid) return {}; // It's just an ObjectId reference

      // If it has name and email properties
      if (userData.name || userData.email) {
        return {
          name: userData.name || "",
          email: userData.email || "",
        };
      }
    }

    return {};
  };

  // Apply filters and search
  const filteredParcels = useMemo(() => {
    return parcels.filter((parcel: IParcel) => {
      // Search filter
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        const senderInfo = getUserInfo(parcel.senderId);
        const receiverInfo = getUserInfo(parcel.receiverId);

        const matchesSearch =
          parcel.trackingId?.toLowerCase().includes(searchLower) ||
          parcel.fromAddress?.toLowerCase().includes(searchLower) ||
          parcel.toAddress?.toLowerCase().includes(searchLower) ||
          senderInfo.name?.toLowerCase().includes(searchLower) ||
          senderInfo.email?.toLowerCase().includes(searchLower) ||
          receiverInfo.name?.toLowerCase().includes(searchLower) ||
          receiverInfo.email?.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status !== "ALL" && parcel.status !== filters.status) {
        return false;
      }

      // Parcel type filter
      if (
        filters.parcelType !== "ALL" &&
        parcel.parcelType !== filters.parcelType
      ) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        if (
          parcel.fee < filters.priceRange.min ||
          parcel.fee > filters.priceRange.max
        ) {
          return false;
        }
      }

      return true;
    });
  }, [parcels, filters]);

  // Apply sorting
  const sortedParcels = useMemo(() => {
    const sorted = [...filteredParcels];

    const getDate = (date: string | { $date: string }) => {
      const dateStr = typeof date === "string" ? date : date.$date;
      return new Date(dateStr).getTime();
    };

    switch (sortBy) {
      case "newest":
        return sorted.sort(
          (a, b) => getDate(b.createdAt) - getDate(a.createdAt)
        );
      case "oldest":
        return sorted.sort(
          (a, b) => getDate(a.createdAt) - getDate(b.createdAt)
        );
      case "price-low":
        return sorted.sort((a, b) => a.fee - b.fee);
      case "price-high":
        return sorted.sort((a, b) => b.fee - a.fee);
      case "weight-low":
        return sorted.sort((a, b) => a.weight - b.weight);
      case "weight-high":
        return sorted.sort((a, b) => b.weight - a.weight);
      default:
        return sorted;
    }
  }, [filteredParcels, sortBy]);

  // Calculate pagination values
  const totalItems = sortedParcels.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedParcels = sortedParcels.slice(startIndex, endIndex);

  // Status color mapping
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

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: "ALL",
      parcelType: "ALL",
      priceRange: null,
      searchQuery: "",
    });
    setPage(1);
  };

  // Update page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters, sortBy]);

  const activeFilterCount = [
    filters.status !== "ALL",
    filters.parcelType !== "ALL",
    filters.priceRange !== null,
    filters.searchQuery !== "",
  ].filter(Boolean).length;

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
            Browse through all parcels in our system. Use filters and search to
            find exactly what you're looking for.
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

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-6">
          {/* Main Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by tracking ID, address, sender, or receiver..."
              className="pl-12 pr-4 py-6 text-lg"
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters({ ...filters, searchQuery: e.target.value })
              }
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: "" })}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Left: Filter Toggle and Active Filters */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>

              {/* Active Filters Display */}
              <div className="flex flex-wrap gap-2">
                {filters.status !== "ALL" && (
                  <Badge variant="outline" className="gap-1">
                    Status: {filters.status}
                    <button
                      onClick={() => setFilters({ ...filters, status: "ALL" })}
                      className="ml-1 hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.parcelType !== "ALL" && (
                  <Badge variant="outline" className="gap-1">
                    Type: {filters.parcelType}
                    <button
                      onClick={() =>
                        setFilters({ ...filters, parcelType: "ALL" })
                      }
                      className="ml-1 hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.priceRange && (
                  <Badge variant="outline" className="gap-1">
                    Price: ${filters.priceRange.min} - ${filters.priceRange.max}
                    <button
                      onClick={() =>
                        setFilters({ ...filters, priceRange: null })
                      }
                      className="ml-1 hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>

            {/* Right: Sort and Reset */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-muted-foreground" />
                <Select
                  value={sortBy}
                  onValueChange={(value: SortOption) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="ghost"
                onClick={resetFilters}
                className="text-muted-foreground hover:text-foreground"
                disabled={activeFilterCount === 0}
              >
                Reset All
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-card rounded-xl border p-6 animate-in fade-in-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Status Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Status</h3>
                  <div className="space-y-2">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilters({ ...filters, status })}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full text-left transition-colors ${
                          filters.status === status
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "hover:bg-muted"
                        }`}
                      >
                        {status !== "ALL" && statusIcons[status]}
                        <span className="capitalize">
                          {status.toLowerCase()}
                        </span>
                        {filters.status === status && (
                          <CheckCircle className="w-4 h-4 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parcel Type Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Parcel Type
                  </h3>
                  <div className="space-y-2">
                    {parcelTypeOptions.map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          setFilters({ ...filters, parcelType: type as any })
                        }
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full text-left transition-colors ${
                          filters.parcelType === type
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "hover:bg-muted"
                        }`}
                      >
                        {type !== "ALL" && parcelTypeIcons[type]}
                        <span>
                          {type === "ALL"
                            ? "All Types"
                            : parcelTypeLabels[type]}
                        </span>
                        {filters.parcelType === type && (
                          <CheckCircle className="w-4 h-4 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() =>
                          setFilters({ ...filters, priceRange: range.value })
                        }
                        className={`flex items-center justify-between px-3 py-2 rounded-lg w-full text-left transition-colors ${
                          JSON.stringify(filters.priceRange) ===
                          JSON.stringify(range.value)
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "hover:bg-muted"
                        }`}
                      >
                        <span>{range.label}</span>
                        {JSON.stringify(filters.priceRange) ===
                          JSON.stringify(range.value) && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {Math.min(totalItems, startIndex + 1)}-
          {Math.min(endIndex, totalItems)} of {totalItems} parcels
          {filters.searchQuery && ` matching "${filters.searchQuery}"`}
        </div>

        {/* Parcels Grid */}
        {paginatedParcels.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Parcels Found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search criteria
            </p>
            <Button onClick={resetFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {paginatedParcels.map((parcel: IParcel) => {
                const latestStatus = getLatestStatus(parcel);
                const senderInfo = getUserInfo(parcel.senderId);
                const receiverInfo = getUserInfo(parcel.receiverId);

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
                            <p className="text-sm text-muted-foreground">
                              Weight
                            </p>
                            <p className="text-lg font-semibold text-foreground">
                              {parcel.weight} kg
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* User Information */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Sender:</span>
                          <span className="font-medium truncate">
                            {senderInfo.name || "Unknown"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Receiver:
                          </span>
                          <span className="font-medium truncate">
                            {receiverInfo.name || "Unknown"}
                          </span>
                        </div>
                      </div>

                      {/* Addresses */}
                      <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">
                              From
                            </p>
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
                          Parcel Detail
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
                      .slice(
                        Math.max(0, page - 3),
                        Math.min(totalPages, page + 2)
                      )
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
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
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
          </>
        )}
      </div>
    </div>
  );
}
