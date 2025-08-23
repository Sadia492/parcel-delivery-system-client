import {
  useGetIncomingParcelsQuery,
  useConfirmDeliveryMutation,
  useGetDeliveryHistoryQuery,
} from "@/redux/features/parcel/parcel.api";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ReceiverDashboard() {
  const { data: incomingParcels, isLoading } =
    useGetIncomingParcelsQuery(undefined);
  const { data: history, isLoading: isHistoryLoading } =
    useGetDeliveryHistoryQuery(undefined);
  const [confirmDelivery] = useConfirmDeliveryMutation();

  const handleConfirm = async (parcelId: string) => {
    try {
      await confirmDelivery({ parcelId }).unwrap();
      toast.success("Delivery confirmed!");
    } catch (err) {
      toast.error((err as any)?.data?.message || "Failed to confirm delivery");
    }
  };

  // Define status colors
  const statusColors: Record<string, string> = {
    REQUESTED: "text-blue-600",
    IN_TRANSIT: "text-yellow-600",
    DELIVERED: "text-green-600",
    CANCELED: "text-red-600",
    BLOCKED: "text-gray-500",
  };

  if (isLoading || isHistoryLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-foreground text-center">
        📥 Receiver Dashboard
      </h1>
      <p className="text-muted-foreground lg:w-1/2 w-full mx-auto text-center">
        Track your incoming parcels, confirm deliveries when they arrive, and
        view your complete delivery history in one place.
      </p>

      <h2 className="text-xl font-bold mb-4">Incoming Parcels</h2>
      {incomingParcels?.data?.length === 0 ? (
        <p>No parcels at the moment.</p>
      ) : (
        <ul className="space-y-2">
          {incomingParcels?.data?.map((parcel: any) => (
            <li
              key={parcel._id}
              className="border p-3 rounded-md flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Tracking ID:</strong> {parcel.trackingId}
                </p>
                <p>
                  <strong>From:</strong> {parcel.fromAddress}
                </p>
                <p>
                  <strong>Type:</strong> {parcel.parcelType}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={statusColors[parcel.status] || "text-gray-700"}
                  >
                    {parcel.status.replace("_", " ")}
                  </span>
                </p>
              </div>
              <Button size="sm" onClick={() => handleConfirm(parcel._id)}>
                Confirm Delivery
              </Button>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-bold mt-8 mb-4">Delivery History</h2>
      {history?.data?.length === 0 ? (
        <p>No delivery history yet.</p>
      ) : (
        <ul className="space-y-2">
          {history?.data?.map((parcel: any) => (
            <li key={parcel._id} className="border p-3 rounded-md">
              <p>
                <strong>Tracking ID:</strong> {parcel.trackingId}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={statusColors[parcel.status] || "text-gray-700"}
                >
                  {parcel.status.replace("_", " ")}
                </span>
              </p>
              <p>
                <strong>Delivered On:</strong>{" "}
                {new Date(parcel.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
