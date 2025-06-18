"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { getToken } from "@/utils/token"
import { toast } from "sonner"
import { BACKEND_URL } from "@/lib/config"

interface Speaker {
  id: string;
  name: string;
  position: string;
  shortDescription: string;
  biography: string;
  profile_picture: string | null;
  status: string;
  published: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  workshopId: string;
  assignedSpeakerIds?: string[];
}

export function SpeakerSelectionDialog({ isOpen, onClose, workshopId, assignedSpeakerIds = [] }: Props) {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const token = getToken()
        if (!token) {
          throw new Error('No authentication token found')
        }

        const response = await fetch(`${BACKEND_URL}/speakers/confirmed`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch speakers')
        }

        const data = await response.json()
        // Filter out already assigned speakers
        const availableSpeakers = data.filter((speaker: Speaker) => 
          !assignedSpeakerIds.includes(speaker.id)
        )
        setSpeakers(availableSpeakers)
      } catch (err) {
        console.error(err)
        toast.error('Failed to fetch speakers')
      }
    }

    if (isOpen) {
      fetchSpeakers()
    }
  }, [isOpen, assignedSpeakerIds])

  const handleAssignSpeaker = async () => {
    try {
      setIsLoading(true)
      const token = getToken()
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch(`${BACKEND_URL}/workshops/${workshopId}/speakers`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify({
          speakerIds: [selectedSpeakerId]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to assign speaker')
      }

      toast.success('Speaker assigned successfully')
      onClose()
    } catch (err) {
      console.log(err);
      toast.error('Failed to assign speaker')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Speaker</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Speaker</label>
            <Select
              value={selectedSpeakerId}
              onValueChange={setSelectedSpeakerId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a speaker" />
              </SelectTrigger>
              <SelectContent>
                {speakers.map((speaker) => (
                  <SelectItem key={speaker.id} value={speaker.id}>
                    {speaker.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssignSpeaker}
              disabled={!selectedSpeakerId || isLoading}
            >
              {isLoading ? 'Assigning...' : 'Assign Speaker'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 