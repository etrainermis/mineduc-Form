"use client"

import type * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  ...props
}: PaginationProps) {
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = siblingCount * 2 + 3 // First, last, current, and siblings on each side

    // Always show first page
    items.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="icon"
        className={cn(
          "h-9 w-9",
          currentPage === 1 ? "bg-[#026FB4] hover:bg-[#026FB4]/90" : "text-[#026FB4] hover:text-[#026FB4]/90"
        )}
        onClick={() => onPageChange(1)}
      >
        1
      </Button>,
    )

    // Calculate range of pages to show
    let startPage = Math.max(2, currentPage - siblingCount)
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3)

    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3) + 1)
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push(
        <span key="start-ellipsis" className="px-2 text-[#026FB4]">
          ...
        </span>,
      )
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="icon"
          className={cn(
            "h-9 w-9",
            currentPage === i ? "bg-[#026FB4] hover:bg-[#026FB4]/90" : "text-[#026FB4] hover:text-[#026FB4]/90"
          )}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>,
      )
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1 && totalPages > 2) {
      items.push(
        <span key="end-ellipsis" className="px-2 text-[#026FB4]">
          ...
        </span>,
      )
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="icon"
          className={cn(
            "h-9 w-9",
            currentPage === totalPages ? "bg-[#026FB4] hover:bg-[#026FB4]/90" : "text-[#026FB4] hover:text-[#026FB4]/90"
          )}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>,
      )
    }

    return items
  }

  return (
    <div className={cn("flex items-center justify-center space-x-2", className)} {...props}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="text-[#026FB4] hover:text-[#026FB4]/90"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {renderPaginationItems()}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="text-[#026FB4] hover:text-[#026FB4]/90"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function PaginationInfo({
  currentPage,
  itemsPerPage,
  totalItems,
  className,
  ...props
}: {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className={cn("text-sm text-muted-foreground", className)} {...props}>
      Showing {startItem} to {endItem} of {totalItems} entries
    </div>
  )
}
