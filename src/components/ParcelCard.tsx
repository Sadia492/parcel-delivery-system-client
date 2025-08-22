import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { UpdateParcel, ParcelStatus } from "./modules/UpdateParcel";
import { toast } from "react-hot-toast";
import {
  useBlockParcelMutation,
  useCancelParcelMutation,
  useUpdateParcelStatusMutation,
} from "@/redux/features/parcel/parcel.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

type Parcel = {
  _id: string;
  trackingId: string;
  senderId: string;
  receiverId: string;
  parcelType: string;
  weight: number;
  fee: number;
  status: string;
  isBlocked: boolean;
  isCanceled: boolean;
  fromAddress: string;
  toAddress: string;
  createdAt: string;
  updatedAt: string;
};

interface Props {
  parcel: Parcel;
  onView?: (id: string) => void;
}

export default function ParcelCard({ parcel }: Props) {
  const [updateParcelStatus] = useUpdateParcelStatusMutation();
  const [blockParcel] = useBlockParcelMutation();
  const [cancelParcel] = useCancelParcelMutation();
  const { data } = useUserInfoQuery(undefined);

  const handleUpdateStatus = async (status: ParcelStatus) => {
    try {
      await updateParcelStatus({ parcelId: parcel._id, status }).unwrap();
      toast.success(`Parcel status updated to ${status}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const handleBlockUnblock = async () => {
    try {
      console.log({
        parcelId: parcel._id,
        block: !parcel.isBlocked, // toggle block status
        note: !parcel.isBlocked ? "Blocked by admin" : "Unblocked by admin",
      });
      await blockParcel({
        parcelId: parcel._id,
        block: !parcel.isBlocked, // toggle block status
        note: !parcel.isBlocked ? "Blocked by admin" : "Unblocked by admin",
      }).unwrap();

      toast.success(!parcel.isBlocked ? "Parcel blocked" : "Parcel unblocked");
    } catch (err) {
      toast.error("Failed to update parcel block status");
      console.error(err);
    }
  };
  const handleCancelParcel = async () => {
    try {
      await cancelParcel({ parcelId: parcel._id }).unwrap();
      toast.success("Parcel canceled successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel parcel");
      console.error(error);
    }
  };

  return (
    <div className="rounded-md border bg-background shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col gap-2">
        {/* Parcel info */}
        <h3 className="text-lg font-medium text-foreground mb-1">
          Tracking ID: {parcel.trackingId}
        </h3>
        <p className="text-sm text-muted-foreground">
          From: {parcel.fromAddress}
        </p>
        <p className="text-sm text-muted-foreground">To: {parcel.toAddress}</p>
        <p className="text-sm text-muted-foreground">
          Type: {parcel.parcelType} | Weight: {parcel.weight} kg | Fee: $
          {parcel.fee}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Created: {format(new Date(parcel.createdAt), "dd/MM/yyyy, HH:mm")}
        </p>
        <p className="text-sm text-muted-foreground">
          Updated: {format(new Date(parcel.updatedAt), "dd/MM/yyyy, HH:mm")}
        </p>

        {/* Status badge */}
        <Badge
          className={`mt-2 ${
            parcel.isBlocked
              ? "bg-red-500 text-white"
              : parcel.status === "DELIVERED"
              ? "bg-green-500 text-white"
              : "bg-yellow-500 text-foreground"
          }`}
        >
          {parcel.isBlocked
            ? "Blocked"
            : parcel.status.charAt(0) + parcel.status.slice(1).toLowerCase()}
        </Badge>

        {/* Action buttons */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {data?.data?.role === "admin" ? (
            <>
              {/* Update Status Dialog */}
              <UpdateParcel
                currentStatus={parcel.status as ParcelStatus}
                onUpdateStatus={handleUpdateStatus} // <-- directly linked to RTK mutation
              />

              {/* Block/Unblock */}
              <Button
                size="sm"
                variant={parcel.isBlocked ? "outline" : "destructive"}
                onClick={handleBlockUnblock}
              >
                {parcel.isBlocked ? "Unblock" : "Block"}
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleCancelParcel}
                disabled={parcel.isCanceled}
              >
                Cancel Parcel
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
