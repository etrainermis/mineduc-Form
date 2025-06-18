
import { create } from 'zustand';

interface ViewUserModalStore {
  isOpen: boolean;
  userId: string | null;
  openViewUser: (userId: string) => void;
  closeViewUser: () => void;
}

export const useViewUserModal = create<ViewUserModalStore>((set) => ({
  isOpen: false,
  userId: null,
  openViewUser: (userId: string) => set({ isOpen: true, userId }),
  closeViewUser: () => set({ isOpen: false, userId: null }),
}));