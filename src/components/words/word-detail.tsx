"use client";

import { useTranslations } from "next-intl";
import { useWord } from "@/lib/api/hooks/use-words";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { CONTAINER, TYPOGRAPHY } from "@/constants/design-tokens";
import { cn } from "@/lib/utils";

interface WordDetailProps {
  id: number;
}

export function WordDetail({ id }: WordDetailProps) {
  const t = useTranslations("Words");
  const common = useTranslations("Common");

  const { data: word, isLoading, error } = useWord(id);

  if (isLoading) {
    return (
      <PageContainer maxWidth="content">
        <div className={CONTAINER.spacing.section}>
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-64 w-full" />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer maxWidth="content">
        <div className={CONTAINER.spacing.section}>
          <Link href="/words">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToList")}
            </Button>
          </Link>
          <Alert variant="destructive">
            <AlertDescription>
              {t("error")}: {error.message}
            </AlertDescription>
          </Alert>
        </div>
      </PageContainer>
    );
  }

  if (!word) {
    return (
      <PageContainer maxWidth="content">
        <div className={CONTAINER.spacing.section}>
          <Link href="/words">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToList")}
            </Button>
          </Link>
          <Alert>
            <AlertDescription>{t("notFound")}</AlertDescription>
          </Alert>
        </div>
      </PageContainer>
    );
  }

  const enTranslation = word.translations?.find((t) => t.language === "en");
  const esTranslation = word.translations?.find((t) => t.language === "es");
  const deTranslation = word.translations?.find((t) => t.language === "de");

  return (
    <PageContainer maxWidth="content">
      <div className={CONTAINER.spacing.section}>
        <Link href="/words">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("backToList")}
          </Button>
        </Link>

        <div>
          <h1 className={TYPOGRAPHY.h1}>{word.word}</h1>
          <p className={cn(TYPOGRAPHY.bodySmall, TYPOGRAPHY.muted, "mt-2")}>
            {t("wordId")}: {word.id}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🇬🇧</span> {t("english")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                {enTranslation?.translation || (
                  <span className="text-muted-foreground">
                    {t("noTranslation")}
                  </span>
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🇪🇸</span> {t("spanish")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                {esTranslation?.translation || (
                  <span className="text-muted-foreground">
                    {t("noTranslation")}
                  </span>
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🇩🇪</span> {t("german")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                {deTranslation?.translation || (
                  <span className="text-muted-foreground">
                    {t("noTranslation")}
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("metadata")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("createdAt")}:</span>
              <span>{new Date(word.created_at).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("updatedAt")}:</span>
              <span>{new Date(word.updated_at).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
