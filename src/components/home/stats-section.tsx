"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { apiClient } from "@/lib/api/client";
import type { PaginatedResponse, WordWithTranslations } from "@/types";

async function getStats() {
  const response =
    await apiClient<PaginatedResponse<WordWithTranslations>>("/words?page=1");
  return {
    totalWords: response.meta?.total || 0,
    languages: 3,
  };
}

export function StatsSection() {
  const t = useTranslations("Home");
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });

  const stats = [
    {
      label: t("stats.words"),
      value: data?.totalWords || 0,
      suffix: "+",
    },
    {
      label: t("stats.languages"),
      value: data?.languages || 3,
      suffix: "",
    },
    {
      label: t("stats.free"),
      value: "100",
      suffix: "%",
    },
  ];

  return (
    <section className="border-y border-border bg-muted/30 py-8 sm:py-12">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 text-center sm:grid-cols-3 sm:gap-8 sm:px-6 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="py-2">
            <div className="text-3xl font-bold sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              {stat.value}
              <span className="text-primary">{stat.suffix}</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground sm:text-base lg:text-lg xl:text-xl">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
