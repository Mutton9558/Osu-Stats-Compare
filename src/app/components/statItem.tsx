interface StatItemProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export function StatItem({ label, value, icon, className = "" }: StatItemProps) {
  return (
    <div className={`flex items-center justify-between py-2 ${className}`}>
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-foreground">{value}</span>
    </div>
  );
}