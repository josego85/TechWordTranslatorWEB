"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "@/lib/hooks/use-debounced-callback";

export function SearchBar() {
  const t = useTranslations("Words");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when navigating from dashboard
  useEffect(() => {
    if (searchParams.get("focus") === "search" && inputRef.current) {
      inputRef.current.focus();
      // Clean up the focus parameter from URL
      const params = new URLSearchParams(searchParams);
      params.delete("focus");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, pathname, router]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
      params.set("page", "1"); // Reset to first page
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        placeholder={t("searchPlaceholder")}
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
