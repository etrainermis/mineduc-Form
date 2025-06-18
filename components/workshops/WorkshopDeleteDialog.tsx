import { Workshop } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WorkshopDeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  workshop: Workshop | null;
  onConfirm: () => void;
}

export function WorkshopDeleteDialog({
  open,
  setOpen,
  workshop,
  onConfirm,
}: WorkshopDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Workshop</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the workshop &quot{workshop?.title}&quot? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}