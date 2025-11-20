import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: "full" | "content" | "narrow";
  className?: string;
}

/**
 * Reusable page container with consistent spacing and max-width
 * @param maxWidth - "full" (7xl), "content" (4xl), "narrow" (2xl)
 */
export function PageContainer({
  children,
  maxWidth = "full",
  className,
}: PageContainerProps) {
  const maxWidthClasses = {
    full: "max-w-7xl",
    content: "max-w-4xl",
    narrow: "max-w-2xl",
  };

  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className={cn("mx-auto", maxWidthClasses[maxWidth], className)}>
        {children}
      </div>
    </section>
  );
}
