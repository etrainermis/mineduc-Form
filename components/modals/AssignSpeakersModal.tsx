import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getToken } from "@/utils/token";
import { Checkbox } from "@/components/ui/checkbox";
import { BACKEND_URL } from "@/lib/config";

interface Speaker {
  id: string;
  name: string;
  position: string;
  shortDescription: string;
}

interface AssignSpeakersModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshopId: string;
  onSuccess: () => void;
}

export function AssignSpeakersModal({
  isOpen,
  onClose,
  workshopId,
  onSuccess,
}: AssignSpeakersModalProps) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchSpeakers();
    }
  }, [isOpen]);

  const fetchSpeakers = async () => {
    try {
      const token = getToken();
      
      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${BACKEND_URL}/speakers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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
      setSpeakers(data);
    } catch (error) {
      console.error('Error fetching speakers:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch speakers');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = getToken();
      
      if (!token) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${BACKEND_URL}/workshops/${workshopId}/speakers`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ speakerIds: selectedSpeakers }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Speakers assigned successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error assigning speakers:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to assign speakers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Speakers</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select Speakers</Label>
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {speakers.map((speaker) => (
                <div key={speaker.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={speaker.id}
                    checked={selectedSpeakers.includes(speaker.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedSpeakers([...selectedSpeakers, speaker.id]);
                      } else {
                        setSelectedSpeakers(selectedSpeakers.filter(id => id !== speaker.id));
                      }
                    }}
                  />
                  <label
                    htmlFor={speaker.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {speaker.name} - {speaker.position}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Assigning..." : "Assign Speakers"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 