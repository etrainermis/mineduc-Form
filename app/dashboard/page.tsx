import { UserCircle, Calendar } from "lucide-react"
import Image from "next/image"
import { DashboardCharts } from "@/components/dashboard-charts"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DashboardStats } from "@/components/dashboard-stats"

export default function DashboardPage() {
  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <UserCircle className="h-8 w-8 text-blue-500" />
          <div>
            <div className="font-medium">Iris N</div>
            <div className="text-sm text-muted-foreground">Admin</div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              <div className="flex items-center gap-2">
                <span>Good Morning 👋, Iris</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Welcome to your event management dashboard. Here&apos;s an overview of your events and registrations.
            </p>
          </CardContent>
        </Card>
      </div>
      <DashboardStats />
      <DashboardCharts />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Upcoming events this month</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/events">Manage Events</Link>
            </Button>
          </CardContent>
        </Card> */}
        {/* 
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Speakers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Active speakers available</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/speakers">Manage Speakers</Link>
            </Button>
          </CardContent>
        </Card> */}

        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workshops</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">Workshops across all events</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/events">View Details</Link>
            </Button>
          </CardContent>
        </Card> */}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your next 3 scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Global Skills Connect 2025</p>
                  <p className="text-sm text-muted-foreground">21/6/2025 • Marriott Hotel</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Interministerial Summit 2025</p>
                  <p className="text-sm text-muted-foreground">21/6/2025 • Marriott Hotel</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">TVET Expo 2025</p>
                  <p className="text-sm text-muted-foreground">21/6/2025 • Marriott Hotel</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Speakers</CardTitle>
            <CardDescription>Top speakers for upcoming events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src="/profile.jpg" alt="Mark Peter" fill sizes="40px" className="object-cover" priority />
                </div>
                <div>
                  <p className="font-medium">Mark Peter</p>
                  <p className="text-sm text-muted-foreground">Software Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src="/profile.jpg" alt="Sarah Johnson" fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">UX Designer</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src="/profile.jpg" alt="David Chen" fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">David Chen</p>
                  <p className="text-sm text-muted-foreground">AI Researcher</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
