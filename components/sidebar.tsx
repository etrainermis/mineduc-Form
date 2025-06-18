"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Mic2,
  Users,
  Menu,
  X,
  IdCard,
  UserCog,
  GraduationCap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type UserRole = "admin" | "coordinator" | "event-organizer";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  roles?: UserRole[]; // Which roles can see this item
};

// Define navigation items with role-based access
const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    roles: ["admin", "coordinator", "event-organizer"],
  },

  {
    title: "Registrations",
    href: "/registrations",
    icon: ClipboardList,
    roles: ["admin", "coordinator", "event-organizer"],
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
    roles: ["admin", "coordinator"],
  },
  {
    title: "Events",
    href: "/events",
    icon: CalendarDays,
    roles: ["admin", "coordinator"],
  },
  {
    title: "Speakers",
    href: "/speakers",
    icon: Mic2,
    roles: ["admin", "coordinator", "event-organizer"],
  },

  {
    title: "Workshops",
    href: "/workshops",
    icon: GraduationCap,
    roles: ["admin", "coordinator"],
  },
  {
    title: "Badges",
    href: "/badges",
    icon: IdCard,
    roles: ["admin", "coordinator", "event-organizer"],
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserCog,
    roles: ["event-organizer"],
  },
];

interface SidebarProps {
  userRole: UserRole;
}

export function Sidebar({ userRole = "admin" }: SidebarProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  // Prefix all hrefs with the user role to create unique routes
  const roleBasedNavItems = filteredNavItems.map((item) => ({
    ...item,
    href: `/${userRole}${item.href}`,
  }));

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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold">Forum</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            className={cn("ml-auto", expanded ? "" : "mx-auto")}
          >
            {expanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* User role indicator */}
        {expanded && (
          <div className="px-4 py-2 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-500">
              {userRole === "admin" && "Administrator"}
              {userRole === "coordinator" && "Coordinator"}
              {userRole === "event-organizer" && "Event Organizer"}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex flex-col gap-3 p-4">
          {roleBasedNavItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
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
                <item.icon
                  className={cn(
                    "transition-all duration-200",
                    expanded ? "h-6 w-6" : "h-7 w-7",
                    isActive && "text-blue-600"
                  )}
                />
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
