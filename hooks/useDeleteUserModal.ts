
import { create } from 'zustand';
import { User } from '../components/users/UserTable';

type DeleteUserModalStore = {
  isOpen: boolean;
  user: User | null;
  openDeleteUser: (user: User) => void;
  closeDeleteUser: () => void;
};

export const useDeleteUserModal = create<DeleteUserModalStore>((set) => ({
  isOpen: false,
  user: null,
  openDeleteUser: (user) => set({ isOpen: true, user }),
  closeDeleteUser: () => set({ isOpen: false, user: null }),
}));
