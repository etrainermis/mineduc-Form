"use client"
import { DashboardCharts } from "@/components/dashboard-charts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardStats } from "@/components/dashboard-stats"
import { UserProfile } from "@/components/users/UserProfile"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { UUID } from "crypto"
import { BACKEND_URL } from "@/lib/config"

interface DecodedToken {
  id: UUID
  lastName: string
  role_name: string
  exp: number
  iat: number
}

export default function DashboardPage() {
  const [userName, setUserName] = useState<string>("")

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access")
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token)
          console.log("Decoded token:", decoded)

          const response = await fetch(`${BACKEND_URL}/users/${decoded.id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': '*/*'
            },
          })

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()
          console.log("Fetched user data:", data)

          setUserName(data.firstName) // Set the last name

        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
    }

    fetchUserData()
  }, [])
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <UserProfile />
      </div>
      <div className="mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              <div className="flex items-center ">
              <span>Welcome 👋, {userName || "User"}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Welcome to your event management dashboard. Here&apos;s an overview of your events and registrations.
            </p>
          </CardContent>
        </Card>
      </div>
      <DashboardStats />
      <DashboardCharts />
    </div>
  )
}
