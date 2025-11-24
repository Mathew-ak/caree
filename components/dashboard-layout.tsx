"use client"

import type React from "react"
import { useState, useCallback, Suspense } from "react"
import { Sidebar } from "./dashboard-sidebar"
import { TopHeader } from "./dashboard-header"
import { StatsOverview } from "./stats-overview"
import { RecentAppointments } from "./recent-appointments"
import { ActiveAgents } from "./active-agents"

interface User {
  email: string
  displayName: string | null
  photoURL: string | null
}

interface DashboardLayoutProps {
  user: User
  onSignOut: () => Promise<void>
  currentPage?: string
  children?: React.ReactNode
}

export function DashboardLayout({ user, onSignOut, currentPage = "dashboard", children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={handleSidebarClose} role="presentation" />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={handleSidebarClose} onSignOut={onSignOut} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader user={user} onMenuClick={handleSidebarToggle} sidebarOpen={sidebarOpen} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto scrollbar-thin">
          {children ? (
            children
          ) : (
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
              {/* Welcome Section */}
              <div>
                <h1 className="font-bold text-foreground">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                  Welcome back! Here's what's happening with your AI agents today.
                </p>
              </div>

              {/* Stats Grid */}
              <Suspense fallback={<div className="h-32 bg-secondary rounded-lg animate-pulse" />}>
                <StatsOverview />
              </Suspense>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Recent Appointments */}
                <Suspense fallback={<div className="lg:col-span-2 h-96 bg-secondary rounded-lg animate-pulse" />}>
                  <div className="lg:col-span-2">
                    <RecentAppointments />
                  </div>
                </Suspense>

                {/* Active Agents */}
                <Suspense fallback={<div className="h-96 bg-secondary rounded-lg animate-pulse" />}>
                  <div className="lg:col-span-1">
                    <ActiveAgents />
                  </div>
                </Suspense>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
