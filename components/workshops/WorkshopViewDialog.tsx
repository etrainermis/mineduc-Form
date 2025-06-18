import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Workshop } from "@/types";
  
  interface WorkshopViewDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    workshop: Workshop;
  }
  
  export function WorkshopViewDialog({
    open,
    setOpen,
    workshop,
  }: WorkshopViewDialogProps) {
    // const getStatusColor = (status: string) => {
    //   switch (status) {
    //     case "upcoming":
    //       return "bg-blue-100 text-blue-800";
    //     case "ongoing":
    //       return "bg-green-100 text-green-800";
    //     case "completed":
    //       return "bg-gray-100 text-gray-800";
    //     default:
    //       return "bg-gray-100 text-gray-800";
    //   }
    // };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Workshop Details</DialogTitle>
            <DialogDescription>
              View all details about this workshop.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Title</Label>
              <div className="col-span-3 font-medium">{workshop.title}</div>
            </div>
            {/* Add all other workshop details fields */}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }