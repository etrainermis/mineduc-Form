"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Search, MoreHorizontal, Plus, Filter } from "lucide-react"
import { Pagination, PaginationInfo } from "@/components/ui/pagination"
import { Textarea } from "@/components/ui/textarea"
import { CustomAlertDialog } from "@/components/ui/custom-alert-dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UserProfile } from "@/components/users/UserProfile"
import { toast } from "sonner"
import { getToken } from "@/utils/token"
import { BACKEND_URL } from "@/lib/config"

// Workshop type definition
interface Workshop {
  id: string
  name: string
}

// Speaker type definition
interface Speaker {
  id: string
  name: string
  position: string
  shortDescription: string
  biography: string
  status: "confirmed" | "pending"
  published: boolean
  profile_picture_url: string | null
}

// Add API response type
interface APISpeaker {
  id: string
  name: string
  position: string
  shortDescription: string
  biography: string
  status: string
  published: boolean
  profile_picture_url: string | null
}

// Remove sample data
const workshops: Workshop[] = []

interface SpeakerFormData {
  name: string
  position: string
  shortDescription: string
  biography: string
  status: "confirmed" | "pending"
  profile_picture?: File | null
  imageUrl?: string // For UI display only
}

export default function SpeakersPage() {
  // State management
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedWorkshops, setSelectedWorkshops] = useState<string[]>([])
  const [newSpeaker, setNewSpeaker] = useState<SpeakerFormData>({
    name: "",
    position: "",
    shortDescription: "",
    biography: "",
    status: "pending",
    profile_picture: null,
    imageUrl: "/placeholder.svg?height=100&width=100",
  })

  // Add useEffect to fetch speakers
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const token = getToken()
        if (!token) {
          toast.error("Your session has expired. Please login again.")
          window.location.href = "/login"
          return
        }

        const response = await fetch(`${BACKEND_URL}/speakers/getAllSpeakers`, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            toast.error("Your session has expired. Please login again.")
            window.location.href = "/login"
            return
          }
          throw new Error("Failed to fetch speakers")
        }

        const data = (await response.json()) as APISpeaker[]
        console.log("Fetched speakers:", data)

        // Transform API data to match our Speaker type
        const formattedSpeakers = data.map((speaker: APISpeaker) => ({
          id: speaker.id,
          name: speaker.name,
          position: speaker.position,
          shortDescription: speaker.shortDescription,
          biography: speaker.biography,
          status: speaker.status.toLowerCase() as "confirmed" | "pending",
          published: speaker.published,
          profile_picture_url: speaker.profile_picture_url,
        }))

        setSpeakers(formattedSpeakers)
      } catch (error) {
        console.error("Error fetching speakers:", error)
        toast.error("Failed to fetch speakers")
      }
    }

    fetchSpeakers()
  }, [])

  // Pagination settings
  const itemsPerPage = 8
  const totalPages = Math.ceil(speakers.length / itemsPerPage)

  // Filtered and paginated speakers
  const filteredSpeakers = speakers.filter((speaker) => {
    // Text search filter
    const matchesSearch =
      speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.position.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus =
      activeTab === "all" ||
      (activeTab === "confirmed" && speaker.status === "confirmed") ||
      (activeTab === "pending" && speaker.status === "pending")

    return matchesSearch && matchesStatus
  })

  const paginatedSpeakers = filteredSpeakers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handler functions
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setCurrentPage(1)
  }

  const handleWorkshopFilter = (workshopId: string) => {
    setSelectedWorkshops((prev) => {
      if (prev.includes(workshopId)) {
        return prev.filter((id) => id !== workshopId)
      } else {
        return [...prev, workshopId]
      }
    })
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedWorkshops([])
    setSearchQuery("")
    setActiveTab("all")
    setCurrentPage(1)
  }

  const handleViewDetails = (speaker: Speaker) => {
    setSelectedSpeaker(speaker)
    setIsDetailsOpen(true)
  }

  const handleEdit = (speaker: Speaker) => {
    setSelectedSpeaker(speaker)
    setNewSpeaker({
      name: speaker.name,
      position: speaker.position,
      shortDescription: speaker.shortDescription,
      biography: speaker.biography,
      status: speaker.status,
      imageUrl: speaker.profile_picture_url || "/placeholder.svg?height=100&width=100",
    })
    setIsEditDialogOpen(true)
    setFormStep(1)
  }

  const handleDelete = (speaker: Speaker) => {
    setSelectedSpeaker(speaker)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedSpeaker) return

    try {
      const token = getToken()
      if (!token) {
        toast.error("Your session has expired. Please login again.")
        window.location.href = "/login"
        return
      }

      const response = await fetch(`${BACKEND_URL}/speakers/${selectedSpeaker.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.")
          window.location.href = "/login"
          return
        }
        throw new Error("Failed to delete speaker")
      }

      // Remove the speaker from the list
      setSpeakers((prev) => prev.filter((speaker) => speaker.id !== selectedSpeaker.id))
      toast.success("Speaker deleted successfully")
      setIsDeleteDialogOpen(false)
      setSelectedSpeaker(null)
    } catch (error) {
      console.error("Error deleting speaker:", error)
      toast.error("Failed to delete speaker")
    }
  }

  const handleAddSpeaker = () => {
    setNewSpeaker({
      name: "",
      position: "",
      shortDescription: "",
      biography: "",
      status: "pending",
      profile_picture: null,
      imageUrl: "/placeholder.svg?height=100&width=100",
    })
    setIsAddDialogOpen(true)
    setFormStep(1)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewSpeaker((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setNewSpeaker((prev) => ({
        ...prev,
        imageUrl,
        profile_picture: file,
      }))
    }
  }

  const handleNextStep = () => {
    setFormStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setFormStep((prev) => prev - 1)
  }

  const handleSubmitNewSpeaker = async () => {
    try {
      const token = getToken()
      if (!token) {
        toast.error("Your session has expired. Please login again.")
        window.location.href = "/login"
        return
      }

      const formData = new FormData()
      formData.append("name", newSpeaker.name)
      formData.append("position", newSpeaker.position)
      formData.append("shortDescription", newSpeaker.shortDescription)
      formData.append("biography", newSpeaker.biography)
      formData.append("status", newSpeaker.status.toUpperCase())

      if (newSpeaker.profile_picture) {
        formData.append("profile_picture", newSpeaker.profile_picture)
      }

      const response = await fetch(`${BACKEND_URL}/speakers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to create speaker")
      }

      const createdSpeaker = await response.json()
      setSpeakers((prev) => [
        ...prev,
        {
          ...createdSpeaker,
          profile_picture_url: createdSpeaker.profile_picture_url,
          status: createdSpeaker.status.toLowerCase() as "confirmed" | "pending",
        },
      ])

      toast.success("Speaker created successfully")
      setIsAddDialogOpen(false)
      setFormStep(1)
    } catch (error) {
      console.error("Error creating speaker:", error)
      toast.error("Failed to create speaker")
    }
  }

  const handleUpdateSpeaker = async () => {
    if (!selectedSpeaker) return

    try {
      const token = getToken()
      if (!token) {
        toast.error("Your session has expired. Please login again.")
        window.location.href = "/login"
        return
      }

      const formData = new FormData()
      formData.append("name", newSpeaker.name)
      formData.append("position", newSpeaker.position)
      formData.append("shortDescription", newSpeaker.shortDescription)
      formData.append("biography", newSpeaker.biography)
      formData.append("status", newSpeaker.status.toUpperCase())

      if (newSpeaker.profile_picture) {
        formData.append("profile_picture", newSpeaker.profile_picture)
      }

      const response = await fetch(`${BACKEND_URL}/speakers/${selectedSpeaker.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.")
          window.location.href = "/login"
          return
        }
        throw new Error("Failed to update speaker")
      }

      const updatedSpeaker = await response.json()
      console.log("Updated speaker:", updatedSpeaker)

      // Update the speaker in the list
      setSpeakers((prev) =>
        prev.map((speaker) =>
          speaker.id === selectedSpeaker.id
            ? {
                ...updatedSpeaker,
                profile_picture_url: updatedSpeaker.profile_picture
                  ? `${BACKEND_URL}${updatedSpeaker.profile_picture}`
                  : null,
              }
            : speaker,
        ),
      )

      toast.success("Speaker updated successfully")
      setIsEditDialogOpen(false)
      setFormStep(1)
    } catch (error) {
      console.error("Error updating speaker:", error)
      toast.error("Failed to update speaker")
    }
  }

  const handleApproveSpeaker = (speaker: Speaker) => {
    setSelectedSpeaker(speaker)
    setIsApproveDialogOpen(true)
  }

  const confirmApproveSpeaker = async () => {
    if (!selectedSpeaker) return

    try {
      const token = getToken()
      if (!token) {
        toast.error("Your session has expired. Please login again.")
        window.location.href = "/login"
        return
      }

      const response = await fetch(`${BACKEND_URL}/speakers/${selectedSpeaker.id}/approve`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.")
          window.location.href = "/login"
          return
        }
        throw new Error("Failed to approve speaker")
      }

      // Update the speaker status in the list
      setSpeakers((prev) =>
        prev.map((speaker) => (speaker.id === selectedSpeaker.id ? { ...speaker, status: "confirmed" } : speaker)),
      )

      toast.success("Speaker approved successfully")
      setIsApproveDialogOpen(false)
      setSelectedSpeaker(null)
    } catch (error) {
      console.error("Error approving speaker:", error)
      toast.error("Failed to approve speaker")
    }
  }

  const handleCancelSpeaker = (speaker: Speaker) => {
    setSelectedSpeaker(speaker)
    setIsCancelDialogOpen(true)
  }

  const confirmCancelSpeaker = () => {
    if (selectedSpeaker) {
      setSpeakers(speakers.map((s) => (s.id === selectedSpeaker.id ? { ...selectedSpeaker, status: "pending" } : s)))
      setIsCancelDialogOpen(false)
      setSelectedSpeaker(null)
    }
  }

  const handlePublishSpeaker = (speaker: Speaker) => {
    setSelectedSpeaker(speaker)
    setIsPublishDialogOpen(true)
  }

  const confirmPublishSpeaker = async () => {
    if (!selectedSpeaker) return

    try {
      const token = getToken()
      if (!token) {
        toast.error("Your session has expired. Please login again.")
        window.location.href = "/login"
        return
      }

      const response = await fetch(`${BACKEND_URL}/speakers/${selectedSpeaker.id}/toggle-publish`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.")
          window.location.href = "/login"
          return
        }
        throw new Error("Failed to publish speaker")
      }

      // Update the speaker published status in the list
      setSpeakers((prev) =>
        prev.map((speaker) =>
          speaker.id === selectedSpeaker.id ? { ...speaker, published: !speaker.published } : speaker,
        ),
      )

      toast.success(`Speaker ${selectedSpeaker.published ? "unpublished" : "published"} successfully`)
      setIsPublishDialogOpen(false)
      setSelectedSpeaker(null)
    } catch (error) {
      console.error("Error publishing speaker:", error)
      toast.error("Failed to publish speaker")
    }
  }

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-[#026FB4]"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Speakers</h1>
        <UserProfile />
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[#026FB4]">Speakers Management</CardTitle>
            <CardDescription>Manage all speakers for your events and workshops.</CardDescription>
          </div>
          <Button onClick={handleAddSpeaker} className="bg-[#026FB4] hover:bg-[#025a91] text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Speaker
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search speakers..." className="pl-8" value={searchQuery} onChange={handleSearch} />
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
                Filter
                {selectedWorkshops.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedWorkshops.length}
                  </Badge>
                )}
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Speakers</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </Tabs>

            {isFilterOpen && (
              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Filter by Workshop</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {workshops.map((workshop) => (
                    <div key={workshop.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`workshop-${workshop.id}`}
                        checked={selectedWorkshops.includes(workshop.id)}
                        onChange={() => handleWorkshopFilter(workshop.id)}
                        className="h-4 w-4 rounded border-gray-300 text-[#026FB4] focus:ring-[#026FB4]"
                      />
                      <label htmlFor={`workshop-${workshop.id}`} className="text-sm">
                        {workshop.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedSpeakers.map((speaker) => (
              <Card
                key={speaker.id}
                className="overflow-hidden cursor-pointer"
                onClick={() => handleViewDetails(speaker)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className={`h-2 w-full ${getStatusColor(speaker.status)}`} />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 flex-grow">
                          <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={speaker.profile_picture_url || "/placeholder.svg?height=100&width=100"}
                              alt={speaker.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                              priority={false}
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium text-[#026FB4] break-words">{speaker.name}</h3>
                            <p className="text-sm text-muted-foreground">{speaker.position}</p>
                            <div className="mt-1 flex items-center">
                              <div className={`h-2 w-2 rounded-full ${getStatusColor(speaker.status)} mr-2`}></div>
                              <span className="text-xs text-muted-foreground">
                                {speaker.status === "confirmed" ? "Confirmed" : "Pending"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-[#026FB4] flex-shrink-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewDetails(speaker)
                              }}
                            >
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEdit(speaker)
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            {speaker.status === "pending" ? (
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleApproveSpeaker(speaker)
                                }}
                                className="text-green-600"
                              >
                                Approve
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCancelSpeaker(speaker)
                                }}
                                className="text-orange-600"
                              >
                                Cancel
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handlePublishSpeaker(speaker)
                              }}
                              className="text-[#026FB4]"
                            >
                              {speaker.published ? "Unpublish" : "Publish"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(speaker)
                              }}
                              className="text-red-600"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {paginatedSpeakers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No speakers found matching your filters.</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {paginatedSpeakers.length > 0 && (
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <PaginationInfo
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredSpeakers.length}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                siblingCount={1}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Speaker Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#026FB4]">Speaker Details</DialogTitle>
          </DialogHeader>
          {selectedSpeaker && (
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 rounded-full overflow-hidden">
                  <Image
                    src={selectedSpeaker.profile_picture_url || "/placeholder.svg?height=100&width=100"}
                    alt={selectedSpeaker.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#026FB4]">{selectedSpeaker.name}</h2>
                  <p className="text-muted-foreground">{selectedSpeaker.position}</p>
                  <div className="mt-1 flex items-center">
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(selectedSpeaker.status)} mr-2`}></div>
                    <span className="text-sm text-muted-foreground">
                      {selectedSpeaker.status === "confirmed" ? "Confirmed" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <h3 className="font-medium text-[#026FB4]">Short Description</h3>
                <p>{selectedSpeaker.shortDescription}</p>
              </div>

              <div className="grid gap-2">
                <h3 className="font-medium text-[#026FB4]">Biography</h3>
                <p>{selectedSpeaker.biography}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)} className="bg-[#026FB4] hover:bg-[#025a91] text-white">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Custom Alert Dialogs */}
      <CustomAlertDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Speaker"
        description={`Are you sure you want to delete ${selectedSpeaker?.name}?`}
      />

      <CustomAlertDialog
        open={isApproveDialogOpen}
        onClose={() => setIsApproveDialogOpen(false)}
        onConfirm={confirmApproveSpeaker}
        title="Approve Speaker"
        description={`Are you sure you want to approve ${selectedSpeaker?.name}?`}
      />

      <CustomAlertDialog
        open={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={confirmCancelSpeaker}
        title="Cancel Speaker"
        description={`Are you sure you want to cancel ${selectedSpeaker?.name}?`}
      />

      <CustomAlertDialog
        open={isPublishDialogOpen}
        onClose={() => setIsPublishDialogOpen(false)}
        onConfirm={confirmPublishSpeaker}
        title={selectedSpeaker?.published ? "Unpublish Speaker" : "Publish Speaker"}
        description={`Are you sure you want to ${selectedSpeaker?.published ? "unpublish" : "publish"} ${selectedSpeaker?.name} ${selectedSpeaker?.published ? "from" : "to"} the landing page?`}
      />

      {/* Add Speaker Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#026FB4]">Add New Speaker</DialogTitle>
            <DialogDescription>
              {formStep === 1 ? "Enter basic information" : "Enter detailed information"}
            </DialogDescription>
          </DialogHeader>

          {formStep === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={newSpeaker.name}
                  onChange={handleFormChange}
                  placeholder="Enter speaker name"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="position" className="text-sm font-medium">
                  Position
                </label>
                <Input
                  id="position"
                  name="position"
                  value={newSpeaker.position}
                  onChange={handleFormChange}
                  placeholder="Enter speaker position"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="image" className="text-sm font-medium">
                  Profile Picture
                </label>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden border">
                      <Image
                        src={newSpeaker.imageUrl || "/placeholder.svg?height=100&width=100"}
                        alt="Speaker preview"
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      htmlFor="picture-upload"
                      className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Upload Picture
                      <input
                        id="picture-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="shortDescription" className="text-sm font-medium">
                  Short Description
                </label>
                <Input
                  id="shortDescription"
                  name="shortDescription"
                  value={newSpeaker.shortDescription}
                  onChange={handleFormChange}
                  placeholder="Enter a short description"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="biography" className="text-sm font-medium">
                  Biography
                </label>
                <Textarea
                  id="biography"
                  name="biography"
                  value={newSpeaker.biography}
                  onChange={handleFormChange}
                  placeholder="Enter detailed biography"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={newSpeaker.status}
                  onChange={(e) =>
                    setNewSpeaker((prev) => ({ ...prev, status: e.target.value as "confirmed" | "pending" }))
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          )}

          <DialogFooter>
            {formStep === 1 ? (
              <>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNextStep} className="bg-[#026FB4] hover:bg-[#025a91] text-white">
                  Next
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button onClick={handleSubmitNewSpeaker} className="bg-[#026FB4] hover:bg-[#025a91] text-white">
                  Add Speaker
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Speaker Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#026FB4]">Edit Speaker</DialogTitle>
            <DialogDescription>
              {formStep === 1 ? "Edit basic information" : "Edit detailed information"}
            </DialogDescription>
          </DialogHeader>

          {formStep === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="edit-name"
                  name="name"
                  value={newSpeaker.name}
                  onChange={handleFormChange}
                  placeholder="Enter speaker name"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="edit-position" className="text-sm font-medium">
                  Position
                </label>
                <Input
                  id="edit-position"
                  name="position"
                  value={newSpeaker.position}
                  onChange={handleFormChange}
                  placeholder="Enter speaker position"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="edit-image" className="text-sm font-medium">
                  Profile Picture
                </label>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden border">
                      <Image
                        src={newSpeaker.imageUrl || "/placeholder.svg?height=100&width=100"}
                        alt="Speaker preview"
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      htmlFor="edit-picture-upload"
                      className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Upload Picture
                      <input
                        id="edit-picture-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-shortDescription" className="text-sm font-medium">
                  Short Description
                </label>
                <Input
                  id="edit-shortDescription"
                  name="shortDescription"
                  value={newSpeaker.shortDescription}
                  onChange={handleFormChange}
                  placeholder="Enter a short description"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="edit-biography" className="text-sm font-medium">
                  Biography
                </label>
                <Textarea
                  id="edit-biography"
                  name="biography"
                  value={newSpeaker.biography}
                  onChange={handleFormChange}
                  placeholder="Enter detailed biography"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="edit-status" className="text-sm font-medium">
                  Status
                </label>
                <select
                  id="edit-status"
                  name="status"
                  value={newSpeaker.status}
                  onChange={(e) =>
                    setNewSpeaker((prev) => ({ ...prev, status: e.target.value as "confirmed" | "pending" }))
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          )}

          <DialogFooter>
            {formStep === 1 ? (
              <>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNextStep} className="bg-[#026FB4] hover:bg-[#025a91] text-white">
                  Next
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button onClick={handleUpdateSpeaker} className="bg-[#026FB4] hover:bg-[#025a91] text-white">
                  Update Speaker
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
