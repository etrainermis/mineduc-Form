"use client"
import React, { useEffect, useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { create } from 'zustand';
import { users } from '@/data/userData';
import { useToast } from '@/hooks/use-toast';

interface EditUserModalStore {
  isOpen: boolean;
  userId: string | null;
  openEditUser: (userId: string) => void;
  closeEditUser: () => void;
}

export const useEditUserModal = create<EditUserModalStore>((set) => ({
  isOpen: false,
  userId: null,
  openEditUser: (userId: string) => set({ isOpen: true, userId }),
  closeEditUser: () => set({ isOpen: false, userId: null }),
}));

export const EditUserModal = () => {
  const { isOpen, userId, closeEditUser } = useEditUserModal();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  
  useEffect(() => {
    if (userId) {
      const user = users.find(u => u.id === userId);
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    }
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would update the user data
    // For now, just show a success toast
    toast({
      title: "Success",
      description: "User information has been updated.",
    });
    
    closeEditUser();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeEditUser}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input 
                id="edit-name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter user's full name" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input 
                id="edit-email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user's email" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Role</Label>
              <Input 
                id="edit-role" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter user's role" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeEditUser}>Cancel</Button>
            <Button type="submit" className="bg-[#026FB4] hover:bg-[#025a91]">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};