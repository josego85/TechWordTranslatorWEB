"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Locale, localeFlags, localeNames, locales } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/routing";

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = (params.locale as Locale) || "en";

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <Select
      value={currentLocale}
      onValueChange={handleLocaleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue>
          {localeFlags[currentLocale]} {localeNames[currentLocale]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {localeFlags[locale]} {localeNames[locale]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
