"use client";

import { useTranslations } from "next-intl";
import { useWords } from "@/lib/api/hooks/use-words";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TrendingWords() {
  const t = useTranslations("Home");
  const { data, isLoading } = useWords(1);

  const latestWords = data?.data.slice(0, 6) || [];

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl xl:text-5xl">
              {t("trending.title")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground sm:mt-2 sm:text-base lg:text-lg xl:text-xl">
              {t("trending.subtitle")}
            </p>
          </div>
          <Link href="/words">
            <Button
              variant="outline"
              className="w-full sm:w-auto lg:text-base xl:text-lg"
            >
              {t("trending.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))
            : latestWords.map((word) => {
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
                  <Link key={word.id} href={`/words/${word.id}`}>
                    <Card className="transition-all hover:border-primary hover:shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                          {word.word}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm lg:text-base xl:text-lg">
                        <div className="flex items-start gap-2">
                          <span className="text-muted-foreground">🇬🇧</span>
                          <span className="flex-1">
                            {enTranslation?.translation || "-"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-muted-foreground">🇪🇸</span>
                          <span className="flex-1">
                            {esTranslation?.translation || "-"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-muted-foreground">🇩🇪</span>
                          <span className="flex-1">
                            {deTranslation?.translation || "-"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
}
