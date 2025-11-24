"use client"

import { Briefcase, MessageCircle, Calendar, TrendingUp } from "lucide-react"
import { StatCard } from "./stat-card"

export function StatsOverview() {
  const stats = [
    {
      title: "Active Agents",
      value: "4",
      change: "+2 this month",
      icon: Briefcase,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      title: "AI Interactions",
      value: "1,234",
      change: "+18% from last week",
      icon: MessageCircle,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Appointments",
      value: "89",
      change: "12 upcoming",
      icon: Calendar,
      bgColor: "bg-slate-900",
      iconColor: "text-white",
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+3% improvement",
      icon: TrendingUp,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
