"use client";

import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Check, MoreHorizontal, User, X } from "lucide-react";
import { getToken } from "@/utils/token";
import Link from "next/link";
import { BACKEND_URL } from "@/lib/config";

// Define types for the data structures
interface Delegate {
  id: string;
  registration_date: string;
  // Add other delegate properties as needed
}

interface Workshop {
  id: string;
  title: string;
  // Add other workshop properties as needed
}

interface DelegateChartData {
  day: number;
  date: string;
  applications: number;
}

interface WorkshopAttendance {
  id: string;
  name: string;
  percentage: number;
  status: string;
  count: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      date: string;
      applications: number;
    };
  }>;
}

interface ActiveDotProps {
  cx: number;
  cy: number;
  payload: {
    applications: number;
  };
}

export function DashboardCharts({
  userRole = "admin",
}: {
  userRole?: "admin" | "coordinator";
}) {
  const [activeCard, setActiveCard] = useState<string | null>("workshops");
  const [workshopsCount, setWorkshopsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Comment out unused variable or use it in the component
  // const [delegatesData, setDelegatesData] = useState<Delegate[]>([])
  const [delegatesChartData, setDelegatesChartData] = useState<
    DelegateChartData[]
  >([]);
  const [workshopsData, setWorkshopsData] = useState<Workshop[]>([]);
  const [workshopDelegatesCount, setWorkshopDelegatesCount] = useState<
    Record<string, number>
  >({});
  const [isLoadingWorkshops, setIsLoadingWorkshops] = useState(true);
  const [workshopAttendanceData, setWorkshopAttendanceData] = useState<
    WorkshopAttendance[]
  >([]);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(true);

  // Add useEffect to fetch delegates data
  useEffect(() => {
    const fetchDelegatesData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${BACKEND_URL}/delegates`);

        if (!response.ok) {
          throw new Error("Failed to fetch delegates data");
        }

        const delegates: Delegate[] = await response.json();
        // We're not using delegatesData directly, so we don't need to set it
        // setDelegatesData(delegates)

        // Process the data to get applications per day
        const delegatesByDay = processApplicationsByDay(delegates);
        setDelegatesChartData(delegatesByDay);
      } catch (error) {
        console.error("Error fetching delegates data:", error);
        setError("Unable to fetch delegates data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDelegatesData();
  }, []);

  // Add this function to process the delegates data by day
  const processApplicationsByDay = (delegates: Delegate[]) => {
    // Create a map to store count of applications by date
    const applicationsByDate = new Map<string, number>();

    // Process each delegate
    delegates.forEach((delegate) => {
      if (delegate.registration_date) {
        // Extract just the date part (YYYY-MM-DD)
        const registrationDate = new Date(delegate.registration_date)
          .toISOString()
          .split("T")[0];

        // Increment the count for this date
        if (applicationsByDate.has(registrationDate)) {
          applicationsByDate.set(
            registrationDate,
            applicationsByDate.get(registrationDate)! + 1
          );
        } else {
          applicationsByDate.set(registrationDate, 1);
        }
      }
    });

    // Convert the map to an array of objects sorted by date
    const sortedDates = Array.from(applicationsByDate.keys()).sort();

    return sortedDates.map((date, index) => ({
      day: index + 1,
      date: date,
      applications: applicationsByDate.get(date) || 0,
    }));
  };

  // Add useEffect to fetch workshops count and data
  useEffect(() => {
    const fetchWorkshopsData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = getToken();
        if (!token) {
          setError("Your session has expired. Please login again.");
          return;
        }

        const response = await fetch(`${BACKEND_URL}/workshops`, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("Your session has expired. Please login again.");
            return;
          }
          throw new Error("Failed to fetch workshops");
        }

        const workshops: Workshop[] = await response.json();
        setWorkshopsCount(workshops.length);
        setWorkshopsData(workshops);

        // Fetch delegate counts for each workshop
        await fetchWorkshopDelegates(workshops);
      } catch (error) {
        console.error("Error fetching workshops:", error);
        setError(
          "Unable to connect to the server. Please check your connection or try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkshopsData();
  }, []);

  // Function to fetch delegate counts for each workshop
  const fetchWorkshopDelegates = async (workshops: Workshop[]) => {
    try {
      setIsLoadingWorkshops(true);
      setIsLoadingAttendance(true);
      const token = getToken();

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const counts: Record<string, number> = {};
      const attendanceData: WorkshopAttendance[] = [];

      // Fetch delegate counts for each workshop
      for (const workshop of workshops) {
        try {
          const response = await fetch(
            `${BACKEND_URL}/delegates/by-workshops?ids=${workshop.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                accept: "*/*",
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch delegates for workshop ${workshop.id}`
            );
          }

          const delegates: Delegate[] = await response.json();
          const delegateCount = delegates.length;
          counts[workshop.id] = delegateCount;

          // Calculate attendance percentage (capacity is 100 per workshop)
          const percentage = Math.round((delegateCount / 100) * 100);

          // Determine status based on percentage
          let status = "success";
          if (percentage < 50) {
            status = "error";
          } else if (percentage < 75) {
            status = "warning";
          }

          // Add to attendance data array
          attendanceData.push({
            id: workshop.id,
            name: workshop.title,
            percentage,
            status,
            count: delegateCount,
          });
        } catch (err) {
          console.error(
            `Error fetching delegates for workshop ${workshop.id}:`,
            err
          );
          counts[workshop.id] = 0;
        }
      }

      // Sort by percentage (highest first)
      const sortedAttendance = attendanceData.sort(
        (a, b) => b.percentage - a.percentage
      );

      setWorkshopAttendanceData(sortedAttendance);
      setWorkshopDelegatesCount(counts);
    } catch (error) {
      console.error("Error fetching workshop delegates:", error);
    } finally {
      setIsLoadingWorkshops(false);
      setIsLoadingAttendance(false);
    }
  };

  const handleCardClick = (id: string) => {
    setActiveCard(id === activeCard ? null : id);
  };

  // // Notifications data
  // const notificationsData = [
  //   { name: "Kwizera Oliver", action: "Created a new Program", target: "Global Summit", time: "5m" },
  //   { name: "Shema Hughes", action: "Deleted Workshop", target: "Climate", time: "1h" },
  //   { name: "Shema Hughes", action: "Updated Workshop Topic to", target: "Technology", time: "1h" },
  // ]

  // Custom tooltip component for chart
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black text-white text-xs p-2 rounded shadow-lg">
          <p className="font-medium">{`${payload[0].value} Applications`}</p>
          <p className="text-gray-300">{`${new Date(
            payload[0].payload.date
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom active dot component for chart
  const CustomActiveDot = (props: ActiveDotProps) => {
    const { cx, cy } = props;
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#026FB4"
          stroke="white"
          strokeWidth={2}
        />
        <text
          x={cx}
          y={cy - 15}
          textAnchor="middle"
          fill="#026FB4"
          fontSize={12}
          fontWeight="bold"
        >
          {props.payload.applications}
        </text>
      </g>
    );
  };

  // Function to get color based on percentage
  const getColorClass = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500"; // High attendance (80-100%)
    if (percentage >= 60) return "bg-blue-500"; // Good attendance (60-79%)
    if (percentage >= 40) return "bg-yellow-500"; // Medium attendance (40-59%)
    if (percentage >= 20) return "bg-orange-500"; // Low attendance (20-39%)
    return "bg-red-500"; // Very low attendance (0-19%)
  };

  return (
    <div className="space-y-3">
      {/* Applications Chart and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">Applications</h2>
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </div>
          <Card className="p-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={delegatesChartData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorApplications"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#026FB4" stopOpacity={0.4} />
                      <stop
                        offset="95%"
                        stopColor="#026FB4"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#888" }}
                    tickFormatter={(value) => {
                      // Format date to be more readable (e.g., "Apr 19")
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#888" }}
                    domain={[0, "dataMax + 2"]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="#026FB4"
                    strokeWidth={2}
                    fill="url(#colorApplications)"
                    activeDot={(props) => <CustomActiveDot {...props} />}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          {/* Activities/Notifications Section - Only visible to admins */}
          {userRole === "admin" && (
            <div>
              {/* <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-700">Activities</h2>
              </div> */}
              {/* <Card className="p-4 max-h-[200px] overflow-y-auto">
                <div className="space-y-4">
                  {notificationsData.map((notification, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={notification.name} />
                        <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-medium">{notification.name}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-xs text-gray-600">
                          <span className="text-green-600">•</span> {notification.action}{" "}
                          {notification.target && <span className="font-medium">"{notification.target}"</span>}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card> */}
            </div>
          )}

          {/* Workshop Attendance - Now directly after Activities */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">
                Workshop Attendance
              </h2>
            </div>
            <Card className="p-4">
              {isLoadingAttendance ? (
                <div className="flex justify-center items-center h-24">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#026FB4]"></div>
                </div>
              ) : workshopAttendanceData.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No workshop data available
                </div>
              ) : (
                <div className="space-y-4">
                  {workshopAttendanceData.slice(0, 8).map((workshop) => (
                    <div key={workshop.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {workshop.percentage >= 75 ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : workshop.percentage < 50 ? (
                            <X className="h-4 w-4 text-red-500" />
                          ) : (
                            <X className="h-4 w-4 text-orange-500" />
                          )}
                          <span
                            className="text-sm font-medium truncate max-w-[150px]"
                            title={workshop.name}
                          >
                            {workshop.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">
                            {workshop.count}/100
                          </span>
                          <span className="text-xs font-medium text-gray-700">
                            {workshop.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getColorClass(
                            workshop.percentage
                          )}`}
                          style={{ width: `${workshop.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Workshops and Applications per workshop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          {/* Workshops Card */}
          <Card
            className={`p-4 cursor-pointer transition-all duration-200 h-full ${
              activeCard === "workshops" ? "ring-2 ring-[#026FB4]" : ""
            }`}
            onClick={() => handleCardClick("workshops")}
            style={{
              backgroundColor:
                activeCard === "workshops" ? "#f0f7ff" : "#026FB4",
            }}
          >
            <Link
              href="/admin/workshops"
              className="flex items-start justify-between"
            >
              <div>
                <h3
                  className={`text-sm font-medium ${
                    activeCard === "workshops" ? "text-gray-600" : "text-white"
                  }`}
                >
                  Workshops
                </h3>
                <p
                  className={`text-4xl font-bold mt-2 ${
                    activeCard === "workshops" ? "text-gray-800" : "text-white"
                  }`}
                >
                  {isLoading ? (
                    <span className="text-2xl">...</span>
                  ) : error ? (
                    <span className="text-2xl">-</span>
                  ) : (
                    workshopsCount
                  )}
                </p>
                {error && (
                  <p
                    className={`text-xs mt-1 ${
                      activeCard === "workshops"
                        ? "text-red-500"
                        : "text-red-300"
                    }`}
                  >
                    Error loading data
                  </p>
                )}
                <p
                  className={`text-xs mt-1 ${
                    activeCard === "workshops"
                      ? "text-gray-500"
                      : "text-white/80"
                  }`}
                >
                  In one event
                </p>
              </div>
              <div className="p-2 rounded-full bg-[#026FB4]">
                <User className="h-5 w-5 text-white" />
              </div>
            </Link>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">
              Applications per workshop
            </h2>
          </div>
          <Card className="p-4">
            {isLoadingWorkshops ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#026FB4]"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {workshopsData.map((workshop) => (
                  <Card
                    key={workshop.id}
                    className="p-4 flex flex-col items-center justify-center"
                  >
                    <p className="text-3xl font-bold text-gray-800">
                      {workshopDelegatesCount[workshop.id] || 0}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      {workshop.title}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
