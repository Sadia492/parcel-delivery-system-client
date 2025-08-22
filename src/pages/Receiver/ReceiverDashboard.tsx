import {
  useGetIncomingParcelsQuery,
  useConfirmDeliveryMutation,
  useGetDeliveryHistoryQuery,
} from "@/redux/features/parcel/parcel.api";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function ReceiverDashboard() {
  const { data: incomingParcels, isLoading } =
    useGetIncomingParcelsQuery(undefined);
  const { data: history } = useGetDeliveryHistoryQuery(undefined);
  const [confirmDelivery] = useConfirmDeliveryMutation();

  const handleConfirm = async (parcelId: string) => {
    try {
      await confirmDelivery({ parcelId }).unwrap();
      toast.success("Delivery confirmed!");
    } catch (err) {
      toast.error((err as any)?.data?.message || "Failed to confirm delivery");
    }
  };

  if (isLoading) return <p>Loading parcels...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Incoming Parcels</h2>
      {incomingParcels?.length === 0 ? (
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
                  <strong>Status:</strong> {parcel.status}
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
      {history?.length === 0 ? (
        <p>No delivery history yet.</p>
      ) : (
        <ul className="space-y-2">
          {history?.data?.map((parcel: any) => (
            <li key={parcel._id} className="border p-3 rounded-md">
              <p>
                <strong>Tracking ID:</strong> {parcel.trackingId}
              </p>
              <p>
                <strong>Status:</strong> {parcel.status}
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
