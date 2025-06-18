// components/coordinator/UserTable.tsx
"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  User,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Filter,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react"
import { useAssignWorkshopModal } from "@/hooks/useAssignWorkshopModal"
import { AssignWorkshopDialog } from "../../../components/coordinator/AssignWorkshopDialog"
import { useEditUserModal } from "@/components/coordinator/EditUserModal"
import { useDeleteUserModal } from "@/components/coordinator/DeleteUserModal"
import { useViewUserModal } from "@/hooks/useViewUserModal"
import { toast } from "sonner"
import { getToken } from "@/utils/token"
import { cn } from "@/lib/utils"
import { BACKEND_URL } from "@/lib/config"

export const UserTable = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<
    {
      id: string
      firstName: string
      lastName: string
      email: string
      username: string
      profile_picture?: string
      roles: { role_name: string }[]
      status: string
    }[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { openAssignWorkshop } = useAssignWorkshopModal()
  const { openEditUser } = useEditUserModal()
  const { openDeleteUser } = useDeleteUserModal()
  const { openViewUser } = useViewUserModal()
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = getToken()
      if (!token) {
        console.error("No token available")
        toast.error("Your session has expired. Please login again.")
        window.location.href = "/login"
        return
      }

      const response = await fetch(`${BACKEND_URL}/users/all`, {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.")
          window.location.href = "/login"
          return
        }
        throw new Error(`Failed to fetch users: ${response.status}`)
      }

      const data = await response.json()
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format: expected an array of users")
      }

      const eventOrganizers = data.filter((user) =>
        user.roles.some((role: { role_name: string }) => role.role_name === "EVENT_ORGANIZER"),
      )
      setUsers(eventOrganizers)
      setLoading(false)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch users"
      setError(errorMessage)
      toast.error(errorMessage)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Filter users based on search query and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter ? user.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  // Get status badge styling
  const getStatusStyles = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-600",
          icon: <CheckCircle2 className="h-3.5 w-3.5 mr-1" />,
        }
      case "INACTIVE":
        return {
          bg: "bg-red-50",
          text: "text-red-600",
          icon: <XCircle className="h-3.5 w-3.5 mr-1" />,
        }
      case "PENDING":
        return {
          bg: "bg-amber-50",
          text: "text-amber-600",
          icon: <Clock className="h-3.5 w-3.5 mr-1" />,
        }
      default:
        return {
          bg: "bg-slate-50",
          text: "text-slate-600",
          icon: <Clock className="h-3.5 w-3.5 mr-1" />,
        }
    }
  }

  // Handle refresh
  const handleRefresh = () => {
    fetchUsers()
    toast.success("User list refreshed")
  }

  return (
    <div className="w-full space-y-6 rounded-xl bg-white shadow-lg border border-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-4 p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-800">Event Organizers</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="h-9 px-3 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Refresh
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-3 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                >
                  <Filter className="h-4 w-4 mr-1.5" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-white">
                <DropdownMenuItem
                  className={cn("flex items-center gap-2", !statusFilter && "bg-slate-50")}
                  onClick={() => setStatusFilter(null)}
                >
                  All
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn(
                    "flex items-center gap-2",
                    statusFilter === "ACTIVE" && "bg-emerald-50 text-emerald-600",
                  )}
                  onClick={() => setStatusFilter("ACTIVE")}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn("flex items-center gap-2", statusFilter === "INACTIVE" && "bg-red-50 text-red-600")}
                  onClick={() => setStatusFilter("INACTIVE")}
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Inactive
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn("flex items-center gap-2", statusFilter === "PENDING" && "bg-amber-50 text-amber-600")}
                  onClick={() => setStatusFilter("PENDING")}
                >
                  <Clock className="h-3.5 w-3.5" />
                  Pending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by name, email or username..."
            className="pl-10 py-5 text-base bg-white focus-visible:ring-[#026FB4] border-slate-200 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col justify-center items-center py-16 space-y-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-t-[#026FB4] border-r-[#026FB4]/30 border-b-[#026FB4]/10 border-l-[#026FB4]/30 animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-4 border-t-transparent border-r-transparent border-b-[#026FB4] border-l-transparent animate-spin"></div>
          </div>
          <p className="text-base text-slate-500 font-medium">Loading event organizers...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 9V14M12 17.5V17.51M6.6 21H17.4C18.8 21 19.5 21 20.054 20.782C20.5348 20.5903 20.9297 20.2653 21.1925 19.846C21.5 19.3624 21.5 18.7235 21.5 17.4457V6.5543C21.5 5.2765 21.5 4.6376 21.1925 4.154C20.9297 3.7347 20.5348 3.4097 20.054 3.218C19.5 3 18.8 3 17.4 3H6.6C5.2 3 4.5 3 3.946 3.218C3.4652 3.4097 3.0703 3.7347 2.8075 4.154C2.5 4.6376 2.5 5.2765 2.5 6.5543V17.4457C2.5 18.7235 2.5 19.3624 2.8075 19.846C3.0703 20.2653 3.4652 20.5903 3.946 20.782C4.5 21 5.2 21 6.6 21Z"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Error Loading Users</h3>
          <p className="text-base text-center text-slate-500 max-w-md">{error}</p>
          <Button
            onClick={handleRefresh}
            className="mt-8 bg-[#026FB4] hover:bg-[#026FB4]/90 text-base px-6 py-6 h-auto"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* User List */}
      {!loading && !error && (
        <>
          {currentUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                <User className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">No event organizers found</h3>
              <p className="text-base text-center text-slate-500 max-w-md">
                {searchQuery
                  ? `No users match your search "${searchQuery}"`
                  : statusFilter
                    ? `No users with ${statusFilter} status found`
                    : "No event organizers available"}
              </p>
              {(searchQuery || statusFilter) && (
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter(null)
                  }}
                  variant="outline"
                  className="mt-8 text-base px-6 py-6 h-auto"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="px-6">
              <div className="divide-y divide-slate-100">
                {currentUsers.map((user) => {
                  const statusStyle = getStatusStyles(user.status)
                  return (
                    <div
                      key={user.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-5 gap-4 group hover:bg-slate-50/50 transition-colors duration-200 rounded-lg px-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12 border-0 ring-4 ring-slate-50 group-hover:ring-slate-100 transition-all duration-200">
                            {user.profile_picture ? (
                              <AvatarImage
                                src={user.profile_picture || "/placeholder.svg"}
                                alt={`${user.firstName} ${user.lastName}`}
                                className="object-cover"
                              />
                            ) : (
                              <AvatarFallback className="bg-gradient-to-br from-[#026FB4] to-[#0284d3] text-white text-lg font-medium">
                                {user.firstName[0]}
                                {user.lastName[0]}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div
                            className={cn(
                              "absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white",
                              user.status.toUpperCase() === "ACTIVE"
                                ? "bg-emerald-500"
                                : user.status.toUpperCase() === "INACTIVE"
                                  ? "bg-red-500"
                                  : "bg-amber-500",
                            )}
                          ></div>
                        </div>
                        <div>
                          <p className="font-semibold text-base text-slate-900 group-hover:text-[#026FB4] transition-colors duration-200">
                            {user.firstName} {user.lastName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-slate-500">@{user.username}</p>
                            <span className="text-slate-300">•</span>
                            <p className="text-sm text-slate-500 truncate max-w-[180px]">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:justify-end ml-16 sm:ml-0">
                        <Badge
                          className={cn("px-3 py-1.5 rounded-full flex items-center", statusStyle.bg, statusStyle.text)}
                        >
                          {statusStyle.icon}
                          {user.status}
                        </Badge>

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 px-4 rounded-full border-[#026FB4] text-[#026FB4] hover:bg-[#026FB4] hover:text-white transition-all duration-200"
                          onClick={() => openAssignWorkshop(user.id)}
                        >
                          <Calendar className="h-4 w-4 mr-1.5" />
                          Assign Workshop
                        </Button>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            onClick={() => openViewUser(user.id)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            onClick={() => openEditUser(user.id)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 rounded-full text-red-600 hover:bg-red-50"
                            onClick={() => openDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {!loading && !error && filteredUsers.length > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 p-6 bg-gradient-to-r from-slate-50 to-white">
          <div className="text-sm text-slate-600 text-center sm:text-left bg-slate-100 px-4 py-2 rounded-full font-medium">
            {indexOfFirstUser + 1} - {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} event
            organizers
            {statusFilter && <span className="ml-1">({statusFilter})</span>}
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-slate-200 hover:bg-[#EBF5FF] hover:text-[#026FB4] transition-all duration-200"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>

            <div className="hidden sm:flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = i + 1
                return (
                  <Button
                    key={pageNumber}
                    variant={pageNumber === currentPage ? "default" : "outline"}
                    size="icon"
                    className={cn(
                      "h-10 w-10 rounded-full border-slate-200 transition-all duration-200 font-medium",
                      pageNumber === currentPage
                        ? "bg-gradient-to-br from-[#026FB4] to-[#0284d3] hover:from-[#026FB4]/90 hover:to-[#0284d3]/90 text-white border-0"
                        : "hover:bg-[#EBF5FF] hover:text-[#026FB4]",
                    )}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                )
              })}

              {totalPages > 5 && (
                <>
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 cursor-default">
                    ...
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-slate-200 hover:bg-[#EBF5FF] hover:text-[#026FB4] transition-all duration-200 font-medium"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            <div className="sm:hidden bg-slate-100 px-4 py-2 rounded-full">
              <span className="text-sm text-slate-600 font-medium">
                {currentPage}/{totalPages}
              </span>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-slate-200 hover:bg-[#EBF5FF] hover:text-[#026FB4] transition-all duration-200"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      )}

      <AssignWorkshopDialog />
    </div>
  )
}
