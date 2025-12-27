"use client";

import { useUserRole } from "@/hooks/use-user-role";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LeadsPage() {
  const userRole = useUserRole();

  // Only accessible to OWNER and BROKER
  if (userRole !== "OWNER" && userRole !== "BROKER") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            This page is only available to property owners and brokers
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const leads = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 98765 43210",
      property: "3BHK Apartment in Salt Lake",
      message: "Interested in scheduling a visit",
      status: "new",
      time: "2 hours ago",
    },
    {
      id: 2,
      name: "Priya Das",
      email: "priya@example.com",
      phone: "+91 98765 43211",
      property: "2BHK Flat in Park Street",
      message: "Want to know more about pricing",
      status: "contacted",
      time: "5 hours ago",
    },
    {
      id: 3,
      name: "Amit Roy",
      email: "amit@example.com",
      phone: "+91 98765 43212",
      property: "4BHK House in Ballygunge",
      message: "Ready to make an offer",
      status: "qualified",
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Leads & Inquiries
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your property inquiries and leads
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {leads.length} Active
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leads.length}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground mt-1">Avg response time: 2h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to buy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24%</div>
            <p className="text-xs text-muted-foreground mt-1">Lead to sale</p>
          </CardContent>
        </Card>
      </div>

      {/* Leads List */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Leads</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="qualified">Qualified</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {leads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{lead.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {lead.property}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      lead.status === "new"
                        ? "default"
                        : lead.status === "qualified"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {lead.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{lead.time}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground border-l-2 border-orange-500 pl-3">
                    &quot;{lead.message}&quot;
                  </p>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      size="sm"
                      className="ml-auto bg-gradient-to-r from-orange-500 to-orange-400"
                    >
                      Mark as Qualified
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
