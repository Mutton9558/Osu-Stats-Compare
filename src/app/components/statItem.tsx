interface StatItemProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
  state: boolean | null;
}

export function StatItem({
  label,
  value,
  icon,
  className = "text-white",
  state,
}: StatItemProps) {
  return (
    <div className={`flex items-center justify-between py-2 `}>
      <div className={`flex items-center gap-2 text-muted-foreground `}>
        {icon}
        <span>{label}</span>
      </div>
      <span className={`text-foreground ${className}`}>
        {state === null ? "" : state === true ? "↑" : "↓"}
        {value}
      </span>
    </div>
  );
}
