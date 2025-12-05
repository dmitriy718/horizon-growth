import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

// In production, this would check for authenticated session
async function getUser() {
  // TODO: Implement actual authentication check
  // For now, return mock user for development
  return {
    id: "user_123",
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    plan: "premier",
    subscriptionStatus: "active",
  };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  // Uncomment in production to require authentication
  // if (!user) {
  //   redirect("/login");
  // }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar user={user} />
      <div className="flex flex-1 flex-col">
        <DashboardHeader user={user} />
        <main className="flex-1 overflow-auto bg-muted/30 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

