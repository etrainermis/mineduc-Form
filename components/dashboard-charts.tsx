"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "@/lib/config"

interface DelegateData {
  id: number
  sessions?: string
  country?: string
  delegate_type?: string
  registration_date?: string
}

interface Session {
  id: string
  title: string
  // Add other session properties as needed
}

interface SessionAttendance {
  id: string
  name: string
  percentage: number
  status: string
  count: number
}

export function DashboardCharts() {
  const [sessionData, setSessionData] = useState([
    { name: "Symposium", registrations: 0, capacity: 200, available: 200 },
    { name: "Youth Engagement", registrations: 0, capacity: 150, available: 150 },
  ])
  const [countryData, setCountryData] = useState<Array<{ name: string; value: number }>>([])
  const [delegateTypeData, setDelegateTypeData] = useState<Array<{ name: string; value: number }>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchChartData = async () => {
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

        // Process session data
        let symposiumCount = 0
        let youthEngagementCount = 0

        // Process country data
        const countryMap = new Map<string, number>()

        // Process delegate type data
        const delegateTypeMap = new Map<string, number>()

        data.forEach((delegate: DelegateData) => {
          // Count sessions
          if (delegate.sessions === "symposium") {
            symposiumCount++
          } else if (delegate.sessions === "youth-engagement") {
            youthEngagementCount++
          }

          // Count countries
          if (delegate.country) {
            countryMap.set(delegate.country, (countryMap.get(delegate.country) || 0) + 1)
          }

          // Count delegate types
          if (delegate.delegate_type) {
            const typeMap: Record<string, string> = {
              GOV: "Government",
              "SCH/PLT": "Education",
              DP: "Development Partner",
              ENT: "Private Sector",
              EXP: "Expert/Professional",
              CSO: "Civil Society",
            }
            const displayType = typeMap[delegate.delegate_type] || delegate.delegate_type
            delegateTypeMap.set(displayType, (delegateTypeMap.get(displayType) || 0) + 1)
          }
        })

        // Update session data
        setSessionData([
          {
            name: "Symposium",
            registrations: symposiumCount,
            capacity: 200,
            available: 200 - symposiumCount,
          },
          {
            name: "Youth Engagement",
            registrations: youthEngagementCount,
            capacity: 150,
            available: 150 - youthEngagementCount,
          },
        ])

        // Convert maps to arrays and sort by value (top 5 countries)
        const sortedCountries = Array.from(countryMap.entries())
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5)

        const sortedDelegateTypes = Array.from(delegateTypeMap.entries())
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)

        setCountryData(sortedCountries)
        setDelegateTypeData(sortedDelegateTypes)
      } catch (error) {
        console.error("Error fetching chart data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChartData()
  }, [])

  const COLORS = ["#026FB4", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Session Capacity Chart */}
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle>Session Capacity Overview</CardTitle>
          <CardDescription>Registration status for both event sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              registrations: {
                label: "Registrations",
                color: "#026FB4",
              },
              available: {
                label: "Available",
                color: "#E5E7EB",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="registrations" fill="var(--color-registrations)" name="Registrations" />
                <Bar dataKey="available" fill="var(--color-available)" name="Available Spots" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Delegate Types Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Delegate Types</CardTitle>
          <CardDescription>Distribution by delegate category</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              delegates: {
                label: "Delegates",
                color: "#026FB4",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={delegateTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {delegateTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top Countries Chart */}
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Top Countries</CardTitle>
          <CardDescription>Delegates by country (Top 5)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              delegates: {
                label: "Delegates",
                color: "#026FB4",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData} layout="horizontal">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-delegates)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Session Details Card */}
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
          <CardDescription>Detailed information about event sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessionData.map((session, index) => (
              <div key={session.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{session.name}</h3>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      session.registrations >= session.capacity * 0.9
                        ? "bg-red-100 text-red-800"
                        : session.registrations >= session.capacity * 0.7
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {Math.round((session.registrations / session.capacity) * 100)}% Full
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Registered:</span>
                    <span className="font-medium">{session.registrations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span className="font-medium">{session.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available:</span>
                    <span className="font-medium text-green-600">{session.available}</span>
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#026FB4] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(session.registrations / session.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
