interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: string;
  iconBg: string;
}

export function ActivityItem({
  title,
  description,
  time,
  icon,
  iconBg,
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4 py-3">
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full ${iconBg} flex items-center justify-center text-lg`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{time}</span>
    </div>
  );
}
