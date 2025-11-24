"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  bgColor: string
  iconColor: string
}

export function StatCard({ title, value, change, icon: Icon, bgColor, iconColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-1">{value}</h3>
        </div>
        <div className={cn("p-3 rounded-lg", bgColor)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </div>
  )
}
