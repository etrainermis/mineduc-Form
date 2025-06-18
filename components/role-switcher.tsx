"use client"

import { useRole } from "./role-provider"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserCog } from "lucide-react"

export function RoleSwitcher() {
  const { userRole, setUserRole } = useRole()
  const router = useRouter()

  const switchRole = (newRole: "admin" | "coordinator" | "event-organizer") => {
    setUserRole(newRole)
    router.push(`/${newRole}/dashboard`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <UserCog className="mr-2 h-4 w-4" />
          {userRole === "admin" && "Administrator"}
          {userRole === "coordinator" && "Coordinator"}
          {userRole === "event-organizer" && "Event Organizer"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchRole("admin")}>Administrator</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchRole("coordinator")}>Coordinator</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchRole("event-organizer")}>Event Organizer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
