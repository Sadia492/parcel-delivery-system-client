import { useGetTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Package,
  Truck,
  CheckCircle,
  MapPin,
  Calendar,
  User,
  DollarSign,
  Scale,
  ChevronDown,
  Clock,
} from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface StatusLog {
  status: string;
  timestamp: string;
  updatedBy: string;
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

export default function TrackParcel() {
  const [trackingId, setTrackingId] = useState("");
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const { data: parcels } = useGetTrackParcelQuery(undefined);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId) {
      toast.error("Please enter a tracking ID");
      return;
    }

    if (!parcels || parcels.length === 0) {
      toast.error("No parcels available");
      return;
    }

    const parcelList = Array.isArray(parcels) ? parcels : parcels?.data;
    const matchedParcel = parcelList?.find(
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

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800 border-green-300";
      case "CANCELED":
        return "bg-red-100 text-red-800 border-red-300";
      case "IN_TRANSIT":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "DISPATCHED":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Track Your Parcel</h1>
          <p className="text-lg opacity-90">
            Enter your tracking ID to get real-time updates on your delivery
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form
            onSubmit={handleTrack}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="text"
                  placeholder="Enter Tracking ID (e.g., TRK-20250729-5499)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 ml-1">
                Find your tracking ID in your confirmation email or dashboard
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Track Parcel
              </button>
            </div>
          </form>
        </div>

        {/* Parcel Details Section */}
        {parcel && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Parcel Card */}
            <div className="lg:col-span-2 space-y-8">
              {/* Parcel Overview Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      Parcel Details
                    </h2>
                    <p className="text-gray-600">
                      Tracking ID:{" "}
                      <span className="font-semibold text-gray-900">
                        {parcel.trackingId}
                      </span>
                    </p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full font-semibold border ${getStatusColor(
                      parcel.status
                    )}`}
                  >
                    {parcel.status.replace("_", " ")}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sender & Receiver Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <User className="size-5" />
                        Sender Information
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-900">
                          {parcel.senderId?.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {parcel.senderId?.email}
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                          {parcel.fromAddress}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <User className="size-5" />
                        Receiver Information
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-900">
                          {parcel.receiverId?.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {parcel.receiverId?.email}
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                          {parcel.toAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Parcel Specifications */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="size-5 text-gray-600" />
                          <h3 className="font-semibold text-gray-700">Type</h3>
                        </div>
                        <p className="text-gray-900 font-medium">
                          {parcel.parcelType}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Scale className="size-5 text-gray-600" />
                          <h3 className="font-semibold text-gray-700">
                            Weight
                          </h3>
                        </div>
                        <p className="text-gray-900 font-medium">
                          {parcel.weight} kg
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="size-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-700">
                          Delivery Fee
                        </h3>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        ${parcel.fee}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="size-5 text-gray-600" />
                          <h3 className="font-semibold text-gray-700">
                            Created
                          </h3>
                        </div>
                        <p className="text-gray-900 text-sm">
                          {new Date(parcel.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="size-5 text-gray-600" />
                          <h3 className="font-semibold text-gray-700">
                            Last Updated
                          </h3>
                        </div>
                        <p className="text-gray-900 text-sm">
                          {new Date(parcel.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Logs Accordion */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion("statusLogs")}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Truck className="size-6 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Delivery Journey
                      </h3>
                      <p className="text-gray-600">
                        View detailed status history
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`size-5 text-gray-500 transition-transform ${
                      activeAccordion === "statusLogs" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeAccordion === "statusLogs" && (
                  <div className="p-6 border-t">
                    <div className="space-y-4">
                      {parcel.statusLogs.map((log, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0"
                        >
                          <div
                            className={`p-2 rounded-full ${
                              log.status === "DELIVERED"
                                ? "bg-green-100"
                                : log.status === "CANCELED"
                                ? "bg-red-100"
                                : log.status === "DISPATCHED"
                                ? "bg-blue-100"
                                : "bg-gray-100"
                            }`}
                          >
                            {log.status === "DELIVERED" ? (
                              <CheckCircle className="size-5 text-green-600" />
                            ) : log.status === "DISPATCHED" ? (
                              <Truck className="size-5 text-blue-600" />
                            ) : (
                              <Package className="size-5 text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {log.status}
                                </h4>
                                <p className="text-gray-600 text-sm">
                                  {new Date(log.timestamp).toLocaleString()}
                                </p>
                              </div>
                              <div className="text-sm text-gray-500">
                                Updated by: {log.updatedBy}
                              </div>
                            </div>
                            {log.note && (
                              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                <p className="text-gray-700 text-sm">
                                  {log.note}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Sidebar */}
            <div className="space-y-8">
              {/* Delivery Timeline */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="size-6 text-primary" />
                  Delivery Timeline
                </h3>
                <div className="relative pl-8">
                  {/* Vertical line */}
                  <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  {parcel.statusLogs.slice(0, 5).map((log, idx) => (
                    <div key={idx} className="relative mb-6 last:mb-0">
                      <div
                        className={`absolute -left-10 top-1 w-6 h-6 rounded-full border-4 border-white ${
                          log.status === "DELIVERED"
                            ? "bg-green-500"
                            : log.status === "CANCELED"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                      ></div>
                      <div className="ml-2">
                        <h4 className="font-semibold text-gray-900">
                          {log.status}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </p>
                        {log.note && (
                          <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                            {log.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status Updates</span>
                    <span className="font-bold text-gray-900">
                      {parcel.statusLogs.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Parcel Type</span>
                    <span className="font-bold text-gray-900">
                      {parcel.parcelType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Distance</span>
                    <span className="font-bold text-gray-900">—</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Delivery</span>
                    <span className="font-bold text-gray-900">
                      Calculating...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!parcel && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Package className="size-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Parcel Selected
            </h3>
            <p className="text-gray-600 mb-6">
              Enter a tracking ID above to view parcel details and track its
              journey
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="p-4 border rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <MapPin className="size-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Enter Tracking ID
                </h4>
                <p className="text-gray-600 text-sm">
                  Use the form above to search
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="p-2 bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="size-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  View Details
                </h4>
                <p className="text-gray-600 text-sm">
                  See complete parcel information
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="p-2 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Truck className="size-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Track Journey
                </h4>
                <p className="text-gray-600 text-sm">
                  Follow your parcel's progress
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
