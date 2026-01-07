"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

const OrganizerCTA = () => {
  const t = useTranslations("page-events")

  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-body-light bg-background-highlight p-8 text-center">
      <h3 className="text-xl font-bold">{t("page-events-organising-event")}</h3>
      <p className="max-w-lg text-body-medium">
        {t("page-events-organising-event-description")}
      </p>
      <Button variant="outline" asChild>
        <Link
          href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_event.yaml"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("page-events-add-event")}
        </Link>
      </Button>
    </div>
  )
}

export default OrganizerCTA
