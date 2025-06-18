import { Workshop } from "@/types";
import { WorkshopListItem } from "@/components/workshops/WorkshopListItem";

interface WorkshopListProps {
  workshops: Workshop[];
  viewMode: "grid" | "list";
  handleViewWorkshop: (workshop: Workshop) => void;
  handleEditWorkshop: (workshop: Workshop) => void;
  handleDeleteWorkshop: (workshop: Workshop) => void;
}

export function WorkshopList({
  workshops,
  viewMode,
  handleViewWorkshop,
  handleEditWorkshop,
  handleDeleteWorkshop,
}: WorkshopListProps) {
  if (workshops.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No workshops match your search criteria.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "space-y-2",
        viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0" : ""
      )}
    >
      {workshops.map((workshop) => (
        <WorkshopListItem
          key={workshop.id}
          workshop={workshop}
          handleViewWorkshop={handleViewWorkshop}
          handleEditWorkshop={handleEditWorkshop}
          handleDeleteWorkshop={handleDeleteWorkshop}
        />
      ))}
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}