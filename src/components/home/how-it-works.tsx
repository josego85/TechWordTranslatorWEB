"use client";

import { BookOpen, Languages, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "@/i18n/routing";

export function HowItWorks() {
  const t = useTranslations("Home");
  const router = useRouter();

  const steps = [
    {
      icon: Search,
      titleKey: "howItWorks.step1.title",
      descKey: "howItWorks.step1.description",
      action: () => {
        // Step 1: Empty search - user freedom to search anything
        router.push("/words?focus=search");
      },
    },
    {
      icon: BookOpen,
      titleKey: "howItWorks.step2.title",
      descKey: "howItWorks.step2.description",
      action: () => {
        // Step 2: Example search with results - show how search works
        router.push("/words?search=API");
      },
    },
    {
      icon: Languages,
      titleKey: "howItWorks.step3.title",
      descKey: "howItWorks.step3.description",
      action: () => {
        // Step 3: Navigate to first word detail - show complete translation
        router.push("/words/1");
      },
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t("howItWorks.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.titleKey}
                className="group relative cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary"
                onClick={step.action}
              >
                <div className="absolute right-4 top-4 text-7xl font-bold text-primary/5 transition-all group-hover:text-primary/10">
                  {index + 1}
                </div>
                <CardContent className="relative pt-8">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:bg-primary/20">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted-foreground">{t(step.descKey)}</p>
                  <div className="mt-4 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    {t("howItWorks.clickToTry")} →
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
