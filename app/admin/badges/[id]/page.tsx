"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { QRCode } from "@/components/ui/qr-code";
import { UserProfile } from "@/components/users/UserProfile";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getToken } from "@/utils/token";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { BACKEND_URL } from "@/lib/config";

interface Delegate {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  organization: string;
  profile_picture_url: string;
  selected_activities: string[];
  selected_round_tables: string[];
  selected_event: string;
  workshops?: Array<{
    id: string;
    title: string;
    venue: string;
    short_description: string | null;
    schedule: string;
    capacity: number;
  }>;
}

export default function BadgePreviewPage() {
  const params = useParams();
  const badgeRef = useRef<HTMLDivElement>(null);
  const frontBadgeRef = useRef<HTMLDivElement>(null);
  const backBadgeRef = useRef<HTMLDivElement>(null);
  const [delegate, setDelegate] = useState<Delegate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string>("");
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    // Set the base URL for the QR code
    setBaseUrl(typeof window !== "undefined" ? window.location.origin : "");
    console.log(baseUrl);
  }, [baseUrl]);

  useEffect(() => {
    const fetchDelegate = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = getToken();

        if (!token) {
          setError("Your session has expired. Please login again.");
          toast.error("Your session has expired. Please login again.");
          window.location.href = "/login";
          return;
        }

        // Use the specific delegate ID from the URL params
        const delegateId = params.id || "a410a68c-523c-4bd5-8d9d-ec11bab2d2f9"; // Fallback to the provided ID
        const response = await fetch(`${BACKEND_URL}/delegates/${delegateId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("Your session has expired. Please login again.");
            toast.error("Your session has expired. Please login again.");
            window.location.href = "/login";
            return;
          }
          throw new Error("Failed to fetch delegate");
        }

        const data = await response.json();
        setDelegate(data);

        // Pre-load the profile image to avoid CORS issues
        if (data.profile_picture_url) {
          try {
            await preloadImage(data.profile_picture_url);
          } catch (imgError) {
            console.warn("Could not preload profile image:", imgError);
            // We'll use the fallback image in this case
          }
        }
      } catch (err) {
        console.error("Error fetching delegate:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDelegate();
  }, [params.id]);

  useEffect(() => {
    if (!registrationId) {
      const randomNumber = Math.floor(Math.random() * 500) + 1; // between 1 and 360
      const regId = `RFF${String(randomNumber).padStart(3, "0")}`; // pad with zeros like 001, 045, 360
      setRegistrationId(regId);
    }
  }, [registrationId]);

  function generateRegistrationId(delegateId: string) {
    let hash = 0;
    for (let i = 0; i < delegateId.length; i++) {
      hash = delegateId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const randomNumber = Math.abs(hash % 500) + 1; // 1 - 360
    return `RFF${String(randomNumber).padStart(3, "0")}`; // RFF001, RFF045, RFF360
  }

  function getWorkshopSchedule(workshop: { id: string; title: string }) {
    const { id, title } = workshop;
    const lowerTitle = title.toLowerCase();

    if (
      ["ws1", "ws2", "ws3", "ws4"].includes(id) ||
      lowerTitle.includes("quality") ||
      lowerTitle.includes("relevance") ||
      lowerTitle.includes("inclusion") ||
      (lowerTitle.includes("innovation") && !lowerTitle.includes("ecosystem"))
    ) {
      return {
        date: "June 4, 2025",
        time: "11:30 AM to 1:00 PM",
      };
    } else if (
      ["ws5", "ws6", "ws7", "ws8"].includes(id) ||
      lowerTitle.includes("skills outlook") ||
      lowerTitle.includes("emerging technologies") ||
      lowerTitle.includes("inclusive workforce") ||
      (lowerTitle.includes("innovation") && lowerTitle.includes("ecosystem"))
    ) {
      return {
        date: "June 4, 2025",
        time: "14:30 PM to 16:00 PM",
      };
    }

    return {
      date: "TBD",
      time: "TBD",
    };
  }

  // Preload image and return a promise
  const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Create a canvas to convert the image
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);

        try {
          // Convert to data URL
          const dataUrl = canvas.toDataURL("image/png");
          setProfileImage(dataUrl);
          resolve();
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
    });
  };

  // Simple download function that uses the browser's built-in functionality
  const downloadUsingCanvas = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      toast.error(`Element with ID "${elementId}" not found`);
      return;
    }

    try {
      // Get element dimensions
      const rect = element.getBoundingClientRect();

      // Create canvas with the same dimensions
      const canvas = document.createElement("canvas");
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Draw the element to the canvas using html2canvas
      const dataUrl = await toPng(element, {
        quality: 0.95,
        pixelRatio: 2,
        skipFonts: true, // Skip loading fonts which can cause issues
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      // Create download link
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return true;
    } catch (err) {
      console.error("Error in downloadUsingCanvas:", err);
      return false;
    }
  };

  // Function to download both sides as a single image
  const handleDownloadCombined = async () => {
    if (!delegate) return;

    setIsDownloading(true);
    const toastId = toast.loading("Preparing your badge for download...");

    try {
      const success = await downloadUsingCanvas(
        "combined-badge",
        `badge-${delegate.firstName.toLowerCase()}-${delegate.lastName.toLowerCase()}.png`
      );

      if (success) {
        toast.dismiss(toastId);
        toast.success("Badge downloaded successfully!");
      } else {
        throw new Error("Failed to generate badge image");
      }
    } catch (err) {
      console.error("Error downloading badge:", err);
      toast.dismiss(toastId);
      toast.error("Failed to download badge. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Function to download front and back badges separately
  const handleDownloadSeparate = async () => {
    if (!delegate) return;

    setIsDownloading(true);
    const toastId = toast.loading("Preparing your badges for download...");

    try {
      // Download front badge
      const frontSuccess = await downloadUsingCanvas(
        "front-badge",
        `badge-${delegate.firstName.toLowerCase()}-${delegate.lastName.toLowerCase()}-front.png`
      );

      if (!frontSuccess) {
        throw new Error("Failed to generate front badge image");
      }

      // Short delay between downloads
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Download back badge
      const backSuccess = await downloadUsingCanvas(
        "back-badge",
        `badge-${delegate.firstName.toLowerCase()}-${delegate.lastName.toLowerCase()}-back.png`
      );

      if (!backSuccess) {
        throw new Error("Failed to generate back badge image");
      }

      toast.dismiss(toastId);
      toast.success("Badges downloaded successfully!");
    } catch (err) {
      console.error("Error downloading badges:", err);
      toast.dismiss(toastId);
      toast.error("Failed to download badges. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Fallback download method using screenshots
  const handleDownloadFallback = () => {
    if (!delegate) return;

    setIsDownloading(true);
    const toastId = toast.loading("Preparing download instructions...");

    try {
      // Create instructions for manual screenshot
      toast.dismiss(toastId);
      toast.info(
        "Please take a screenshot of each badge and save it manually. On most computers, you can use: Windows (Win+Shift+S), Mac (Cmd+Shift+4), or your browser's screenshot tool.",
        { duration: 8000 }
      );
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(
        "An error occurred. Please try taking a screenshot manually."
      );
      console.error("Error in fallback download:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#026FB4]"></div>
      </div>
    );
  }

  if (error || !delegate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h1 className="text-2xl font-bold">Delegate not found</h1>
        <Link href="/admin/badges">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Badges
          </Button>
        </Link>
      </div>
    );
  }

  // Replace the schedules array with workshops data
  const workshops = delegate.workshops || [];

  return (
    <div className="container mx-auto p-6">
      <div className="min-h-screen bg-gray-50/50">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/admin/badges">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Badge Preview</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Preview and generate badge for {delegate.firstName}{" "}
                {delegate.lastName}
              </p>
            </div>
          </div>
          <UserProfile />
        </div>

        <div className="container mx-auto px-4 pb-12">
          <Card className="p-8 bg-white shadow-md">
            <div className="space-y-12">
              {/* Badge Preview Section */}
              <div
                id="combined-badge"
                ref={badgeRef}
                className="grid gap-12 mx-auto md:grid-cols-2 max-w-[1000px]"
              >
                {/* Front of Badge */}
                <div
                  id="front-badge"
                  ref={frontBadgeRef}
                  className="relative h-[500px] w-[380px] overflow-hidden rounded-2xl border-2 bg-white p-6 shadow-lg mx-auto hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="absolute inset-0">
                    <div className="absolute -left-12 -top-12 h-24 w-48 rotate-45 bg-[#026FB4]/20"></div>
                    <div className="absolute -right-12 -top-12 h-24 w-48 rotate-45 bg-[#026FB4]/20"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#026FB4]/10"></div>
                  </div>

                  <div className="relative flex h-full flex-col items-center py-4">
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                      <Image
                        src="/logo.svg"
                        alt="FutureSkills Logo"
                        width={160}
                        height={45}
                        className="mb-2"
                      />

                      <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#026FB4] shadow-md">
                        {profileImage ? (
                          // Use the preloaded image if available
                          <Image
                            src={profileImage || "/placeholder.svg"}
                            alt={`${delegate.firstName} ${delegate.lastName}'s photo`}
                            fill
                            className="object-cover"
                            unoptimized={true} // Since we're using a data URL
                            priority={true} // This is likely an important image above the fold
                          />
                        ) : (
                          // Fallback to regular Image component
                          <Image
                            src={delegate.profile_picture_url || "/man.svg"}
                            alt={`${delegate.firstName} ${delegate.lastName}'s photo`}
                            fill
                            className="object-cover"
                            crossOrigin="anonymous"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/man.svg";
                            }}
                          />
                        )}
                      </div>

                      <div className="text-center space-y-1">
                        <h3 className="text-2xl font-bold text-[#026FB4]">
                          {delegate.firstName} {delegate.lastName}
                        </h3>
                        <p className="text-base text-gray-600 font-medium">
                          {delegate.position}
                        </p>
                        <p className="text-base text-gray-600">
                          {delegate.organization}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="rounded-xl border-2 border-[#026FB4] bg-white p-2 shadow-md">
                        <QRCode
                          value={`${"http://rwandafutureskillsforum.rtb.gov.rw"}/verify/${
                            delegate.id
                          }`}
                          size={100}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of Badge */}
                <div
                  id="back-badge"
                  ref={backBadgeRef}
                  className="relative h-[500px] w-[380px] overflow-hidden rounded-2xl border-2 bg-white p-6 shadow-lg mx-auto hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="absolute inset-0">
                    <div className="absolute -left-12 -top-12 h-24 w-48 rotate-45 bg-[#026FB4]/20"></div>
                    <div className="absolute -right-12 -top-12 h-24 w-48 rotate-45 bg-[#026FB4]/20"></div>
                  </div>

                  <div className="relative flex h-full flex-col">
                    <div className="mb-4 rounded-xl bg-gradient-to-r from-[#026FB4]/10 via-[#026FB4]/20 to-[#026FB4]/10 p-3 text-center shadow-sm">
                      <p className="text-base font-semibold text-[#026FB4]">
                        Delegate ID
                      </p>
                      <p className="mt-0.5 font-mono text-lg font-bold tracking-wider text-[#026FB4]">
                        {generateRegistrationId(delegate.id)}
                      </p>
                    </div>

                    <h4 className="mb-4 text-center text-lg font-semibold text-[#026FB4]">
                      Your Workshops
                    </h4>

                    <div className="flex-1 space-y-3 overflow-y-auto">
                      {workshops.map((workshop) => {
                        const { date, time } = getWorkshopSchedule(workshop);

                        return (
                          <div
                            key={workshop.id}
                            className="rounded-xl border-2 border-[#026FB4]/20 bg-[#026FB4]/5 p-3 shadow-sm transition-all duration-200 hover:bg-[#026FB4]/10 hover:shadow-md"
                          >
                            <p className="text-sm font-bold text-gray-800">
                              {workshop.title}
                            </p>
                            <div className="mt-2 flex flex-col">
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-medium text-[#026FB4]">
                                  Venue:
                                </span>
                                <span className="text-xs text-gray-700">
                                  {workshop.venue}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-medium text-[#026FB4]">
                                  Date:
                                </span>
                                <span className="text-xs text-gray-700">
                                  {date}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-medium text-[#026FB4]">
                                  Time:
                                </span>
                                <span className="text-xs text-gray-700">
                                  {time}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-sm font-medium text-[#026FB4]/60">
                        Please keep this badge with you at all times
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-6 sm:justify-center">
                <Button
                  onClick={handleDownloadCombined}
                  style={{ backgroundColor: "#026FB4" }}
                  className="flex items-center justify-center gap-3 text-base py-6 px-8 hover:bg-blue-700"
                  disabled={isDownloading}
                >
                  <Download className="h-5 w-5" />
                  {isDownloading ? "Preparing..." : "Download Combined Badge"}
                </Button>
                <Button
                  onClick={handleDownloadSeparate}
                  variant="outline"
                  style={{ borderColor: "#026FB4", color: "#026FB4" }}
                  className="flex items-center justify-center gap-3 text-base py-6 px-8 hover:bg-blue-50"
                  disabled={isDownloading}
                >
                  <Download className="h-5 w-5" />
                  Download Front & Back Separately
                </Button>
                <Button
                  onClick={handleDownloadFallback}
                  variant="ghost"
                  className="flex items-center justify-center gap-3 text-base py-6 px-8 hover:bg-gray-100"
                  disabled={isDownloading}
                >
                  <Download className="h-5 w-5" />
                  Screenshot Instructions
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
