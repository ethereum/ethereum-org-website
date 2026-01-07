"use client"

import { Search } from "lucide-react"
import { useTranslations } from "next-intl"

import Input from "@/components/ui/input"

const EventsSearch = () => {
  const t = useTranslations("page-events")

  return (
    <div className="relative max-w-lg">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-body-medium" />
      <Input
        type="search"
        placeholder={t("page-events-search-placeholder")}
        className="w-full pl-10"
        size="md"
      />
    </div>
  )
}

export default EventsSearch
