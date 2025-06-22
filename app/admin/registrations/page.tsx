"use client"

import { useEffect, useState } from "react"
import {
  Download,
  Eye,
  Pencil,
  Search,
  Trash2,
  MapPin,
  Plane,
  Calendar,
  User,
  Building,
  Utensils,
  Heart,
  Home,
  CreditCard,
} from "lucide-react"
import { Pagination, PaginationInfo } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { downloadCSV, objectsToCSV } from "@/lib/csv-utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserProfile } from "@/components/users/UserProfile"
import { toast, Toaster } from "sonner"
import { BACKEND_URL } from "@/lib/config"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Enhanced interface to match delegate form structure
interface DelegateApiResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  phonenumber: string
  gender: string
  profile_picture_url?: string
  delegate_type: string
  country: string
  partner_state?: string
  organization: string
  position: string
  dietary_restrictions: string
  special_needs: string
  accommodation_status?: string
  accommodation_details?: string
  id_type?: string
  id_number?: string
  arrival_datetime?: string
  departure_datetime?: string
  airline?: string
  registration_date: string
  selected_event?: string
  selected_activities?: string[]
  workshops?: Array<{ title: string }>
  role?: string
}

interface Registration {
  id: number
  fullname: string
  email: string
  phone_number: string
  gender: string
  profile_picture: string
  delegate_type: string
  country: string
  partner_state: string
  organization: string
  position: string
  dietary_restrictions: string
  special_needs: string
  accommodation_status: string
  accommodation_details: string
  id_type: string
  id_number: string
  arrival_datetime: string
  departure_datetime: string
  airline: string
  registration_date: string
  selected_event: string
  selected_activities: string[]
  workshops: string[]
  role: string
}

// Add a hook to fetch all workshops and map IDs to titles
function useWorkshopTitles() {
  const [workshopMap, setWorkshopMap] = useState<Record<string, string>>({})
  useEffect(() => {
    fetch(`${BACKEND_URL}/workshops`)
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const map: Record<string, string> = {}
          data.forEach((w: any) => { if (w.id && w.title) map[w.id] = w.title })
          setWorkshopMap(map)
        }
      })
      .catch(() => setWorkshopMap({}))
  }, [])
  return workshopMap
}

