"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { User, Users, TrendingUp } from "lucide-react"
import { getToken } from "@/utils/token"
import { toast } from "sonner"
import Link from "next/link"
import { BACKEND_URL } from "@/lib/config"

export default function EventCard() {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [totalDelegates, setTotalDelegates] = useState<number>(0)
  const [totalSpeakers, setTotalSpeakers] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

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
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (!usersResponse.ok) {
          throw new Error(`HTTP error! status: ${usersResponse.status}`)
        }

        const users = await usersResponse.json()
        setTotalUsers(users.length)

        // Fetch delegates
        const delegatesResponse = await fetch(`${BACKEND_URL}/delegates`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (!delegatesResponse.ok) {
          throw new Error(`HTTP error! status: ${delegatesResponse.status}`)
        }

        const delegates = await delegatesResponse.json()
        setTotalDelegates(delegates.length)

        // Fetch speakers
        const speakersResponse = await fetch(`${BACKEND_URL}/speakers/getAllSpeakers`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
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

  const cardData = [
    {
      id: "system-users",
      title: "System Users",
      count: totalUsers,
      description: "Total users in the system",
      icon: <User className="h-6 w-6" />,
      href: "/event-organizer/dashboard",
      gradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-500",
    },
    {
      id: "registered-delegates",
      title: "Registered Delegates",
      count: totalDelegates,
      description: "Found in 8 workshops",
      icon: <Users className="h-6 w-6" />,
      href: "/event-organizer/registrations",
      gradient: "from-cyan-50 to-cyan-100",
      iconBg: "bg-cyan-500",
    },
    {
      id: "speakers",
      title: "Speakers",
      count: totalSpeakers,
      description: "Present in 3 Events",
      icon: <TrendingUp className="h-6 w-6" />,
      href: "/event-organizer/speakers",
      gradient: "from-indigo-50 to-indigo-100",
      iconBg: "bg-indigo-500",
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <span className="inline-block w-1 h-6 bg-[#026FB4] mr-3 rounded-full"></span>
        Users Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <Link href={card.href} key={card.id} className="block">
            <Card
              className={`relative overflow-hidden h-full transition-all duration-300 ease-in-out
                ${activeCard === card.id ? "ring-2 ring-[#026FB4] shadow-lg" : "shadow-md hover:shadow-lg"}
                ${hoveredCard === card.id ? "translate-y-[-4px]" : ""}
              `}
              onClick={() => handleCardClick(card.id)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 transition-opacity duration-300
                  ${activeCard === card.id || hoveredCard === card.id ? "opacity-100" : "opacity-50"}
                `}
              />

              <div className="relative p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-700">{card.title}</h3>
                  <div className={`p-2.5 rounded-full ${card.iconBg} text-white shadow-md`}>{card.icon}</div>
                </div>

                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-10 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-4xl font-bold text-gray-800 mb-1">{card.count.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{card.description}</p>
                  </>
                )}

                <div
                  className={`mt-auto pt-4 text-xs font-medium text-[#026FB4] flex items-center transition-opacity duration-300
                  ${hoveredCard === card.id ? "opacity-100" : "opacity-0"}
                `}
                >
                  View details
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
