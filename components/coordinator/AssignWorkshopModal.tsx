'use client'
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAssignWorkshopModal } from '@/hooks/useAssignWorkshopModal';
import { useToast } from '@/hooks/use-toast';
import { users, workshops } from '@/data/userData';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const AssignWorkshopModal = () => {
  const { isOpen, userId, closeAssignWorkshop } = useAssignWorkshopModal();
  const { toast } = useToast();
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>("");
  const [currentUser, setCurrentUser] = useState(users[0]);

  useEffect(() => {
    if (userId) {
      const user = users.find(u => u.id === userId);
      if (user) {
        setCurrentUser(user);
      }
    }
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedWorkshop) {
      toast({
        title: "Error",
        description: "Please select a workshop",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: `Workshop assigned to ${currentUser.name} successfully!`,
    });
    closeAssignWorkshop();
  };

  // Filter out workshops that are already assigned to the user
  const availableWorkshops = workshops.filter(
    workshop => !currentUser?.assignedWorkshops.includes(workshop.id)
  );

  // Get user's currently assigned workshops
  const userWorkshops = workshops.filter(
    workshop => currentUser?.assignedWorkshops.includes(workshop.id)
  );

  return (
    <Dialog open={isOpen} onOpenChange={closeAssignWorkshop}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Workshop to {currentUser?.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {userWorkshops.length > 0 && (
              <div className="grid gap-2">
                <Label>Currently Assigned Workshops</Label>
                <div className="space-y-3">
                  {userWorkshops.map(workshop => (
                    <div key={workshop.id} className="rounded-md bg-slate-50 p-3">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">{workshop.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={`${
                            workshop.status === 'upcoming' 
                              ? 'bg-blue-50 text-blue-600' 
                              : workshop.status === 'ongoing' 
                              ? 'bg-green-50 text-green-600' 
                              : 'bg-gray-50 text-gray-600'
                          }`}
                        >
                          {workshop.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{workshop.description}</p>
                      <div className="grid grid-cols-1 gap-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{workshop.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{workshop.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{workshop.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="workshop">Select Workshop</Label>
              {availableWorkshops.length > 0 ? (
                <>
                  <Select onValueChange={setSelectedWorkshop} value={selectedWorkshop}>
                    <SelectTrigger id="workshop">
                      <SelectValue placeholder="Select a workshop" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableWorkshops.map(workshop => (
                        <SelectItem key={workshop.id} value={workshop.id}>
                          {workshop.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedWorkshop && (
                    <div className="mt-2 rounded-md bg-slate-50 p-3">
                      {(() => {
                        const selected = workshops.find(w => w.id === selectedWorkshop);
                        if (!selected) return null;
                        
                        return (
                          <>
                            <div className="flex justify-between mb-2">
                              <h4 className="font-medium">{selected.name}</h4>
                              <Badge 
                                variant="outline" 
                                className={`${
                                  selected.status === 'upcoming' 
                                    ? 'bg-blue-50 text-blue-600' 
                                    : selected.status === 'ongoing' 
                                    ? 'bg-green-50 text-green-600' 
                                    : 'bg-gray-50 text-gray-600'
                                }`}
                              >
                                {selected.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{selected.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{selected.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{selected.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{selected.location}</span>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-md bg-slate-50 p-2 text-sm text-gray-500">
                  No more workshops available to assign.
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeAssignWorkshop}>Cancel</Button>
            <Button 
              type="submit" 
              className="bg-[#026FB4] hover:bg-[#025a91]"
              disabled={!selectedWorkshop || availableWorkshops.length === 0}
            >
              Assign Workshop
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};