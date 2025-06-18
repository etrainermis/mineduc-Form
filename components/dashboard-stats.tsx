"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { User, Users } from "lucide-react"
import { getToken } from "@/utils/token"
import { toast } from "sonner"
import Link from "next/link"
import { BACKEND_URL } from "@/lib/config"

export function DashboardStats() {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [totalDelegates, setTotalDelegates] = useState<number>(0)
  const [totalSpeakers, setTotalSpeakers] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken()
        if (!token) {
          console.error("No token found")
          return
        }

        // Fetch users
        const usersResponse = await fetch(`${BACKEND_URL}/users/all`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        if (!usersResponse.ok) {
          throw new Error(`HTTP error! status: ${usersResponse.status}`)
        }

        const users = await usersResponse.json()
        setTotalUsers(users.length)

        // Fetch delegates
        const delegatesResponse = await fetch(`${BACKEND_URL}/delegates`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        if (!delegatesResponse.ok) {
          throw new Error(`HTTP error! status: ${delegatesResponse.status}`)
        }

        const delegates = await delegatesResponse.json()
        setTotalDelegates(delegates.length)

        // Fetch speakers
        const speakersResponse = await fetch(`${BACKEND_URL}/speakers/getAllSpeakers`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        if (!speakersResponse.ok) {
          throw new Error(`HTTP error! status: ${speakersResponse.status}`)
        }

        const speakers = await speakersResponse.json()
        setTotalSpeakers(speakers.length)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCardClick = (id: string) => {
    setActiveCard(id === activeCard ? null : id)
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-gray-700 mb-4">Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* System Users Card */}
        <Card
          className={`p-4 cursor-pointer transition-all duration-200 ${
            activeCard === "system-users" ? "ring-2 ring-[#026FB4]" : ""
          }`}
          onClick={() => handleCardClick("system-users")}
          style={{
            backgroundColor: activeCard === "system-users" ? "#f0f7ff" : "white",
          }}
        >
          <Link href="/admin/users" className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">System Users</h3>
              <p className="text-4xl font-bold mt-2 text-gray-800">{isLoading ? "..." : totalUsers}</p>
              <p className="text-xs mt-1 text-gray-500">Total users in the system</p>
            </div>
            <div className="p-2 rounded-full bg-gray-100">
              <User className="h-5 w-5 text-[#026FB4]" />
            </div>
          </Link>
        </Card>

        {/* Registered Delegates Card */}
        <Card
          className={`p-4 cursor-pointer transition-all duration-200 ${
            activeCard === "registered-delegates" ? "ring-2 ring-[#026FB4]" : ""
          }`}
          onClick={() => handleCardClick("registered-delegates")}
          style={{
            backgroundColor: activeCard === "registered-delegates" ? "#f0f7ff" : "white",
          }}
        >
          <Link href="/admin/registrations" className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Registered Delegates</h3>
              <p className="text-4xl font-bold mt-2 text-gray-800">{isLoading ? "..." : totalDelegates}</p>
              <p className="text-xs mt-1 text-gray-500">Found in 8 workshops</p>
            </div>
            <div className="p-2 rounded-full bg-gray-100">
              <Users className="h-5 w-5 text-[#026FB4]" />
            </div>
          </Link>
        </Card>

        {/* Speakers Card */}
        <Card
          className={`p-4 cursor-pointer transition-all duration-200 ${
            activeCard === "speakers" ? "ring-2 ring-[#026FB4]" : ""
          }`}
          onClick={() => handleCardClick("speakers")}
          style={{
            backgroundColor: activeCard === "speakers" ? "#f0f7ff" : "white",
          }}
        >
          <Link href="/admin/speakers" className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Speakers</h3>
              <p className="text-4xl font-bold mt-2 text-gray-800">{isLoading ? "..." : totalSpeakers}</p>
              <p className="text-xs mt-1 text-gray-500">Present in 3 Events</p>
            </div>
            <div className="p-2 rounded-full bg-gray-100">
              <User className="h-5 w-5 text-[#026FB4]" />
            </div>
          </Link>
        </Card>
      </div>
    </div>
  )
}
