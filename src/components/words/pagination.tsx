"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  total: number;
}

export function Pagination({
  currentPage,
  totalPages,
  perPage,
  total,
}: PaginationProps) {
  const t = useTranslations("Words");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        {t("showing")} {startItem} - {endItem} {t("of")} {total} {t("results")}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
          {t("previous")}
        </Button>

        <span className="text-sm">
          {t("page")} {currentPage} {t("of")} {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          {t("next")}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
