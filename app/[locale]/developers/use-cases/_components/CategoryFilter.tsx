"use client"

import {
  Building2,
  Cpu,
  Globe,
  Landmark,
  Leaf,
  ShoppingCart,
  Users,
} from "lucide-react"
import { useTranslations } from "next-intl"

import type { SectionNavDetails } from "@/lib/types"

import TabNav from "@/components/ui/TabNav"

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all: <Globe className="stroke-1" />,
  Society: <Users className="stroke-1" />,
  Finance: <Landmark className="stroke-1" />,
  Consumer: <ShoppingCart className="stroke-1" />,
  Enterprise: <Building2 className="stroke-1" />,
  Digital: <Cpu className="stroke-1" />,
  Physical: <Leaf className="stroke-1" />,
}

interface CategoryFilterProps {
  categories: string[]
  categoryCounts: Record<string, number>
  selectedCategory: string | "all"
  onSelectCategory: (category: string | "all") => void
}

export function CategoryFilter({
  categories,
  categoryCounts,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const t = useTranslations("page-use-cases")

  const sections: SectionNavDetails[] = [
    {
      key: "all",
      label: `${t("filter-all")} (${categoryCounts["all"] || 0})`,
      icon: CATEGORY_ICONS["all"],
    },
    ...categories.map((category) => ({
      key: category,
      label: `${category} (${categoryCounts[category] || 0})`,
      icon: CATEGORY_ICONS[category],
    })),
  ]

  return (
    <TabNav
      sections={sections}
      activeSection={selectedCategory}
      onSelect={(key) => onSelectCategory(key)}
      useMotion
      motionLayoutId="use-case-category"
      className="justify-start [&>nav]:mx-0 md:[&>nav]:max-w-full"
    />
  )
}
