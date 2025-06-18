"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, MoreVertical } from "lucide-react";
import { Pagination, PaginationInfo } from "@/components/ui/pagination";
import Image from "next/image";
import { UserProfile } from "@/components/users/UserProfile";
import { BACKEND_URL } from "@/lib/config";

// Speaker type definition
interface Speaker {
  id: string;
  name: string;
  position: string;
  shortDescription: string;
  biography: string;
  profile_picture_url: string | null; // Changed from profile_picture to profile_picture_url
  status: string;
  published: boolean;
  workshop?: string; // Make workshop optional since it's not in the API response
}

export default function SpeakersPage(): React.JSX.Element {
  // State management
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [speakerFilter, setSpeakerFilter] = useState<
    "all" | "my-workshop" | "other-workshops"
  >("all");

  // Event organizer's workshop (in a real app, this would come from the user's context)
  const organizerWorkshop = "Cyber Security Conference"; // This would be dynamic in a real app

  // Fetch speakers from API
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/speakers/confirmed`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setSpeakers(data);
      } catch (error) {
        console.error("Failed to fetch speakers:", error);
        setError("Failed to load speakers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  // Pagination settings
  const itemsPerPage = 8;

  // Filtered speakers
  const filteredSpeakers = speakers.filter((speaker) => {
    const matchesSearch =
      speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.position.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      speakerFilter === "all" ||
      (speakerFilter === "my-workshop" &&
        speaker.workshop === organizerWorkshop) ||
      (speakerFilter === "other-workshops" &&
        speaker.workshop !== organizerWorkshop);

    // No need to filter by status since we're fetching only confirmed speakers
    return (
      matchesSearch &&
      (speakerFilter === "all" || (speaker.workshop && matchesFilter))
    );
  });

  // Calculate total pages based on filtered speakers
  const totalPages = Math.max(
    1,
    Math.ceil(filteredSpeakers.length / itemsPerPage)
  );

  // Ensure current page is valid after filtering
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredSpeakers.length, totalPages, currentPage]);

  // Get paginated speakers for current page
  const paginatedSpeakers = filteredSpeakers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handler functions
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleViewDetails = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setIsDetailsOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to top of the speakers list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header Section */}
      <div className="flex-none p-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-white border-b shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold sm:text-3xl bg-gradient-to-r from-[#026FB4] to-blue-600 bg-clip-text text-transparent">
            Speakers
          </h1>
          <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full border">
            Workshop: {organizerWorkshop}
          </div>
        </div>
        <UserProfile />
      </div>

      {/* Search and Filter Section */}
      <div className="flex-none px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-[#026FB4]" />
            <Input
              placeholder="Search speakers..."
              className="pl-8 transition-all duration-200 focus:ring-2 focus:ring-[#026FB4] focus:border-transparent"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={speakerFilter === "all" ? "default" : "outline"}
              onClick={() => setSpeakerFilter("all")}
              className={`transition-colors duration-200 ${
                speakerFilter === "all"
                  ? "bg-[#026FB4] hover:bg-[#0052CC]"
                  : "hover:bg-[#026FB4] hover:text-white"
              }`}
            >
              All Speakers
            </Button>
            <Button
              variant={speakerFilter === "my-workshop" ? "default" : "outline"}
              onClick={() => setSpeakerFilter("my-workshop")}
              className={`transition-colors duration-200 ${
                speakerFilter === "my-workshop"
                  ? "bg-[#026FB4] hover:bg-[#0052CC]"
                  : "hover:bg-[#026FB4] hover:text-white"
              }`}
            >
              My Workshop
            </Button>
            <Button
              variant={
                speakerFilter === "other-workshops" ? "default" : "outline"
              }
              onClick={() => setSpeakerFilter("other-workshops")}
              className={`transition-colors duration-200 ${
                speakerFilter === "other-workshops"
                  ? "bg-[#026FB4] hover:bg-[#0052CC]"
                  : "hover:bg-[#026FB4] hover:text-white"
              }`}
            >
              Other Workshops
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 py-3 flex flex-col overflow-auto">
        {filteredSpeakers.length > 0 ? (
          <>
            {/* Speakers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {paginatedSpeakers.map((speaker) => (
                <Card key={speaker.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="h-2 w-full bg-green-500" />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="relative">
                            {/* Fixed: Replaced <img> with Next.js <Image> component */}
                            <Image
                              src={speaker.profile_picture_url || "/man.svg"}
                              alt={speaker.name}
                              className="rounded-full object-cover"
                              width={64}
                              height={64}
                              onError={(e) => {
                                // Fallback to default image if the profile picture fails to load
                                const target = e.target as HTMLImageElement;
                                target.src = "/man.svg";
                              }}
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(speaker)}
                            className="text-[#026FB4] hover:bg-[#026FB4]/10"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                        <div>
                          <h3 className="font-medium text-[#026FB4]">
                            {speaker.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {speaker.position
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (c) => c.toUpperCase())}
                          </p>
                          <div className="mt-2 flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-xs text-muted-foreground">
                              Confirmed
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex flex-col items-center space-y-4">
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
              <PaginationInfo
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredSpeakers.length}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">No speakers found</p>
          </div>
        )}
      </div>

      {/* Speaker Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Speaker Details
            </DialogTitle>
          </DialogHeader>
          {selectedSpeaker && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#026FB4]">
                  <Image
                    src={selectedSpeaker.profile_picture_url || "/man.svg"}
                    alt={selectedSpeaker.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to default image if the profile picture fails to load
                      // Fixed: Removed 'any' type and used proper HTMLImageElement type
                      const target = e.target as HTMLImageElement;
                      target.src = "/man.svg";
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedSpeaker.name}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {selectedSpeaker.position
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedSpeaker.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedSpeaker.status}
                  </span>
                  {selectedSpeaker.published && (
                    <span className="inline-block ml-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Published
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Short Description
                  </h4>
                  <p className="text-gray-600">
                    {selectedSpeaker.shortDescription}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Biography
                  </h4>
                  <p className="text-gray-600">{selectedSpeaker.biography}</p>
                </div>
                {selectedSpeaker.workshop && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Workshop
                    </h4>
                    <p className="text-gray-600">{selectedSpeaker.workshop}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
