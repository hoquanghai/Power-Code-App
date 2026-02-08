import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  FileText,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatCard } from "../components/StatCard";
import { ActivityItem } from "../components/ActivityItem";

const revenueData = [
  { name: "Mon", revenue: 2400 },
  { name: "Tue", revenue: 1398 },
  { name: "Wed", revenue: 9800 },
  { name: "Thu", revenue: 3908 },
  { name: "Fri", revenue: 4800 },
  { name: "Sat", revenue: 3800 },
  { name: "Sun", revenue: 4300 },
];

const salesData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
];

const activities = [
  {
    icon: "\ud83d\udce6",
    iconBg: "bg-blue-100",
    title: "New order received",
    description: "Order #3456 from John Smith",
    time: "2 min ago",
  },
  {
    icon: "\ud83d\udc64",
    iconBg: "bg-green-100",
    title: "New user registered",
    description: "Sarah Johnson joined the platform",
    time: "15 min ago",
  },
  {
    icon: "\ud83d\udcb3",
    iconBg: "bg-purple-100",
    title: "Payment processed",
    description: "$450.00 payment confirmed",
    time: "1 hour ago",
  },
  {
    icon: "\u2b50",
    iconBg: "bg-yellow-100",
    title: "New review received",
    description: "5-star review on Product X",
    time: "2 hours ago",
  },
  {
    icon: "\ud83c\udfaf",
    iconBg: "bg-red-100",
    title: "Goal achieved",
    description: "Monthly target reached",
    time: "3 hours ago",
  },
];

const quickActions = [
  { icon: Calendar, label: "Schedule Meeting", hoverColor: "hover:border-blue-300 hover:bg-blue-50", iconColor: "text-blue-600" },
  { icon: FileText, label: "Create Report", hoverColor: "hover:border-green-300 hover:bg-green-50", iconColor: "text-green-600" },
  { icon: CheckCircle2, label: "View Tasks", hoverColor: "hover:border-purple-300 hover:bg-purple-50", iconColor: "text-purple-600" },
  { icon: Users, label: "Manage Team", hoverColor: "hover:border-orange-300 hover:bg-orange-50", iconColor: "text-orange-600" },
];

const upcomingEvents = [
  { month: "FEB", day: "08", color: "bg-blue-100 text-blue-600", title: "Team Meeting", time: "10:00 AM - 11:00 AM" },
  { month: "FEB", day: "10", color: "bg-purple-100 text-purple-600", title: "Product Launch", time: "2:00 PM - 4:00 PM" },
];

const chartTooltipStyle = {
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  fontSize: "12px",
};

export function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$45,231"
          change="12.5%"
          isPositive={true}
          icon={DollarSign}
          iconColor="bg-green-500"
        />
        <StatCard
          title="Total Users"
          value="2,345"
          change="8.2%"
          isPositive={true}
          icon={Users}
          iconColor="bg-blue-500"
        />
        <StatCard
          title="Total Orders"
          value="1,234"
          change="3.1%"
          isPositive={false}
          icon={ShoppingCart}
          iconColor="bg-purple-500"
        />
        <StatCard
          title="Growth Rate"
          value="23.5%"
          change="4.3%"
          isPositive={true}
          icon={TrendingUp}
          iconColor="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Overview
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Chart */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-lg bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="divide-y divide-gray-100">
            {activities.map((activity) => (
              <ActivityItem key={activity.title} {...activity} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 ${action.hoverColor} transition-all text-left`}
              >
                <action.icon className={`w-5 h-5 ${action.iconColor}`} />
                <span className="text-sm font-medium text-gray-900">
                  {action.label}
                </span>
              </button>
            ))}
          </div>

          {/* Upcoming Events */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Upcoming Events
            </h4>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="flex gap-3">
                  <div
                    className={`flex-shrink-0 w-12 h-12 ${event.color} rounded-lg flex flex-col items-center justify-center`}
                  >
                    <span className="text-xs font-medium">{event.month}</span>
                    <span className="text-sm font-semibold">{event.day}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-600">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
