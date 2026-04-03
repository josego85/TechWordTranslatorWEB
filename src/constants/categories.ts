import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  Code2,
  Cpu,
  Database,
  GitMerge,
  Globe,
  HardDrive,
  Layers,
  Monitor,
  Network,
  Shield,
  Sparkles,
  Tag,
} from "lucide-react";

interface CategoryConfig {
  icon: LucideIcon;
  color: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  networking: {
    icon: Network,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  databases: {
    icon: Database,
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  security: {
    icon: Shield,
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  algorithms: {
    icon: Cpu,
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  "data-structures": {
    icon: Layers,
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  "operating-systems": {
    icon: Monitor,
    color:
      "bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300",
  },
  "programming-languages": {
    icon: Code2,
    color:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  web: {
    icon: Globe,
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  },
  cloud: {
    icon: Cloud,
    color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  },
  devops: {
    icon: GitMerge,
    color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  },
  hardware: {
    icon: HardDrive,
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  "artificial-intelligence": {
    icon: Sparkles,
    color:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  },
  other: {
    icon: Tag,
    color: "bg-gray-100 text-gray-600 dark:bg-gray-800/60 dark:text-gray-400",
  },
};

export const CATEGORY_SLUGS = Object.keys(CATEGORY_CONFIG);
