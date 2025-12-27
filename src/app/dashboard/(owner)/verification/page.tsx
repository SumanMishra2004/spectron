"use client";

import { useUserRole } from "@/hooks/use-user-role";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Upload, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function VerificationPage() {
  const userRole = useUserRole();

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

  const verificationSteps = [
    {
      title: "Identity Verification",
      description: "Upload government ID (Aadhaar/PAN)",
      status: "completed",
      icon: CheckCircle2,
    },
    {
      title: "Address Proof",
      description: "Submit utility bill or rental agreement",
      status: "completed",
      icon: CheckCircle2,
    },
    {
      title: "Business Registration",
      description: "Upload business license (for brokers)",
      status: "pending",
      icon: Clock,
    },
    {
      title: "Bank Account",
      description: "Verify bank account for transactions",
      status: "not-started",
      icon: AlertCircle,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          Verification Status
        </h1>
        <p className="text-muted-foreground mt-1">
          Complete verification to build trust and unlock premium features
        </p>
      </div>

      {/* Verification Score */}
      <Card className="border-orange-500/20 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-950/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Verification Score</CardTitle>
              <CardDescription>Your trust rating on the platform</CardDescription>
            </div>
            <ShieldCheck className="h-12 w-12 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end gap-3">
              <div className="text-5xl font-bold">75%</div>
              <Badge className="mb-2">Good Standing</Badge>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-orange-500 to-orange-400"></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Complete remaining steps to achieve 100% verification
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Checklist</CardTitle>
          <CardDescription>
            Complete all steps to get fully verified
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {verificationSteps.map((step) => {
              const Icon = step.icon;
              const statusConfig = {
                completed: {
                  badge: "Completed",
                  variant: "secondary" as const,
                  className: "bg-green-500/10 text-green-700 border-green-500/20",
                },
                pending: {
                  badge: "Under Review",
                  variant: "secondary" as const,
                  className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
                },
                "not-started": {
                  badge: "Not Started",
                  variant: "outline" as const,
                  className: "",
                },
              };

              const config = statusConfig[step.status as keyof typeof statusConfig];

              return (
                <div
                  key={step.title}
                  className="flex items-start justify-between border-b last:border-0 pb-4 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      className={`h-5 w-5 mt-0.5 ${
                        step.status === "completed"
                          ? "text-green-600"
                          : step.status === "pending"
                          ? "text-yellow-600"
                          : "text-muted-foreground"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={config.variant} className={config.className}>
                      {config.badge}
                    </Badge>
                    {step.status === "not-started" && (
                      <Button size="sm" variant="outline">
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Benefits</CardTitle>
          <CardDescription>Why verification matters</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Build Trust</p>
                <p className="text-sm text-muted-foreground">
                  Verified badge increases credibility with buyers
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Premium Features</p>
                <p className="text-sm text-muted-foreground">
                  Unlock featured listings and priority support
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Higher Visibility</p>
                <p className="text-sm text-muted-foreground">
                  Verified listings appear higher in search results
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
