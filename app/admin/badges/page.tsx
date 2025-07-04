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
import { toPng } from "html-to-image"

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
      color: "#43A047",
    },
    grayText: {
      color: "#4B5563",
    },
    border: {
      border: "4px solid #43A047",
    },
    primaryBackground: {
      backgroundColor: "#43A047",
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

// Reusable BadgePreview component (front & back)
function BadgePreview({ delegate, registrationId }: { delegate: Delegate, registrationId: string }) {
  function generateRegistrationId(delegateId: string) {
    let hash = 0;
    for (let i = 0; i < delegateId.length; i++) {
      hash = delegateId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const randomNumber = Math.abs(hash % 500) + 1;
    return `RFF${String(randomNumber).padStart(3, "0")}`;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-[900px] mx-auto">
      {/* Front */}
      <div
        className="badge-front relative h-[500px] w-[380px] overflow-hidden rounded-2xl bg-white p-6 shadow-lg mx-auto flex flex-col justify-center items-center"
        style={{ borderLeft: '6px solid #1565C0', borderRight: '6px solid #1565C0' }}
      >
        <div style={{position:'absolute', left:0, top:0, width:'100%', height:'6px', borderTopLeftRadius:'16px', borderTopRightRadius:'16px', background: 'linear-gradient(90deg, #1565C0 0%, #43A047 25%, #F9A825 50%, #000 75%, #fff 100%)', zIndex:2}}></div>
        <div style={{position:'absolute', left:0, bottom:0, width:'100%', height:'6px', borderBottomLeftRadius:'16px', borderBottomRightRadius:'16px', background: 'linear-gradient(90deg, #1565C0 0%, #43A047 25%, #F9A825 50%, #000 75%, #fff 100%)', zIndex:2}}></div>
        <div style={{position:'absolute', left:10, top:10, zIndex:3}}>
          <Image src="/eac.jpeg" alt="EAC Logo" width={38} height={38} style={{objectFit:'contain', borderRadius:'8px'}} />
        </div>
        <div style={{position:'absolute', right:10, top:10, zIndex:3}}>
          <Image src="/repub.jpeg" alt="Rwanda Logo" width={38} height={38} style={{objectFit:'contain', borderRadius:'8px'}} />
        </div>
        <div className="mt-2 mb-4 flex justify-center">
          <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-[#43A047] bg-white shadow">
            <Image
              src={delegate.profile_picture_url || "/man.svg"}
              alt={`${delegate.firstName} ${delegate.lastName}`}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="text-center space-y-2 mt-2">
          <h3 className="text-2xl font-bold text-[#222] drop-shadow-none">
            {delegate.firstName} {delegate.lastName}
          </h3>
          <p className="text-lg font-semibold text-[#1B5E20]">
            {delegate.organization}
          </p>
          <p className="text-lg  text-[#1565C0] font-medium">
            {delegate.country}
          </p>
        </div>
      </div>
      {/* Back */}
      <div
        className="badge-back relative h-[500px] w-[380px] overflow-hidden rounded-2xl bg-white p-6 shadow-lg mx-auto flex flex-col justify-center items-center"
        style={{ borderLeft: '6px solid #1565C0', borderRight: '6px solid #1565C0' }}
      >
        <div style={{position:'absolute', left:0, top:0, width:'100%', height:'6px', borderTopLeftRadius:'16px', borderTopRightRadius:'16px', background: 'linear-gradient(90deg, #1565C0 0%, #43A047 25%, #F9A825 50%, #000 75%, #fff 100%)', zIndex:2}}></div>
        <div style={{position:'absolute', left:0, bottom:0, width:'100%', height:'6px', borderBottomLeftRadius:'16px', borderBottomRightRadius:'16px', background: 'linear-gradient(90deg, #1565C0 0%, #43A047 25%, #F9A825 50%, #000 75%, #fff 100%)', zIndex:2}}></div>
        <div className="relative flex flex-col w-full items-center mt-8 mb-6">
          <div className="mb-4 rounded-xl bg-gradient-to-r from-[#1565C0]/10 via-[#1565C0]/20 to-[#43A047]/10 p-3 text-center shadow-sm w-3/4 mx-auto">
            <p className="text-base font-semibold text-[#1565C0]">Delegate ID</p>
            <p className="mt-0.5 font-mono text-lg font-bold tracking-wider text-[#1565C0]">{generateRegistrationId(delegate.id)}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-full w-full">
          <h2 className="text-lg font-bold text-[#1565C0] text-center mb-2">4th World Kiswahili Day Celebrations<br/>Kigali - Rwanda</h2>
          <h3 className="text-base font-semibold text-[#43A047] text-center mt-2">Maadhimisho ya Nne ya Siku ya Kiswahili Duniani<br/>Kigali- Rwanda</h3>
        </div>
      </div>
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
        // 1. Create a container for the badge preview
        const container = document.createElement("div")
        container.style.position = "fixed"
        container.style.left = "-9999px"
        container.style.top = "0"
        document.body.appendChild(container)
        // 2. Render BadgePreview into the container
        const registrationId = "" // or use hash logic if needed
        // @ts-ignore
        import("react-dom/client").then(ReactDOMClient => {
          const root = ReactDOMClient.createRoot(container)
          root.render(<BadgePreview delegate={user} registrationId={registrationId} />)
        })
        // 3. Wait for render
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // 4. Take screenshot of front
        const front = container.querySelector('.badge-front') as HTMLElement
        const back = container.querySelector('.badge-back') as HTMLElement
        if (front) {
          const frontDataUrl = await toPng(front, { quality: 0.95, pixelRatio: 2, backgroundColor: "#fff" })
          const frontBlob = await (await fetch(frontDataUrl)).blob()
          zip.file(`${user.firstName}_${user.lastName}_front.png`, frontBlob)
        }
        if (back) {
          const backDataUrl = await toPng(back, { quality: 0.95, pixelRatio: 2, backgroundColor: "#fff" })
          const backBlob = await (await fetch(backDataUrl)).blob()
          zip.file(`${user.firstName}_${user.lastName}_back.png`, backBlob)
        }
        // 5. Clean up
        document.body.removeChild(container)
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
                          <Link href={`/admin/badges/${delegate.id}`}>
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
                          <Link href={`/admin/badges/${delegate.id}`} className="flex flex-col items-center">
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
                                {delegate.organization}
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
                  <div className="flex-none mt-6 flex items-center justify-center gap-2 flex-wrap">
                    <span className="mr-2 text-gray-600 text-sm">Page {currentPage} of {totalPages}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className="h-8 w-12"
                    >
                      First
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {/* Page numbers with ellipsis */}
                    {(() => {
                      const pageButtons = []
                      const maxPagesToShow = 5
                      let startPage = Math.max(1, currentPage - 2)
                      let endPage = Math.min(totalPages, currentPage + 2)
                      if (currentPage <= 3) {
                        endPage = Math.min(totalPages, maxPagesToShow)
                      } else if (currentPage >= totalPages - 2) {
                        startPage = Math.max(1, totalPages - maxPagesToShow + 1)
                      }
                      // Always show first page
                      if (startPage > 1) {
                        pageButtons.push(
                          <Button key={1} variant={currentPage === 1 ? "default" : "outline"} size="sm" onClick={() => handlePageChange(1)} className="h-8 w-8">1</Button>
                        )
                        if (startPage > 2) {
                          pageButtons.push(<span key="start-ellipsis" className="px-1">...</span>)
                        }
                      }
                      for (let page = startPage; page <= endPage; page++) {
                        if (page === 1 || page === totalPages) continue // already handled
                        pageButtons.push(
                          <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => handlePageChange(page)} className="h-8 w-8">{page}</Button>
                        )
                      }
                      // Always show last page
                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                          pageButtons.push(<span key="end-ellipsis" className="px-1">...</span>)
                        }
                        pageButtons.push(
                          <Button key={totalPages} variant={currentPage === totalPages ? "default" : "outline"} size="sm" onClick={() => handlePageChange(totalPages)} className="h-8 w-8">{totalPages}</Button>
                        )
                      }
                      return pageButtons
                    })()}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-12"
                    >
                      Last
                    </Button>
                    {/* Go to page input */}
                    <span className="ml-4 text-sm">Go to:</span>
                    <input
                      type="number"
                      min={1}
                      max={totalPages}
                      defaultValue={currentPage}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          const val = Number((e.target as HTMLInputElement).value)
                          if (val >= 1 && val <= totalPages) handlePageChange(val)
                        }
                      }}
                      className="ml-2 w-16 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      style={{ width: 60 }}
                    />
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
