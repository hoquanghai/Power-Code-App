import { useLocation } from "react-router-dom";
import { Search, Bell, Settings } from "lucide-react";

const pageTitles: Record<string, { title: string; subtitle?: string }> = {
  "/": { title: "Dashboard", subtitle: "welcome back!" },
  "/analytics": { title: "Analytics" },
  "/users": { title: "Users" },
  "/documents": { title: "Documents" },
  "/settings": { title: "Settings" },
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function Header() {
  const location = useLocation();
  const page = pageTitles[location.pathname] ?? { title: "Page" };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-4 lg:px-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{page.title}</h1>
        {page.subtitle && (
          <p className="text-xs text-gray-600">
            {getGreeting()}, {page.subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
        <div className="ml-2 w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
          JD
        </div>
      </div>
    </header>
  );
}
