import { Building2, PenBoxIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "@/lib/config";
import { getToken } from "@/utils/token";

interface Delegate {
  id: string;
  registration_date: string;
}

interface Workshop {
  id: string;
  title: string;
}

interface WorkshopAttendance {
  id: string;
  name: string;
  percentage: number;
  status: string;
  count: number;
}

export default function EventFooterCard() {
  const [workshopsData, setWorkshopsData] = useState<WorkshopAttendance[]>([]);
  const [workshopsCount, setWorkshopsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        const attendanceData: WorkshopAttendance[] = await Promise.all(
          workshops.map(async (workshop) => {
            try {
              const delegateResponse = await fetch(
                `${BACKEND_URL}/delegates/by-workshops?ids=${workshop.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    accept: "*/*",
                  },
                }
              );

              if (!delegateResponse.ok) {
                throw new Error(
                  `Failed to fetch delegates for workshop ${workshop.id}`
                );
              }

              const delegates: Delegate[] = await delegateResponse.json();
              const delegateCount = delegates.length;
              const percentage = Math.round((delegateCount / 100) * 100);

              let status = "success";
              if (percentage < 50) {
                status = "error";
              } else if (percentage < 75) {
                status = "warning";
              }

              return {
                id: workshop.id,
                name: workshop.title,
                percentage,
                status,
                count: delegateCount,
              };
            } catch (err) {
              console.error(
                `Error fetching delegates for workshop ${workshop.id}:`,
                err
              );
              return {
                id: workshop.id,
                name: workshop.title,
                percentage: 0,
                status: "error",
                count: 0,
              };
            }
          })
        );

        setWorkshopsData(attendanceData);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      {/* Workshop Card */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Workshops
            </span>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">{workshopsCount}</h2>
            <p className="text-sm text-muted-foreground">in 1 Event</p>
          </div>
        </div>
      </div>

      {/* Applications per Workshop Card */}
      <div className="lg:col-span-2 bg-white rounded-xl border p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <PenBoxIcon className="h-5 w-5 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Applications per Workshop
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workshopsData.map((workshop) => (
              <div
                key={workshop.id}
                className={`rounded-lg p-4 transition-all hover:shadow-md ${
                  workshop.status === "success"
                    ? "bg-green-50"
                    : workshop.status === "warning"
                    ? "bg-yellow-50"
                    : "bg-red-50"
                }`}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {workshop.count}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {workshop.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
