// components/coordinator/AssignWorkshopDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAssignWorkshopModal } from "@/hooks/useAssignWorkshopModal";

export const AssignWorkshopDialog = () => {
  const {
    isOpen,
    closeAssignWorkshop,
    workshops,
    selectedWorkshop,
    setSelectedWorkshop,
    assignWorkshop,
    loading,
  } = useAssignWorkshopModal();

  return (
    <Dialog open={isOpen} onOpenChange={closeAssignWorkshop}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Workshop</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Workshop
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  disabled={loading}
                >
                  {selectedWorkshop
                    ? selectedWorkshop.title
                    : "Choose a workshop"}
                  <span>▼</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[350px]">
                {workshops.length > 0 ? (
                  workshops.map((workshop) => (
                    <DropdownMenuItem
                      key={workshop.id}
                      onSelect={() => setSelectedWorkshop(workshop)}
                    >
                      {workshop.title} ({workshop.venue},{" "}
                      {new Date(workshop.schedule).toLocaleDateString()})
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>
                    {loading ? "Loading workshops..." : "No workshops available"}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={closeAssignWorkshop}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={assignWorkshop}
              disabled={loading || !selectedWorkshop}
            >
              {loading ? "Assigning..." : "Assign"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};