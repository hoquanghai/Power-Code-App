import { useLocation, useNavigate } from "react-router-dom";
import ondoLogo from "@/access/ondo.png";
import {
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  Settings,
  TrendingUp,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

const mainNavItems: NavItem[] = [
  { title: "ホーム", url: "/", icon: Home },
  { title: "ネットワーク", url: "/network", icon: Users },
  { title: "求人", url: "/jobs", icon: Briefcase },
  { title: "メッセージ", url: "/messages", icon: MessageSquare },
  { title: "通知", url: "/notifications", icon: Bell },
  { title: "分析", url: "/analytics", icon: TrendingUp },
  { title: "学習", url: "/learning", icon: BookOpen },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 shrink-0">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src={ondoLogo}
            alt="音頭金属株式会社"
            className="w-10 h-10 rounded-lg object-contain"
          />
          <span className="font-semibold text-gray-900 text-lg">
            音頭金属株式会社
          </span>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <button
                key={item.url}
                onClick={() => navigate(item.url)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#1e3a8a] text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.title}</span>
              </button>
            );
          })}
        </nav>

        {/* Settings (bottom section) */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <button
            onClick={() => navigate("/settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === "/settings"
                ? "bg-[#1e3a8a] text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">設定</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
