import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteUserModal } from "@/hooks/useDeleteUserModal";
import { toast } from "sonner";
import { getToken } from "@/utils/token";
import { BACKEND_URL } from "@/lib/config";

interface DeleteUserModalProps {
  refreshUsers: () => void;
}

export function DeleteUserModal({ refreshUsers }: DeleteUserModalProps) {
  const { isOpen, user, closeDeleteUser } = useDeleteUserModal();

  const handleDelete = async () => {
    try {
      if (!user) {
        toast.error("No user selected for deletion");
        return;
      }

      const token = getToken();
      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${BACKEND_URL}/users/delete/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*'
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete user`);
      }

      const deletedUser = await response.json();
      console.log('Deleted user:', deletedUser);
      toast.success(`Successfully deleted user ${deletedUser.firstName} ${deletedUser.lastName}`);
      refreshUsers(); // Refresh the users list
      closeDeleteUser();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete user');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDeleteUser}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex items-center">
          <DialogTitle className="text-xl font-semibold">Delete User</DialogTitle>
          <Button 
            onClick={closeDeleteUser} 
            variant="ghost" 
            className="absolute right-4 top-4 h-6 w-6 rounded-full p-0"
            aria-label="Close"
          >
          </Button>
        </DialogHeader>
        <div className="px-1 py-4 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 20H60C60 17.3478 58.9464 14.8043 56.8284 12.9289C54.7105 11.0536 51.8261 10 48.8372 10H51.1628C48.1739 10 45.2895 11.0536 43.1716 12.9289C41.0536 14.8043 40 17.3478 40 20Z" fill="#D9D9D9"/>
              <path d="M75 20H25C23.6739 20 22.4021 20.5268 21.4645 21.4645C20.5268 22.4021 20 23.6739 20 25C20 26.3261 20.5268 27.5979 21.4645 28.5355C22.4021 29.4732 23.6739 30 25 30H75C76.3261 30 77.5979 29.4732 78.5355 28.5355C79.4732 27.5979 80 26.3261 80 25C80 23.6739 79.4732 22.4021 78.5355 21.4645C77.5979 20.5268 76.3261 20 75 20Z" fill="#D9D9D9"/>
              <path d="M31.25 40L35.75 80C35.75 83.9782 37.3348 87.7936 40.1477 90.6066C42.9607 93.4196 46.7761 95.0044 50.7543 95.0044C54.7325 95.0044 58.5479 93.4196 61.3609 90.6066C64.1739 87.7936 65.7587 83.9782 65.7587 80L70.2587 40" fill="#F4AAAA"/>
              <path d="M43.75 50L45 70" stroke="white" strokeWidth="5" strokeLinecap="round"/>
              <path d="M57.5 50L56.25 70" stroke="white" strokeWidth="5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="mb-2 text-lg font-semibold text-gray-700">
            Are you sure?
          </p>
          <p className="mb-6 text-gray-600">
            Do you really want to delete {user ? `${user.firstName} ${user.lastName}` : 'this user'}? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-2">
            <Button type="button" variant="outline" onClick={closeDeleteUser} className="min-w-24">
              Cancel
            </Button>
            <Button type="button" className="bg-red-500 hover:bg-red-600 min-w-24" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
