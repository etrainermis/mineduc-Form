"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Plus, Calendar, MapPin, Clock, X, Presentation } from "lucide-react"
import { CustomAlertDialog } from "@/components/ui/custom-alert-dialog"
import { toast } from "sonner"
import { getToken } from "@/utils/token"
import { format } from "date-fns"
import { BACKEND_URL } from "@/lib/config"
// Workshop type definition
interface Workshop {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  status: string
  capacity: string
  registered: string
}

// Event type definition
type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  color: string;
  capacity: number;
  registered: number;
  workshops?: Workshop[];
};

// Available themes
const themeOptions = [
  { label: "Green", value: "bg-green-500" },
  { label: "Blue", value: "bg-blue-500" },
  { label: "Red", value: "bg-red-500" }
]

interface ApiEvent {
  id: string;
  name: string;
  description: string;
  schedule: string;
  venue: string;
  theme: string;
  capacity: number;
  registered: number;
  workshops?: Workshop[];
}

// // Helper function to get theme class
// const getThemeClass = (theme: string) => {
//   // If theme already includes 'bg-' prefix, return as is
//   if (theme.startsWith('bg-')) {
//     return theme;
//   }
//   // Otherwise, construct the theme class
//   return `bg-${theme.toLowerCase()}-500`;
// }

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddWorkshopModalOpen, setIsAddWorkshopModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    color: "blue",
    capacity: 0,
    registered: 0,
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [availableWorkshops, setAvailableWorkshops] = useState<Workshop[]>([])
  const [selectedWorkshopIds, setSelectedWorkshopIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        console.log(isLoading);
        const token = getToken();
        if (!token) {
          toast.error("Your session has expired. Please login again.");
          console.log(error)
          window.location.href = '/login';
          return;
        }

        const response = await fetch(`${BACKEND_URL}/events/all-events`, {
          method: 'GET',
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
          if (response.status === 404) {
            console.log('No events found, initializing with empty array');
            setEvents([]);
            setIsLoading(false);
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Raw API response:', data);

        // Transform the API response to match our Event type
        const formattedEvents = data.map((event: {
          id: string;
          name: string;
          venue: string;
          theme: string;
          schedule: string;
          isPublished: boolean;
          workshops: Array<{
            id: string;
            title: string;
            venue: string;
            schedule: string;
            capacity: number;
          }>;
        }) => {
          const scheduleDate = new Date(event.schedule);
          console.log(`Event ${event.name} has theme: "${event.theme}"`);
          // Properly format the theme to ensure it's displayed correctly
          let formattedTheme = "bg-blue-500"; // Default to blue
          
          // Process theme from API
          if (event.theme) {
            const theme = event.theme.toLowerCase().trim();
            if (theme === "red" || theme === "green" || theme === "blue") {
              formattedTheme = `bg-${theme}-500`;
            } else if (theme.startsWith("bg-") && (theme.includes("red") || theme.includes("green") || theme.includes("blue"))) {
              formattedTheme = theme;
            }
          }
          
          return {
            id: event.id,
            title: event.name,
            description: '',
            date: format(scheduleDate, 'yyyy-MM-dd'),
            time: format(scheduleDate, 'HH:mm'),
            location: event.venue,
            color: formattedTheme,
            capacity: 0,
            registered: 0,
            workshops: event.workshops.map(workshop => ({
              id: workshop.id,
              title: workshop.title,
              description: '',
              date: format(new Date(workshop.schedule), 'yyyy-MM-dd'),
              time: format(new Date(workshop.schedule), 'HH:mm'),
              location: workshop.venue,
              status: 'Upcoming',
              capacity: workshop.capacity.toString(),
              registered: '0',
            })),
          };
        });

        console.log('Formatted events with themes:', formattedEvents.map((e: Event) => ({id: e.id, title: e.title, color: e.color})));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch events';
        toast.error(errorMessage);
        setError(errorMessage);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [error, isLoading]);

  // Fetch available workshops
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const token = getToken();
        
        if (!token) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }

        const response = await fetch(`${BACKEND_URL}/workshops`, {
          headers: {
            'Authorization': `Bearer ${token}`,
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
        setAvailableWorkshops(data);
      } catch (error) {
        console.error('Error fetching workshops:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to fetch workshops');
      }
    };

    fetchWorkshops();
  }, []);

  // Filtered events with null checks
  const filteredEvents = events.filter((event) => {
    if (!event) return false;
    const searchLower = searchQuery.toLowerCase();
    return (
      (event.title?.toLowerCase() || '').includes(searchLower) ||
      (event.location?.toLowerCase() || '').includes(searchLower)
    );
  });

  // Handler functions
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event)
    setIsDetailsOpen(true)
  }

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description || "",
      date: event.date,
      time: event.time,
      location: event.location,
      color: event.color,
      capacity: event.capacity,
      registered: event.registered,
    });
    setIsEditDialogOpen(true);
  }

  const handleDelete = async (event: Event) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${BACKEND_URL}/events/${event.id}`, {
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
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete event: ${response.status}`);
      }

      setEvents(events.filter(e => e.id !== event.id));
      setIsDeleteDialogOpen(false);
      setSelectedEvent(null);
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete event');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewEvent((prev) => ({ ...prev, [name]: value }))
  }

  const handleThemeChange = (value: string) => {
    setNewEvent((prev) => ({
      ...prev,
      color: value,
    }))
  }

  const handleNextStep = () => {
    setFormStep((prev) => prev + 1)
  }


  const handleRemoveWorkshopFromEvent = async (eventId: string, workshopId: string) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      console.log('Removing workshop:', { eventId, workshopId });

      const response = await fetch(`${BACKEND_URL}/events/${eventId}/workshops/${workshopId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }
        
        let errorMessage = `Failed to remove workshop: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.error('Error response:', errorData);
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }

      // Update the local state immediately
      setEvents(prevEvents => 
        prevEvents.map(event => {
          if (event.id === eventId) {
            return {
              ...event,
              workshops: event.workshops?.filter(w => w.id !== workshopId) || []
            };
          }
          return event;
        })
      );

      // Also update the selectedEvent if it's the current event being edited
      if (selectedEvent?.id === eventId) {
        setSelectedEvent(prev => {
          if (!prev) return null;
          return {
            ...prev,
            workshops: prev.workshops?.filter(w => w.id !== workshopId) || []
          };
        });
      }

      toast.success("Workshop removed successfully!");
    } catch (error) {
      console.error('Error removing workshop:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to remove workshop');
    }
  };

  const handleSubmitNewEvent = async () => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      // Validate required fields
      if (!newEvent.title || !newEvent.location || !newEvent.date || !newEvent.time) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Format the date and time into ISO string
      if (!newEvent.date || !newEvent.time) {
        throw new Error("Date and time are required");
      }
      const [year, month, day] = newEvent.date.split('-');
      const [hours, minutes] = newEvent.time.split(':');
      const eventDateTime = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
      const schedule = eventDateTime.toISOString();

      // Extract just the color name from the theme class
      let themeColor = "blue";
      if (newEvent.color) {
        const colorMatch = newEvent.color.match(/bg-([a-z]+)-/);
        if (colorMatch && colorMatch[1]) {
          themeColor = colorMatch[1];
        }
      }

      const eventData = {
        name: newEvent.title,
        venue: newEvent.location,
        theme: themeColor, // Send just the color name (red, blue, green)
        schedule: schedule,
        description: newEvent.description || "",
        capacity: newEvent.capacity || 0,
        registered: 0,
      };

      console.log('Submitting event data:', eventData);

      const response = await fetch(`${BACKEND_URL}/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Created event:', responseData);

      // Properly format the theme
      let formattedTheme = "bg-blue-500"; // Default
      if (responseData.theme) {
        const theme = responseData.theme.toLowerCase().trim();
        if (theme === "red" || theme === "green" || theme === "blue") {
          formattedTheme = `bg-${theme}-500`;
        } else if (theme.startsWith("bg-")) {
          formattedTheme = theme;
        }
      }

      // Transform the API response to match our Event type
      const newEventFormatted: Event = {
        id: responseData.id,
        title: responseData.name,
        description: responseData.description,
        date: new Date(responseData.schedule).toISOString().split('T')[0],
        time: new Date(responseData.schedule).toTimeString().split(' ')[0].substring(0, 5),
        location: responseData.venue,
        color: formattedTheme,
        capacity: responseData.capacity,
        registered: responseData.registered,
        workshops: responseData.workshops || [],
      };

      // Update local state with the new event
      setEvents(prevEvents => [...prevEvents, newEventFormatted]);
      setIsAddDialogOpen(false);
      setFormStep(1);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        color: "bg-blue-500",
        capacity: 0,
        registered: 0,
      });
      toast.success("Event created successfully!");

      // Refresh the events list
      const refreshResponse = await fetch(`${BACKEND_URL}/events/all-events`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (refreshResponse.ok) {
        const refreshedEvents = await refreshResponse.json();
        // Transform the API response to match our Event type
        const formattedEvents = refreshedEvents.map((event: ApiEvent) => {
          // Properly format the theme
          let formattedTheme = "bg-blue-500"; // Default
          if (event.theme) {
            const theme = event.theme.toLowerCase().trim();
            if (theme === "red" || theme === "green" || theme === "blue") {
              formattedTheme = `bg-${theme}-500`;
            } else if (theme.startsWith("bg-")) {
              formattedTheme = theme;
            }
          }
          
          return {
            id: event.id,
            title: event.name,
            description: event.description,
            date: new Date(event.schedule).toISOString().split('T')[0],
            time: new Date(event.schedule).toTimeString().split(' ')[0].substring(0, 5),
            location: event.venue,
            color: formattedTheme,
            capacity: event.capacity,
            registered: event.registered,
            workshops: event.workshops || [],
          };
        });
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create event');
    }
  };

  const handleUpdateEvent = async () => {
    try {
      if (!selectedEvent) return;

      const token = getToken();
      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      // Format the date and time into ISO string
      if (!newEvent.date || !newEvent.time) {
        throw new Error("Date and time are required");
      }
      const [year, month, day] = newEvent.date.split('-');
      const [hours, minutes] = newEvent.time.split(':');
      const eventDateTime = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
      const schedule = eventDateTime.toISOString();

      // Extract just the color name from the theme class
      let themeColor = "blue";
      if (newEvent.color) {
        const colorMatch = newEvent.color.match(/bg-([a-z]+)-/);
        if (colorMatch && colorMatch[1]) {
          themeColor = colorMatch[1];
        }
      }

      // Format the data according to the API requirements
      const eventData = {
        name: newEvent.title,
        venue: newEvent.location,
        theme: themeColor, // Send just the color name (red, blue, green)
        schedule: schedule,
        description: newEvent.description || "",
        capacity: newEvent.capacity || 0,
        isPublished: true
      };

      console.log('Updating event with data:', eventData);

      const response = await fetch(`${BACKEND_URL}/events/${selectedEvent.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const updatedEventData = await response.json();
      console.log('Updated event response:', updatedEventData);

      // Properly format the theme
      let formattedTheme = "bg-blue-500"; // Default
      if (updatedEventData.theme) {
        const theme = updatedEventData.theme.toLowerCase().trim();
        if (theme === "red" || theme === "green" || theme === "blue") {
          formattedTheme = `bg-${theme}-500`;
        } else if (theme.startsWith("bg-")) {
          formattedTheme = theme;
        }
      }

      // Transform the API response to match our Event type
      const updatedEvent: Event = {
        id: updatedEventData.id,
        title: updatedEventData.name,
        description: updatedEventData.description || '',
        date: format(new Date(updatedEventData.schedule), 'yyyy-MM-dd'),
        time: format(new Date(updatedEventData.schedule), 'HH:mm'),
        location: updatedEventData.venue,
        color: formattedTheme,
        capacity: typeof updatedEventData.capacity === 'string' ? parseInt(updatedEventData.capacity) : updatedEventData.capacity || 0,
        registered: typeof updatedEventData.registered === 'string' ? parseInt(updatedEventData.registered) : updatedEventData.registered || 0,
        workshops: selectedEvent.workshops || [],
      };

      // Update the events list with the new event data
      setEvents(prevEvents => 
        prevEvents.map(e => e.id === selectedEvent.id ? updatedEvent : e)
      );

      setIsEditDialogOpen(false);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        color: "bg-blue-500",
        capacity: 0,
        registered: 0,
      });
      toast.success("Event updated successfully!");

      // Fetch the updated event details with workshops
      const workshopsResponse = await fetch(`${BACKEND_URL}/events/${selectedEvent.id}/workshops`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (workshopsResponse.ok) {
        const workshopsData = await workshopsResponse.json();
        const formattedWorkshops = workshopsData.map((workshop: {
          id: string;
          title: string;
          description: string;
          schedule: string;
          venue: string;
          status: string;
          capacity: string;
          registered: string;
        }) => ({
          id: workshop.id,
          title: workshop.title,
          description: workshop.description || '',
          date: format(new Date(workshop.schedule), 'yyyy-MM-dd'),
          time: format(new Date(workshop.schedule), 'HH:mm'),
          location: workshop.venue,
          status: workshop.status || 'Upcoming',
          capacity: workshop.capacity?.toString() || '0',
          registered: workshop.registered?.toString() || '0',
        }));

        // Update the events list with the workshops data
        setEvents(prevEvents => 
          prevEvents.map(e => 
            e.id === selectedEvent.id 
              ? { ...e, workshops: formattedWorkshops }
              : e
          )
        );
      }
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update event');
    }
  };

  const handleAssignWorkshop = async (eventId: string, workshopId: string) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      console.log('Assigning workshop:', { eventId, workshopId });

      // First, get the workshop details
      const workshopResponse = await fetch(`${BACKEND_URL}/workshops/${workshopId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!workshopResponse.ok) {
        console.error('Failed to fetch workshop details:', workshopResponse.status);
        throw new Error('Failed to fetch workshop details');
      }

      const workshopData = await workshopResponse.json();
      console.log('Workshop data:', workshopData);

      // Then assign the workshop to the event
      const response = await fetch(`${BACKEND_URL}/events/${eventId}/workshops/${workshopId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Assignment response status:', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }
        
        let errorMessage = `Failed to assign workshop: ${response.status}`;
        try {
          const errorData = await response.json();
          console.error('Error response data:', errorData);
          if (errorData && typeof errorData === 'object') {
            errorMessage = errorData.message || errorMessage;
          }
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }

      // Safely handle date formatting
      let formattedDate = '';
      try {
        if (workshopData.date) {
          formattedDate = format(new Date(workshopData.date), 'yyyy-MM-dd');
        }
      } catch (e) {
        console.error('Error formatting date:', e);
        formattedDate = workshopData.date || '';
      }

      const newWorkshop = {
        id: workshopData.id,
        title: workshopData.title,
        description: workshopData.description || '',
        date: formattedDate,
        time: workshopData.time || '',
        location: workshopData.location || '',
        status: workshopData.status || 'Upcoming',
        capacity: workshopData.capacity?.toString() || '0',
        registered: workshopData.registered?.toString() || '0',
      };

      console.log('New workshop object:', newWorkshop);

      // Update the local state immediately
      setEvents(prevEvents => 
        prevEvents.map(event => {
          if (event.id === eventId) {
            const existingWorkshops = event.workshops || [];
            // Check if workshop already exists
            if (!existingWorkshops.some(w => w.id === workshopId)) {
              return {
                ...event,
                workshops: [...existingWorkshops, newWorkshop]
              };
            }
          }
          return event;
        })
      );

      // Also update the selectedEvent if it's the current event being edited
      if (selectedEvent?.id === eventId) {
        setSelectedEvent(prev => {
          if (!prev) return null;
          const existingWorkshops = prev.workshops || [];
          // Check if workshop already exists
          if (!existingWorkshops.some(w => w.id === workshopId)) {
            return {
              ...prev,
              workshops: [...existingWorkshops, newWorkshop]
            };
          }
          return prev;
        });
      }

      toast.success("Workshop assigned successfully!");
    } catch (error) {
      console.error('Error in handleAssignWorkshop:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to assign workshop');
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-muted-foreground">Manage your events and workshops</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[#026FB4]">Events Management</CardTitle>
            <CardDescription>Manage all workshops and activities.</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#026FB4] hover:bg-[#025a91] text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search Events..." className="pl-8" value={searchQuery} onChange={handleSearch} />
            </div>
          </div>

          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-14 px-4 text-left align-middle font-medium">Events</th>
                    <th className="h-14 px-4 text-left align-middle font-medium">Location</th>
                    <th className="h-14 px-4 text-left align-middle font-medium">Date</th>
                    <th className="h-14 px-4 text-left align-middle font-medium">Time</th>
                    <th className="h-14 px-4 text-left align-middle font-medium w-[250px]">Workshops</th>
                    <th className="h-14 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-6 align-middle">
                        <div className="flex items-center gap-3">
                          <div className={`h-6 w-6 rounded-full ${event.color}`}></div>
                          <span className="font-medium">{event.title}</span>
                        </div>
                      </td>
                      <td className="p-6 align-middle">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      </td>
                      <td className="p-6 align-middle">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                      </td>
                      <td className="p-6 align-middle">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                      </td>
                      <td className="p-6 align-middle">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <Presentation className="h-5 w-5 text-muted-foreground" />
                            <span>{event.workshops?.length || 0} Workshops</span>
                          </div>
                          <Button
                            size="sm"
                            className="bg-[#026FB4] hover:bg-[#025a91] text-white"
                            onClick={() => {
                              setSelectedEvent(event);
                              setIsAddWorkshopModalOpen(true);
                            }}
                          >
                            Assign
                          </Button>
                        </div>
                      </td>
                      <td className="p-6 align-middle">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-9 w-9 p-0">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(event)}>View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(event)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(event)} className="text-red-600">
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <DialogHeader className="p-6 pb-2 bg-[#026FB4] text-white rounded-t-lg">
            <DialogTitle className="text-2xl font-bold">Event Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="p-6">
              <div className="flex items-center gap-6 mb-8">
                <div className={`h-16 w-16 rounded-full ${selectedEvent.color} flex items-center justify-center`}>
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#026FB4]">{selectedEvent.title}</h2>
                  <p className="text-lg text-muted-foreground">Organized by {selectedEvent.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="grid gap-3">
                  <h3 className="text-xl font-medium text-[#026FB4]">Location</h3>
                  <div className="flex items-center gap-3 text-lg">
                    <MapPin className="h-6 w-6 text-[#026FB4]" />
                    <p>{selectedEvent.location}</p>
                  </div>
                </div>

                <div className="grid gap-3">
                  <h3 className="text-xl font-medium text-[#026FB4]">Date & Time</h3>
                  <div className="flex items-center gap-3 text-lg">
                    <Calendar className="h-6 w-6 text-[#026FB4]" />
                    <p>{selectedEvent.date}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <h3 className="text-xl font-medium text-[#026FB4] mb-2">Workshops</h3>
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="h-12 px-6 text-left align-middle font-medium text-[#026FB4]">Title</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-[#026FB4]">Time</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-[#026FB4]">Location</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-[#026FB4]">Status</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-[#026FB4]">Capacity</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-[#026FB4]">Registered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEvent.workshops?.map((workshop, index) => (
                        <tr key={index} className="border-t border-gray-200 transition-colors hover:bg-gray-50">
                          <td className="p-4 align-middle">
                            <div className="font-medium">{workshop.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">{workshop.description}</div>
                          </td>
                          <td className="p-4 align-middle">{workshop.date}</td>
                          <td className="p-4 align-middle">{workshop.location}</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              {workshop.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">{workshop.capacity}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <Input
                                type="number"
                                className="w-20 h-9 text-center"
                                value={workshop.registered}
                                onChange={(e) => {
                                  const updatedWorkshops = [...selectedEvent.workshops!]
                                  updatedWorkshops[index] = {
                                    ...updatedWorkshops[index],
                                    registered: e.target.value,
                                  }
                                  setEvents(events.map(e => e.id === selectedEvent.id ? { ...selectedEvent, workshops: updatedWorkshops } : e))
                                }}
                              />
                              <span className="text-sm whitespace-nowrap">of {workshop.capacity}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="p-6 pt-2 border-t">
            <Button onClick={() => setIsDetailsOpen(false)} className="bg-[#026FB4] hover:bg-[#025a91] text-white px-8">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <CustomAlertDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => handleDelete(selectedEvent as Event)}
        title="Remove Event"
        description={`Are you sure you want to remove ${selectedEvent?.title}?`}
      />

      {/* Multi-step Add Event Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onOpenChange={(open) => {
          setIsAddDialogOpen(open)
          if (!open) setFormStep(1)
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#026FB4]">Add Events</DialogTitle>
            <DialogDescription>Fill in the following form to add an event</DialogDescription>
          </DialogHeader>

          {/* Progress Steps */}
          <div className="relative mb-6 mt-2">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-gray-200"></div>
            <div className="relative flex justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${formStep >= 1 ? "bg-[#026FB4] text-white" : "bg-gray-200"}`}
                >
                  1
                </div>
                <span className="mt-2 text-xs">Event Details</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${formStep >= 2 ? "bg-[#026FB4] text-white" : "bg-gray-200"}`}
                >
                  2
                </div>
                <span className="mt-2 text-xs">Schedule Details</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${formStep >= 3 ? "bg-[#026FB4] text-white" : "bg-gray-200"}`}
                >
                  3
                </div>
                <span className="mt-2 text-xs">Calendar & Venue Details</span>
              </div>
            </div>
          </div>

          {/* Step 1: Event Details */}
          {formStep === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="event-name" className="text-sm font-medium">
                  Event name
                </label>
                <Input
                  id="event-name"
                  name="title"
                  value={newEvent.title}
                  onChange={handleFormChange}
                  placeholder="Name"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="theme" className="text-sm font-medium">
                  Theme
                </label>
                <Select value={newEvent.color} onValueChange={handleThemeChange}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme color" />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value}>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${theme.value}`}></div>
                          <span>{theme.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Schedule Details */}
          {formStep === 2 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newEvent.date}
                  onChange={handleFormChange}
                  placeholder="Select date"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="time" className="text-sm font-medium">
                  Time
                </label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={newEvent.time}
                  onChange={handleFormChange}
                  placeholder="Select time"
                />
                      </div>
            </div>
          )}

          {/* Step 3: Location Details */}
          {formStep === 3 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  name="location"
                  value={newEvent.location}
                  onChange={handleFormChange}
                  placeholder="Enter location"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="capacity" className="text-sm font-medium">
                  Capacity
                </label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={newEvent.capacity}
                  onChange={handleFormChange}
                  placeholder="Enter capacity"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            {formStep < 3 ? (
              <Button onClick={handleNextStep} className="bg-[#026FB4] hover:bg-[#025a91]">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmitNewEvent} className="bg-[#026FB4] hover:bg-[#025a91]">
                Add
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-[#026FB4]">Edit Event</DialogTitle>
            <DialogDescription>Update the event details</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="edit-name" className="text-sm font-medium">
                  Event Name
                </label>
                <Input
                  id="edit-name"
                  name="title"
                  value={newEvent.title}
                  onChange={handleFormChange}
                  placeholder="Enter event name"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="edit-theme" className="text-sm font-medium">
                  Theme
                </label>
                <Select value={newEvent.color} onValueChange={handleThemeChange}>
                  <SelectTrigger id="edit-theme">
                    <SelectValue placeholder="Select theme color" />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value}>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${theme.value}`}></div>
                          <span>{theme.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="edit-location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="edit-location"
                name="location"
                value={newEvent.location}
                onChange={handleFormChange}
                placeholder="Enter location"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="edit-workshops" className="text-sm font-medium">
                Assigned Workshops
              </label>

              {selectedEvent?.workshops && selectedEvent.workshops.length > 0 ? (
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b bg-gray-50">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-10 px-4 text-left align-middle font-medium text-[#026FB4]">Title</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-[#026FB4]">Time</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-[#026FB4]">Location</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-[#026FB4]">Status</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-[#026FB4]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {selectedEvent.workshops.map((workshop) => (
                          <tr
                            key={workshop.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-3 align-middle">
                              <div className="font-medium">{workshop.title}</div>
                            </td>
                            <td className="p-3 align-middle">{workshop.date}</td>
                            <td className="p-3 align-middle">{workshop.location}</td>
                            <td className="p-3 align-middle">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                {workshop.status}
                              </span>
                            </td>
                            <td className="p-3 align-middle">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  if (selectedEvent) {
                                    handleRemoveWorkshopFromEvent(selectedEvent.id, workshop.id);
                                  }
                                }}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No workshops assigned yet.</div>
              )}
            </div>

            <div className="mt-4">
              <Select 
                value={selectedWorkshopIds.join(',')} 
                onValueChange={(value) => {
                  const newWorkshopIds = value.split(',').filter(id => id !== '');
                  setSelectedWorkshopIds(newWorkshopIds);
                  
                  // Update the selectedEvent with the new workshops
                  if (selectedEvent) {
                    const newWorkshops = availableWorkshops
                      .filter(w => newWorkshopIds.includes(w.id))
                      .map(w => {
                        // Safely handle date formatting
                        let formattedDate = '';
                        try {
                          if (w.date) {
                            formattedDate = format(new Date(w.date), 'yyyy-MM-dd');
                          }
                        } catch (e) {
                          console.error('Error formatting date:', e);
                          formattedDate = w.date || '';
                        }

                        return {
                          id: w.id,
                          title: w.title,
                          description: w.description || '',
                          date: formattedDate,
                          time: w.time || '',
                          location: w.location || '',
                          status: w.status || 'Upcoming',
                          capacity: w.capacity?.toString() || '0',
                          registered: w.registered?.toString() || '0',
                        };
                      });
                      
                    // Remove duplicates by using a Map
                    const uniqueWorkshops = Array.from(
                      new Map(newWorkshops.map(w => [w.id, w])).values()
                    );
                    
                    setSelectedEvent(prev => {
                      if (!prev) return null;
                      return {
                        ...prev,
                        workshops: uniqueWorkshops
                      };
                    });
                  }
                }}
              >
                <SelectTrigger id="edit-workshop-select">
                  <SelectValue placeholder="Select workshops" />
                </SelectTrigger>
                <SelectContent>
                  {availableWorkshops
                    .filter(w => !selectedEvent?.workshops?.some(sw => sw.id === w.id))
                    .map((workshop) => (
                      <SelectItem key={workshop.id} value={workshop.id}>
                        {workshop.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={async () => {
                  if (selectedEvent) {
                    for (const workshopId of selectedWorkshopIds) {
                      await handleAssignWorkshop(selectedEvent.id, workshopId);
                    }
                    setSelectedWorkshopIds([]);
                  }
                }}
                className="mt-2 w-full bg-[#026FB4] hover:bg-[#025a91]"
              >
                Assign Selected Workshops
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateEvent} className="bg-[#026FB4] hover:bg-[#025a91]">
              Update Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update the workshop assignment dialog */}
      <Dialog open={isAddWorkshopModalOpen} onOpenChange={setIsAddWorkshopModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Assign Workshops</DialogTitle>
            <DialogDescription>
              Select workshops to assign to this event. You can select multiple workshops.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="max-h-[300px] overflow-y-auto border rounded-md p-4">
              {availableWorkshops.map((workshop) => (
                <div key={workshop.id} className="flex items-center space-x-2 py-2 hover:bg-gray-50 rounded-md px-2">
                  <input
                    type="checkbox"
                    id={workshop.id}
                    checked={selectedWorkshopIds.includes(workshop.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedWorkshopIds([...selectedWorkshopIds, workshop.id]);
                      } else {
                        setSelectedWorkshopIds(selectedWorkshopIds.filter(id => id !== workshop.id));
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor={workshop.id} className="flex-1 cursor-pointer">
                    <div className="font-medium">{workshop.title}</div>
                    <div className="text-sm text-gray-500">{workshop.description}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      <span className="mr-3">{workshop.date} at {workshop.time}</span>
                      <span>{workshop.location}</span>
                    </div>
                  </label>
                </div>
              ))}
              {availableWorkshops.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No workshops available to assign.
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddWorkshopModalOpen(false);
              setSelectedWorkshopIds([]);
            }}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (selectedEvent) {
                  for (const workshopId of selectedWorkshopIds) {
                    await handleAssignWorkshop(selectedEvent.id, workshopId);
                  }
                  setIsAddWorkshopModalOpen(false);
                  setSelectedWorkshopIds([]);
                }
              }}
              disabled={selectedWorkshopIds.length === 0}
              className="bg-[#026FB4] hover:bg-[#025a91] text-white"
            >
              Assign Selected Workshops ({selectedWorkshopIds.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
