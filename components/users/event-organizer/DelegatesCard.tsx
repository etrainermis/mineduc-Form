"use client"

import { useEffect, useState } from "react"
import { CheckCircle, AlertTriangle, BarChart3, Users, Calendar, MapPin, TrendingUp, AlertCircle } from "lucide-react"
import { getToken } from "@/utils/token"
import { toast } from "sonner"
import { BACKEND_URL } from "@/lib/config"

interface Workshop {
  id: string
  title: string
  capacity: number
  registered: number
  venue: string
  schedule: string
}

const DelegatesCard = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredWorkshop, setHoveredWorkshop] = useState<string | null>(null)

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const token = getToken()
        if (!token) {
          console.error("No token found")
          setError("Authentication token not found")
          setIsLoading(false)
          return
        }

        const response = await fetch(`${BACKEND_URL}/workshops`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: Workshop[] = await response.json()
        setWorkshops(data)
      } catch (error) {
        console.error("Error fetching workshops:", error)
        setError("Failed to load workshop data")
        toast.error("Failed to load workshop data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchWorkshops()
  }, [])

  // Get color based on percentage
  // const getColorClass = (percentage: number) => {
  //   if (percentage >= 75) return "bg-emerald-500"
  //   if (percentage >= 50) return "bg-blue-500"
  //   if (percentage >= 25) return "bg-amber-500"
  //   return "bg-rose-500"
  // }

  // Get gradient color based on percentage
  const getGradientClass = (percentage: number) => {
    if (percentage >= 75) return "from-emerald-500 to-emerald-400"
    if (percentage >= 50) return "from-blue-500 to-blue-400"
    if (percentage >= 25) return "from-amber-500 to-amber-400"
    return "from-rose-500 to-rose-400"
  }

  // Get icon based on percentage
  const getStatusIcon = (percentage: number) => {
    if (percentage >= 75) {
      return <CheckCircle className="h-5 w-5 text-emerald-500" />
    } else if (percentage >= 50) {
      return <Users className="h-5 w-5 text-blue-500" />
    } else if (percentage >= 25) {
      return <AlertCircle className="h-5 w-5 text-amber-500" />
    } else {
      return <AlertTriangle className="h-5 w-5 text-rose-500" />
    }
  }

  // Get workshop name without the WS prefix
  const formatWorkshopName = (title: string) => {
    // Extract everything after the first space
    const match = title.match(/^WS\d+\s(.+)/)
    return match ? match[1] : title
  }

  // Sort workshops by registration percentage (highest first)
  const sortedWorkshops = [...workshops].sort((a, b) => {
    const percentageA = (a.registered / a.capacity) * 100
    const percentageB = (b.registered / b.capacity) * 100
    return percentageB - percentageA
  })

  // Get total registered delegates
  const totalRegistered = workshops.reduce((sum, workshop) => sum + workshop.registered, 0)
  
  // Get total capacity
  const totalCapacity = workshops.reduce((sum, workshop) => sum + workshop.capacity, 0)
  
  // Calculate overall percentage
  const overallPercentage = totalCapacity > 0 ? Math.round((totalRegistered / totalCapacity) * 100) : 0

  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="text-base font-medium flex items-center text-gray-800">
              <BarChart3 className="h-5 w-5 mr-2 text-[#026FB4]" />
              Workshop Registration
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Registration rates across all workshops</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-xs text-muted-foreground">Overall</span>
              <div className="text-sm font-semibold">{overallPercentage}%</div>
            </div>
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50 border">
              <TrendingUp className="h-5 w-5 text-[#026FB4]" />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-2 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="h-5 bg-gray-200 rounded w-40"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-100"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-40 text-rose-500 gap-2">
            <AlertTriangle className="h-8 w-8" />
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {sortedWorkshops.map((workshop) => {
              const percentage = Math.round((workshop.registered / workshop.capacity) * 100)
              const isHovered = hoveredWorkshop === workshop.id;
              
              return (
                <div 
                  key={workshop.id} 
                  className="space-y-2 group"
                  onMouseEnter={() => setHoveredWorkshop(workshop.id)}
                  onMouseLeave={() => setHoveredWorkshop(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(percentage)}
                      <span className="text-sm font-medium truncate max-w-[180px] group-hover:text-[#026FB4] transition-colors duration-200">
                        {formatWorkshopName(workshop.title)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                      <span className="text-sm font-semibold">
                        {workshop.registered}/{workshop.capacity}
                      </span>
                      <span className={`text-xs font-medium ${
                        percentage >= 75 ? "text-emerald-600" : 
                        percentage >= 50 ? "text-blue-600" : 
                        percentage >= 25 ? "text-amber-600" : 
                        "text-rose-600"
                      }`}>
                        ({percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r ${getGradientClass(percentage)}`}
                      style={{
                        width: `${percentage}%`,
                        boxShadow: percentage > 50 ? "inset 0 -1px 0 rgba(0,0,0,0.15)" : "none",
                      }}
                    />
                  </div>
                  <div className={`text-xs text-muted-foreground flex items-center gap-3 transition-all duration-300 ${
                    isHovered ? "opacity-100 max-h-10" : "opacity-0 max-h-0 overflow-hidden"
                  }`}>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      {new Date(workshop.schedule).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {workshop.venue}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {!isLoading && !error && workshops.length > 0 && (
          <div className="pt-3 border-t flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>High (≥75%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>Medium (≥50%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
              <span>Low (≥25%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-rose-500"></div>\
              <span>Very Low (&lt;25%)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DelegatesCard
