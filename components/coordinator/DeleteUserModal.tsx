"use client"
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { create } from 'zustand';
import { users } from '@/data/userData';
import { useToast } from '@/hooks/use-toast';

interface DeleteUserModalStore {
  isOpen: boolean;
  userId: string | null;
  openDeleteUser: (userId: string) => void;
  closeDeleteUser: () => void;
}

export const useDeleteUserModal = create<DeleteUserModalStore>((set) => ({
  isOpen: false,
  userId: null,
  openDeleteUser: (userId: string) => set({ isOpen: true, userId }),
  closeDeleteUser: () => set({ isOpen: false, userId: null }),
}));

export const DeleteUserModal = () => {
  const { isOpen, userId, closeDeleteUser } = useDeleteUserModal();
  const { toast } = useToast();
  
  const user = users.find(u => u.id === userId);

  const handleDelete = () => {
    // In a real application, this would delete the user
    // For demonstration purposes, just show a success toast
    toast({
      title: "Success",
      description: `User ${user?.name} has been deleted.`,
    });
    
    closeDeleteUser();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDeleteUser}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {user?.name}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={closeDeleteUser}>Cancel</Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};