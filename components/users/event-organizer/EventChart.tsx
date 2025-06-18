"use client"

import { useEffect, useState } from "react"
import { Circle, Calendar, UserCheck } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { format, parseISO } from "date-fns"
import { getToken } from "@/utils/token"
import { toast } from "sonner"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BACKEND_URL } from "@/lib/config"

// Interface for delegate data
interface Delegate {
  id: string
  firstName: string
  lastName: string
  registration_date: string
  // Other properties exist but we only need these for our chart
}

export function EventChart() {
  const [chartData, setChartData] = useState<{ date: string; count: number; formattedDate: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalDelegates, setTotalDelegates] = useState(0)

  useEffect(() => {
    const fetchDelegates = async () => {
      try {
        const token = getToken()
        if (!token) {
          console.error("No token found")
          setIsLoading(false)
          return
        }

        const response = await fetch(`${BACKEND_URL}/delegates`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const delegates: Delegate[] = await response.json()
        setTotalDelegates(delegates.length)

        // Process data to count registrations by date
        const registrationsByDate = delegates.reduce(
          (acc, delegate) => {
            if (!delegate.registration_date) return acc

            // Extract just the date part (YYYY-MM-DD)
            const date = delegate.registration_date.split("T")[0]

            if (!acc[date]) {
              acc[date] = 0
            }
            acc[date]++
            return acc
          },
          {} as Record<string, number>,
        )

        // Convert to array format for the chart
        const formattedData = Object.entries(registrationsByDate)
          .map(([date, count]) => {
            const parsedDate = parseISO(date)
            return {
              date,
              count,
              formattedDate: format(parsedDate, "MMM dd"),
            }
          })
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        setChartData(formattedData)
      } catch (error) {
        console.error("Error fetching delegates:", error)
        toast.error("Failed to load delegate data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDelegates()
  }, [])

  return (
    <Card className="w-full overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <div className="space-y-1">
          <CardTitle className="text-base font-normal text-muted-foreground flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-[#026FB4]" />
            Daily Registrations
          </CardTitle>
          <CardDescription className="text-2xl font-bold text-gray-800">
            {isLoading ? (
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              `${totalDelegates} Delegates`
            )}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-[#026FB4] mr-1"></div>
            <span>Registrations</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="h-[200px] w-full bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
            <UserCheck className="h-12 w-12 text-gray-300" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-[200px] w-full bg-gray-50 rounded-md flex items-center justify-center">
            <p className="text-gray-500">No registration data available</p>
          </div>
        ) : (
          <div className="h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#026FB4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#026FB4" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f0f0f0" strokeDasharray="3 3" />
                <XAxis
                  dataKey="formattedDate"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  tick={{ fontSize: 12, fill: "#888" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  tick={{ fontSize: 12, fill: "#888" }}
                  tickCount={5}
                />
                <Tooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg bg-black/80 p-2 text-xs text-white shadow-xl">
                          <div className="flex items-center gap-2">
                            <Circle className="h-3 w-3 fill-[#026FB4] text-[#026FB4]" />
                            <span>Registrations</span>
                          </div>
                          <div className="mt-1 font-medium">
                            {payload[0].payload.formattedDate}: {payload[0].value} delegates
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#026FB4"
                  strokeWidth={2}
                  fill="url(#colorRegistrations)"
                  dot={false}
                  activeDot={{
                    r: 6,
                    style: { fill: "#fff", stroke: "#026FB4", strokeWidth: 2 },
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="mt-4 flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
          <div>{chartData.length > 0 && <span>First registration: {chartData[0]?.formattedDate}</span>}</div>
          <div>
            {chartData.length > 0 && <span>Latest registration: {chartData[chartData.length - 1]?.formattedDate}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventChart
