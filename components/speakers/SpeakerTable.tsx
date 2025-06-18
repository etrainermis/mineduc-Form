"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getToken } from "@/utils/token";
import { AddSpeakerModal } from "@/components/modals/AddSpeakerModal";
import { cn } from "@/lib/utils";
import { BACKEND_URL } from "@/lib/config";

export type Speaker = {
  id: string;
  name: string;
  position: string;
  shortDescription: string;
  biography: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
};

export function SpeakerTable() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddSpeakerOpen, setIsAddSpeakerOpen] = useState(false);

  const fetchSpeakers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getToken();
      
      if (!token) {
        console.error('No token available');
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${BACKEND_URL}/speakers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched speakers:', data);

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: expected an array of speakers');
      }

      setSpeakers(data);
    } catch (error) {
      console.error('Error fetching speakers:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch speakers';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  // const handleRefresh = () => {
  //   fetchSpeakers();
  //   toast.success("Speaker list refreshed");
  // };

  // Filter speakers based on search term
  const filteredSpeakers = speakers.filter((speaker) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      speaker.name.toLowerCase().includes(searchTerm) ||
      speaker.position.toLowerCase().includes(searchTerm) ||
      speaker.shortDescription.toLowerCase().includes(searchTerm)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#026FB4]"></div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="text-center py-8 text-red-500">
          {error}
        </div>
      )}

      {/* Search and Add Button */}
      {!loading && !error && (
        <>
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search speakers..."
                    className="pl-10 bg-white focus-visible:ring-[#026FB4] border-slate-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => setIsAddSpeakerOpen(true)}
                  className="bg-[#026FB4] hover:bg-[#026FB4]/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Speaker
                </Button>
              </div>
            </div>
          </div>

          {/* Speakers List */}
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="p-6">
              <div className="space-y-4">
                {filteredSpeakers.map((speaker) => (
                  <div
                    key={speaker.id}
                    className="flex flex-col gap-4 rounded-xl bg-white p-4 border border-slate-200 hover:border-[#026FB4]/30 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-sm sm:text-base">{speaker.name}</span>
                        <span className="text-xs text-muted-foreground">{speaker.position}</span>
                        <p className="text-sm text-slate-600 mt-1">{speaker.shortDescription}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-sm",
                          getStatusColor(speaker.status)
                        )}
                      >
                        {speaker.status}
                      </Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-lg border-slate-200 hover:bg-[#EBF5FF] hover:text-[#026FB4] transition-all duration-200"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            className="flex items-center gap-2 focus:bg-[#EBF5FF] focus:text-[#026FB4]"
                            onClick={() => {/* TODO: Implement view */}}
                          >
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2 focus:bg-[#EBF5FF] focus:text-[#026FB4]"
                            onClick={() => {/* TODO: Implement edit */}}
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2 text-rose-600 focus:bg-rose-50"
                            onClick={() => {/* TODO: Implement delete */}}
                          >
                            <Trash className="h-4 w-4" />
                            <span>Remove</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}

                {filteredSpeakers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-sm text-muted-foreground">No speakers found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add Speaker Modal */}
      <AddSpeakerModal 
        isOpen={isAddSpeakerOpen} 
        onClose={() => setIsAddSpeakerOpen(false)}
        onSuccess={() => {
          fetchSpeakers();
          setIsAddSpeakerOpen(false);
        }}
      />
    </div>
  );
} 