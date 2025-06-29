"use client";
import { WorkshopTable } from "@/components/workshops/WorkshopTable";

export default function WorkshopsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Workshops</h1>
      </div>
      <div className="rounded-xl border bg-white shadow-sm">
        <WorkshopTable />
      </div>
    </div>
  );
} 