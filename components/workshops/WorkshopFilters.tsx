import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface WorkshopFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string | null;
  setCategoryFilter: (category: string | null) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  setCurrentPage: (page: number) => void;
}

export function WorkshopFilters({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  setCurrentPage,
}: WorkshopFiltersProps) {
  const toggleCategoryFilter = (category: string) => {
    if (categoryFilter === category) {
      setCategoryFilter(null);
    } else {
      setCategoryFilter(category);
    }
    setCurrentPage(1);
  };

  const toggleStatusFilter = (status: string) => {
    if (statusFilter === status) {
      setStatusFilter(null);
    } else {
      setStatusFilter(status);
    }
    setCurrentPage(1);
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search workshops..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "border-blue-200 bg-blue-100",
          categoryFilter === "Technology" ? "border-blue-500 bg-blue-200" : ""
        )}
        onClick={() => toggleCategoryFilter("Technology")}
      >
        <Badge className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-0">
          T
        </Badge>
      </Button>
      {/* Add other category filter buttons */}
      <Button
        variant="outline"
        className={cn(
          "border-blue-200 bg-blue-100",
          statusFilter === "upcoming" ? "border-blue-500 bg-blue-200" : ""
        )}
        onClick={() => toggleStatusFilter("upcoming")}
      >
        Upcoming
      </Button>
      {/* Add other status filter buttons */}
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}