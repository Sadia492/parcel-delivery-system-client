import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
import type { IParcel, TParcelStatus, IStatusLog } from "@/types";
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
  CheckCheck,
  XCircle,
  ShieldCheck,
  Home,
  Mail,
  Weight,
  Navigation,
  ArrowLeft,
  File,
  RefreshCw,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ParcelDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetTrackParcelQuery(undefined);
  const [parcel, setParcel] = useState<IParcel | null>(null);

  // Status flow order
  const statusFlow: TParcelStatus[] = [
    "REQUESTED",
    "APPROVED",
    "DISPATCHED",
    "DELIVERED",
    "CANCELED",
  ];

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
    REQUESTED: <Clock className="w-5 h-5" />,
    APPROVED: <CheckCircle className="w-5 h-5" />,
    DISPATCHED: <Truck className="w-5 h-5" />,
    DELIVERED: <CheckCheck className="w-5 h-5" />,
    CANCELED: <XCircle className="w-5 h-5" />,
  };

  // Status descriptions
  const statusDescriptions: Record<TParcelStatus, string> = {
    REQUESTED: "Parcel request submitted",
    APPROVED: "Parcel approved for dispatch",
    DISPATCHED: "Parcel dispatched from warehouse",
    DELIVERED: "Parcel delivered to recipient",
    CANCELED: "Parcel delivery canceled",
  };

  // Parcel type icons
  const parcelTypeIcons: Record<string, React.ReactNode> = {
    PACKAGE: <Package className="w-5 h-5" />,
    DOCUMENT: <FileText className="w-5 h-5" />,
    OTHER: <Package className="w-5 h-5" />,
  };

  // Format date
  const formatDate = (dateString: string | { $date: string }) => {
    const date = typeof dateString === "string" ? dateString : dateString.$date;
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format date for timeline
  const formatTimelineDate = (dateString: string | { $date: string }) => {
    const date = typeof dateString === "string" ? dateString : dateString.$date;
    const now = new Date();
    const logDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - logDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else {
      return logDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  // Calculate progress percentage
  // Calculate progress percentage
  const calculateProgress = (status: TParcelStatus) => {
    // Only count normal delivery steps: REQUESTED, APPROVED, DISPATCHED, DELIVERED
    const normalStatusFlow = statusFlow.filter((s) => s !== "CANCELED");
    const totalSteps = normalStatusFlow.length - 1; // Should be 3 for 4 steps (0-3)

    if (status === "CANCELED") {
      return 0;
    }

    // Map the current status to the normal flow index
    const normalIndex = normalStatusFlow.indexOf(status);
    return Math.round((normalIndex / totalSteps) * 100);
  };

  useEffect(() => {
    if (data?.data && id) {
      const foundParcel = data.data.find((p: IParcel) => p._id === id);
      setParcel(foundParcel || null);
    }
  }, [data, id]);

  if (isLoading) return <LoadingSpinner />;

  if (error || !parcel) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md p-8 rounded-2xl bg-card border shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Parcel Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            The parcel you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Link to="/all-parcels">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to All Parcels
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = calculateProgress(parcel.status);
  const currentStatusIndex = statusFlow.indexOf(parcel.status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <div className="w-11/12 mx-auto  px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/all-parcels"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Parcels
          </Link>
        </div>

        {/* Header Section */}
        <div className="bg-card rounded-2xl border p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  {parcelTypeIcons[parcel.parcelType]}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {parcel.trackingId}
                  </h1>
                  <p className="text-muted-foreground">
                    {parcel.parcelType} • Created {formatDate(parcel.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${
                  statusColors[parcel.status]
                }`}
              >
                {statusIcons[parcel.status]}
                {parcel.status}
              </div>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh Status
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Bar */}
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Delivery Progress
                </h2>
                <span className="text-2xl font-bold text-primary">
                  {progress}%
                </span>
              </div>

              {/* Progress Steps */}
              <div className="relative mb-8">
                <div className="absolute top-5 left-0 right-0 h-1 bg-muted z-0"></div>
                <div
                  className="absolute top-5 left-0 h-1 bg-primary z-0 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>

                <div className="relative flex justify-between z-10">
                  {statusFlow.map((status, index) => {
                    if (status === "CANCELED") return null;

                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = parcel.status === status;

                    return (
                      <div key={status} className="flex flex-col items-center">
                        <div
                          className={`
                          w-12 h-12 rounded-full flex items-center justify-center mb-2
                          ${
                            isCompleted
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }
                          ${isCurrent ? "ring-4 ring-primary/20" : ""}
                          transition-all duration-300
                        `}
                        >
                          {isCompleted ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            statusIcons[status]
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium text-center max-w-[100px] ${
                            isCompleted
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground">
                  {statusDescriptions[parcel.status]}
                </p>
              </div>
            </div>

            {/* Parcel Details Card */}
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Parcel Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Weight & Fee */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Weight className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-muted-foreground">
                          Weight
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        {parcel.weight} kg
                      </p>
                    </div>

                    <div className="bg-muted/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-muted-foreground">
                          Delivery Fee
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        ${parcel.fee}
                      </p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-muted/30 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Timeline
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Created</span>
                        <span className="font-medium">
                          {formatDate(parcel.createdAt)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Last Updated
                        </span>
                        <span className="font-medium">
                          {formatDate(parcel.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Home className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-foreground">
                        Sender Address
                      </h3>
                    </div>
                    <p className="text-foreground">{parcel.fromAddress}</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-foreground">
                        Receiver Address
                      </h3>
                    </div>
                    <p className="text-foreground">{parcel.toAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Logs */}
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Status History
              </h2>

              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted"></div>

                <div className="space-y-8">
                  {parcel.statusLogs?.map((log: IStatusLog, index: number) => (
                    <div key={index} className="relative flex gap-4">
                      {/* Timeline Dot */}
                      <div className="relative">
                        <div
                          className={`
                          w-12 h-12 rounded-full flex items-center justify-center z-10
                          ${statusColors[log.status as TParcelStatus]}
                          border-4 border-background
                        `}
                        >
                          {statusIcons[log.status as TParcelStatus]}
                        </div>
                        {index < parcel.statusLogs.length - 1 && (
                          <div className="absolute top-12 left-6 w-0.5 h-8 bg-muted"></div>
                        )}
                      </div>

                      {/* Log Content */}
                      <div className="flex-1 pb-8">
                        <div className="bg-muted/30 rounded-xl p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  statusColors[log.status as TParcelStatus]
                                }`}
                              >
                                {log.status}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {formatTimelineDate(log.timestamp)}
                            </span>
                          </div>

                          {log.note && (
                            <p className="text-foreground mb-3">{log.note}</p>
                          )}

                          <div className="text-sm text-muted-foreground">
                            Updated at: {formatDate(log.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - User Info & Actions */}
          <div className="space-y-8">
            {/* Sender Info */}
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Sender Information
              </h2>

              {parcel.senderId ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-semibold text-foreground">
                        {parcel.senderId &&
                        typeof parcel.senderId === "object" &&
                        "name" in parcel.senderId
                          ? (parcel.senderId as { name?: string }).name
                          : "Loading..."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold text-foreground">
                        {parcel.senderId &&
                        typeof parcel.senderId === "object" &&
                        "email" in parcel.senderId
                          ? (parcel.senderId as { email?: string }).email
                          : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No sender information available
                </p>
              )}
            </div>

            {/* Receiver Info */}
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Receiver Information
              </h2>

              {parcel.receiverId ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <User className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-semibold text-foreground">
                        {parcel.receiverId &&
                        typeof parcel.receiverId === "object" &&
                        "name" in parcel.receiverId
                          ? (parcel.receiverId as { name?: string }).name
                          : "Loading..."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold text-foreground">
                        {parcel.receiverId &&
                        typeof parcel.receiverId === "object" &&
                        "email" in parcel.receiverId
                          ? (parcel.receiverId as { email?: string }).email
                          : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No receiver assigned
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <Button className="w-full justify-between">
                  <span>Download Invoice</span>
                  <File className="w-4 h-4" />
                </Button>

                <Button variant="outline" className="w-full justify-between">
                  <span>Share Tracking Link</span>
                  <Navigation className="w-4 h-4" />
                </Button>

                <Button variant="outline" className="w-full justify-between">
                  <span>Contact Support</span>
                  <Mail className="w-4 h-4" />
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-3">
                  Need help with this parcel?
                </p>
                <Button variant="destructive" className="w-full">
                  Report Issue
                </Button>
              </div>
            </div>

            {/* Parcel Summary */}
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Parcel Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Tracking ID</span>
                  <span className="font-mono font-medium">
                    {parcel.trackingId}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Parcel Type</span>
                  <span className="font-medium">{parcel.parcelType}</span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Status Updates</span>
                  <span className="font-medium">
                    {parcel.statusLogs?.length || 0}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Blocked</span>
                  <span
                    className={`font-medium ${
                      parcel.isBlocked ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {parcel.isBlocked ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
