import type { ReactNode } from "react"

import { Sidebar } from "@/components/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

type UserRole = "admin" | "coordinator" | "event-organizer"

interface LayoutProps {
  children: ReactNode
  userRole?: UserRole
}

export function Layout({ children, userRole = "admin" }: LayoutProps) {
  return (
    <TooltipProvider>
      <div className="flex h-screen">
        <Sidebar userRole={userRole} />
        <div className="flex-1 overflow-auto bg-gray-50 h-screen">
          <main className="container mx-auto p-6">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}
