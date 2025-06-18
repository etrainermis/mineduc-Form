"use client"

import { useEffect, useState } from "react"
import { ChevronDown, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface UserProfileProps {
  avatarUrl?: string
}

interface UserData {
  firstName?: string
  lastName?: string
  email?: string
  role?: string
}

export function UserProfile({ avatarUrl }: UserProfileProps) {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData>({})

  useEffect(() => {
    // Get user data from localStorage
    try {
      const userDataString = localStorage.getItem("userData")
      if (userDataString) {
        const parsedUserData = JSON.parse(userDataString)
        setUserData(parsedUserData)
      } else {
        // Try to get user info from token if available
        const token = localStorage.getItem("token")
        if (token) {
          // This is a simple approach - in a real app you might want to decode the JWT
          // or make an API call to get user data
          fetch("http://197.243.26.64:3037/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setUserData(data)
              // Store for future use
              localStorage.setItem("userData", JSON.stringify(data))
            })
            .catch((err) => {
              console.error("Error fetching user data:", err)
            })
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
    }
  }, [])

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("userData")

    // Show success message
    toast.success("Logged out successfully")

    // Redirect to login page
    router.push("/login")
  }

  // Generate initials from user's name
  const getInitials = () => {
    if (userData.firstName && userData.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`
    } else if (userData.firstName) {
      return userData.firstName[0]
    } else if (userData.email) {
      return userData.email[0].toUpperCase()
    }
    return "U" // Default fallback
  }

  // Get display name
  const getDisplayName = () => {
    if (userData.firstName && userData.lastName) {
      return `${userData.firstName} ${userData.lastName}`
    } else if (userData.firstName) {
      return userData.firstName
    } else if (userData.email) {
      return userData.email.split("@")[0]
    }
    return "User"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border border-blue-100">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={getDisplayName()} className="object-cover" />
            ) : (
              <AvatarFallback className="bg-blue-100 text-blue-800 text-sm sm:text-base">
                {getInitials()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col sm:hidden">
            <div className="font-medium text-sm">{getDisplayName()}</div>
            <div className="text-xs text-muted-foreground">{userData.role || "User"}</div>
          </div>
          <Button variant="ghost" size="icon" className="ml-1 h-8 w-8 sm:h-10 sm:w-10">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1">
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 p-2 text-red-500" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
