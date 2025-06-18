"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Workshop } from "@/components/workshops/WorkshopTable";

interface ViewWorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshop: Workshop;
}

export function ViewWorkshopModal({ isOpen, onClose, workshop }: ViewWorkshopModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Workshop Details</DialogTitle>
          <DialogDescription>
            View the details of the workshop below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
            <p className="mt-1 text-sm">{workshop.title}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Venue</h3>
            <p className="mt-1 text-sm">{workshop.venue}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Short Description</h3>
            <p className="mt-1 text-sm">{workshop.short_description || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Schedule</h3>
            <p className="mt-1 text-sm">
              {new Date(workshop.schedule).toLocaleDateString()} at {new Date(workshop.schedule).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Capacity</h3>
            <p className="mt-1 text-sm">{workshop.capacity}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
            <p className="mt-1 text-sm">
              {new Date(workshop.createdAt).toLocaleDateString()} at {new Date(workshop.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
            <p className="mt-1 text-sm">
              {new Date(workshop.updatedAt).toLocaleDateString()} at {new Date(workshop.updatedAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 