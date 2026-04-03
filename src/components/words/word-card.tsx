import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import type { WordWithTranslations } from "@/types";
import { CategoryBadge } from "./category-badge";

interface WordCardProps {
  word: WordWithTranslations;
}

export function WordCard({ word }: WordCardProps) {
  const enTranslation = word.translations?.find((t) => t.language === "en");
  const esTranslation = word.translations?.find((t) => t.language === "es");
  const deTranslation = word.translations?.find((t) => t.language === "de");

  return (
    <Link href={`/words/${word.id}`} className="block h-full">
      <Card className="group h-full transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold transition-colors group-hover:text-primary sm:text-2xl">
            {word.word}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5 text-sm sm:text-base">
          <div className="flex items-start gap-2">
            <span className="text-lg" aria-label="English" role="img">
              🇬🇧
            </span>
            <span className="flex-1 text-muted-foreground">
              {enTranslation?.translation || "-"}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg" aria-label="Spanish" role="img">
              🇪🇸
            </span>
            <span className="flex-1 text-muted-foreground">
              {esTranslation?.translation || "-"}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-lg" aria-label="German" role="img">
              🇩🇪
            </span>
            <span className="flex-1 text-muted-foreground">
              {deTranslation?.translation || "-"}
            </span>
          </div>
          {word.categories && word.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 border-t pt-3">
              {word.categories.map((cat) => (
                <CategoryBadge key={cat.slug} slug={cat.slug} name={cat.name} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
