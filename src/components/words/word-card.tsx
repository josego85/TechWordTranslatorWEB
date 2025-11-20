import { Link } from "@/i18n/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WordWithTranslations } from "@/types";

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
                        <span className="text-lg" aria-label="English">
                            🇬🇧
                        </span>
                        <span className="flex-1 text-muted-foreground">
                            {enTranslation?.translation || "-"}
                        </span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-lg" aria-label="Spanish">
                            🇪🇸
                        </span>
                        <span className="flex-1 text-muted-foreground">
                            {esTranslation?.translation || "-"}
                        </span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-lg" aria-label="German">
                            🇩🇪
                        </span>
                        <span className="flex-1 text-muted-foreground">
                            {deTranslation?.translation || "-"}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
