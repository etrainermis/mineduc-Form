"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getToken } from "@/utils/token";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BACKEND_URL } from "@/lib/config";

interface Organizer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Add User interface that extends Organizer and includes roles
interface User extends Organizer {
  roles: string[];
}

interface AssignOrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshopId: string;
  onSuccess: () => void;
}

export function AssignOrganizerModal({
  isOpen,
  onClose,
  workshopId,
  onSuccess,
}: AssignOrganizerModalProps) {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [selectedOrganizer, setSelectedOrganizer] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchOrganizers();
    }
  }, [isOpen]);

  const fetchOrganizers = async () => {
    try {
      const token = getToken();

      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(`${BACKEND_URL}/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = "/login";
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Filter for EVENT_ORGANIZER role using the proper User type
      const eventOrganizers = data.filter((user: User) =>
        user.roles.includes("EVENT_ORGANIZER")
      );
      setOrganizers(eventOrganizers);
    } catch (error) {
      console.error("Error fetching organizers:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch organizers"
      );
    }
  };

  const handleSubmit = async () => {
    if (!selectedOrganizer) {
      toast.error("Please select an organizer");
      return;
    }

    try {
      setLoading(true);
      const token = getToken();

      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        `${BACKEND_URL}/workshops/${workshopId}/assign-organizer/${selectedOrganizer}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = "/login";
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Organizer assigned successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error assigning organizer:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to assign organizer"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Organizer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select Organizer</Label>
            <Select
              value={selectedOrganizer}
              onValueChange={setSelectedOrganizer}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an organizer" />
              </SelectTrigger>
              <SelectContent>
                {organizers.map((organizer) => (
                  <SelectItem key={organizer.id} value={organizer.id}>
                    {organizer.firstName} {organizer.lastName} -{" "}
                    {organizer.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Assigning..." : "Assign Organizer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
