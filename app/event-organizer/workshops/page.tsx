"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  CalendarIcon,
  User,
  MapPin,
  Clock,
  Users,
  UserCheck,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { UserProfile } from "@/components/users/UserProfile";
import { DatePicker } from "@/components/ui/date-picker";
import { SpeakerSelectionDialog } from "@/components/workshops/SpeakerSelectionDialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { WorkshopActions } from "@/components/workshops/WorkshopActions";
import { toast } from "sonner";
import { getToken } from "@/utils/token";
import { Spinner } from "@/components/ui/spinner";
import type { Workshop } from "@/types";
import { jwtDecode } from "jwt-decode";
import { BACKEND_URL } from "@/lib/config";

// Define the Speaker interface for TypeScript but comment it out since it's not directly used
// This keeps the type definition available for the SpeakerSelectionDialog component
// interface Speaker {
//   id: string
//   name: string
//   position: string
//   shortDescription: string
//   biography: string
//   profile_picture: string | null
//   status: string
//   published: boolean
// }

interface Event {
  id: string;
  name: string;
  organizer: string;
  location: string;
  date: string;
  time: string;
  color: string;
  theme: string;
  workshops: Workshop[];
}

// Add interface for decoded token
interface DecodedToken {
  id: string;
  roles: Array<{ role_name: string }>;
  national_id: string;
}

// Sample data - only 3 events
const initialEvents: Event[] = [
  {
    id: "1",
    name: "Global Summit 2025",
    organizer: "Jane Doe",
    location: "Marriott Hotel",
    date: "21/6/2025",
    time: "8am - 6pm",
    color: "bg-green-500",
    theme: "Green",
    workshops: [
      {
        id: "w1",
        title: "Network Security",
        name: "Network Security",
        description: "Learn about the latest network security practices",
        date: "21/6/2025",
        time: "9:00 AM - 11:00 AM",
        location: "Room A",
        category: "Security",
        status: "upcoming",
        capacity: 50,
        registeredCount: 35,
        presenters: ["John Smith"],
        presenterEmails: ["john@example.com"],
        venue: "Room A",
        schedule: "2025-06-21T09:00:00",
        speakers: [],
      },
      // {
      //   id: "w2",
      //   title: "Ethical Hacking",
      //   description: "Introduction to ethical hacking techniques",
      //   date: "21/6/2025",
      //   time: "1:00 PM - 3:00 PM",
      //   location: "Room B",
      //   category: "Security",
      //   status: "upcoming",
      //   capacity: 40,
      //   registeredCount: 28,
      //   presenter: "Sarah Johnson",
      //   presenterEmail: "sarah@example.com"
      // },
      // {
      //   id: "w3",
      //   title: "Cloud Security",
      //   description: "Securing cloud infrastructure",
      //   date: "21/6/2025",
      //   time: "3:30 PM - 5:30 PM",
      //   location: "Room C",
      //   category: "Security",
      //   status: "upcoming",
      //   capacity: 45,
      //   registeredCount: 42,
      //   presenter: "Mike Brown",
      //   presenterEmail: "mike@example.com"
      // }
    ],
  },
  {
    id: "2",
    name: "Cyber Security Conference 2025",
    organizer: "Jane Doe",
    location: "Marriott Hotel",
    date: "21/6/2025",
    time: "8am - 6pm",
    color: "bg-blue-500",
    theme: "Blue",
    workshops: [],
  },
  {
    id: "3",
    name: "Artificial Intelligence Conference 2025",
    organizer: "Jane Doe",
    location: "Marriott Hotel",
    date: "21/6/2025",
    time: "8am - 6pm",
    color: "bg-red-500",
    theme: "Red",
    workshops: [],
  },
];

