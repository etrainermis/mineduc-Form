import { Layout } from "@/components/layout"

export default function CoordinatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout userRole="coordinator">{children}</Layout>
} 