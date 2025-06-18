import { Layout } from "@/components/event-organizer/Layout";

export default function EventOrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
} 