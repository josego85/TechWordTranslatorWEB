"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSelector } from "./language-selector";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const t = useTranslations("Common");
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home") },
    { href: "/words", label: t("words") },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between sm:h-16">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold sm:text-xl">
            {t("appName")}
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}
