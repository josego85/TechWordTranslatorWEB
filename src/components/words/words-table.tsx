"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useWords } from "@/lib/api/hooks/use-words";
import { Link } from "@/i18n/routing";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pagination } from "./pagination";

export function WordsTable() {
  const t = useTranslations("Words");
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const { data, isLoading, error } = useWords(page, search);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
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
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[200px] font-semibold">
                {t("word")}
              </TableHead>
              <TableHead className="font-semibold">{t("english")}</TableHead>
              <TableHead className="font-semibold">{t("spanish")}</TableHead>
              <TableHead className="font-semibold">{t("german")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((word) => {
              const enTranslation = word.translations?.find(
                (t) => t.language === "en",
              );
              const esTranslation = word.translations?.find(
                (t) => t.language === "es",
              );
              const deTranslation = word.translations?.find(
                (t) => t.language === "de",
              );

              return (
                <TableRow
                  key={word.id}
                  className="group transition-colors hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    <Link
                      href={`/words/${word.id}`}
                      className="inline-flex items-center gap-1 transition-colors hover:text-primary hover:underline"
                    >
                      {word.word}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {enTranslation?.translation || "-"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {esTranslation?.translation || "-"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {deTranslation?.translation || "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
