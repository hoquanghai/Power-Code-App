import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const DashboardPage = lazy(() =>
  import("@/features/dashboard").then((m) => ({ default: m.DashboardPage }))
);

const UsersPage = lazy(() =>
  import("@/features/users").then((m) => ({ default: m.UsersPage }))
);

const NetworkPage = lazy(() =>
  import("@/features/network").then((m) => ({ default: m.NetworkPage }))
);

// Placeholder pages for future development
function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground mt-2">This page is under development.</p>
    </div>
  );
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "network",
        element: (
          <SuspenseWrapper>
            <NetworkPage />
          </SuspenseWrapper>
        ),
      },
      { path: "jobs", element: <ComingSoonPage title="求人" /> },
      { path: "messages", element: <ComingSoonPage title="メッセージ" /> },
      { path: "notifications", element: <ComingSoonPage title="通知" /> },
      { path: "analytics", element: <ComingSoonPage title="分析" /> },
      { path: "learning", element: <ComingSoonPage title="学習" /> },
      {
        path: "users",
        element: (
          <SuspenseWrapper>
            <UsersPage />
          </SuspenseWrapper>
        ),
      },
      { path: "documents", element: <ComingSoonPage title="Documents" /> },
      { path: "settings", element: <ComingSoonPage title="設定" /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
