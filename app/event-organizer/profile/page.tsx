"use client";
import { Card, CardContent } from "@/components/ui/card";
import Profile from "@/components/users/event-organizer/Profile";
import { UserProfile } from "@/components/users/UserProfile";

export default function OrganizerProfile() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Profile</h1>
        <UserProfile />
      </div>

      <div className="space-y-6">
        <Card className="overflow-hidden">          
          <CardContent className="pt-0">
            <Profile />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
