import { Globe, Lock, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturesSection() {
  const t = useTranslations("Home");

  const features = [
    {
      icon: Globe,
      title: t("features.multiLanguage.title"),
      description: t("features.multiLanguage.description"),
    },
    {
      icon: Zap,
      title: t("features.fastSearch.title"),
      description: t("features.fastSearch.description"),
    },
    {
      icon: Lock,
      title: t("features.openSource.title"),
      description: t("features.openSource.description"),
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl xl:text-5xl">
            {t("features.title")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base lg:text-lg xl:text-xl">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-2">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 lg:h-14 lg:w-14 xl:h-16 xl:w-16">
                    <Icon className="h-6 w-6 text-primary lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground sm:text-base lg:text-lg xl:text-xl">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
