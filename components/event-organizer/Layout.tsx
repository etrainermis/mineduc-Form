import React from "react";
import { EventOrganizerSidebar } from "./EventOrganizerSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <EventOrganizerSidebar />
      <div className="flex-1 overflow-auto bg-gray-50 p-8">
        {children}
      </div>
    </div>
  );
} 