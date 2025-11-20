"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";

export function HeroSection() {
  const t = useTranslations("Home");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/words?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push("/words");
    }
  };

  return (
    <section className="relative overflow-hidden px-4 pt-12 pb-8 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm backdrop-blur lg:text-base xl:px-4 xl:py-2">
          <span className="mr-2 h-2 w-2 rounded-full bg-green-500 lg:h-2.5 lg:w-2.5" />
          {t("badge")}
        </div>

        {/* Title */}
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:mb-6 sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
          {t("title")}
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-base text-muted-foreground sm:mb-10 sm:text-lg lg:text-xl xl:text-2xl">
          {t("subtitle")}
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:left-4 sm:h-5 sm:w-5" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 pl-10 text-base sm:h-14 sm:pl-12 sm:text-lg"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 w-full px-6 sm:h-14 sm:w-auto sm:px-8"
            >
              {t("searchButton")}
            </Button>
          </div>
        </form>

        {/* Quick examples */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground lg:text-base xl:gap-3">
          <span>{t("trySearching")}:</span>
          {["API", "Database", "Cloud"].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setSearchTerm(term);
                router.push(`/words?search=${term}`);
              }}
              className="rounded-md border border-border bg-background px-3 py-1 transition-colors hover:bg-accent lg:px-4 lg:py-2"
            >
              {term}
            </button>
          ))}
        </div>

        {/* CTA to Words Page */}
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/words")}
            className="group gap-2 text-base"
          >
            {t("exploreAllTerms")}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
