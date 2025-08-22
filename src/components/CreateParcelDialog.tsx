import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import { useGetReceiversQuery } from "@/redux/features/auth/auth.api";
import { useState } from "react";

// Zod schema
const parcelSchema = z.object({
  receiverId: z.string().min(1, "Receiver is required"),
  fromAddress: z.string().min(1, "From Address is required"),
  toAddress: z.string().min(1, "To Address is required"),
  parcelType: z.enum(["PACKAGE", "DOCUMENT"]),
  weight: z.number().positive("Weight must be greater than 0"),
  note: z.string().optional(),
});

type ParcelFormData = z.infer<typeof parcelSchema>;

export function CreateParcelDialog() {
  const [createParcel] = useCreateParcelMutation();
  const { data: receivers } = useGetReceiversQuery(undefined);
  const [open, setOpen] = useState(false); // control dialog open state
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ParcelFormData>({
    resolver: zodResolver(parcelSchema),
  });

  const onSubmit = async (data: ParcelFormData) => {
    try {
      await createParcel(data).unwrap();
      toast.success("Parcel created successfully!");
      reset();
      setOpen(false); // close dialog automatically
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create parcel");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Parcel</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Parcel</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new parcel.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Receiver Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="receiverId">Receiver</Label>
              <Controller
                name="receiverId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""} // ensure default value is string
                    onValueChange={field.onChange} // update RHF form
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Receiver" />
                    </SelectTrigger>
                    <SelectContent>
                      {receivers?.data?.map((receiver: any) => (
                        <SelectItem key={receiver._id} value={receiver._id}>
                          {receiver.name} ({receiver.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.receiverId && (
                <p className="text-red-500 text-sm">
                  {errors.receiverId.message}
                </p>
              )}
            </div>

            {/* From Address */}
            <div className="grid gap-2">
              <Label htmlFor="fromAddress">From Address</Label>
              <Input id="fromAddress" {...register("fromAddress")} />
              {errors.fromAddress && (
                <p className="text-red-500 text-sm">
                  {errors.fromAddress.message}
                </p>
              )}
            </div>

            {/* To Address */}
            <div className="grid gap-2">
              <Label htmlFor="toAddress">To Address</Label>
              <Input id="toAddress" {...register("toAddress")} />
              {errors.toAddress && (
                <p className="text-red-500 text-sm">
                  {errors.toAddress.message}
                </p>
              )}
            </div>

            {/* Parcel Type */}
            <div className="grid gap-2">
              <Label htmlFor="parcelType">Parcel Type</Label>
              <Controller
                name="parcelType"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""} // default to empty string
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Parcel Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PACKAGE">Package</SelectItem>
                      <SelectItem value="DOCUMENT">Document</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.parcelType && (
                <p className="text-red-500 text-sm">
                  {errors.parcelType.message}
                </p>
              )}
            </div>

            {/* Weight */}
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.01"
                {...register("weight", { valueAsNumber: true })}
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight.message}</p>
              )}
            </div>

            {/* Note */}
            <div className="grid gap-2">
              <Label htmlFor="note">Note</Label>
              <Input id="note" {...register("note")} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create Parcel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
