import { Search, Bell, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-8">
        {/* Left side spacer */}
        <div className="flex-1" />

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications with badge */}
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Avatar */}
          <button className="w-9 h-9 rounded-full bg-[#6366f1] flex items-center justify-center text-white font-semibold text-sm hover:bg-[#5558e3] transition-colors">
            JD
          </button>
        </div>
      </div>
    </header>
  );
}
