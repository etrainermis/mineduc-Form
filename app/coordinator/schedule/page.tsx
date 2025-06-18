"use client";

import type React from "react";

import { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Search,
  MoreHorizontal,
  Plus,
  Calendar,
  User,
  MapPin,
  Clock,
  Bookmark,
  Presentation,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { UserProfile } from "@/components/users/UserProfile";

// Event type definition
interface Event {
  id: string;
  name: string;
  organizer: string;
  location: string;
  date: string;
  time: string;
  activities: string[];
  workshops: string[];
  color: string;
  theme: string;
}

// Sample data - only 3 events
const initialEvents: Event[] = [
  {
    id: "1",
    name: "Global Skills Connect 2025",
    organizer: "Jane Doe",
    location: "Marriott Hotel",
    date: "21/6/2025",
    time: "8am - 6pm",
    activities: ["Keynote Speech", "Panel Discussion", "Networking Session"],
    workshops: ["Resume Building", "Interview Skills", "LinkedIn Optimization"],
    color: "bg-green-500",
    theme: "Green",
  },
  {
    id: "2",
    name: "Interministerial Summit 2025",
    organizer: "Jane Doe",
    location: "Marriott Hotel",
    date: "21/6/2025",
    time: "8am - 6pm",
    activities: ["Opening Ceremony", "Policy Discussion", "Closing Remarks"],
    workshops: ["Policy Writing", "Strategic Planning", "Public Speaking"],
    color: "bg-blue-500",
    theme: "Blue",
  },
  {
    id: "3",
    name: "TVET Expo 2025",
    organizer: "Jane Doe",
    location: "Marriott Hotel",
    date: "21/6/2025",
    time: "8am - 6pm",
    activities: ["Exhibition Tour", "Product Showcase", "Awards Ceremony"],
    workshops: [
      "Technical Skills",
      "Vocational Training",
      "Industry Certification",
    ],
    color: "bg-red-500",
    theme: "Red",
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

// Available workshops
const workshopOptions = [
  "Resume Building",
  "Interview Skills",
  "LinkedIn Optimization",
  "Policy Writing",
  "Strategic Planning",
  "Public Speaking",
  "Technical Skills",
  "Vocational Training",
  "Industry Certification",
];

export default function EventsPage() {
  // State management
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    name: "",
    organizer: "Jane Doe",
    location: "",
    date: "21/6/2025",
    time: "8am - 6pm",
    activities: [],
    workshops: [],
    color: "bg-blue-500",
    theme: "Blue",
  });
  const [activityName, setActivityName] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState("");

  // Filtered events
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler functions
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent({
      name: event.name,
      organizer: event.organizer,
      location: event.location,
      date: event.date,
      time: event.time,
      activities: [...event.activities],
      workshops: [...event.workshops],
      color: event.color,
      theme: event.theme,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
      setIsDeleteDialogOpen(false);
      setSelectedEvent(null);
    }
  };

  const handleAddEvent = () => {
    setNewEvent({
      name: "",
      organizer: "Jane Doe",
      location: "",
      date: "21/6/2025",
      time: "8am - 6pm",
      activities: [],
      workshops: [],
      color: "bg-blue-500",
      theme: "Blue",
    });
    setFormStep(1);
    setIsAddDialogOpen(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const handleNextStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const handleAddActivity = () => {
    if (activityName.trim()) {
      const activityWithTime = activityTime.trim()
        ? `${activityName.trim()} (${activityTime.trim()})`
        : activityName.trim();

      setNewEvent((prev) => ({
        ...prev,
        activities: [...(prev.activities || []), activityWithTime],
      }));
      setActivityName("");
      setActivityTime("");
    }
  };

  const handleAddWorkshop = () => {
    if (selectedWorkshop) {
      setNewEvent((prev) => ({
        ...prev,
        workshops: [...(prev.workshops || []), selectedWorkshop],
      }));
      setSelectedWorkshop("");
    }
  };

  const handleRemoveActivity = (index: number) => {
    setNewEvent((prev) => ({
      ...prev,
      activities: prev.activities?.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveWorkshop = (index: number) => {
    setNewEvent((prev) => ({
      ...prev,
      workshops: prev.workshops?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmitNewEvent = () => {
    const newId = (
      Math.max(...events.map((e) => Number.parseInt(e.id))) + 1
    ).toString();
    const eventToAdd = {
      ...newEvent,
      id: newId,
      activities: newEvent.activities || [],
      workshops: newEvent.workshops || [],
    } as Event;

    setEvents([...events, eventToAdd]);
    setIsAddDialogOpen(false);
    setFormStep(1);
  };

  const handleUpdateEvent = () => {
    if (selectedEvent) {
      setEvents(
        events.map((e) =>
          e.id === selectedEvent.id ? { ...selectedEvent, ...newEvent } : e
        )
      );
      setIsEditDialogOpen(false);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">Events</h1>
        <UserProfile />
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl">
              Events Management
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Manage all events, workshops, and activities.
            </CardDescription>
          </div>
          <Button
            onClick={handleAddEvent}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-14 px-4 text-left align-middle font-medium">
                      Event
                    </th>
                    <th className="hidden md:table-cell h-14 px-4 text-left align-middle font-medium">
                      Organizer
                    </th>
                    <th className="hidden lg:table-cell h-14 px-4 text-left align-middle font-medium">
                      Location
                    </th>
                    <th className="hidden sm:table-cell h-14 px-4 text-left align-middle font-medium">
                      Date
                    </th>
                    <th className="hidden lg:table-cell h-14 px-4 text-left align-middle font-medium">
                      Time
                    </th>
                    <th className="hidden md:table-cell h-14 px-4 text-left align-middle font-medium">
                      Activities
                    </th>
                    <th className="hidden md:table-cell h-14 px-4 text-left align-middle font-medium">
                      Workshops
                    </th>
                    <th className="h-14 px-4 text-left align-middle font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 sm:p-6 align-middle">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-6 w-6 rounded-full ${event.color}`}
                          ></div>
                          <span className="font-medium">{event.name}</span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell p-4 sm:p-6 align-middle">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <span>{event.organizer}</span>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell p-4 sm:p-6 align-middle">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell p-4 sm:p-6 align-middle">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell p-4 sm:p-6 align-middle">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell p-4 sm:p-6 align-middle">
                        <div className="flex items-center gap-2">
                          <Bookmark className="h-5 w-5 text-muted-foreground" />
                          <span>{event.activities.length} Activities</span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell p-4 sm:p-6 align-middle">
                        <div className="flex items-center gap-2">
                          <Presentation className="h-5 w-5 text-muted-foreground" />
                          <span>{event.workshops.length} Workshops</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-6 align-middle">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-9 w-9 p-0">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(event)}
                            >
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(event)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(event)}
                              className="text-red-600"
                            >
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="grid gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div
                  className={`h-12 w-12 rounded-full ${selectedEvent.color} flex items-center justify-center`}
                >
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
                  <p className="text-muted-foreground">
                    Organized by {selectedEvent.organizer}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <h3 className="font-medium">Location</h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p>{selectedEvent.location}</p>
                  </div>
                </div>

                <div className="grid gap-2">
                  <h3 className="font-medium">Date & Time</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p>{selectedEvent.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p>{selectedEvent.time}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <h3 className="font-medium">Activities</h3>
                  <ul className="ml-6 list-disc">
                    {selectedEvent.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-2">
                  <h3 className="font-medium">Workshops</h3>
                  <ul className="ml-6 list-disc">
                    {selectedEvent.workshops.map((workshop, index) => (
                      <li key={index}>{workshop}</li>
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
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
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
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Multi-step Add Event Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onOpenChange={(open: boolean) => {
          setIsAddDialogOpen(open);
          if (!open) setFormStep(1);
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Events</DialogTitle>
            <DialogDescription>
              Fill in the following form to add an event
            </DialogDescription>
          </DialogHeader>

          {/* Progress Steps */}
          <div className="relative mb-6 mt-2">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-gray-200"></div>
            <div className="relative flex justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${
                    formStep >= 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  1
                </div>
                <span className="mt-2 text-xs">Event Details</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${
                    formStep >= 2 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  2
                </div>
                <span className="mt-2 text-xs">Schedule Details</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${
                    formStep >= 3 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
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
                  name="name"
                  value={newEvent.name}
                  onChange={handleFormChange}
                  placeholder="Name"
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
                    <SelectValue placeholder="Select theme color" />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-3 w-3 rounded-full ${theme.value}`}
                          ></div>
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
                <label htmlFor="activity" className="text-sm font-medium">
                  Activity
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Input
                    id="activity"
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                    placeholder="Activity name"
                  />
                  <Input
                    id="activity-time"
                    value={activityTime}
                    onChange={(e) => setActivityTime(e.target.value)}
                    placeholder="Add time"
                  />
                </div>
                <Button onClick={handleAddActivity} className="mt-2 w-full">
                  Add
                </Button>
              </div>

              {newEvent.activities && newEvent.activities.length > 0 && (
                <div className="mt-2">
                  <label className="text-sm font-medium">
                    Added Activities
                  </label>
                  <div className="mt-2 space-y-2">
                    {newEvent.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border p-2"
                      >
                        <span className="text-sm">{activity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveActivity(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-2 mt-4">
                <label htmlFor="workshop" className="text-sm font-medium">
                  Add workshop
                </label>
                <Select
                  value={selectedWorkshop}
                  onValueChange={setSelectedWorkshop}
                >
                  <SelectTrigger id="workshop">
                    <SelectValue placeholder="Workshop" />
                  </SelectTrigger>
                  <SelectContent>
                    {workshopOptions.map((workshop) => (
                      <SelectItem key={workshop} value={workshop}>
                        {workshop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddWorkshop} className="mt-2 w-full">
                  Add
                </Button>
              </div>

              {newEvent.workshops && newEvent.workshops.length > 0 && (
                <div className="mt-2">
                  <label className="text-sm font-medium">Added Workshops</label>
                  <div className="mt-2 space-y-2">
                    {newEvent.workshops.map((workshop, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border p-2"
                      >
                        <span className="text-sm">{workshop}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveWorkshop(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Calendar & Venue Details */}
          {formStep === 3 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="workshop-final" className="text-sm font-medium">
                  Workshop
                </label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <span className="text-sm">
                    {newEvent.workshops?.length || 0} workshops added
                  </span>
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="venue" className="text-sm font-medium">
                  Venue
                </label>
                <Input
                  id="venue"
                  name="location"
                  value={newEvent.location}
                  onChange={handleFormChange}
                  placeholder="Add venue"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            {formStep < 3 ? (
              <Button onClick={handleNextStep}>Next</Button>
            ) : (
              <Button onClick={handleSubmitNewEvent}>Add</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                <label htmlFor="edit-name" className="text-sm font-medium">
                  Event Name
                </label>
                <Input
                  id="edit-name"
                  name="name"
                  value={newEvent.name}
                  onChange={handleFormChange}
                  placeholder="Enter event name"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="edit-theme" className="text-sm font-medium">
                  Theme
                </label>
                <Select
                  value={newEvent.color}
                  onValueChange={handleThemeChange}
                >
                  <SelectTrigger id="edit-theme">
                    <SelectValue placeholder="Select theme color" />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-3 w-3 rounded-full ${theme.value}`}
                          ></div>
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
              <label htmlFor="edit-activities" className="text-sm font-medium">
                Activities
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Input
                  id="edit-activities"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  placeholder="Activity name"
                />
                <Input
                  id="edit-activity-time"
                  value={activityTime}
                  onChange={(e) => setActivityTime(e.target.value)}
                  placeholder="Add time"
                />
              </div>
              <Button onClick={handleAddActivity} className="mt-2 w-full">
                Add
              </Button>
              {newEvent.activities && newEvent.activities.length > 0 && (
                <div className="mt-2 space-y-2">
                  {newEvent.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md border p-2"
                    >
                      <span className="text-sm">{activity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveActivity(index)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <label htmlFor="edit-workshops" className="text-sm font-medium">
                Workshops
              </label>
              <Select
                value={selectedWorkshop}
                onValueChange={setSelectedWorkshop}
              >
                <SelectTrigger id="edit-workshops">
                  <SelectValue placeholder="Workshop" />
                </SelectTrigger>
                <SelectContent>
                  {workshopOptions.map((workshop) => (
                    <SelectItem key={workshop} value={workshop}>
                      {workshop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddWorkshop} className="mt-2 w-full">
                Add
              </Button>
              {newEvent.workshops && newEvent.workshops.length > 0 && (
                <div className="mt-2 space-y-2">
                  {newEvent.workshops.map((workshop, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md border p-2"
                    >
                      <span className="text-sm">{workshop}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveWorkshop(index)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateEvent}>Update Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
