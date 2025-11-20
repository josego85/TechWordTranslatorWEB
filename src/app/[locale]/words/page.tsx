"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { FilterBar } from "@/components/words/filter-bar";
import { SearchBar } from "@/components/words/search-bar";
import { ViewToggle } from "@/components/words/view-toggle";
import { WordsGrid } from "@/components/words/words-grid";
import { WordsTable } from "@/components/words/words-table";
import { CONTAINER, TYPOGRAPHY } from "@/constants/design-tokens";
import { cn } from "@/lib/utils";
import type { ViewMode } from "@/types";

export default function WordsPage() {
  const t = useTranslations("Words");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <PageContainer maxWidth="full">
      <div className={CONTAINER.spacing.section}>
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className={TYPOGRAPHY.h1}>{t("title")}</h1>
            <p className={cn(TYPOGRAPHY.muted, "mt-2")}>{t("subtitle")}</p>
          </div>
          <ViewToggle onViewChange={setViewMode} />
        </div>

        {/* Search */}
        <SearchBar />

        {/* Filters */}
        <FilterBar />

        {/* Dynamic Content */}
        {viewMode === "grid" ? <WordsGrid /> : <WordsTable />}
      </div>
    </PageContainer>
  );
}
