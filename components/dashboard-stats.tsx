"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Target, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "@/lib/config"

interface DelegateData {
  id: number
  sessions?: string
  selected_event?: string
  workshopIds?: string | string[]
}

interface Workshop {
  id: string
  title: string
  capacity: number
}

export function DashboardStats() {
  const [totalDelegates, setTotalDelegates] = useState(0)
  const [workshopStats, setWorkshopStats] = useState<{ title: string; count: number; capacity: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch delegates
        const delegatesRes = await fetch(`${BACKEND_URL}/delegates`, {
          method: "GET",
          headers: { accept: "*/*" },
        })
        if (!delegatesRes.ok) throw new Error("Failed to fetch delegates")
        const delegates = await delegatesRes.json()
        setTotalDelegates(delegates.length)

        // Fetch workshops
        const workshopsRes = await fetch(`${BACKEND_URL}/workshops`, {
          method: "GET",
          headers: { accept: "*/*" },
        })
        if (!workshopsRes.ok) throw new Error("Failed to fetch workshops")
        const workshops: Workshop[] = await workshopsRes.json()

        // Count registrations for each workshop
        const stats = workshops.map((workshop) => {
          let count = 0
          delegates.forEach((delegate: DelegateData) => {
            // Check if delegate is registered for this workshop
            if (delegate.sessions === workshop.id) count++
            else if (Array.isArray(delegate.workshopIds) && delegate.workshopIds.includes(workshop.id)) count++
            else if (typeof delegate.workshopIds === 'string' && delegate.workshopIds === workshop.id) count++
          })
          return {
            title: workshop.title,
            count,
            capacity: workshop.capacity,
          }
        })
        setWorkshopStats(stats)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  const totalCapacity = workshopStats.reduce((sum, w) => sum + w.capacity, 0)
  const totalRegistered = workshopStats.reduce((sum, w) => sum + w.count, 0)
  const overallCapacityUsed = totalCapacity > 0 ? Math.round((totalRegistered / totalCapacity) * 100) : 0

  const stats = [
    {
      title: "Total Delegates",
      value: isLoading ? "..." : totalDelegates.toString(),
      description: "Registered for Global Skill Connect",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    ...workshopStats.map((w, i) => ({
      title: w.title,
      value: isLoading ? "..." : `${w.count}/${w.capacity}`,
      description: `${isLoading ? 0 : Math.round((w.count / w.capacity) * 100)}% capacity used`,
      icon: Target,
      color: i % 2 === 0 ? "text-purple-600" : "text-green-600",
      bgColor: i % 2 === 0 ? "bg-purple-100" : "bg-green-100",
    })),
    {
      title: "Total Sessions",
      value: isLoading ? "..." : workshopStats.length.toString(),
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
