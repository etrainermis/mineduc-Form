"use client"
import { useState, useEffect } from "react"
import { Search, Eye, Edit, Trash, Grid, List } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useEditUserModal } from "@/hooks/useEditUserModal"
import { useDeleteUserModal } from "@/hooks/useDeleteUserModal"
import { toast } from "sonner"
import { getToken } from "@/utils/token"
import { BACKEND_URL } from "@/lib/config"

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  gender: string
  national_id: string
  phonenumber: string
  status: string
  roles: Array<{
    id: number
    role_name: string
    createdAt: string
    updatedAt: string
  }>
  createdAt: string
  updatedAt: string
}

interface UserTableProps {
  refreshUsers: () => void
}

export function UserTable({ refreshUsers }: UserTableProps) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [currentPage, setCurrentPage] = useState(1)
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const itemsPerPage = 5

  const { openEditUser } = useEditUserModal()
  const { openDeleteUser } = useDeleteUserModal()

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
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Fetched users:", data)

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format: expected an array of users")
      }

      // Filter users to only show COORDINATOR and EVENT_ORGANIZER roles
      const filteredData = data.filter((user: User) =>
        user.roles.some((role) => role.role_name === "COORDINATOR" || role.role_name === "EVENT_ORGANIZER"),
      )

      setUsers(filteredData)
    } catch (error) {
      console.error("Error fetching users:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch users"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [refreshUsers])

  const handleViewUser = (user: User) => {
    toast.info(`Viewing ${user.firstName} ${user.lastName}'s profile`)
  }

  const handleRefresh = () => {
    fetchUsers()
    toast.success("User list refreshed")
  }

  // Filter users based on search term and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter ? user.roles.some((role) => role.role_name === roleFilter) : true

    return matchesSearch && matchesRole
  })

  // Calculate pagination
  const indexOfLastUser = currentPage * itemsPerPage
  const indexOfFirstUser = indexOfLastUser - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const toggleRoleFilter = (role: string) => {
    if (roleFilter === role) {
      setRoleFilter(null)
    } else {
      setRoleFilter(role)
    }
  }

  // Update the getRoleColor function to use more vibrant colors
  const getRoleColor = (role: string) => {
    switch (role) {
      case "EVENT_ORGANIZER":
        return {
          bg: "bg-emerald-500",
          bgLight: "bg-emerald-50",
          text: "text-emerald-600",
          border: "border-emerald-200",
          ring: "ring-emerald-500/30",
          gradient: "from-emerald-500 to-teal-600",
        }
      case "COORDINATOR":
        return {
          bg: "bg-[#026FB4]",
          bgLight: "bg-[#EBF5FF]",
          text: "text-[#026FB4]",
          border: "border-[#026FB4]",
          ring: "ring-[#026FB4]/30",
          gradient: "from-[#026FB4] to-[#0284d3]",
        }
      default:
        return {
          bg: "bg-slate-400",
          bgLight: "bg-slate-50",
          text: "text-slate-600",
          border: "border-slate-200",
          ring: "ring-slate-400/30",
          gradient: "from-slate-400 to-slate-500",
        }
    }
  }

  // Replace the entire return statement with the enhanced UI
  return (
    <div className="w-full space-y-8">
      {/* Loading state */}
      {loading && (
        <div className="flex flex-col justify-center items-center py-16 space-y-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-t-[#026FB4] border-r-[#026FB4]/30 border-b-[#026FB4]/10 border-l-[#026FB4]/30 animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-4 border-t-transparent border-r-transparent border-b-[#026FB4] border-l-transparent animate-spin"></div>
          </div>
          <p className="text-base text-slate-500 font-medium">Loading users...</p>
        </div>
      )}

      {/* Error state */}
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

      {/* Search and Filters */}
      {!loading && !error && (
        <>
          <div className="rounded-xl border-0 bg-gradient-to-br from-white to-slate-50 shadow-lg">
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search users..."
                    className="pl-12 py-6 text-base bg-white focus-visible:ring-[#026FB4] border-slate-200 rounded-xl shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-12 w-12 rounded-full border-slate-200 transition-all duration-200 text-base font-semibold shadow-sm",
                      roleFilter === "COORDINATOR"
                        ? "bg-gradient-to-br from-[#026FB4] to-[#0284d3] text-white border-0"
                        : "bg-white hover:bg-[#EBF5FF] hover:text-[#026FB4]",
                    )}
                    onClick={() => toggleRoleFilter("COORDINATOR")}
                  >
                    C
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-12 w-12 rounded-full border-slate-200 transition-all duration-200 text-base font-semibold shadow-sm",
                      roleFilter === "EVENT_ORGANIZER"
                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0"
                        : "bg-white hover:bg-emerald-50 hover:text-emerald-600",
                    )}
                    onClick={() => toggleRoleFilter("EVENT_ORGANIZER")}
                  >
                    E
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full border-slate-200 bg-white hover:bg-[#EBF5FF] hover:text-[#026FB4] transition-all duration-200 shadow-sm"
                    onClick={handleRefresh}
                  >
                    R
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="rounded-xl border-0 bg-white shadow-lg overflow-hidden">
            {/* View Controls */}
            <div className="flex justify-between items-center p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <div className="text-base font-medium text-slate-700">
                {filteredUsers.length} {filteredUsers.length === 1 ? "User" : "Users"}{" "}
                {roleFilter ? `(${roleFilter})` : ""}
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-10 w-10 rounded-md transition-all duration-200",
                      viewMode === "grid" ? "bg-white text-[#026FB4] shadow-sm" : "text-slate-500 hover:text-[#026FB4]",
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-10 w-10 rounded-md transition-all duration-200",
                      viewMode === "list" ? "bg-white text-[#026FB4] shadow-sm" : "text-slate-500 hover:text-[#026FB4]",
                    )}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* User Cards */}
            <div className="p-5 sm:p-6">
              <div
                className={cn(
                  "space-y-4",
                  viewMode === "grid" && "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 space-y-0",
                )}
              >
                {currentUsers.map((user) => {
                  const userRole = user.roles[0]?.role_name || "NO_ROLE"
                  const roleColors = getRoleColor(userRole)
                  return (
                    <div
                      key={user.id}
                      className={cn(
                        "group flex flex-col gap-5 rounded-xl bg-white p-5 border-0 hover:shadow-xl transition-all duration-300",
                        viewMode === "list" ? "sm:flex-row sm:items-center sm:justify-between" : "h-full",
                        "shadow-md hover:shadow-[#026FB4]/10",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-5",
                          viewMode === "grid" && "flex-col text-center sm:flex-row sm:text-left",
                        )}
                      >
                        <div className={cn("relative", viewMode === "grid" && "mx-auto sm:mx-0")}>
                          <Avatar
                            className={cn(
                              "ring-4 ring-transparent group-hover:ring-[#026FB4]/10 transition-all duration-300",
                              viewMode === "grid" ? "h-20 w-20" : "h-14 w-14 sm:h-16 sm:w-16",
                            )}
                          >
                            <AvatarFallback
                              className={cn(
                                "font-semibold bg-gradient-to-br text-white",
                                `from-${roleColors.gradient}`,
                                viewMode === "grid" ? "text-2xl" : "text-lg",
                              )}
                            >
                              {user.firstName[0] + user.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={cn(
                              "absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white",
                              roleColors.bg,
                            )}
                          ></div>
                        </div>
                        <div className={cn("flex flex-col gap-1", viewMode === "grid" && "w-full")}>
                          <span
                            className={cn(
                              "font-semibold text-base sm:text-lg text-slate-900 group-hover:text-[#026FB4] transition-colors duration-200",
                              viewMode === "grid" && "mt-2",
                            )}
                          >
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="text-sm text-slate-500">{user.email}</span>
                          <div
                            className={cn(
                              "flex items-center gap-2 mt-2",
                              viewMode === "grid" && "justify-center sm:justify-start",
                            )}
                          >
                            <Badge
                              className={cn(
                                "px-3 py-1 text-sm font-medium rounded-full",
                                roleColors.bgLight,
                                roleColors.text,
                                roleColors.border,
                              )}
                            >
                              {userRole}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="px-3 py-1 text-sm font-medium rounded-full border-slate-200 text-slate-500"
                            >
                              {user.phonenumber || "No Phone"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "flex items-center gap-3",
                          viewMode === "list" ? "sm:gap-4 justify-end" : "justify-center sm:justify-end mt-3",
                        )}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-10 rounded-lg text-sm font-medium text-slate-600 hover:bg-[#EBF5FF] hover:text-[#026FB4]"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-10 rounded-lg text-sm font-medium text-slate-600 hover:bg-[#EBF5FF] hover:text-[#026FB4]"
                          onClick={() => openEditUser(user)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-10 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50"
                          onClick={() => openDeleteUser(user)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {filteredUsers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 px-4">
                  <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="#94A3B8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">No users found</h3>
                  <p className="text-base text-center text-slate-500 max-w-md">
                    {searchQuery
                      ? `No users match your search "${searchQuery}"`
                      : roleFilter
                        ? `No users with the ${roleFilter} role found`
                        : "No users available"}
                  </p>
                  {(searchQuery || roleFilter) && (
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        setRoleFilter(null)
                      }}
                      variant="outline"
                      className="mt-8 text-base px-6 py-6 h-auto"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 p-5 sm:p-6 bg-gradient-to-r from-slate-50 to-white">
              <div className="text-sm text-slate-600 text-center sm:text-left bg-slate-100 px-4 py-2 rounded-full font-medium">
                {filteredUsers.length > 0
                  ? `${indexOfFirstUser + 1}-${Math.min(
                      indexOfLastUser,
                      filteredUsers.length,
                    )} of ${filteredUsers.length} ${filteredUsers.length === 1 ? "User" : "Users"}`
                  : "0 Users"}
              </div>
              {filteredUsers.length > 0 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-slate-200 hover:bg-[#EBF5FF] hover:text-[#026FB4] transition-all duration-200"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
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
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const pageNumber = i + 1
                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "default" : "outline"}
                          size="icon"
                          className={cn(
                            "h-10 w-10 rounded-full border-slate-200 transition-all duration-200 font-medium",
                            currentPage === pageNumber
                              ? "bg-gradient-to-br from-[#026FB4] to-[#0284d3] hover:from-[#026FB4]/90 hover:to-[#0284d3]/90 text-white border-0"
                              : "hover:bg-[#EBF5FF] hover:text-[#026FB4]",
                          )}
                          onClick={() => handlePageChange(pageNumber)}
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
                          onClick={() => handlePageChange(totalPages)}
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
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
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
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
