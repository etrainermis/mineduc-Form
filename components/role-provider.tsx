"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

type UserRole = "admin" | "coordinator" | "event-organizer"

interface RoleContextType {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>("admin")
  const pathname = usePathname()

  // Detect role from URL path
  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setUserRole("admin")
    } else if (pathname.startsWith("/coordinator")) {
      setUserRole("coordinator")
    } else if (pathname.startsWith("/event-organizer")) {
      setUserRole("event-organizer")
    }
  }, [pathname])

  return <RoleContext.Provider value={{ userRole, setUserRole }}>{children}</RoleContext.Provider>
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}
