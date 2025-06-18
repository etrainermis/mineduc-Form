"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function VerifyError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto overflow-hidden bg-white shadow-lg">
          <div className="flex flex-col items-center justify-center p-8 h-96">
            <div className="rounded-full bg-red-100 p-3">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-800">Verification Failed</h2>
            <p className="mt-2 text-center text-gray-600">
              {error.message || "An error occurred while verifying the delegate."}
            </p>
            <div className="mt-6 flex gap-4">
              <Button onClick={reset} variant="default" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
