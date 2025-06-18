import { Workshop } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, Trash, MoreVertical, Users, Calendar } from "lucide-react";

interface WorkshopListItemProps {
  workshop: Workshop;
  handleViewWorkshop: (workshop: Workshop) => void;
  handleEditWorkshop: (workshop: Workshop) => void;
  handleDeleteWorkshop: (workshop: Workshop) => void;
}

export function WorkshopListItem({
  workshop,
  handleViewWorkshop,
  handleEditWorkshop,
  handleDeleteWorkshop,
}: WorkshopListItemProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technology":
        return "bg-blue-100 text-blue-800";
      case "Marketing":
        return "bg-purple-100 text-purple-800";
      case "Finance":
        return "bg-green-100 text-green-800";
      case "Management":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-pink-100 text-pink-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded flex items-center justify-center ${getCategoryColor(workshop.category)}`}>
          <span className="text-sm font-medium">{workshop.title.charAt(0)}</span>
        </div>
        <div>
          <div className="font-medium">{workshop.title}</div>
          <div className="text-sm text-gray-500">{workshop.category}</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end gap-1">
          <Badge className={`rounded-full ${getStatusColor(workshop.status)}`}>
            {workshop.status}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{workshop.delegates} delegates</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{workshop.date}</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => handleViewWorkshop(workshop)}
            >
              <Eye className="h-4 w-4" />
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => handleEditWorkshop(workshop)}
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-500"
              onClick={() => handleDeleteWorkshop(workshop)}
            >
              <Trash className="h-4 w-4" />
              <span>Remove</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}