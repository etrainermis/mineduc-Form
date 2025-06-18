"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Removed empty interfaces and directly used React.HTMLAttributes<HTMLDivElement>
const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full", className)} {...props} />
))
ChartContainer.displayName = "ChartContainer"

interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    name: string
    value?: string | number
    color: string
  }[]
}

const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(({ items, className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-wrap items-center gap-4", className)} {...props}>
    {items.map((item, index) => (
      <div key={index} className="flex items-center gap-1.5">
        <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
        <span className="text-sm font-medium">{item.name}</span>
        {item.value && <span className="text-sm text-muted-foreground">({item.value})</span>}
      </div>
    ))}
  </div>
))
ChartLegend.displayName = "ChartLegend"

// Simple tooltip component that doesn't rely on recharts types
interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  items?: Array<{
    label?: string
    value: string | number
    color: string
  }>
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ className, label, items = [], ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg border bg-background px-3 py-1.5 shadow-md", className)} {...props}>
      {label && <div className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</div>}
      <div className="flex flex-col gap-1.5">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
            {item.label && <span className="text-xs font-medium text-muted-foreground">{item.label}</span>}
            <span className="text-xs font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export { Chart, ChartContainer, ChartLegend, ChartTooltipContent }


