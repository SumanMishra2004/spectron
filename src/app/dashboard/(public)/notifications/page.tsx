"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with your property activity
          </p>
        </div>
        <Button variant="outline">Mark All as Read</Button>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>Recent activity and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <Bell className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">You&aops;re all caught up!</h3>
            <p className="text-sm text-muted-foreground mt-2">
              No new notifications at the moment
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
