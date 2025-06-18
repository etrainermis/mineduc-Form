"use client"
import { Card, CardContent } from "@/components/ui/card";
import EventDashboard from "@/components/users/event-organizer/EventDashboard";
import { UserProfile } from "@/components/users/UserProfile";

export default function EventOrganizer() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome👋, John</h1>
        <UserProfile />
      </div>
      <div className="mb-8">
        <Card>
          <CardContent>
            <EventDashboard />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
