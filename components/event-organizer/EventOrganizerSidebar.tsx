"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Mic2,
  Menu,
  X,
  PenBoxIcon,
  IdCard,
  User
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/event-organizer/dashboard",
    icon: BarChart3,
  },
  {
    title: "Workshops",
    href: "/event-organizer/workshops",
    icon: PenBoxIcon,
  },
  {
    title: "Speakers",
    href: "/event-organizer/speakers",
    icon: Mic2,
  },
  {
    title: "Registrations",
    href: "/event-organizer/registrations",
    icon: ClipboardList,
  },
  {
    title: "Badges",
    href: "/event-organizer/badges",
    icon: IdCard,
  },
  {
    title: "Profile",
    href: "/event-organizer/profile",
    icon: User,
  }
];

export function EventOrganizerSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-[280px] -translate-x-full transform bg-[#F8F9FA] transition-transform duration-300 lg:relative lg:translate-x-0",
          mobileOpen && "translate-x-0",
          !expanded && "w-16"
        )}
      >
        {/* Logo section */}
        <div className="flex h-16 items-center border-b border-gray-200 px-4">
          {expanded && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-semibold">Event Organizer</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            className={cn("ml-auto", expanded ? "" : "mx-auto")}
          >
            {expanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-4 text-base transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  !expanded && "justify-center px-2 py-4"
                )}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className={cn(
                  "transition-all duration-200",
                  expanded ? "h-6 w-6" : "h-7 w-7",
                  isActive && "text-blue-600"
                )} />
                {expanded && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
} 