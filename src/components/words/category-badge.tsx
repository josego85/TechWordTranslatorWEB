import { CATEGORY_CONFIG } from "@/constants/categories";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  slug: string;
  name: string;
  className?: string;
}

export function CategoryBadge({ slug, name, className }: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[slug];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        config.color,
        className,
      )}
    >
      <Icon className="h-3 w-3 shrink-0" />
      {name}
    </span>
  );
}
