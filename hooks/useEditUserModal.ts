import { create } from 'zustand';
import { User } from '../components/users/UserTable';

type EditUserModalStore = {
  isOpen: boolean;
  user: User | null;
  openEditUser: (user: User) => void;
  closeEditUser: () => void;
};

export const useEditUserModal = create<EditUserModalStore>((set) => ({
  isOpen: false,
  user: null,
  openEditUser: (user) => set({ isOpen: true, user }),
  closeEditUser: () => set({ isOpen: false, user: null }),
}));
