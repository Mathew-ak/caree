"use client"
import { Search, Bell, Menu, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { memo } from "react"

interface User {
  email: string
  displayName: string | null
  photoURL: string | null
}

interface TopHeaderProps {
  user: User
  onMenuClick: () => void
  sidebarOpen: boolean
}

export const TopHeader = memo(function TopHeader({ user, onMenuClick, sidebarOpen }: TopHeaderProps) {
  const initials = user?.email?.charAt(0).toUpperCase() || "U"

  return (
    <header className="border-b border-border bg-white sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Menu + Search */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-fast"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-secondary rounded-lg transition-fast" aria-label="Notifications">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg hover:bg-secondary transition-fast min-h-12 sm:min-h-10">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                  {initials}
                </div>
                <div className="hidden sm:flex flex-col items-start min-w-0">
                  <span className="text-sm font-medium text-foreground truncate">{user?.displayName || "User"}</span>
                  <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
})
