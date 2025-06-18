"use client";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import Profile from "@/components/users/event-organizer/Profile";
import { UserProfile } from "@/components/users/UserProfile";

export default function ProfileDisplay() {
  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Good morning John</h1>
        <div className="flex items-center gap-2">    
          <UserProfile />
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          <Profile />
        </CardContent>
      </Card>
    </Layout>
  );
}