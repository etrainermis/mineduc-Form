"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // In a real application, you would handle logout logic here
    // For now, we'll just redirect to the dashboard
    setTimeout(() => {
      router.push("/landing")
    }, 1000)
  }, [router])

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold">Logging out...</h1>
      <p className="mt-2 text-muted-foreground">You will be redirected shortly.</p>
    </div>
  )
}
