"use client";

import { ArrowUpDown, Tag } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_CONFIG, CATEGORY_SLUGS } from "@/constants/categories";

export function FilterBar() {
  const t = useTranslations("Words");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentCategory = searchParams.get("category") ?? "";
  const currentSort = searchParams.get("sort") ?? "alpha-asc";

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-4">
        {/* Category filter */}
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-sm font-medium">{t("filterByCategory")}:</span>
          <Select
            value={currentCategory || "all"}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-[190px]">
              <SelectValue placeholder={t("allCategories")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allCategories")}</SelectItem>
              {CATEGORY_SLUGS.map((slug) => {
                const config = CATEGORY_CONFIG[slug];
                const Icon = config.icon;
                return (
                  <SelectItem key={slug} value={slug}>
                    <span className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {t(`category.${slug}` as Parameters<typeof t>[0])}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-sm font-medium">{t("sortBy")}:</span>
          <Select
            value={currentSort}
            onValueChange={(value) => {
              const params = new URLSearchParams(searchParams);
              params.set("sort", value);
              params.set("page", "1");
              router.replace(`${pathname}?${params.toString()}`);
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alpha-asc">{t("sortAlphaAsc")}</SelectItem>
              <SelectItem value="alpha-desc">{t("sortAlphaDesc")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
