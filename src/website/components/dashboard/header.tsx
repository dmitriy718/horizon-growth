"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  plan: string;
  subscriptionStatus: string;
}

interface HeaderProps {
  user: User;
}

export function DashboardHeader({ user }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      {/* Search */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search disputes, reports..."
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* AI Assistant */}
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/assistant">
            <MessageCircle className="mr-2 h-4 w-4" />
            AI Assistant
          </Link>
        </Button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border bg-card p-4 shadow-lg">
              <h3 className="mb-3 font-semibold">Notifications</h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-sm font-medium">Dispute Update</p>
                  <p className="text-xs text-muted-foreground">
                    Your dispute with Capital One has been updated.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-sm font-medium">Score Change</p>
                  <p className="text-xs text-muted-foreground">
                    Your Experian score increased by 12 points!
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <Link
                href="/dashboard/alerts"
                className="mt-3 block text-center text-sm text-primary hover:underline"
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>

        {/* User Menu */}
        <button className="flex items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-muted">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {user.firstName[0]}
            {user.lastName[0]}
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}

