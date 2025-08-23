import { useGetTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
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

    // Adjust based on how RTK Query returns data
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

  return (
    <section className="w-11/12 max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
        Track Your Parcel
      </h1>

      <form onSubmit={handleTrack} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 bg-background text-foreground"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold"
        >
          Track Parcel
        </button>
      </form>

      {parcel ? (
        <div className="border rounded-lg p-6 bg-background text-foreground space-y-2">
          <p>
            <strong>Tracking ID:</strong> {parcel?.trackingId}
          </p>
          <p>
            <strong>Sender:</strong> {parcel?.senderId?.name} (
            {parcel?.senderId?.email})
          </p>
          <p>
            <strong>Receiver:</strong> {parcel?.receiverId?.name} (
            {parcel?.receiverId?.email})
          </p>
          <p>
            <strong>Type:</strong> {parcel?.parcelType}
          </p>
          <p>
            <strong>Weight:</strong> {parcel?.weight} kg
          </p>
          <p>
            <strong>Fee:</strong> ${parcel?.fee}
          </p>
          <p>
            <strong>Status:</strong> {parcel?.status}
          </p>
          <p>
            <strong>From:</strong> {parcel?.fromAddress}
          </p>
          <p>
            <strong>To:</strong> {parcel?.toAddress}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(parcel?.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(parcel?.updatedAt).toLocaleString()}
          </p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Status Logs:</h2>
            <ul className="list-disc list-inside space-y-1">
              {parcel.statusLogs.map((log, idx) => (
                <li key={idx}>
                  <strong>{log?.status}</strong> -{" "}
                  {new Date(log?.timestamp).toLocaleString()}
                  {log.note && <span> ({log?.note})</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
