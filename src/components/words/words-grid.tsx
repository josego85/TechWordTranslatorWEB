"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useWords } from "@/lib/api/hooks/use-words";
import { Pagination } from "./pagination";
import { WordCard } from "./word-card";

export function WordsGrid() {
  const t = useTranslations("Words");
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const { data, isLoading, error } = useWords(page, search);

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Skeletons don't have unique IDs
          <Card key={i} className="h-[200px]">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {t("error")}: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Alert>
        <AlertDescription>{t("noResults")}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.data.map((word, index) => (
          <div
            key={word.id}
            className="animate-fade-in"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: "backwards",
            }}
          >
            <WordCard word={word} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={data.meta.current_page}
        totalPages={data.meta.last_page}
        perPage={data.meta.per_page}
        total={data.meta.total}
      />
    </div>
  );
}

// Import Card components for skeleton
import { Card, CardContent, CardHeader } from "@/components/ui/card";
