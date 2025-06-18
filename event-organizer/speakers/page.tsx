"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BACKEND_URL } from "@/lib/config"

interface Speaker {
  id: string
  name: string
  position: string
  shortDescription: string
  biography: string
  profile_picture: string | null
  status: string
  published: boolean
}

export default function SpeakersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/speakers/getAllSpeakers`, {
          method: 'GET',
          headers: {
            'accept': '*/*'
          }
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        setSpeakers(data)
      } catch (error) {
        console.error('Failed to fetch speakers:', error)
        setError('Failed to load speakers')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSpeakers()
  }, [])

  const filteredSpeakers = speakers.filter(speaker =>
    speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    speaker.position.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Speakers</h1>
        <Button onClick={() => router.push("/event-organizer/speakers/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Speaker
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search speakers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpeakers.map((speaker) => (
          <Card key={speaker.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  {speaker.profile_picture ? (
                    <Image
                      src={speaker.profile_picture}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <div>
                  <CardTitle>{speaker.name}</CardTitle>
                  <p className="text-sm text-gray-500">{speaker.position}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{speaker.shortDescription}</p>
              <p className="text-sm text-gray-500">{speaker.biography}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${
                  speaker.status === "CONFIRMED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {speaker.status}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/event-organizer/speakers/${speaker.id}`)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 