"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LayoutGrid, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ViewMode } from "@/types";

interface ViewToggleProps {
    onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ onViewChange }: ViewToggleProps) {
    const t = useTranslations("Words");
    const [view, setView] = useState<ViewMode>("grid");

    // Load saved preference from localStorage
    useEffect(() => {
        const savedView = localStorage.getItem("words-view") as ViewMode;
        if (savedView === "grid" || savedView === "table") {
            setView(savedView);
            onViewChange(savedView);
        }
    }, [onViewChange]);

    const handleViewChange = (newView: ViewMode) => {
        setView(newView);
        localStorage.setItem("words-view", newView);
        onViewChange(newView);
    };

    return (
        <div className="flex items-center gap-1 rounded-lg border bg-background p-1">
            <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange("grid")}
                className="gap-2"
                aria-label={t("viewGrid")}
            >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">{t("viewGrid")}</span>
            </Button>
            <Button
                variant={view === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange("table")}
                className="gap-2"
                aria-label={t("viewTable")}
            >
                <Table className="h-4 w-4" />
                <span className="hidden sm:inline">{t("viewTable")}</span>
            </Button>
        </div>
    );
}
