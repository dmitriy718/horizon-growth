import { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your credit repair progress and manage your account.",
};

// Mock data - in production, this would come from the API
const mockData = {
  scores: {
    experian: { score: 642, change: +12, lastUpdated: "2024-12-01" },
    equifax: { score: 638, change: +8, lastUpdated: "2024-12-01" },
    transunion: { score: 645, change: +15, lastUpdated: "2024-12-01" },
  },
  disputes: {
    active: 5,
    resolved: 12,
    pending: 3,
  },
  recentActivity: [
    {
      id: 1,
      type: "dispute_update",
      title: "Dispute Updated",
      description: "Capital One collection account - Response received",
      status: "success",
      date: "2024-12-05",
    },
    {
      id: 2,
      type: "score_change",
      title: "Score Increased",
      description: "Your TransUnion score increased by 15 points",
      status: "success",
      date: "2024-12-04",
    },
    {
      id: 3,
      type: "dispute_sent",
      title: "Dispute Sent",
      description: "New dispute sent to Equifax for late payment",
      status: "pending",
      date: "2024-12-03",
    },
  ],
};

function ScoreCard({
  bureau,
  score,
  change,
}: {
  bureau: string;
  score: number;
  change: number;
}) {
  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-green-500";
    if (score >= 700) return "text-lime-500";
    if (score >= 650) return "text-yellow-500";
    if (score >= 550) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{bureau}</h3>
        <div
          className={`flex items-center gap-1 text-sm ${change >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          {change >= 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          {change >= 0 ? "+" : ""}
          {change}
        </div>
      </div>
      <p className={`mt-2 text-4xl font-bold ${getScoreColor(score)}`}>
        {score}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Last updated Dec 1</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Test!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your credit repair progress.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/assistant">
            <Sparkles className="mr-2 h-4 w-4" />
            Talk to AI Assistant
          </Link>
        </Button>
      </div>

      {/* Credit Scores */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Your Credit Scores</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <ScoreCard
            bureau="Experian"
            score={mockData.scores.experian.score}
            change={mockData.scores.experian.change}
          />
          <ScoreCard
            bureau="Equifax"
            score={mockData.scores.equifax.score}
            change={mockData.scores.equifax.change}
          />
          <ScoreCard
            bureau="TransUnion"
            score={mockData.scores.transunion.score}
            change={mockData.scores.transunion.change}
          />
        </div>
      </section>

      {/* Dispute Summary */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Dispute Summary</h2>
          <Link
            href="/dashboard/disputes"
            className="text-sm text-primary hover:underline"
          >
            View all disputes
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockData.disputes.active}</p>
                <p className="text-sm text-muted-foreground">Active Disputes</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockData.disputes.resolved}
                </p>
                <p className="text-sm text-muted-foreground">
                  Resolved Successfully
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockData.disputes.pending}</p>
                <p className="text-sm text-muted-foreground">Pending Response</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
        <div className="rounded-xl border bg-card">
          {mockData.recentActivity.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-start gap-4 p-4 ${
                index !== mockData.recentActivity.length - 1 ? "border-b" : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  activity.status === "success"
                    ? "bg-green-500/10"
                    : "bg-yellow-500/10"
                }`}
              >
                {activity.status === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-yellow-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{activity.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Link
            href="/dashboard/reports"
            className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary"
          >
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-medium">View Reports</span>
            <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </Link>
          <Link
            href="/dashboard/disputes/new"
            className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary"
          >
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="font-medium">New Dispute</span>
            <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </Link>
          <Link
            href="/dashboard/assistant"
            className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-medium">AI Assistant</span>
            <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </Link>
          <Link
            href="/dashboard/support"
            className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary"
          >
            <AlertCircle className="h-5 w-5 text-primary" />
            <span className="font-medium">Get Help</span>
            <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      </section>
    </div>
  );
}

