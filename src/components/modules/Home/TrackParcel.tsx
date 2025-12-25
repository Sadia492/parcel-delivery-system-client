import { useGetTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
import { MapPin, Package, CheckCircle, Truck, Check, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface StatusLog {
  status: string;
  timestamp: string;
  updatedBy: {
    $oid?: string;
    name?: string;
  };
  note?: string;
}

interface Parcel {
  _id: string;
  trackingId: string;
  senderId: User;
  receiverId: User;
  parcelType: string;
  weight: number;
  fee: number;
  status: string;
  statusLogs: StatusLog[];
  isBlocked: boolean;
  isCanceled: boolean;
  fromAddress: string;
  toAddress: string;
  createdAt: string;
  updatedAt: string;
}

// Define the status order for normal delivery flow
const normalStatusConfig = [
  {
    status: "REQUESTED",
    label: "Order Requested",
    icon: Package,
    description: "Parcel request submitted",
  },
  {
    status: "APPROVED",
    label: "Approved",
    icon: CheckCircle,
    description: "Admin approved the request",
  },
  {
    status: "DISPATCHED",
    label: "Dispatched",
    icon: Truck,
    description: "Parcel collected for delivery",
  },
  {
    status: "IN_TRANSIT",
    label: "In Transit",
    icon: Truck,
    description: "Parcel on the way",
  },
  {
    status: "DELIVERED",
    label: "Delivered",
    icon: Check,
    description: "Successfully delivered",
  },
];

// Canceled status is special - it can happen at any point
const canceledStatusConfig = {
  status: "CANCELED",
  label: "Cancelled",
  icon: X,
  description: "Delivery cancelled",
};

export default function TrackParcel() {
  const [trackingId, setTrackingId] = useState("");
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const { data: parcelsData, isLoading } = useGetTrackParcelQuery(undefined);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }

    if (!parcelsData) {
      toast.error("No parcel data available");
      return;
    }

    // Check how data is structured - could be parcelsData.data or just parcelsData
    const parcelList = parcelsData.data || parcelsData;

    if (!Array.isArray(parcelList) || parcelList.length === 0) {
      toast.error("No parcels available");
      return;
    }

    const matchedParcel = parcelList.find(
      (p: any) =>
        p.trackingId?.trim().toLowerCase() === trackingId.trim().toLowerCase()
    );

    if (matchedParcel) {
      setParcel(matchedParcel);
      toast.success("Parcel found!");
    } else {
      setParcel(null);
      toast.error("Parcel not found!");
    }
  };

  // Get status steps based on actual parcel status
  const getStatusSteps = () => {
    if (!parcel) return [];

    const currentStatus = parcel.status;

    // If parcel is canceled, we need to show a different logic
    if (currentStatus === "CANCELED") {
      // Find the last actual status before cancelation from statusLogs
      const nonCanceledLogs =
        parcel.statusLogs?.filter((log) => log.status !== "CANCELED") || [];
      const lastActualStatus =
        nonCanceledLogs[nonCanceledLogs.length - 1]?.status || "REQUESTED";

      // Find index of last actual status in normal flow
      const statusOrder = normalStatusConfig.map((s) => s.status);
      const lastStatusIndex = statusOrder.indexOf(lastActualStatus);

      // Show only statuses up to the last actual status, then show canceled
      const steps = normalStatusConfig
        .slice(0, Math.max(0, lastStatusIndex + 1))
        .map((config) => {
          const isActive = true; // All shown steps are active since parcel reached them
          const statusLog = parcel.statusLogs?.find(
            (log) => log.status === config.status
          );
          const timestamp = statusLog?.timestamp
            ? new Date(statusLog.timestamp).toLocaleString()
            : "Completed";

          return {
            ...config,
            active: isActive,
            current: false,
            timestamp,
            statusLog,
          };
        });

      // Add canceled status at the end
      const canceledLog = parcel.statusLogs?.find(
        (log) => log.status === "CANCELED"
      );
      steps.push({
        ...canceledStatusConfig,
        active: true,
        current: true,
        timestamp: canceledLog?.timestamp
          ? new Date(canceledLog.timestamp).toLocaleString()
          : "Cancelled",
        statusLog: canceledLog,
      });

      return steps;
    }

    // For non-canceled parcels, use normal flow
    const statusOrder = normalStatusConfig.map((s) => s.status);
    const currentStatusIndex = statusOrder.indexOf(currentStatus);

    return normalStatusConfig.map((config, index) => {
      const isActive = index <= currentStatusIndex;
      const statusLog = parcel.statusLogs?.find(
        (log) => log.status === config.status
      );
      const timestamp = statusLog?.timestamp
        ? new Date(statusLog.timestamp).toLocaleString()
        : isActive
        ? "Completed"
        : "Pending";

      return {
        ...config,
        active: isActive,
        current: index === currentStatusIndex,
        timestamp,
        statusLog,
      };
    });
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 py-16">
        <div className="w-11/12 mx-auto">
          <div className="mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Track Your Parcel
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Enter your tracking ID to get real-time updates on your delivery
              </p>
            </div>

            <form onSubmit={handleTrack}>
              <div className="bg-card rounded-2xl border p-8 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
                      <input
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        placeholder="Enter Tracking ID (e.g., TRK-20250729-5499)"
                        className="w-full pl-12 pr-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Find your tracking ID in your confirmation email or
                      dashboard
                    </p>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Loading..." : "Track Parcel"}
                    </button>
                  </div>
                </div>

                {/* Show loading state */}
                {isLoading && (
                  <div className="mt-8 text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">
                      Loading parcel data...
                    </p>
                  </div>
                )}

                {/* Show actual parcel tracking timeline when found */}
                {parcel && (
                  <div className="mt-8 pt-8 border-t">
                    {/* Parcel Summary */}
                    <div className="mb-8 p-4 bg-primary/5 rounded-xl">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="font-bold text-foreground text-xl mb-1">
                            Parcel Details
                          </h3>
                          <p className="text-muted-foreground">
                            Tracking ID:{" "}
                            <span className="font-semibold text-foreground">
                              {parcel.trackingId}
                            </span>
                          </p>
                        </div>
                        <div
                          className={`px-4 py-2 rounded-full font-semibold ${
                            parcel.status === "DELIVERED"
                              ? "bg-green-100 text-green-800"
                              : parcel.status === "CANCELED"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {parcel.status.replace("_", " ")}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="p-3 bg-card rounded-lg">
                          <p className="text-sm text-muted-foreground">From</p>
                          <p className="font-semibold">{parcel.fromAddress}</p>
                        </div>
                        <div className="p-3 bg-card rounded-lg">
                          <p className="text-sm text-muted-foreground">To</p>
                          <p className="font-semibold">{parcel.toAddress}</p>
                        </div>
                        <div className="p-3 bg-card rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Type & Weight
                          </p>
                          <p className="font-semibold">
                            {parcel.parcelType} • {parcel.weight}kg
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tracking Timeline */}
                    <h3 className="font-semibold text-foreground mb-6 text-xl">
                      Delivery Journey
                    </h3>
                    <div className="relative">
                      {/* Vertical line - only show if there are multiple steps */}
                      {getStatusSteps().length > 1 && (
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
                      )}

                      <div className="space-y-8">
                        {getStatusSteps().map((step, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 relative"
                          >
                            <div
                              className={`z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                step.active
                                  ? step.current
                                    ? step.status === "CANCELED"
                                      ? "bg-red-500 text-white ring-4 ring-red-500/20"
                                      : "bg-primary text-primary-foreground ring-4 ring-primary/20"
                                    : step.status === "CANCELED"
                                    ? "bg-red-500 text-white"
                                    : "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {typeof step.icon === "string" ? (
                                <span className="font-bold">{step.icon}</span>
                              ) : (
                                <step.icon className="size-6" />
                              )}
                            </div>
                            <div className="flex-1 pb-8">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <div>
                                  <h4 className="font-semibold text-foreground text-lg">
                                    {step.label}
                                  </h4>
                                  <p className="text-muted-foreground text-sm">
                                    {step.description}
                                  </p>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {step.timestamp}
                                </div>
                              </div>
                              {step.statusLog?.note && (
                                <div className="mt-2 p-3 bg-muted rounded-lg">
                                  <p className="text-sm text-foreground/80">
                                    <span className="font-medium">Note:</span>{" "}
                                    {step.statusLog.note}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Logs Details */}
                    {parcel.statusLogs && parcel.statusLogs.length > 0 && (
                      <div className="mt-12 pt-8 border-t">
                        <h3 className="font-semibold text-foreground mb-4 text-xl">
                          Detailed Status History
                        </h3>
                        <div className="space-y-3">
                          {[...parcel.statusLogs]
                            .sort(
                              (a, b) =>
                                new Date(b.timestamp).getTime() -
                                new Date(a.timestamp).getTime()
                            )
                            .map((log, index) => (
                              <div
                                key={index}
                                className="p-4 bg-card rounded-lg border"
                              >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        log.status === "DELIVERED"
                                          ? "bg-green-100 text-green-800"
                                          : log.status === "CANCELED"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-blue-100 text-blue-800"
                                      }`}
                                    >
                                      {log.status.replace("_", " ")}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      by {log.updatedBy?.name || "System"}
                                    </span>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {formatDate(log.timestamp)}
                                  </div>
                                </div>
                                {log.note && (
                                  <p className="text-foreground/80 mt-2">
                                    {log.note}
                                  </p>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Show demo when no parcel is found */}
                {!parcel && !isLoading && (
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="font-semibold text-foreground mb-4">
                      Tracking Demo
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          status: "Order Requested",
                          time: "Today, 9:00 AM",
                          active: true,
                          icon: Package,
                        },
                        {
                          status: "Approved",
                          time: "Today, 10:30 AM",
                          active: true,
                          icon: CheckCircle,
                        },
                        {
                          status: "Dispatched",
                          time: "Estimated 2:00 PM",
                          active: false,
                          icon: Truck,
                        },
                        {
                          status: "In Transit",
                          time: "Estimated 3:00 PM",
                          active: false,
                          icon: Truck,
                        },
                        {
                          status: "Delivered",
                          time: "Estimated 6:00 PM",
                          active: false,
                          icon: Check,
                        },
                      ].map((step, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              step.active
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {typeof step.icon === "string" ? (
                              <span className="font-bold">{step.icon}</span>
                            ) : (
                              <step.icon className="size-6" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-lg">
                              {step.status}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {step.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
