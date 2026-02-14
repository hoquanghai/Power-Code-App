import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="flex">
        {/* Left Sidebar - Navigation */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 py-6 px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