// Available themes
const themeOptions = [
  { label: "Green", value: "bg-green-500" },
  { label: "Blue", value: "bg-blue-500" },
  { label: "Red", value: "bg-red-500" },
  { label: "Purple", value: "bg-purple-500" },
  { label: "Yellow", value: "bg-yellow-500" },
  { label: "Teal", value: "bg-teal-500" },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [assignedWorkshops, setAssignedWorkshops] = useState<Workshop[]>([]);
  const [allWorkshops, setAllWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    name: "",
    organizer: "Jane Doe",
    location: "",
    date: "21/6/2025",
    time: "8am - 6pm",
    color: "bg-blue-500",
    theme: "Blue",
    workshops: [],
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSpeakerDialogOpen, setIsSpeakerDialogOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null
  );
  const [isWorkshopDetailsOpen, setIsWorkshopDetailsOpen] = useState(false);
  const [isWorkshopEditOpen, setIsWorkshopEditOpen] = useState(false);
  const [isWorkshopDeleteOpen, setIsWorkshopDeleteOpen] = useState(false);
  // Comment out unused state variables
  // const [selectedWorkshopDetails, setSelectedWorkshopDetails] = useState<Workshop | null>(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log(setIsLoadingDetails(true))

        // Get token and decode it to get organizer ID
        const token = getToken();
        if (!token) {
          throw new Error("No authentication token found");
        }

        // Decode token to get organizer ID
        const decoded = jwtDecode(token) as DecodedToken;
        const organizerId = decoded.id;

        if (!organizerId) {
          throw new Error("No organizer ID found in token");
        }

        // Fetch assigned workshops using organizer's ID
        const assignedResponse = await fetch(
          `${BACKEND_URL}/workshops/organizer/${organizerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "*/*",
            },
          }
        );

        if (!assignedResponse.ok) {
          throw new Error("Failed to fetch assigned workshops");
        }

        const assignedData = await assignedResponse.json();
        setAssignedWorkshops(assignedData);

        // Fetch all workshops
        const allResponse = await fetch(`${BACKEND_URL}/workshops`, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        });

        if (!allResponse.ok) {
          throw new Error("Failed to fetch all workshops");
        }

        const allData = await allResponse.json();
        setAllWorkshops(allData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        toast.error("Failed to fetch workshops");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  // Handler functions
  // const handleViewDetails = async (workshop: Workshop) => {
  //   try {
  //     setIsLoadingDetails(true)
  //     setSelectedWorkshop(workshop)
  //     setIsWorkshopDetailsOpen(true)
  //     console.log(selectedWorkshop);

  //     const token = getToken()
  //     if (!token) {
  //       throw new Error('No authentication token found')
  //     }

  //     const response = await fetch(`${BACKEND_URL}/workshops/${workshop.id}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'accept': '*/*'
  //       }
  //     })

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch workshop details')
  //     }

  //     const data = await response.json()
  //     setSelectedWorkshopDetails(data)
  //   } catch (err) {
  //     toast.error('Failed to fetch workshop details')
  //   } finally {
  //     setIsLoadingDetails(false)
  //   }
  // }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleThemeChange = (value: string) => {
    const theme = themeOptions.find((t) => t.value === value);
    setNewEvent((prev) => ({
      ...prev,
      color: value,
      theme: theme?.label || "Blue",
    }));
  };

  // const handleEditWorkshop = (workshop: Workshop) => {
  //   setSelectedWorkshop(workshop)
  //   setIsWorkshopEditOpen(true)
  // }

  const confirmDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
      setIsDeleteDialogOpen(false);
      setSelectedEvent(null);
    }
  };

  // const handleAssignSpeaker = (workshop: Workshop) => {
  //   setSelectedWorkshop(workshop)
  //   setIsSpeakerDialogOpen(true)
  // }

  // const handleSpeakerSelect = (speaker: Speaker) => {
  //   if (selectedWorkshop) {
  //     try {
  //       const updatedEvents = events.map((event) => ({
  //         ...event,
  //         workshops: event.workshops.map((workshop) =>
  //           workshop.id === selectedWorkshop.id
  //             ? {
  //                 ...workshop,
  //                 presenters: [...(workshop.presenters || []), speaker.name],
  //                 presenterEmails: [...(workshop.presenterEmails || []), speaker.position]
  //               }
  //             : workshop
  //         ),
  //       }))
  //       setEvents(updatedEvents)
  //       toast.success("Speaker assigned successfully")
  //     } catch (error) {
  //       console.error('Error assigning speaker:', error)
  //       toast.error("Failed to assign speaker")
  //     }
  //   }
  // }

  // const handleViewWorkshop = (workshop: Workshop) => {
  //   setSelectedWorkshop(workshop)
  //   setIsWorkshopDetailsOpen(true)
  // }

  const handleDeleteWorkshop = () => {
    if (selectedWorkshop && selectedEvent) {
      const updatedWorkshops = selectedEvent.workshops.filter(
        (w) => w.id !== selectedWorkshop.id
      );
      setEvents(
        events.map((e) =>
          e.id === selectedEvent.id ? { ...e, workshops: updatedWorkshops } : e
        )
      );
      setIsWorkshopDeleteOpen(false);
      setSelectedWorkshop(null);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">Workshops</h1>
        <UserProfile />
      </div>

      {/* Assigned Workshops Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Assigned Workshops</CardTitle>
          <CardDescription>Manage your assigned workshops</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading workshops...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : assignedWorkshops.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No workshops assigned yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {assignedWorkshops.map((workshop) => (
                <Card key={workshop.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-medium">{workshop.title}</h4>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{workshop.venue}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(workshop.schedule).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>Capacity: {workshop.capacity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedWorkshop(workshop);
                            setIsSpeakerDialogOpen(true);
                          }}
                        >
                          Assign Speaker
                        </Button>
                        <WorkshopActions
                          workshop={workshop}
                          onView={() => {
                            setSelectedWorkshop(workshop);
                            setIsWorkshopDetailsOpen(true);
                          }}
                          onEdit={() => {
                            setSelectedWorkshop(workshop);
                            setIsWorkshopEditOpen(true);
                          }}
                          onDelete={() => {
                            setSelectedWorkshop(workshop);
                            setIsWorkshopDeleteOpen(true);
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Other Workshops Section */}
      <Card>
        <CardHeader>
          <CardTitle>Other Workshops</CardTitle>
          <CardDescription>View other available workshops</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading workshops...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : allWorkshops.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No workshops available.
            </div>
          ) : (
            <div className="grid gap-4">
              {allWorkshops
                .filter(
                  (workshop) =>
                    !assignedWorkshops.some(
                      (assigned) => assigned.id === workshop.id
                    )
                )
                .map((workshop) => (
                  <Card key={workshop.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-medium">{workshop.title}</h4>
                          <div className="flex flex-wrap gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{workshop.venue}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {new Date(workshop.schedule).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>Capacity: {workshop.capacity}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedWorkshop(workshop);
                            setIsWorkshopDetailsOpen(true);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px] max-w-[95vw]">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full ${selectedEvent.color} flex items-center justify-center`}
                >
                  <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">
                    {selectedEvent.name}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Organized by {selectedEvent.organizer}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Location</h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm sm:text-base">
                      {selectedEvent.location}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Date & Time</h3>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm sm:text-base">{selectedEvent.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm sm:text-base">{selectedEvent.time}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <h3 className="font-medium">Workshops</h3>
                  <ul className="ml-6 list-disc">
                    {selectedEvent.workshops.map((workshop, index) => (
                      <li key={index} className="text-sm sm:text-base">
                        {workshop.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen}>
        <AlertDialogContent className="sm:max-w-[425px] max-w-[95vw]">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {selectedEvent?.name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Update the event details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Event Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={newEvent.name}
                  onChange={handleFormChange}
                  placeholder="Enter event name"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="theme" className="text-sm font-medium">
                  Theme
                </label>
                <Select
                  value={newEvent.color}
                  onValueChange={handleThemeChange}
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value}>
                        {theme.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <DatePicker date={date} setDate={setDate} className="w-full" />
              </div>

              <div className="grid gap-2">
                <label htmlFor="time" className="text-sm font-medium">
                  Time
                </label>
                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full"
                  />
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

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
              <label htmlFor="workshops" className="text-sm font-medium">
                Workshops
              </label>
              <Select
                value={selectedWorkshop?.title}
                onValueChange={(value: string) => {
                  const workshop = selectedEvent?.workshops.find(
                    (w) => w.title === value
                  );
                  setSelectedWorkshop(workshop || null);
                }}
              >
                <SelectTrigger id="workshops">
                  <SelectValue placeholder="Workshop" />
                </SelectTrigger>
                <SelectContent>
                  {selectedEvent?.workshops.map((workshop) => (
                    <SelectItem key={workshop.id} value={workshop.title}>
                      {workshop.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedEvent) {
                  setEvents(
                    events.map((e) =>
                      e.id === selectedEvent.id
                        ? { ...selectedEvent, ...newEvent }
                        : e
                    )
                  );
                  setIsEditDialogOpen(false);
                }
              }}
            >
              Update Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Speaker Selection Dialog */}
      <SpeakerSelectionDialog
        isOpen={isSpeakerDialogOpen}
        onClose={() => {
          setIsSpeakerDialogOpen(false);
          setSelectedWorkshop(null);
        }}
        workshopId={selectedWorkshop?.id || ""}
        assignedSpeakerIds={selectedWorkshop?.speakers || []}
      />

      {/* Workshop Details Dialog */}
      <Dialog
        open={isWorkshopDetailsOpen}
        onOpenChange={setIsWorkshopDetailsOpen}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Workshop Details</DialogTitle>
          </DialogHeader>
          {isLoadingDetails ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="h-6 w-6" />
              <span className="ml-2">Loading details...</span>
            </div>
          ) : selectedWorkshop ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedWorkshop.title}
                </h3>
                {selectedWorkshop.description && (
                  <p className="mt-2 text-muted-foreground">
                    {selectedWorkshop.description}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Location</h4>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedWorkshop.venue}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Schedule</h4>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(selectedWorkshop.schedule).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Capacity</h4>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedWorkshop.capacity} participants</span>
                  </div>
                </div>

                {selectedWorkshop.registeredCount !== undefined && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Registered</h4>
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedWorkshop.registeredCount} registered</span>
                    </div>
                  </div>
                )}
              </div>

              {selectedWorkshop.presenters &&
                selectedWorkshop.presenters.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Speakers</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {selectedWorkshop.presenters.map((presenter, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {presenter
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{presenter}</p>
                            {selectedWorkshop.presenterEmails?.[index] && (
                              <p className="text-sm text-muted-foreground">
                                {selectedWorkshop.presenterEmails[index]}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Workshop details not available
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsWorkshopDetailsOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Workshop Edit Dialog */}
      <Dialog open={isWorkshopEditOpen} onOpenChange={setIsWorkshopEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Workshop</DialogTitle>
          </DialogHeader>
          {selectedWorkshop && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Workshop Name
                </label>
                <Input
                  id="name"
                  value={selectedWorkshop.title}
                  onChange={(e) =>
                    setSelectedWorkshop({
                      ...selectedWorkshop,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  value={selectedWorkshop.description}
                  onChange={(e) =>
                    setSelectedWorkshop({
                      ...selectedWorkshop,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="startTime" className="text-sm font-medium">
                    Start Time
                  </label>
                  <Input
                    id="startTime"
                    type="time"
                    value={selectedWorkshop.time?.split(" - ")[0]}
                    onChange={(e) =>
                      setSelectedWorkshop({
                        ...selectedWorkshop,
                        time: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="endTime" className="text-sm font-medium">
                    End Time
                  </label>
                  <Input
                    id="endTime"
                    type="time"
                    value={selectedWorkshop.time?.split(" - ")[1]}
                    onChange={(e) =>
                      setSelectedWorkshop({
                        ...selectedWorkshop,
                        time: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  value={selectedWorkshop.location}
                  onChange={(e) =>
                    setSelectedWorkshop({
                      ...selectedWorkshop,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="capacity" className="text-sm font-medium">
                  Capacity
                </label>
                <Input
                  id="capacity"
                  type="number"
                  value={selectedWorkshop.capacity}
                  onChange={(e) =>
                    setSelectedWorkshop({
                      ...selectedWorkshop,
                      capacity: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsWorkshopEditOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedWorkshop && selectedEvent) {
                  const updatedWorkshops = selectedEvent.workshops.map((w) =>
                    w.id === selectedWorkshop.id ? selectedWorkshop : w
                  );
                  setEvents(
                    events.map((e) =>
                      e.id === selectedEvent.id
                        ? { ...e, workshops: updatedWorkshops }
                        : e
                    )
                  );
                  setIsWorkshopEditOpen(false);
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Workshop Delete Dialog */}
      <AlertDialog open={isWorkshopDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Workshop</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {selectedWorkshop?.title}? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsWorkshopDeleteOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteWorkshop}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
