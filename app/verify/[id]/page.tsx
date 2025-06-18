"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, ArrowLeft, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BACKEND_URL } from "@/lib/config"
import { motion } from "framer-motion"

interface Delegate {
  id: string
  firstName: string
  lastName: string
  position: string
  organization: string
  profile_picture_url: string
  is_approved: boolean
}

export default function VerifyDelegatePage() {
  const params = useParams()
  const [delegate, setDelegate] = useState<Delegate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<"valid" | "invalid" | "pending">("pending")
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    const fetchDelegate = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get the delegate ID from the URL params
        const delegateId = params.id as string

        if (!delegateId) {
          throw new Error("No delegate ID provided")
        }

        // Fetch delegate data
        const response = await fetch(`${BACKEND_URL}/delegates/${delegateId}`, {
          headers: {
            accept: "*/*",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch delegate information")
        }

        const data = await response.json()
        setDelegate(data)

        // Set verification status based on is_approved field
        setVerificationStatus(data.is_approved ? "valid" : "invalid")

        // Show animation for valid delegates
        if (data.is_approved) {
          setShowAnimation(true)
          setTimeout(() => setShowAnimation(false), 2000)
        }
      } catch (err) {
        console.error("Error verifying delegate:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
        setVerificationStatus("invalid")
      } finally {
        setLoading(false)
      }
    }

    fetchDelegate()
  }, [params.id])

  // Generate a registration ID based on delegate ID
  function generateRegistrationId(delegateId: string) {
    if (!delegateId) return "RFF000"
    let hash = 0
    for (let i = 0; i < delegateId.length; i++) {
      hash = delegateId.charCodeAt(i) + ((hash << 5) - hash)
    }
    const randomNumber = Math.abs(hash % 500) + 1
    return `RFF${String(randomNumber).padStart(3, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto overflow-hidden bg-white shadow-lg">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-8 h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#026FB4]"></div>
              <p className="mt-4 text-lg text-gray-600">Verifying delegate...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-8 h-96">
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="h-16 w-16 text-red-500" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-800">Verification Failed</h2>
              <p className="mt-2 text-center text-gray-600">{error}</p>
              <Link href="/" className="mt-6">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Return Home
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Header with verification status */}
              <div className={`p-6 ${verificationStatus === "valid" ? "bg-green-500" : "bg-red-500"}`}>
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold text-white">Delegate Verification</h1>
                  <Image src="/logo.svg" alt="FutureSkills Logo" width={100} height={28} className="h-7 w-auto" />
                </div>
              </div>

              {/* Verification result */}
              <div className="flex flex-col items-center p-8">
                {verificationStatus === "valid" ? (
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="relative"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", damping: 12, stiffness: 100 }}
                    >
                      <div
                        className={`absolute -inset-6 rounded-full bg-green-100 ${showAnimation ? "animate-pulse" : ""}`}
                      ></div>
                      <div className="relative flex items-center justify-center h-32 w-32 rounded-full bg-green-50 border-4 border-green-200">
                        <CheckCircle className="h-20 w-20 text-green-500" strokeWidth={2} />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h2 className="mt-6 text-2xl font-bold text-gray-800">Valid Delegate</h2>
                      <p className="mt-2 text-center text-gray-600">This delegate has been verified and approved.</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mt-3 px-4 py-1 bg-green-100 rounded-full"
                    >
                      <p className="text-xs text-green-700 font-medium flex items-center gap-1">
                        <Shield className="h-3 w-3" /> Verified on {new Date().toLocaleDateString()} at{" "}
                        {new Date().toLocaleTimeString()}
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="relative flex items-center justify-center h-32 w-32 rounded-full bg-red-50 border-4 border-red-200"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", damping: 12 }}
                    >
                      <XCircle className="h-20 w-20 text-red-500" strokeWidth={2} />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h2 className="mt-6 text-2xl font-bold text-gray-800">Invalid Delegate</h2>
                      <p className="mt-2 text-center text-gray-600">
                        This delegate has not been approved or does not exist.
                      </p>
                    </motion.div>
                  </div>
                )}

                {/* Delegate information */}
                {delegate && (
                  <motion.div
                    className="mt-8 w-full"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#026FB4]">
                        <Image
                          src={delegate.profile_picture_url || "/man.svg"}
                          alt={`${delegate.firstName} ${delegate.lastName}'s photo`}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/man.svg"
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#026FB4]">
                          {delegate.firstName} {delegate.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">{delegate.position}</p>
                        <p className="text-sm text-gray-600">{delegate.organization}</p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-lg bg-gray-50 p-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-500">Delegate ID:</span>
                        <span className="font-mono text-sm font-bold text-[#026FB4]">
                          {generateRegistrationId(delegate.id)}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <span className="text-sm font-medium text-gray-500">Status:</span>
                        <span
                          className={`text-sm font-medium ${verificationStatus === "valid" ? "text-green-600" : "text-red-600"}`}
                        >
                          {verificationStatus === "valid" ? "Approved" : "Not Approved"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Link href="/">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Return Home
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
