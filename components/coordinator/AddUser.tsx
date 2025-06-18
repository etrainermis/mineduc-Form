import React from 'react';
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
import { useAddUserModal } from '@/hooks/useAddUserModal';
import { useToast } from '@/hooks/use-toast';

export const AddUser = () => {
  const { isOpen, closeAddUser } = useAddUserModal();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "User has been added successfully!",
    });
    closeAddUser();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeAddUser}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter user's full name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter user's email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="Enter user's role" defaultValue="Event Organiser" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeAddUser}>Cancel</Button>
            <Button type="submit" className="bg-[#026FB4] hover:bg-[#025a91]">Add User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};