export default function RegistrationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editForm, setEditForm] = useState<Registration | null>(null)
  const [filterByType, setFilterByType] = useState<string>("all")
  const [filterByCountry, setFilterByCountry] = useState<string>("all")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [totalPages, setTotalPages] = useState(1)

  // Get unique delegate types and countries for filtering
  const uniqueDelegateTypes = Array.from(new Set(registrations.map((r) => r.delegate_type))).filter(Boolean)
  const uniqueCountries = Array.from(new Set(registrations.map((r) => r.country))).filter(Boolean)

  const workshopMap = useWorkshopTitles();

  // Fetch delegates from API
  useEffect(() => {
    const fetchDelegates = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/delegates`, {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch delegates")
        }

        const data = await response.json()

        // Enhanced mapping to include all form fields
        const mappedRegistrations = data.map((delegate: any) => {
          // Get workshop titles from any possible field
          let workshopTitles: string[] = [];
          if (Array.isArray(delegate.workshops)) {
            workshopTitles = delegate.workshops.map((w: any) => w.title || w.id || w)
          } else if (delegate.workshop && typeof delegate.workshop === 'object') {
            workshopTitles = [delegate.workshop.title || delegate.workshop.id || '']
          } else if (Array.isArray(delegate.workshopIds)) {
            workshopTitles = delegate.workshopIds
          } else if (Array.isArray(delegate.sessions)) {
            workshopTitles = delegate.sessions
          } else if (typeof delegate.workshopIds === 'string' && delegate.workshopIds) {
            workshopTitles = [delegate.workshopIds]
          } else if (typeof delegate.sessions === 'string' && delegate.sessions) {
            workshopTitles = [delegate.sessions]
          }

          return {
            id: delegate.id || 0,
            fullname: `${delegate.firstName} ${delegate.lastName}`,
            email: delegate.email,
            phone_number: delegate.phonenumber,
            gender: delegate.gender,
            profile_picture: delegate.profile_picture_url || "/placeholder.svg?height=40&width=40",
            delegate_type: delegate.delegate_type,
            country: delegate.country,
            partner_state: delegate.partner_state || "",
            organization: delegate.organization,
            position: delegate.position,
            dietary_restrictions: delegate.dietary_restrictions,
            special_needs: delegate.special_needs,
            accommodation_status: delegate.accommodation_status || "",
            accommodation_details: delegate.accommodation_details || "",
            id_type: delegate.id_type || "",
            id_number: delegate.id_number || "",
            arrival_datetime: delegate.arrival_datetime || "",
            departure_datetime: delegate.departure_datetime || "",
            airline: delegate.airline || "",
            registration_date: delegate.registration_date,
            selected_event: "Global Skill Connect",
            selected_activities: delegate.selected_activities || [],
            workshops: workshopTitles,
            role: delegate.role || "Delegate",
          }
        })

        setRegistrations(mappedRegistrations)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDelegates()
  }, [workshopMap])

  // Enhanced filtering
  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch =
      registration.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.partner_state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.position.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterByType === "all" || registration.delegate_type === filterByType
    const matchesCountry = filterByCountry === "all" || registration.country === filterByCountry

    return matchesSearch && matchesType && matchesCountry
  })

  // Calculate total pages based on filtered registrations
  useEffect(() => {
    setTotalPages(Math.ceil(filteredRegistrations.length / itemsPerPage))
    if (currentPage > Math.ceil(filteredRegistrations.length / itemsPerPage)) {
      setCurrentPage(1)
    }
  }, [filteredRegistrations.length, currentPage])

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredRegistrations.slice(startIndex, endIndex)
  }

  // Handle view registration
  const handleView = (registration: Registration) => {
    setSelectedRegistration(registration)
    setIsViewModalOpen(true)
  }

  // Handle edit registration
  const handleEdit = (registration: Registration) => {
    setSelectedRegistration(registration)
    setEditForm({ ...registration })
    setIsEditModalOpen(true)
  }

  // Handle delete registration
  const handleDelete = (registration: Registration) => {
    setSelectedRegistration(registration)
    setIsDeleteModalOpen(true)
  }

  // Save edited registration
  const handleSaveEdit = async () => {
    if (editForm) {
      try {
        const response = await fetch(`${BACKEND_URL}/delegates/${editForm.id}`, {
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
            partner_state: editForm.partner_state,
            organization: editForm.organization,
            position: editForm.position,
            dietary_restrictions: editForm.dietary_restrictions,
            special_needs: editForm.special_needs,
            accommodation_status: editForm.accommodation_status,
            accommodation_details: editForm.accommodation_details,
            id_type: editForm.id_type,
            id_number: editForm.id_number,
            arrival_datetime: editForm.arrival_datetime,
            departure_datetime: editForm.departure_datetime,
            airline: editForm.airline,
            selected_event: editForm.selected_event,
            selected_activities: editForm.selected_activities,
            role: editForm.role,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to update delegate")
        }

        // Refresh the delegates list
        window.location.reload()
        setIsEditModalOpen(false)
        toast.success("Delegate updated successfully")
      } catch (error) {
        console.error("Error updating delegate:", error)
        toast.error("Failed to update delegate")
      }
    }
  }

  // Confirm delete registration
  const handleConfirmDelete = async () => {
    if (selectedRegistration) {
      try {
        const token = localStorage.getItem("access")
        if (!token) {
          toast.error("Please login to delete delegate")
          return
        }

        const response = await fetch(`${BACKEND_URL}/delegates/${selectedRegistration.id}`, {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            toast.error("Session expired. Please login again")
            window.location.href = "/login"
            return
          }
          throw new Error("Failed to delete delegate")
        }

        // Refresh the page
        window.location.reload()
        setIsDeleteModalOpen(false)
        toast.success("Delegate deleted successfully")
      } catch (error) {
        console.error("Error deleting delegate:", error)
        toast.error("Failed to delete delegate")
      }
    }
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Enhanced CSV export with all fields
  const handleExportCSV = () => {
    const headers = [
      "No.",
      "Full Name",
      "Email",
      "Phone Number",
      "Gender",
      "Country",
      "Partner State",
      "Delegate Type",
      "Organization",
      "Position",
      "Accommodation Status",
      "Accommodation Details",
      "ID Type",
      "ID Number",
      "Arrival Date/Time",
      "Departure Date/Time",
      "Airline",
      "Dietary Restrictions",
      "Special Needs",
      "Registration Date",
      "Selected Event",
      "Selected Workshops",
      "Role",
    ]

    const csvContent = objectsToCSV(filteredRegistrations, headers, {
      "No.": (_, index: number) => index + 1,
      "Full Name": (item: Registration) => item.fullname,
      Email: (item: Registration) => item.email,
      "Phone Number": (item: Registration) => item.phone_number,
      Gender: (item: Registration) => item.gender,
      Country: (item: Registration) => item.country,
      "Partner State": (item: Registration) => item.partner_state,
      "Delegate Type": (item: Registration) => item.delegate_type,
      Organization: (item: Registration) => item.organization,
      Position: (item: Registration) => item.position,
      "Accommodation Status": (item: Registration) => item.accommodation_status,
      "Accommodation Details": (item: Registration) => item.accommodation_details,
      "ID Type": (item: Registration) => item.id_type,
      "ID Number": (item: Registration) => item.id_number,
      "Arrival Date/Time": (item: Registration) =>
        item.arrival_datetime ? new Date(item.arrival_datetime).toLocaleString() : "",
      "Departure Date/Time": (item: Registration) =>
        item.departure_datetime ? new Date(item.departure_datetime).toLocaleString() : "",
      Airline: (item: Registration) => item.airline,
      "Dietary Restrictions": (item: Registration) => item.dietary_restrictions,
      "Special Needs": (item: Registration) => item.special_needs,
      "Registration Date": (item: Registration) => {
        const date = new Date(item.registration_date)
        return `${date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })} at ${date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      },
      "Selected Event": (item: Registration) => item.selected_event,
      "Selected Workshops": (item: Registration) =>
        item.workshops && item.workshops.length > 0 ? item.workshops.join(", ") : "None",
      Role: (item: Registration) => item.role,
    })

    downloadCSV(csvContent, "delegates_celebrations.csv")
  }

  // Get badge color based on delegate type
  const getDelegateTypeBadgeStyle = (delegateType: string) => {
    const typeMap: Record<string, string> = {
      GOV: "bg-[#026FB4] text-white border-[#026FB4]",
      "SCH/PLT": "bg-green-100 text-green-800 border-green-300",
      DP: "bg-purple-100 text-purple-800 border-purple-300",
      ENT: "bg-orange-100 text-orange-800 border-orange-300",
      EXP: "bg-blue-100 text-blue-800 border-blue-300",
      CSO: "bg-pink-100 text-pink-800 border-pink-300",
    }
    return typeMap[delegateType] || "bg-gray-100 text-gray-800 border-gray-300"
  }

  // Format delegate type for display
  const formatDelegateType = (type: string) => {
    const typeMap: Record<string, string> = {
      GOV: "Government",
      "SCH/PLT": "Education",
      DP: "Development Partner",
      ENT: "Private Sector",
      EXP: "Expert/Professional",
      CSO: "Civil Society",
    }
    return typeMap[type] || type
  }

  return (
    <div>
      <Toaster richColors position="top-right" />
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Delegate Registrations</h1>
          <p className="text-gray-600 mt-2">Manage and view all delegate registrations for Global Skill Connect</p>
        </div>
        <UserProfile />
      </div>

      <Card className="p-6 border-t-4 border-t-[#026FB4]">
        {/* Enhanced Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, organization, country..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={filterByType} onValueChange={setFilterByType}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueDelegateTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {formatDelegateType(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterByCountry} onValueChange={setFilterByCountry}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Filter by country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {uniqueCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportCSV}>
            <Download size={16} />
            Export Excel
          </Button>
        </div>

        {/* Stats Cards */}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-2 border-[#026FB4] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-[#026FB4]/10">
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Profile</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentPageItems().length > 0 ? (
                  getCurrentPageItems().map((registration, index) => (
                    <TableRow key={registration.id} className="hover:bg-[#026FB4]/5">
                      <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={registration.profile_picture || "/placeholder.svg"}
                            alt={registration.fullname}
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                            }}
                          />
                          <AvatarFallback>{registration.fullname[0]}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{registration.fullname}</TableCell>
                      <TableCell>{registration.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-500" />
                          {registration.country}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getDelegateTypeBadgeStyle(registration.delegate_type)}>
                          {formatDelegateType(registration.delegate_type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={registration.organization}>
                        {registration.organization}
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => handleView(registration)}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(registration)}>
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
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
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
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </Card>

      {/* Enhanced View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-[#026FB4] flex items-center gap-2">
              <User className="h-5 w-5" />
              Delegate Details
            </DialogTitle>
            <DialogDescription>
              Complete registration information for {selectedRegistration?.fullname}
            </DialogDescription>
          </DialogHeader>
          {selectedRegistration && (
            <ScrollArea className="h-[70vh] pr-4">
              <div className="flex justify-center mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={selectedRegistration.profile_picture || "/placeholder.svg"}
                    alt={selectedRegistration.fullname}
                  />
                  <AvatarFallback className="text-2xl">{selectedRegistration.fullname[0]}</AvatarFallback>
                </Avatar>
              </div>

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="professional">Professional</TabsTrigger>
                  <TabsTrigger value="travel">Travel</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="event">Event</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Full Name</Label>
                      <p className="text-lg">{selectedRegistration.fullname}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Email</Label>
                      <p>{selectedRegistration.email}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Phone Number</Label>
                      <p>{selectedRegistration.phone_number}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Gender</Label>
                      <p>{selectedRegistration.gender}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Nationality</Label>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        {selectedRegistration.country}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Partner State</Label>
                      <p>{selectedRegistration.partner_state}</p>
                    </div>
                  </div>

                  {selectedRegistration.id_type && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Identification
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-600">ID Type</Label>
                          <p>{selectedRegistration.id_type}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">ID Number</Label>
                          <p className="font-mono">{selectedRegistration.id_number}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="professional" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Delegate Type</Label>
                      <Badge
                        variant="outline"
                        className={`${getDelegateTypeBadgeStyle(selectedRegistration.delegate_type)} text-base px-3 py-1`}
                      >
                        {formatDelegateType(selectedRegistration.delegate_type)}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Organization</Label>
                      <p className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        {selectedRegistration.organization}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Position</Label>
                      <p>{selectedRegistration.position}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Role</Label>
                      <p>{selectedRegistration.role}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="travel" className="space-y-4">
                  {selectedRegistration.partner_state !== "Rwanda" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-medium text-gray-700">Arrival Date & Time</Label>
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-green-600" />
                            {selectedRegistration.arrival_datetime
                              ? new Date(selectedRegistration.arrival_datetime).toLocaleString()
                              : "Not specified"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-medium text-gray-700">Departure Date & Time</Label>
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-red-600" />
                            {selectedRegistration.departure_datetime
                              ? new Date(selectedRegistration.departure_datetime).toLocaleString()
                              : "Not specified"}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-medium text-gray-700">Airline</Label>
                        <p className="flex items-center gap-2">
                          <Plane className="h-4 w-4 text-blue-600" />
                          {selectedRegistration.airline || "Not specified"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>Local delegate - No travel information required</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="requirements" className="space-y-4">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Utensils className="h-4 w-4 text-orange-600" />
                        Dietary Restrictions
                      </h4>
                      <p>{selectedRegistration.dietary_restrictions}</p>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-pink-600" />
                        Special Needs
                      </h4>
                      <p>{selectedRegistration.special_needs}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Home className="h-4 w-4 text-blue-600" />
                        Accommodation
                      </h4>
                      <div className="space-y-2">
                        <p>
                          <strong>Status:</strong> {selectedRegistration.accommodation_status}
                        </p>
                        {selectedRegistration.accommodation_details && (
                          <p>
                            <strong>Details:</strong> {selectedRegistration.accommodation_details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="event" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Selected Event</Label>
                      <p className="text-lg font-medium text-[#026FB4]">{selectedRegistration.selected_event}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Registration Date</Label>
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {new Date(selectedRegistration.registration_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        {" at "}
                        {new Date(selectedRegistration.registration_date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-gray-700">Selected Sessions</Label>
                      <div className="space-y-2">
                      <ul className="list-disc pl-5">
                        {selectedRegistration.workshops &&
                        selectedRegistration.workshops.length > 0 ? (
                          selectedRegistration.workshops.map(
                            (workshop, index) => <li key={index}>{workshop}</li>
                          )
                        ) : (
                          <p className="italic text-muted-foreground">
                            No sessions selected
                          </p>
                        )}
                      </ul>
                      </div>
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

      {/* Edit Modal - Enhanced */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-[#026FB4]">Edit Registration</DialogTitle>
            <DialogDescription>Update delegate registration details</DialogDescription>
          </DialogHeader>
          {editForm && (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                      id="fullname"
                      value={editForm.fullname}
                      onChange={(e) => setEditForm({ ...editForm, fullname: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={editForm.phone_number}
                      onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={editForm.gender}
                      onValueChange={(value) => setEditForm({ ...editForm, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={editForm.country}
                      onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partner_state">Partner State</Label>
                    <Input
                      id="partner_state"
                      value={editForm.partner_state}
                      onChange={(e) => setEditForm({ ...editForm, partner_state: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={editForm.organization}
                      onChange={(e) => setEditForm({ ...editForm, organization: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={editForm.position}
                      onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-[#026FB4] hover:bg-[#026FB4]/90">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#026FB4]">Delete Registration</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the registration for {selectedRegistration?.fullname}? This action cannot
              be undone.
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
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
