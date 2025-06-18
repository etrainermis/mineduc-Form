// hooks/useAssignWorkshopModal.ts
import { create } from "zustand";
import { toast } from "sonner";
import { getToken } from "@/utils/token";
import { BACKEND_URL } from "@/lib/config";

interface Workshop {
  id: string;
  title: string;
  venue: string;
  schedule: string;
  capacity: number;
}

interface AssignWorkshopModalStore {
  isOpen: boolean;
  userId: string | null;
  workshops: Workshop[];
  selectedWorkshop: Workshop | null;
  loading: boolean;
  openAssignWorkshop: (userId: string) => void;
  closeAssignWorkshop: () => void;
  fetchWorkshops: () => Promise<void>;
  assignWorkshop: () => Promise<void>;
  setSelectedWorkshop: (workshop: Workshop | null) => void;
}

export const useAssignWorkshopModal = create<AssignWorkshopModalStore>((set, get) => ({
  isOpen: false,
  userId: null,
  workshops: [],
  selectedWorkshop: null,
  loading: false,

  openAssignWorkshop: (userId: string) => {
    set({ isOpen: true, userId });
    get().fetchWorkshops(); // Fetch workshops when dialog opens
  },

  closeAssignWorkshop: () => {
    set({ isOpen: false, userId: null, selectedWorkshop: null, workshops: [] });
  },

  fetchWorkshops: async () => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Your session has expired. Please login again.", {
          description: "Redirecting to login page...",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        return;
      }

      set({ loading: true });
      const response = await fetch(`${BACKEND_URL}/workshops`, {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.", {
            description: "Redirecting to login page...",
          });
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          return;
        }
        throw new Error(`Failed to fetch workshops: ${response.status}`);
      }

      const data: Workshop[] = await response.json();
      set({ workshops: data }); // Assumes API returns only unassigned workshops
    } catch (error) {
      toast.error("Failed to load workshops", {
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
      });
    } finally {
      set({ loading: false });
    }
  },

  assignWorkshop: async () => {
    const { selectedWorkshop, userId } = get();
    if (!selectedWorkshop || !userId) {
      toast.error("No workshop selected", {
        description: "Please select a workshop to assign.",
      });
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        toast.error("Your session has expired. Please login again.", {
          description: "Redirecting to login page...",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        return;
      }

      set({ loading: true });
      const response = await fetch(
        `${BACKEND_URL}/workshops/${selectedWorkshop.id}/assign-organizer/${userId}`,
        {
          method: "PUT",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        }
      );

 

      toast.success("Workshop assigned successfully", {
        description: `The workshop "${selectedWorkshop.title}" has been assigned to the organizer.`,
      });
      set({ selectedWorkshop: null, isOpen: false }); // Close dialog
      get().fetchWorkshops(); // Refresh workshops to remove assigned ones
    } catch (error) {
      toast.error("Failed to assign workshop", {
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
      });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedWorkshop: (workshop: Workshop | null) => {
    set({ selectedWorkshop: workshop });
  },
}));