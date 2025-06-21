"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Target, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "@/lib/config"

interface DelegateData {
  id: number
  sessions?: string
  selected_event?: string
}

export function DashboardStats() {
  const [totalDelegates, setTotalDelegates] = useState(0)
  const [symposiumCount, setSymposiumCount] = useState(0)
  const [youthEngagementCount, setYouthEngagementCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Session capacities
  const SYMPOSIUM_CAPACITY = 200
  const YOUTH_ENGAGEMENT_CAPACITY = 150
  const TOTAL_CAPACITY = SYMPOSIUM_CAPACITY + YOUTH_ENGAGEMENT_CAPACITY

  useEffect(() => {
    const fetchDelegateStats = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/delegates`, {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch delegates")
        }

        const data = await response.json()

        // Count total delegates
        setTotalDelegates(data.length)

        // Count session registrations
        let symposiumRegistrations = 0
        let youthEngagementRegistrations = 0

        data.forEach((delegate: DelegateData) => {
          if (delegate.sessions === "symposium") {
            symposiumRegistrations++
          } else if (delegate.sessions === "youth-engagement") {
            youthEngagementRegistrations++
          }
        })

        setSymposiumCount(symposiumRegistrations)
        setYouthEngagementCount(youthEngagementRegistrations)
      } catch (error) {
        console.error("Error fetching delegate stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDelegateStats()
  }, [])

  const totalSessionRegistrations = symposiumCount + youthEngagementCount
  const overallCapacityUsed = Math.round((totalSessionRegistrations / TOTAL_CAPACITY) * 100)

  const stats = [
    {
      title: "Total Delegates",
      value: isLoading ? "..." : totalDelegates.toString(),
      description: "Registered for Global Skill Connect",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Symposium Session",
      value: isLoading ? "..." : `${symposiumCount}/${SYMPOSIUM_CAPACITY}`,
      description: `${isLoading ? 0 : Math.round((symposiumCount / SYMPOSIUM_CAPACITY) * 100)}% capacity used`,
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Youth Engagement",
      value: isLoading ? "..." : `${youthEngagementCount}/${YOUTH_ENGAGEMENT_CAPACITY}`,
      description: `${isLoading ? 0 : Math.round((youthEngagementCount / YOUTH_ENGAGEMENT_CAPACITY) * 100)}% capacity used`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Sessions",
      value: "2",
      description: `${overallCapacityUsed}% overall capacity used`,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-t-4 border-t-[#026FB4]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
