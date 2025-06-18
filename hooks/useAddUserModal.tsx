
import { create } from 'zustand';

interface AddUserModalStore {
  isOpen: boolean;
  openAddUser: () => void;
  closeAddUser: () => void;
}

export const useAddUserModal = create<AddUserModalStore>((set) => ({
  isOpen: false,
  openAddUser: () => set({ isOpen: true }),
  closeAddUser: () => set({ isOpen: false }),
}));
