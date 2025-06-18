"use client"
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useViewUserModal } from '@/hooks/useViewUserModal';
import { users, workshops } from '@/data/userData';
import { User, Mail } from 'lucide-react';

export const ViewUserModal = () => {
  const { isOpen, userId, closeViewUser } = useViewUserModal();
  
  const user = users.find(u => u.id === userId);
  
  const getWorkshopName = (workshopId: string) => {
    const workshop = workshops.find(w => w.id === workshopId);
    return workshop ? workshop.name : 'Unknown Workshop';
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeViewUser}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1 bg-gray-100 text-gray-700">
                  <User className="h-3 w-3" />
                  {user.role}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 bg-gray-100 text-gray-700">
                  <Mail className="h-3 w-3" />
                  {user.email}
                </Badge>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="mb-2 font-medium">Assigned Workshops</h4>
            {user.assignedWorkshops.length > 0 ? (
              <div className="space-y-2">
                {user.assignedWorkshops.map((workshopId) => {
                  const workshop = workshops.find(w => w.id === workshopId);
                  return (
                    <div key={workshopId} className="rounded-md border p-3">
                      <p className="font-medium">{getWorkshopName(workshopId)}</p>
                      {workshop && (
                        <div className="mt-1 text-sm text-gray-500">
                          <p>Date: {workshop.date} • Time: {workshop.time}</p>
                          <p>Location: {workshop.location}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No workshops assigned yet.</p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" onClick={closeViewUser}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};