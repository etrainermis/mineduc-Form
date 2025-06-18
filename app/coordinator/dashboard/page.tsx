"use client"

import { useState } from "react"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard-charts"
import { UserProfile } from "@/components/users/UserProfile"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Coordinator 👋</h1>
          <p className="text-gray-600 mt-2">Here&apos;s what&apos;s happening in your dashboard today</p>
        </div>
        <UserProfile />
      </div>

      <DashboardStats />

      <div className="mb-8">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            className={`pb-2 px-1 ${
              activeTab === "overview"
                ? "border-b-2 border-[#026FB4] text-[#026FB4]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`pb-2 px-1 ${
              activeTab === "analytics"
                ? "border-b-2 border-[#026FB4] text-[#026FB4]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
        </div>
      </div>

      <DashboardCharts />
    </div>
  )
}
