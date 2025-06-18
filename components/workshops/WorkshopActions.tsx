"use client"

import { useState } from "react"
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Workshop } from "@/types"

interface WorkshopActionsProps {
  workshop: Workshop
  onView: (workshop: Workshop) => void
  onEdit: (workshop: Workshop) => void
  onDelete: (workshop: Workshop) => void
}

export function WorkshopActions({
  workshop,
  onView,
  onEdit,
  onDelete,
}: WorkshopActionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => setIsOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            onView(workshop)
            setIsOpen(false)
          }}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            onEdit(workshop)
            setIsOpen(false)
          }}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit Workshop
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => {
            onDelete(workshop)
            setIsOpen(false)
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove Workshop
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}