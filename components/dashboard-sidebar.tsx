"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Calendar, MessageSquare, BarChart3, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Agents", href: "/agents" },
  { icon: Calendar, label: "Appointments", href: "/appointments" }, // Fixed appointments link to /appointments
  { icon: MessageSquare, label: "Conversations", href: "/dashboard/conversations" },
  { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

interface SidebarProps {
  onClose: () => void
  onSignOut: () => Promise<void>
}

export function Sidebar({ onClose, onSignOut }: SidebarProps) {
  const pathname = usePathname()

  const handleSignOut = async () => {
    await onSignOut()
  }

  return (
    <div className="h-full bg-white border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Image
            src="/logo.png"
            alt="CareFlow"
            width={40}
            height={40}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <span className="text-xl font-bold text-foreground hidden sm:inline">careflow</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          )
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-border">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 font-medium transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
        <p className="text-xs text-muted-foreground mt-4 text-center">© 2025 CareFlow AI</p>
      </div>
    </div>
  )
}
