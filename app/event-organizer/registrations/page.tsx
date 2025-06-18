"use client";

import { useEffect, useState } from "react";
import { Download, Eye, Pencil, Search, Trash2 } from "lucide-react";
import { Pagination, PaginationInfo } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { downloadCSV, objectsToCSV } from "@/lib/csv-utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserProfile } from "@/components/users/UserProfile";
import { toast, Toaster } from "sonner";
import { BACKEND_URL } from "@/lib/config";

// Define the structure of the API response
interface DelegateApiResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phonenumber: string;
  gender: string;
  profile_picture_url?: string;
  delegate_type: string;
  country: string;
  organization: string;
  position: string;
  dietary_restrictions: string;
  special_needs: string;
  registration_date: string;
  selected_event?: string;
  selected_activities?: string[];
  workshops?: Array<{ title: string }>;
  role?: string;
}

interface Registration {
  id: number;
  fullname: string;
  email: string;
  phone_number: string;
  gender: string;
  profile_picture: string;
  delegate_type: string;
  country: string;
  organization: string;
  position: string;
  dietary_restrictions: string;
  special_needs: string;
  registration_date: string;
  selected_event: string;
  selected_activities: string[];
  workshops: string[];
  role: string;
}

export default function RegistrationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Registration | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);

  // Fetch delegates from API
  useEffect(() => {
    const fetchDelegates = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/delegates`, {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch delegates");
        }

        const data = await response.json();

        // Map API response to Registration interface
        const mappedRegistrations = data.map(
          (delegate: DelegateApiResponse) => ({
            id: delegate.id || 0,
            fullname: `${delegate.firstName} ${delegate.lastName}`,
            email: delegate.email,
            phone_number: delegate.phonenumber,
            gender: delegate.gender,
            profile_picture:
              delegate.profile_picture_url ||
              "/placeholder.svg?height=40&width=40",
            delegate_type: delegate.delegate_type,
            country: delegate.country,
            organization: delegate.organization,
            position: delegate.position,
            dietary_restrictions: delegate.dietary_restrictions,
            special_needs: delegate.special_needs,
            registration_date: delegate.registration_date,
            selected_event: delegate.selected_event || "Tech Summit 2023",
            selected_activities: delegate.selected_activities || [],
            workshops: delegate.workshops
              ? delegate.workshops.map((workshop) => workshop.title)
              : [],
            role: delegate.role || "Attendee",
          })
        );

        setRegistrations(mappedRegistrations);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDelegates();
  }, []);

  // Filter registrations based on search term
  const filteredRegistrations = registrations.filter(
    (registration) =>
      registration.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.organization
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      registration.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.delegate_type
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Calculate total pages based on filtered registrations
  useEffect(() => {
    setTotalPages(Math.ceil(filteredRegistrations.length / itemsPerPage));
    // Reset to first page when search changes
    if (currentPage > Math.ceil(filteredRegistrations.length / itemsPerPage)) {
      setCurrentPage(1);
    }
  }, [filteredRegistrations.length, currentPage]);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRegistrations.slice(startIndex, endIndex);
  };

  // Handle view registration
  const handleView = (registration: Registration) => {
    setSelectedRegistration(registration);
    setIsViewModalOpen(true);
  };

  // Handle edit registration
  const handleEdit = (registration: Registration) => {
    setSelectedRegistration(registration);
    setEditForm({ ...registration });
    setIsEditModalOpen(true);
  };

  // Handle delete registration
  const handleDelete = (registration: Registration) => {
    setSelectedRegistration(registration);
    setIsDeleteModalOpen(true);
  };

  // Save edited registration
  const handleSaveEdit = async () => {
    if (editForm) {
      try {
        const response = await fetch(
          `${BACKEND_URL}/delegates/${editForm.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              accept: "*/*",
            },
            body: JSON.stringify({
              firstName: editForm.fullname.split(" ")[0],
              lastName: editForm.fullname.split(" ").slice(1).join(" "),
              email: editForm.email,
              phonenumber: editForm.phone_number,
              gender: editForm.gender,
              delegate_type: editForm.delegate_type,
              country: editForm.country,
              organization: editForm.organization,
              position: editForm.position,
              dietary_restrictions: editForm.dietary_restrictions,
              special_needs: editForm.special_needs,
              selected_event: editForm.selected_event,
              selected_activities: editForm.selected_activities,
              role: editForm.role,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update delegate");
        }

        // Refresh the delegates list
        const fetchDelegates = async () => {
          const response = await fetch(`${BACKEND_URL}/delegates`, {
            method: "GET",
            headers: {
              accept: "*/*",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch delegates");
          }

          const data = await response.json();

          // Map API response to Registration interface
          const mappedRegistrations = data.map(
            (delegate: DelegateApiResponse) => ({
              id: delegate.id || 0,
              fullname: `${delegate.firstName} ${delegate.lastName}`,
              email: delegate.email,
              phone_number: delegate.phonenumber,
              profile_picture:
                delegate.profile_picture_url ||
                "/placeholder.svg?height=40&width=40",
              delegate_type: delegate.delegate_type,
              country: delegate.country,
              organization: delegate.organization,
              position: delegate.position,
              dietary_restrictions: delegate.dietary_restrictions,
              special_needs: delegate.special_needs,
              registration_date: new Date().toISOString().split("T")[0],
              selected_event: delegate.selected_event || "Tech Summit 2023",
              selected_activities: delegate.selected_activities || [],
              role: delegate.role || "Attendee",
            })
          );

          setRegistrations(mappedRegistrations);
        };

        await fetchDelegates();
        setIsEditModalOpen(false);
        toast.success("Delegate updated successfully");
      } catch (error) {
        console.error("Error updating delegate:", error);
        toast.error("Failed to update delegate");
      }
    }
  };

  // Confirm delete registration
  const handleConfirmDelete = async () => {
    if (selectedRegistration) {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to delete delegate");
          return;
        }

        const response = await fetch(
          `${BACKEND_URL}/delegates/${selectedRegistration.id}`,
          {
            method: "DELETE",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let responseData;
        try {
          responseData = await response.json();
        } catch (e) {
          console.error("Error parsing response:", e);
          responseData = {};
        }

        if (!response.ok) {
          if (response.status === 401) {
            toast.error("Session expired. Please login again");
            // Redirect to login page
            window.location.href = "/login";
            return;
          }
          throw new Error(responseData.message || "Failed to delete delegate");
        }

        // Refresh the delegates list
        const fetchDelegates = async () => {
          const response = await fetch(`${BACKEND_URL}/delegates`, {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          });

          let responseData;
          try {
            responseData = await response.json();
          } catch (e) {
            console.error("Error parsing response:", e);
            responseData = [];
          }

          if (!response.ok) {
            if (response.status === 401) {
              toast.error("Session expired. Please login again");
              // Redirect to login page
              window.location.href = "/login";
              return;
            }
            throw new Error(
              responseData.message || "Failed to fetch delegates"
            );
          }

          // Map API response to Registration interface
          const mappedRegistrations = responseData.map(
            (delegate: DelegateApiResponse) => ({
              id: delegate.id || 0,
              fullname: `${delegate.firstName} ${delegate.lastName}`,
              email: delegate.email,
              phone_number: delegate.phonenumber,
              gender: delegate.gender,
              profile_picture:
                delegate.profile_picture_url ||
                "/placeholder.svg?height=40&width=40",
              delegate_type: delegate.delegate_type,
              country: delegate.country,
              organization: delegate.organization,
              position: delegate.position,
              dietary_restrictions: delegate.dietary_restrictions,
              special_needs: delegate.special_needs,
              registration_date: new Date().toISOString().split("T")[0],
              selected_event: delegate.selected_event || "Tech Summit 2023",
              selected_activities: delegate.selected_activities || [],
              role: delegate.role || "Attendee",
            })
          );

          setRegistrations(mappedRegistrations);
        };

        await fetchDelegates();
        setIsDeleteModalOpen(false);
        toast.success("Delegate deleted successfully");

        // Check if we need to adjust current page after deletion
        const newTotalPages = Math.ceil(
          (filteredRegistrations.length - 1) / itemsPerPage
        );
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      } catch (error) {
        console.error("Error deleting delegate:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to delete delegate"
        );
      }
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle export to CSV
  const handleExportCSV = () => {
    const headers = [
      "No.",
      "Full Name",
      "Email",
      "Phone Number",
      "Gender",
      "Delegate Type",
      "Country",
      "Organization",
      "Position",
      "Dietary Restrictions",
      "Special Needs",
      "Registration Date",
      "Selected Event",
      "Role",
    ];

    const csvContent = objectsToCSV(filteredRegistrations, headers, {
      "No.": (_, index: number) => index + 1,
      "Full Name": (item: Registration) => item.fullname,
      Email: (item: Registration) => item.email,
      "Phone Number": (item: Registration) => item.phone_number,
      Gender: (item: Registration) => item.gender,
      "Delegate Type": (item: Registration) => item.delegate_type,
      Country: (item: Registration) => item.country,
      Organization: (item: Registration) => item.organization,
      Position: (item: Registration) => item.position,
      "Dietary Restrictions": (item: Registration) => item.dietary_restrictions,
      "Special Needs": (item: Registration) => item.special_needs,
      "Registration Date": (item: Registration) => {
        const date = new Date(item.registration_date);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return `${formattedDate} at ${formattedTime}`;
      },
      "Selected Event": (item: Registration) => item.selected_event,
      Role: (item: Registration) => item.role,
    });

    downloadCSV(csvContent, "delegates.csv");
  };

  // Get badge color based on delegate type
  const getDelegateTypeBadgeStyle = (delegateType: string) => {
    switch (delegateType) {
      case "Public Sector Representative (GOV)":
        return "bg-[#026FB4] text-white border-[#026FB4]";
      case "TVET Providers Representative (SCH/PLT)":
        return "bg-green-100 text-green-800 border-green-300";
      case "Donor and Partner Representative (DP)":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "Private Sector Representative (ENT)":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div>
      <Toaster richColors position="top-right" />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Registrations</h1>
        <UserProfile />
      </div>

      <Card className="p-6 border-t-4 border-t-[#026FB4]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search registrations..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleExportCSV}
          >
            <Download size={16} />
            Export Excel
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-2 border-[#026FB4] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#026FB4]/10">
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Profile</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Delegate Type</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Position</TableHead>

                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentPageItems().length > 0 ? (
                  getCurrentPageItems().map((registration, index) => (
                    <TableRow
                      key={registration.id}
                      className="hover:bg-[#026FB4]/5"
                    >
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              registration.profile_picture ||
                              "/placeholder.svg?height=40&width=40" ||
                              "/placeholder.svg"
                            }
                            alt={registration.fullname}
                            onError={(e) => {
                              e.currentTarget.src =
                                "/placeholder.svg?height=40&width=40";
                            }}
                          />
                          <AvatarFallback>
                            {registration.fullname[0]}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        {registration.fullname}
                      </TableCell>
                      <TableCell>{registration.email}</TableCell>
                      <TableCell>{registration.phone_number}</TableCell>
                      <TableCell>{registration.gender}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getDelegateTypeBadgeStyle(
                            registration.delegate_type
                          )}
                        >
                          {registration.delegate_type}
                        </Badge>
                      </TableCell>
                      <TableCell>{registration.country}</TableCell>
                      <TableCell>{registration.organization}</TableCell>
                      <TableCell>{registration.position}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                              >
                                <path
                                  d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleView(registration)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(registration)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(registration)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Remove</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No registrations found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {filteredRegistrations.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <PaginationInfo
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredRegistrations.length}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Card>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-[#026FB4]">
              View Registration
            </DialogTitle>
            <DialogDescription>
              Registration details for {selectedRegistration?.fullname}
            </DialogDescription>
          </DialogHeader>
          {selectedRegistration && (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="flex justify-center mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={
                      selectedRegistration.profile_picture ||
                      "/placeholder.svg?height=96&width=96" ||
                      "/placeholder.svg"
                    }
                    alt={selectedRegistration.fullname}
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.svg?height=96&width=96";
                    }}
                  />
                  <AvatarFallback>
                    {selectedRegistration.fullname[0]}
                  </AvatarFallback>
                </Avatar>
              </div>

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="event">Event Details</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">Full Name:</Label>
                    <div className="col-span-3">
                      {selectedRegistration.fullname}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">Email:</Label>
                    <div className="col-span-3">
                      {selectedRegistration.email}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">
                      Phone Number:
                    </Label>
                    <div className="col-span-3">
                      {selectedRegistration.phone_number}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">Country:</Label>
                    <div className="col-span-3">
                      {selectedRegistration.country}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">
                      Organization:
                    </Label>
                    <div className="col-span-3">
                      {selectedRegistration.organization}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">Position:</Label>
                    <div className="col-span-3">
                      {selectedRegistration.position}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="event" className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">
                      Delegate Type:
                    </Label>
                    <div className="col-span-3">
                      <Badge
                        variant="outline"
                        className={getDelegateTypeBadgeStyle(
                          selectedRegistration.delegate_type
                        )}
                      >
                        {selectedRegistration.delegate_type}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">Role:</Label>
                    <div className="col-span-3">
                      {selectedRegistration.role}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">Reg Date:</Label>
                    <div className="col-span-3">
                      {new Date(
                        selectedRegistration.registration_date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {" at "}
                      {new Date(
                        selectedRegistration.registration_date
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">
                      Selected Event:
                    </Label>
                    <div className="col-span-3">
                      {selectedRegistration.selected_event}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right font-medium">
                      Selected Workshops:
                    </Label>
                    <div className="col-span-3">
                      <ul className="list-disc pl-5">
                        {selectedRegistration.workshops &&
                        selectedRegistration.workshops.length > 0 ? (
                          selectedRegistration.workshops.map(
                            (workshop, index) => <li key={index}>{workshop}</li>
                          )
                        ) : (
                          <p className="italic text-muted-foreground">
                            No workshops selected
                          </p>
                        )}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">
                      Dietary Restrictions:
                    </Label>
                    <div className="col-span-3">
                      {selectedRegistration.dietary_restrictions}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">
                      Special Needs:
                    </Label>
                    <div className="col-span-3">
                      {selectedRegistration.special_needs}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollArea>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-[#026FB4]">
              Edit Registration
            </DialogTitle>
            <DialogDescription>Update registration details</DialogDescription>
          </DialogHeader>
          {editForm && (
            <ScrollArea className="h-[60vh] pr-4">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="event">Event Details</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fullname" className="text-right">
                      Full Name
                    </Label>
                    <Input
                      id="fullname"
                      value={editForm.fullname}
                      onChange={(e) =>
                        setEditForm({ ...editForm, fullname: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={editForm.phone_number}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          phone_number: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="country" className="text-right">
                      Country
                    </Label>
                    <Input
                      id="country"
                      value={editForm.country}
                      onChange={(e) =>
                        setEditForm({ ...editForm, country: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="organization" className="text-right">
                      Organization
                    </Label>
                    <Input
                      id="organization"
                      value={editForm.organization}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          organization: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="position" className="text-right">
                      Position
                    </Label>
                    <Input
                      id="position"
                      value={editForm.position}
                      onChange={(e) =>
                        setEditForm({ ...editForm, position: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="event" className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="delegate_type" className="text-right">
                      Delegate Type
                    </Label>
                    <Input
                      id="delegate_type"
                      value={editForm.delegate_type}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          delegate_type: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Input
                      id="role"
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm({ ...editForm, role: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="registration_date" className="text-right">
                      Registration Date
                    </Label>
                    <Input
                      id="registration_date"
                      type="date"
                      value={editForm.registration_date}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          registration_date: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="selected_event" className="text-right">
                      Selected Event
                    </Label>
                    <Input
                      id="selected_event"
                      value={editForm.selected_event}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          selected_event: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="dietary_restrictions"
                      className="text-right"
                    >
                      Dietary Restrictions
                    </Label>
                    <Input
                      id="dietary_restrictions"
                      value={editForm.dietary_restrictions}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          dietary_restrictions: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="special_needs" className="text-right">
                      Special Needs
                    </Label>
                    <Input
                      id="special_needs"
                      value={editForm.special_needs}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          special_needs: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollArea>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-[#026FB4] hover:bg-[#026FB4]/90"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#026FB4]">
              Delete Registration
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the registration for{" "}
              {selectedRegistration?.fullname}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-red-100 p-6">
                <Trash2 className="h-12 w-12 text-red-500" />
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
