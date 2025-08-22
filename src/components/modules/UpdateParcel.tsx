import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export enum ParcelStatus {
  REQUESTED = "REQUESTED",
  APPROVED = "APPROVED",
  DISPATCHED = "DISPATCHED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
  BLOCKED = "BLOCKED",
  UNBLOCKED = "UNBLOCKED",
}

interface Props {
  onUpdateStatus: (status: ParcelStatus) => void;
  currentStatus?: ParcelStatus;
}

export function UpdateParcel({ onUpdateStatus, currentStatus }: Props) {
  const [status, setStatus] = useState<ParcelStatus | "">(
    currentStatus &&
      currentStatus !== ParcelStatus.BLOCKED &&
      currentStatus !== ParcelStatus.UNBLOCKED
      ? currentStatus
      : ""
  );

  const [open, setOpen] = useState(false); // control dialog open state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status) {
      onUpdateStatus(status as ParcelStatus);
      setOpen(false); // close dialog automatically
    }
  };

  // Filter out BLOCKED and UNBLOCKED
  const statusOptions = Object.values(ParcelStatus).filter(
    (s) => s !== ParcelStatus.BLOCKED && s !== ParcelStatus.UNBLOCKED
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update Status</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Update Parcel Status</DialogTitle>
            <DialogDescription>
              Select a new status for the parcel and save the changes.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <label className="text-sm font-medium text-foreground">
              Parcel Status
            </label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as ParcelStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0) + s.slice(1).toLowerCase().replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!status}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
