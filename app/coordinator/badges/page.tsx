"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, CreditCardIcon as IdCardIcon, ChevronLeft, ChevronRight, Download } from "lucide-react"
import Image from "next/image"
import { UserProfile } from "@/components/users/UserProfile"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import JSZip from "jszip"
import { getToken } from "@/utils/token"
import { toast } from "sonner"
import { BACKEND_URL } from "@/lib/config"

interface Delegate {
  id: string
  firstName: string
  lastName: string
  email: string
  delegate_type: string
  country: string
  organization: string
  position: string
  profile_picture_url: string // Updated to match the API response
  selected_event: string
}

// Reduced from 9 to 6 items per page (2 rows x 3 columns)
const ITEMS_PER_PAGE = 6

// Print styles
const printStyles = `
  @page {
    size: 148mm 210mm;
    margin: 0;
  }

  @media print {
    html, body {
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .no-print {
      display: none !important;
    }

    .print-only {
      display: block !important;
    }

    .badge-print-container {
      width: 148mm;
      height: 210mm;
      margin: 0;
      padding: 0;
      page-break-after: always;
      position: relative;
      overflow: hidden;
      background: white;
    }

    .badge-content {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
`

// Badge Component (used for both preview and generation)
const Badge = ({ user, side = "front" }: { user: Delegate; side?: "front" | "back" }) => {
  const styles = {
    gradient: {
      background: "linear-gradient(180deg, rgb(2, 111, 180) 0%, rgb(0, 51, 102) 100%)",
      padding: "10mm",
    },
    container: {
      width: "148mm",
      height: "210mm",
      position: "relative" as const,
    },
    whiteBackground: {
      backgroundColor: "#ffffff",
    },
    primaryText: {
      color: "#026FB4",
    },
    grayText: {
      color: "#4B5563",
    },
    border: {
      border: "4px solid #026FB4",
    },
    primaryBackground: {
      backgroundColor: "#026FB4",
    },
    whiteText: {
      color: "#ffffff",
    },
  }

  if (side === "front") {
    return (
      <div className="badge-container" style={styles.container}>
        <div className="relative w-full h-full">
          <div className="absolute inset-0" style={styles.gradient}>
            <div
              className="w-full h-full rounded-lg p-8 flex flex-col items-center justify-between"
              style={styles.whiteBackground}
            >
              <div className="flex justify-center mt-8">
                <div className="relative w-[40mm] h-[40mm]">
                  <div className="absolute inset-0 rounded-full overflow-hidden" style={styles.border}>
                    <Image
                      src={user.profile_picture_url || "/man.svg"}
                      alt={`${user.firstName} ${user.lastName}`}
                      fill
                      className="rounded-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4 mt-8">
                <h2 className="text-[24pt] font-bold" style={styles.primaryText}>
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-[18pt]" style={styles.grayText}>
                  {user.position}
                </p>
                <p className="text-[16pt]" style={styles.grayText}>
                  {user.organization}
                </p>
              </div>

              <div className="mt-8 mb-8 w-full max-w-[80%]">
                <div
                  className="py-3 px-6 rounded-full text-center"
                  style={{ ...styles.primaryBackground, ...styles.whiteText }}
                >
                  <p className="text-[16pt] font-medium">{user.selected_event}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="badge-container" style={styles.container}>
        <div className="relative w-full h-full">
          <div className="absolute inset-0" style={styles.gradient}>
            <div
              className="w-full h-full rounded-lg p-8 flex flex-col items-center justify-center"
              style={styles.whiteBackground}
            >
              <h2 className="text-[20pt] font-bold mb-8" style={styles.primaryText}>
                Scan QR Code
              </h2>
              <div className="w-[60mm] h-[60mm] mb-8" style={styles.primaryBackground}></div>
              <p className="text-[16pt]" style={styles.grayText}>
                For More Information
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Print Preview Dialog
const PrintPreview = ({ users }: { users: Delegate[] }) => {
  return (
    <div className="print-preview">
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      {users.map((user, index) => (
        <Badge key={index} user={user} side="front" />
      ))}
    </div>
  )
}

export default function BadgesPage() {
  const [delegates, setDelegates] = useState<Delegate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [workshops, setWorkshops] = useState<string[]>([])

  useEffect(() => {
    const fetchDelegates = async () => {
      try {
        setLoading(true)
        setError(null)
        const token = getToken()

        if (!token) {
          setError("Your session has expired. Please login again.")
          toast.error("Your session has expired. Please login again.")
          window.location.href = "/login"
          return
        }

        const response = await fetch(`${BACKEND_URL}/delegates`, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
          cache: "no-store",
        })

        if (!response.ok) {
          if (response.status === 401) {
            setError("Your session has expired. Please login again.")
            toast.error("Your session has expired. Please login again.")
            window.location.href = "/login"
            return
          }

          const errorText = await response.text()
          throw new Error(errorText || `HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Fetched delegates:", data)

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format: expected an array of delegates")
        }

        // Extract unique workshop names from the data
        const uniqueWorkshops = Array.from(new Set(data.map((delegate) => delegate.selected_event))).filter(
          (workshop) => workshop,
        )
        setWorkshops(uniqueWorkshops)
        setDelegates(data)
      } catch (error) {
        console.error("Error fetching delegates:", error)
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch delegates. Please check your connection and try again."
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchDelegates()
  }, [])

  const filteredDelegates = delegates.filter((delegate) => {
    const searchTerm = searchQuery.toLowerCase()
    const matchesSearch =
      delegate.firstName.toLowerCase().includes(searchTerm) ||
      delegate.lastName.toLowerCase().includes(searchTerm) ||
      delegate.email.toLowerCase().includes(searchTerm) ||
      delegate.organization.toLowerCase().includes(searchTerm)

    const matchesWorkshop = selectedWorkshop === "all" || delegate.selected_event === selectedWorkshop

    return matchesSearch && matchesWorkshop
  })

  const totalPages = Math.ceil(filteredDelegates.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedDelegates = filteredDelegates.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleWorkshopChange = (workshop: string) => {
    setSelectedWorkshop(workshop)
    setCurrentPage(1)
  }

  const handleGenerateAllBadges = async () => {
    setIsGenerating(true)
    try {
      const zip = new JSZip()

      // Filter users for selected workshop
      const workshopUsers =
        selectedWorkshop === "all" ? delegates : delegates.filter((user) => user.selected_event === selectedWorkshop)

      for (const user of workshopUsers) {
        // Create canvas for front
        const frontCanvas = document.createElement("canvas")
        frontCanvas.width = 1749 // 148mm at 300dpi
        frontCanvas.height = 2481 // 210mm at 300dpi
        const frontCtx = frontCanvas.getContext("2d")!

        // Draw front badge
        // Fill entire canvas with gradient background
        const frontGradient = frontCtx.createLinearGradient(0, 0, 0, frontCanvas.height)
        frontGradient.addColorStop(0, "#026FB4")
        frontGradient.addColorStop(1, "#003366")
        frontCtx.fillStyle = frontGradient
        frontCtx.fillRect(0, 0, frontCanvas.width, frontCanvas.height)

        // Draw white card background with rounded corners
        const padding = frontCanvas.width * 0.06 // 6% padding
        frontCtx.fillStyle = "#ffffff"
        roundRect(
          frontCtx,
          padding,
          padding,
          frontCanvas.width - padding * 2,
          frontCanvas.height - padding * 2,
          60, // Larger radius for more rounded corners
        )

        // Load and draw user image
        const img = document.createElement("img")
        await new Promise<void>((resolve, reject) => {
          const handleLoad = () => {
            img.removeEventListener("load", handleLoad)
            img.removeEventListener("error", handleError)
            resolve()
          }

          const handleError = () => {
            img.removeEventListener("load", handleLoad)
            img.removeEventListener("error", handleError)
            reject(new Error("Failed to load image"))
          }

          img.addEventListener("load", handleLoad)
          img.addEventListener("error", handleError)
          img.crossOrigin = "anonymous"
          img.src = user.profile_picture_url || "/man.svg"
        })

        // Draw circular profile image
        const imageSize = frontCanvas.width * 0.22 // Slightly smaller image
        const imageX = (frontCanvas.width - imageSize) / 2
        const imageY = padding + frontCanvas.height * 0.12 // Position higher up

        // Draw blue circle border first
        frontCtx.strokeStyle = "#026FB4"
        frontCtx.lineWidth = 16 // Thicker border
        frontCtx.beginPath()
        frontCtx.arc(imageX + imageSize / 2, imageY + imageSize / 2, imageSize / 2 + 8, 0, Math.PI * 2)
        frontCtx.stroke()

        // Then draw the clipped image
        frontCtx.save()
        frontCtx.beginPath()
        frontCtx.arc(imageX + imageSize / 2, imageY + imageSize / 2, imageSize / 2, 0, Math.PI * 2)
        frontCtx.clip()
        frontCtx.drawImage(img, imageX, imageY, imageSize, imageSize)
        frontCtx.restore()

        // Text settings
        frontCtx.textAlign = "center"

        // Draw name - larger and bolder
        frontCtx.font = "bold 140px Inter"
        frontCtx.fillStyle = "#026FB4"
        frontCtx.fillText(`${user.firstName} ${user.lastName}`, frontCanvas.width / 2, imageY + imageSize + 180)

        // Draw title - medium size
        frontCtx.font = "90px Inter"
        frontCtx.fillStyle = "#4B5563"
        frontCtx.fillText(user.position, frontCanvas.width / 2, imageY + imageSize + 320)

        // Draw company - slightly smaller
        frontCtx.font = "80px Inter"
        frontCtx.fillText(user.organization, frontCanvas.width / 2, imageY + imageSize + 440)

        // Draw workshop badge - wider and more rounded
        const badgeWidth = frontCanvas.width * 0.75
        const badgeHeight = 140
        const badgeX = (frontCanvas.width - badgeWidth) / 2
        const badgeY = frontCanvas.height - padding - 240

        frontCtx.fillStyle = "#026FB4"
        roundRect(frontCtx, badgeX, badgeY, badgeWidth, badgeHeight, 70)

        frontCtx.font = "80px Inter"
        frontCtx.fillStyle = "#ffffff"
        frontCtx.fillText(user.selected_event, frontCanvas.width / 2, badgeY + badgeHeight * 0.68)

        // Create canvas for back
        const backCanvas = document.createElement("canvas")
        backCanvas.width = 1749
        backCanvas.height = 2481
        const backCtx = backCanvas.getContext("2d")!

        // Draw back badge
        // Fill entire canvas with gradient background
        const backGradient = backCtx.createLinearGradient(0, 0, 0, backCanvas.height)
        backGradient.addColorStop(0, "#026FB4")
        backGradient.addColorStop(1, "#003366")
        backCtx.fillStyle = backGradient
        backCtx.fillRect(0, 0, backCanvas.width, backCanvas.height)

        // Draw white card background with rounded corners
        backCtx.fillStyle = "#ffffff"
        roundRect(backCtx, padding, padding, backCanvas.width - padding * 2, backCanvas.height - padding * 2, 60)

        // Draw "Scan QR Code" text
        backCtx.font = "bold 120px Inter"
        backCtx.fillStyle = "#026FB4"
        backCtx.textAlign = "center"
        backCtx.fillText("Scan QR Code", backCanvas.width / 2, padding + 240)

        // Draw QR code placeholder - larger and with rounded corners
        const qrSize = backCanvas.width * 0.35
        const qrX = (backCanvas.width - qrSize) / 2
        const qrY = (backCanvas.height - qrSize) / 2

        backCtx.fillStyle = "#026FB4"
        roundRect(backCtx, qrX, qrY, qrSize, qrSize, 20)

        // Draw "For More Information" text
        backCtx.font = "80px Inter"
        backCtx.fillStyle = "#4B5563"
        backCtx.fillText("For More Information", backCanvas.width / 2, qrY + qrSize + 180)

        // Convert to blobs and add to zip
        const frontBlob = await new Promise<Blob>((resolve) => {
          frontCanvas.toBlob((blob) => resolve(blob!), "image/png", 1.0)
        })

        const backBlob = await new Promise<Blob>((resolve) => {
          backCanvas.toBlob((blob) => resolve(blob!), "image/png", 1.0)
        })

        zip.file(`${user.firstName}_${user.lastName}_front.png`, frontBlob)
        zip.file(`${user.firstName}_${user.lastName}_back.png`, backBlob)
      }

      // Generate and download zip
      const content = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(content)
      const a = document.createElement("a")
      a.href = url
      a.download = `${selectedWorkshop === "all" ? "All_Workshops" : selectedWorkshop}_Badges.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating badges:", error)
      toast.error("Error generating badges. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Helper function to draw rounded rectangles
  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ) {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
    ctx.fill()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Badges</h1>
        <UserProfile />
      </div>

      <div className="container mx-auto p-6">
        <div
          className={`h-screen flex flex-col ${isGenerating ? "no-print" : ""}`}
          style={{ backgroundColor: "#F9FAFB" }}
        >
          {/* Search and Filter Section */}
          <div
            className="flex-none px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shadow-sm"
            style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #E5E7EB" }}
          >
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 transition-colors" style={{ color: "#6B7280" }} />
                <Input
                  placeholder="Search delegates..."
                  className="pl-8 transition-all duration-200"
                  style={
                    {
                      "--tw-ring-color": "#026FB4",
                      "--tw-ring-offset-width": "2px",
                    } as React.CSSProperties
                  }
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
              <Select value={selectedWorkshop} onValueChange={handleWorkshopChange}>
                <SelectTrigger
                  className="w-full sm:w-[200px] transition-all duration-200"
                  style={
                    {
                      "--tw-ring-color": "#026FB4",
                      "--tw-ring-offset-width": "2px",
                    } as React.CSSProperties
                  }
                >
                  <SelectValue placeholder="Filter by workshop" />
                </SelectTrigger>
                <SelectContent
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <SelectItem
                    value="all"
                    style={{ "--hover-bg": "#026FB4", "--hover-text": "#ffffff" } as React.CSSProperties}
                  >
                    All Workshops
                  </SelectItem>
                  {workshops.map((workshop) => (
                    <SelectItem
                      key={workshop}
                      value={workshop}
                      style={{ "--hover-bg": "#026FB4", "--hover-text": "#ffffff" } as React.CSSProperties}
                    >
                      {workshop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleGenerateAllBadges}
                disabled={isGenerating}
                style={{ backgroundColor: "#026FB4", color: "#ffffff" }}
                className="hover:bg-[#0052CC] transition-colors duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating..." : "Download All Badges"}
              </Button>
            </div>
            <div
              className="text-sm px-3 py-1.5 rounded-full border"
              style={{ backgroundColor: "#F9FAFB", color: "#6B7280" }}
            >
              Showing {paginatedDelegates.length} of {filteredDelegates.length} delegates
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 px-4 py-3 flex flex-col overflow-auto">
            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#026FB4]"></div>
              </div>
            )}

            {error && !loading && <div className="text-center py-8 text-red-500">{error}</div>}

            {!loading && !error && (
              <>
                {/* Users Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                  {paginatedDelegates.map((delegate) => (
                    <Card
                      key={delegate.id}
                      className="overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <CardContent className="p-5 h-full flex flex-col justify-center relative">
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: "linear-gradient(to bottom right, transparent, #F9FAFB)" }}
                        />
                        <div className="relative">
                          <Link href={`/coordinator/badges/${delegate.id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              style={{
                                backgroundColor: "#026FB4",
                                color: "#ffffff",
                                borderColor: "#ffffff",
                              }}
                              className="absolute -right-1 -top-1 h-9 w-9 rounded-full shadow-sm border-2 hover:bg-[#0052CC] hover:text-white transition-transform duration-200 hover:scale-110"
                            >
                              <IdCardIcon className="h-4.5 w-4.5" />
                            </Button>
                          </Link>
                          <Link href={`/coordinator/badges/${delegate.id}`} className="flex flex-col items-center">
                            <div
                              className="relative mb-4 h-24 w-24 overflow-hidden rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300"
                              style={{ border: "4px solid #026FB4" }}
                            >
                              <Image
                                src={delegate.profile_picture_url || "/man.svg"}
                                alt={`${delegate.firstName} ${delegate.lastName}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <h3
                              className="text-xl font-bold line-clamp-1 transition-colors duration-200"
                              style={{ color: "#026FB4" }}
                            >
                              {delegate.firstName} {delegate.lastName}
                            </h3>
                            <p className="text-base line-clamp-1" style={{ color: "#4B5563" }}>
                              {delegate.position}
                            </p>
                            <div
                              className="mt-2 px-3 py-1 rounded-full"
                              style={{ backgroundColor: "rgba(2, 111, 180, 0.1)" }}
                            >
                              <p className="text-sm font-medium" style={{ color: "#026FB4" }}>
                                {delegate.selected_event}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex-none mt-6 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8 transition-colors duration-200"
                      style={{ "--hover-bg": "#026FB4", "--hover-text": "#ffffff" } as React.CSSProperties}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="h-8 w-8 transition-colors duration-200"
                        style={
                          currentPage === page
                            ? { backgroundColor: "#026FB4", color: "#ffffff" }
                            : ({ "--hover-bg": "#026FB4", "--hover-text": "#ffffff" } as React.CSSProperties)
                        }
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 transition-colors duration-200"
                      style={{ "--hover-bg": "#026FB4", "--hover-text": "#ffffff" } as React.CSSProperties}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Print Preview */}
        {isGenerating && (
          <div className="print-only" style={{ display: "none" }}>
            <PrintPreview users={delegates} />
          </div>
        )}
      </div>
    </div>
  )
}
