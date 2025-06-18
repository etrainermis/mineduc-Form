import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Workshop {
  id: string;
  title: string;
  description?: string;
  date?: string;
  [key: string]: unknown; // Use `unknown` for additional properties
}

interface WorkshopPaginationProps {
  filteredWorkshops: Workshop[];
  currentPage: number;
  totalPages: number;
  indexOfFirstWorkshop: number;
  indexOfLastWorkshop: number;
  handlePageChange: (page: number) => void;
}

export function WorkshopPagination({
  filteredWorkshops,
  currentPage,
  totalPages,
  indexOfFirstWorkshop,
  indexOfLastWorkshop,
  handlePageChange,
}: WorkshopPaginationProps) {
  if (filteredWorkshops.length === 0) return null;

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        {`${indexOfFirstWorkshop + 1}-${Math.min(
          indexOfLastWorkshop,
          filteredWorkshops.length
        )} of ${filteredWorkshops.length} Entries`}
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {currentPage > 3 && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(1)}
          >
            1
          </Button>
        )}

        {currentPage > 4 && (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            ...
          </Button>
        )}

        {Array.from(
          {
            length: Math.min(5, totalPages - Math.max(0, currentPage - 3)),
          },
          (_, i) => {
            const pageNumber = Math.max(1, currentPage - 2) + i;
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="icon"
                className={cn(
                  "h-8 w-8",
                  currentPage === pageNumber ? "bg-blue-500" : ""
                )}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
            );
          }
        )}

        {currentPage < totalPages - 3 && (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            ...
          </Button>
        )}

        {currentPage < totalPages - 2 && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}