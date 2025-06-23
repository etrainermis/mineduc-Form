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
  workshop?: {
    id: string
    title: string
    capacity: number
    [key: string]: any
  }
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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        setError(null)
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
        // Build a map of workshopId -> { title, capacity, count }
        const workshopMap = new Map();
        // First, add all workshops from the workshops endpoint
        workshops.forEach((workshop) => {
          workshopMap.set(workshop.id, {
            title: workshop.title,
            capacity: workshop.capacity,
            count: 0,
          });
        });
        // Then, count delegates by their workshop object (if present)
        delegates.forEach((delegate: DelegateData) => {
          if (delegate.workshop && delegate.workshop.id) {
            const w = delegate.workshop;
            if (!workshopMap.has(w.id)) {
              workshopMap.set(w.id, {
                title: w.title || w.id,
                capacity: w.capacity || 0,
                count: 1,
              });
            } else {
              workshopMap.get(w.id).count++;
            }
          } else {
            // fallback to old logic
            workshops.forEach((workshop) => {
              if (delegate.sessions === workshop.id) workshopMap.get(workshop.id).count++;
              else if (Array.isArray(delegate.workshopIds) && delegate.workshopIds.includes(workshop.id)) workshopMap.get(workshop.id).count++;
              else if (typeof delegate.workshopIds === 'string' && delegate.workshopIds === workshop.id) workshopMap.get(workshop.id).count++;
            });
          }
        });
        // Convert map to array
        const stats = Array.from(workshopMap.values());
        setWorkshopStats(stats)
      } catch (error) {
        setError("Unable to fetch dashboard stats. Please try again later.")
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
      description: "Registered for 4th EAC World Kiswahili Language Day Celebrations",
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
      {error ? (
        <div className="col-span-4 text-center text-red-500">{error}</div>
      ) : isLoading ? (
        <div className="col-span-4 text-center text-gray-500">Loading stats...</div>
      ) : stats.length === 0 ? (
        <div className="col-span-4 text-center text-gray-500">No stats available.</div>
      ) : (
        stats.map((stat, index) => (
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
        ))
      )}
    </div>
  )
}
