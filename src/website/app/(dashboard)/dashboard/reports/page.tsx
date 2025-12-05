import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Credit Reports",
  description: "View and analyze your credit reports from all three bureaus.",
};

// Mock data for credit reports
const reports = [
  {
    bureau: "Experian",
    score: 642,
    lastPull: "2024-12-01",
    accounts: 12,
    negativeItems: 3,
    inquiries: 2,
    status: "available",
  },
  {
    bureau: "Equifax",
    score: 638,
    lastPull: "2024-12-01",
    accounts: 11,
    negativeItems: 4,
    inquiries: 2,
    status: "available",
  },
  {
    bureau: "TransUnion",
    score: 645,
    lastPull: "2024-12-01",
    accounts: 13,
    negativeItems: 3,
    inquiries: 3,
    status: "available",
  },
];

const negativeItems = [
  {
    id: 1,
    creditor: "Capital One",
    type: "Collection",
    balance: 1250,
    status: "disputed",
    bureau: ["Experian", "Equifax"],
    opened: "2021-03-15",
    impact: "high",
  },
  {
    id: 2,
    creditor: "Synchrony Bank",
    type: "Late Payment (60 days)",
    balance: 0,
    status: "verified",
    bureau: ["TransUnion"],
    opened: "2022-08-10",
    impact: "medium",
  },
  {
    id: 3,
    creditor: "Medical Collections Inc",
    type: "Collection",
    balance: 450,
    status: "pending",
    bureau: ["Experian", "Equifax", "TransUnion"],
    opened: "2020-11-22",
    impact: "high",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Credit Reports</h1>
          <p className="text-muted-foreground">
            View and analyze your credit reports from all three bureaus.
          </p>
        </div>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Reports
        </Button>
      </div>

      {/* Bureau Reports Grid */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Credit Bureau Reports</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {reports.map((report) => (
            <div key={report.bureau} className="rounded-xl border bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{report.bureau}</h3>
                <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-500">
                  Available
                </span>
              </div>
              <p className="mt-4 text-4xl font-bold">{report.score}</p>
              <p className="text-sm text-muted-foreground">FICO® Score 8</p>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded bg-muted/50 p-2">
                  <p className="text-lg font-semibold">{report.accounts}</p>
                  <p className="text-xs text-muted-foreground">Accounts</p>
                </div>
                <div className="rounded bg-muted/50 p-2">
                  <p className="text-lg font-semibold text-red-500">
                    {report.negativeItems}
                  </p>
                  <p className="text-xs text-muted-foreground">Negative</p>
                </div>
                <div className="rounded bg-muted/50 p-2">
                  <p className="text-lg font-semibold">{report.inquiries}</p>
                  <p className="text-xs text-muted-foreground">Inquiries</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Last updated: {report.lastPull}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Negative Items */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Negative Items</h2>
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm text-red-500">
            {negativeItems.length} items found
          </span>
        </div>
        <div className="rounded-xl border bg-card">
          {negativeItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-start gap-4 p-4 ${
                index !== negativeItems.length - 1 ? "border-b" : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  item.impact === "high"
                    ? "bg-red-500/10"
                    : "bg-yellow-500/10"
                }`}
              >
                <AlertTriangle
                  className={`h-5 w-5 ${
                    item.impact === "high"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{item.creditor}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      item.status === "disputed"
                        ? "bg-blue-500/10 text-blue-500"
                        : item.status === "verified"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.type}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.bureau.map((b) => (
                    <span
                      key={b}
                      className="rounded bg-muted px-2 py-0.5 text-xs"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {item.balance > 0 ? `$${item.balance.toLocaleString()}` : "—"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Since {item.opened}
                </p>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dashboard/disputes/new?item=${item.id}`}>
                  Dispute
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Score Factors */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Score Factors</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold">Positive Factors</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Low credit utilization</p>
                  <p className="text-sm text-muted-foreground">
                    You're using 23% of your available credit
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Good credit mix</p>
                  <p className="text-sm text-muted-foreground">
                    You have a healthy mix of credit types
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold">Areas to Improve</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Derogatory marks</p>
                  <p className="text-sm text-muted-foreground">
                    3 negative items are impacting your score
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Recent inquiries</p>
                  <p className="text-sm text-muted-foreground">
                    2 hard inquiries in the last 12 months
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

