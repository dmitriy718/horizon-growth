import { Metadata } from "next";
import Link from "next/link";
import {
  Plus,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  Search,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Disputes",
  description: "Manage your credit report disputes.",
};

// Mock dispute data
const disputes = [
  {
    id: "DSP-001",
    creditor: "Capital One",
    type: "Collection Account",
    bureau: "Experian",
    status: "in_progress",
    reason: "Account not mine",
    dateCreated: "2024-11-15",
    lastUpdate: "2024-12-01",
    expectedResponse: "2024-12-15",
  },
  {
    id: "DSP-002",
    creditor: "Synchrony Bank",
    type: "Late Payment",
    bureau: "TransUnion",
    status: "resolved",
    reason: "Payment was on time",
    dateCreated: "2024-10-20",
    lastUpdate: "2024-11-28",
    resolution: "Removed",
  },
  {
    id: "DSP-003",
    creditor: "Medical Collections Inc",
    type: "Collection Account",
    bureau: "Equifax",
    status: "pending",
    reason: "Outdated information",
    dateCreated: "2024-12-01",
    lastUpdate: "2024-12-01",
    expectedResponse: "2024-12-31",
  },
  {
    id: "DSP-004",
    creditor: "Chase Bank",
    type: "Incorrect Balance",
    bureau: "Experian",
    status: "resolved",
    reason: "Balance was paid",
    dateCreated: "2024-09-10",
    lastUpdate: "2024-10-15",
    resolution: "Updated",
  },
  {
    id: "DSP-005",
    creditor: "Discover",
    type: "Late Payment",
    bureau: "TransUnion",
    status: "rejected",
    reason: "Never late on this account",
    dateCreated: "2024-10-05",
    lastUpdate: "2024-11-10",
    resolution: "Verified as accurate",
  },
];

const statusConfig = {
  in_progress: {
    label: "In Progress",
    color: "bg-blue-500/10 text-blue-500",
    icon: Clock,
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-500/10 text-yellow-500",
    icon: Clock,
  },
  resolved: {
    label: "Resolved",
    color: "bg-green-500/10 text-green-500",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-500/10 text-red-500",
    icon: XCircle,
  },
};

export default function DisputesPage() {
  const activeDisputes = disputes.filter(
    (d) => d.status === "in_progress" || d.status === "pending"
  ).length;
  const resolvedDisputes = disputes.filter(
    (d) => d.status === "resolved"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Disputes</h1>
          <p className="text-muted-foreground">
            Track and manage your credit report disputes.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/disputes/new">
            <Plus className="mr-2 h-4 w-4" />
            New Dispute
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Disputes</p>
          <p className="text-2xl font-bold">{disputes.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-blue-500">{activeDisputes}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Resolved</p>
          <p className="text-2xl font-bold text-green-500">{resolvedDisputes}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Success Rate</p>
          <p className="text-2xl font-bold">
            {Math.round((resolvedDisputes / disputes.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search disputes..."
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Disputes Table */}
      <div className="rounded-xl border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                ID
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                Creditor
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                Type
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                Bureau
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                Last Update
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((dispute) => {
              const status =
                statusConfig[dispute.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              return (
                <tr key={dispute.id} className="border-b last:border-0">
                  <td className="p-4">
                    <Link
                      href={`/dashboard/disputes/${dispute.id}`}
                      className="font-mono text-sm text-primary hover:underline"
                    >
                      {dispute.id}
                    </Link>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{dispute.creditor}</p>
                    <p className="text-xs text-muted-foreground">
                      {dispute.reason}
                    </p>
                  </td>
                  <td className="p-4 text-sm">{dispute.type}</td>
                  <td className="p-4 text-sm">{dispute.bureau}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${status.color}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {dispute.lastUpdate}
                  </td>
                  <td className="p-4">
                    <button className="rounded p-1 hover:bg-muted">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

