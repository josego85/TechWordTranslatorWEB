"use client";

import { ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "alpha-asc" | "alpha-desc" | "newest" | "oldest";

interface FilterBarProps {
  onSortChange?: (sort: SortOption) => void;
}

export function FilterBar({ onSortChange }: FilterBarProps) {
  const t = useTranslations("Words");

  const handleSortChange = (value: SortOption) => {
    onSortChange?.(value);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{t("sortBy")}:</span>
        <Select onValueChange={handleSortChange} defaultValue="alpha-asc">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alpha-asc">{t("sortAlphaAsc")}</SelectItem>
            <SelectItem value="alpha-desc">{t("sortAlphaDesc")}</SelectItem>
            <SelectItem value="newest">{t("sortNewest")}</SelectItem>
            <SelectItem value="oldest">{t("sortOldest")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
