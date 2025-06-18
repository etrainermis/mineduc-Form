"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash,
  Plus,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getToken } from "@/utils/token";
import { AddWorkshopModal } from "@/components/modals/AddWorkshopModal";
import { EditWorkshopModal } from "@/components/modals/EditWorkshopModal";
import { ViewWorkshopModal } from "@/components/modals/ViewWorkshopModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BACKEND_URL } from "@/lib/config";

export type Workshop = {
  short_description: string;
  id: string;
  title: string;
  venue: string;
  schedule: string;
  capacity: number;
  speakers?: string[];
  organizerId?: string;
  createdAt: string;
  updatedAt: string;
};

export function WorkshopTable() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [workshopToDelete, setWorkshopToDelete] = useState<Workshop | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isAssignOrganizerDialogOpen, setIsAssignOrganizerDialogOpen] = useState(false);
  const [selectedWorkshopForOrganizer, setSelectedWorkshopForOrganizer] = useState<Workshop | null>(null);
  const [organizers, setOrganizers] = useState<{ id: string; name: string }[]>([]);
  const [selectedOrganizerId, setSelectedOrganizerId] = useState<string>("");

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getToken();
      
      if (!token) {
        setError("Your session has expired. Please login again.");
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${BACKEND_URL}/workshops`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*'
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Your session has expired. Please login again.");
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }
        
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched workshops:', data);

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: expected an array of workshops');
      }

      setWorkshops(data);
    } catch (error) {
      console.error('Error fetching workshops:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch workshops. Please check your connection and try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizers = async () => {
    try {
      const token = getToken();
      
      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${BACKEND_URL}/users/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Filter users to get only event organizers
      const eventOrganizers = data.filter((user: { roles: { role_name: string }[] }) => 
        user.roles.some(role => role.role_name === 'EVENT_ORGANIZER')
      ).map((user: { id: string; firstName: string; lastName: string }) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`
      }));
      
      setOrganizers(eventOrganizers);
    } catch (error) {
      console.error('Error fetching organizers:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch organizers');
    }
  };

  const fetchWorkshopById = async (workshopId: string) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${BACKEND_URL}/workshops/${workshopId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching workshop:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch workshop details');
      return null;
    }
  };

  const handleEditClick = async (workshop: Workshop) => {
    const workshopDetails = await fetchWorkshopById(workshop.id);
    if (workshopDetails) {
      setSelectedWorkshop(workshopDetails);
      setIsEditModalOpen(true);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const handleDelete = async (workshopId: string) => {
    try {
      const token = getToken();
      
      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${BACKEND_URL}/workshops/${workshopId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Workshop deleted successfully");
      fetchWorkshops();
    } catch (error) {
      console.error('Error deleting workshop:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete workshop');
    } finally {
      setIsDeleteDialogOpen(false);
      setWorkshopToDelete(null);
    }
  };

  // const handleAssignSpeakers = async (workshopId: string, speakerIds: string[]) => {
  //   try {
  //     const token = getToken();
      
  //     if (!token) {
  //       toast.error("Your session has expired. Please login again.");
  //       window.location.href = '/login';
  //       return;
  //     }

  //     const response = await fetch(`${BACKEND_URL}/workshops/${workshopId}/speakers`, {
  //       method: 'PUT',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ speakerIds }),
  //     });

  //     if (!response.ok) {
  //       if (response.status === 401) {
  //         toast.error("Your session has expired. Please login again.");
  //         window.location.href = '/login';
  //         return;
  //       }
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     toast.success("Speakers assigned successfully");
  //     fetchWorkshops();
  //   } catch (error) {
  //     console.error('Error assigning speakers:', error);
  //     toast.error(error instanceof Error ? error.message : 'Failed to assign speakers');
  //   }
  // };

  const handleAssignOrganizer = async () => {
    try {
      if (!selectedWorkshopForOrganizer || !selectedOrganizerId) {
        toast.error("Please select both workshop and organizer");
        return;
      }

      const token = getToken();
      
      if (!token) {
        toast.error("Your session has expired. Please login again.");
        return;
      }

      // Get user data from localStorage
      const userData = localStorage.getItem('userData');
      if (!userData) {
        toast.error("User data not found. Please login again.");
        return;
      }

      // Parse user data and get the role
      const user = JSON.parse(userData);
      const userRole = user.roles?.[0]?.role_name;

      if (userRole !== 'ADMIN' && userRole !== 'COORDINATOR') {
        toast.error("Only administrators and coordinators can assign organizers to workshops");
        return;
      }

      console.log('Assignment Details:', {
        workshopId: selectedWorkshopForOrganizer.id,
        organizerId: selectedOrganizerId,
        userRole: userRole,
        token: token.substring(0, 10) + '...' // Log partial token for debugging
      });

      const url = `${BACKEND_URL}/workshops/${selectedWorkshopForOrganizer.id}/assign-organizer/${selectedOrganizerId}`;
      console.log('Request URL:', url);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
      });

      console.log('Response:', {
        status: response.status,
        statusText: response.statusText
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.text();
          console.error('Error response body:', errorData);
          errorMessage = errorData;
        } catch (e) {
          console.log(e);
          errorMessage = `HTTP error! status: ${response.status}`;
        }

        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          return;
        }
        throw new Error(errorMessage);
      }

      toast.success("Organizer assigned successfully");
      await fetchWorkshops(); // Wait for workshops to be fetched
      setIsAssignOrganizerDialogOpen(false);
      setSelectedWorkshopForOrganizer(null);
      setSelectedOrganizerId("");
    } catch (error) {
      console.error('Error assigning organizer:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to assign organizer');
      // Don't close the dialog on error so user can try again
    }
  };

  // Filter workshops based on search term
  const filteredWorkshops = workshops.filter((workshop) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      workshop.title.toLowerCase().includes(searchTerm) ||
      workshop.venue.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="w-full space-y-8">
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#026FB4]"></div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="text-center py-8 text-red-500">
          {error}
        </div>
      )}

      {/* Search and Add Button */}
      {!loading && !error && (
        <>
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search workshops..."
                  className="pl-10 bg-white focus-visible:ring-[#026FB4] border-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#026FB4] hover:bg-[#026FB4]/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Workshop
              </Button>
            </div>
          </div>

          {/* Workshops List */}
          <div className="p-6">
            <div className="space-y-4">
              {filteredWorkshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="flex flex-col gap-4 rounded-xl bg-white p-4 border border-slate-200 hover:border-[#026FB4]/30 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-sm sm:text-base">{workshop.title}</span>
                      <span className="text-xs text-muted-foreground">{workshop.venue}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-600">
                          {new Date(workshop.schedule).toLocaleDateString()} at {new Date(workshop.schedule).toLocaleTimeString()}
                        </span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-600">Capacity: {workshop.capacity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-lg border-slate-200 hover:bg-[#EBF5FF] hover:text-[#026FB4] transition-all duration-200"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          className="flex items-center gap-2 focus:bg-[#EBF5FF] focus:text-[#026FB4]"
                          onClick={() => {
                            setSelectedWorkshop(workshop);
                            setIsViewModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditClick(workshop)}
                          className="flex items-center gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-red-600 focus:bg-red-50 focus:text-red-600"
                          onClick={() => {
                            setWorkshopToDelete(workshop);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 focus:bg-[#EBF5FF] focus:text-[#026FB4]"
                          onClick={() => {
                            setSelectedWorkshopForOrganizer(workshop);
                            setIsAssignOrganizerDialogOpen(true);
                            fetchOrganizers();
                          }}
                        >
                          <UserPlus className="h-4 w-4" />
                          <span>Assign Organizer</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {filteredWorkshops.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-sm text-muted-foreground">No workshops found.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the workshop &quot{workshopToDelete?.title}&quot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => workshopToDelete && handleDelete(workshopToDelete.id)}
              className="bg-rose-600 hover:bg-rose-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Workshop Modal */}
      <AddWorkshopModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          fetchWorkshops();
          setIsAddModalOpen(false);
        }}
      />

      {/* Edit Workshop Modal */}
      {selectedWorkshop && (
        <EditWorkshopModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => {
            fetchWorkshops();
            setIsEditModalOpen(false);
          }}
          workshop={selectedWorkshop}
        />
      )}

      {/* View Workshop Modal */}
      {selectedWorkshop && (
        <ViewWorkshopModal 
          isOpen={isViewModalOpen} 
          onClose={() => setIsViewModalOpen(false)}
          workshop={selectedWorkshop}
        />
      )}

      {/* Assign Organizer Dialog */}
      <Dialog open={isAssignOrganizerDialogOpen} onOpenChange={setIsAssignOrganizerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Organizer</DialogTitle>
            <DialogDescription>
              Select an organizer to assign to the workshop
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Workshop</Label>
              <Input
                value={selectedWorkshopForOrganizer?.title}
                disabled
              />
            </div>
            <div>
              <Label>Organizer</Label>
              <Select
                value={selectedOrganizerId}
                onValueChange={setSelectedOrganizerId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an organizer" />
                </SelectTrigger>
                <SelectContent>
                  {organizers.map((organizer) => (
                    <SelectItem key={organizer.id} value={organizer.id}>
                      {organizer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAssignOrganizerDialogOpen(false);
                setSelectedWorkshopForOrganizer(null);
                setSelectedOrganizerId("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssignOrganizer}
              className="bg-[#026FB4] hover:bg-[#026FB4]/90"
            >
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}