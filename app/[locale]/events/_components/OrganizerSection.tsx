"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

const OrganizerSection = () => {
  const t = useTranslations("page-events")

  return (
    <div className="flex flex-col gap-16">
      {/* Main organizer header */}
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold md:text-4xl">
          {t("page-events-for-organizers")}
        </h2>
        <p className="max-w-3xl text-body-medium">
          {t("page-events-for-organizers-description")}
        </p>
      </div>

      {/* Planning an event card */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-lg bg-background-highlight md:h-48 md:w-48">
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <span className="text-6xl">📅</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">
            {t("page-events-planning-event")}
          </h3>
          <p className="max-w-xl text-body-medium">
            {t("page-events-planning-event-description")}
          </p>
          <Button variant="outline" asChild className="w-fit">
            <Link href="/community/events/guide">
              {t("page-events-read-guide")}
            </Link>
          </Button>
        </div>
      </div>

      {/* Support section */}
      <div className="flex flex-col gap-8">
        <h3 className="text-xl font-bold">
          {t("page-events-looking-support")}
        </h3>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Ethereum Everywhere */}
          <article className="flex flex-col gap-6 rounded-lg border border-body-light bg-background p-6">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-background-highlight">
                <div className="flex h-full items-center justify-center bg-primary/10">
                  <span className="text-2xl">🌍</span>
                </div>
              </div>
              <h4 className="text-lg font-bold">
                {t("page-events-ethereum-everywhere")}
              </h4>
            </div>

            <p className="text-sm text-body-medium">
              {t("page-events-ethereum-everywhere-description")}
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <p className="font-medium">{t("page-events-guidance")}</p>
                <p className="text-sm text-body-medium">
                  {t("page-events-guidance-description")}
                </p>
              </div>

              <div>
                <p className="font-medium">{t("page-events-resources")}</p>
                <p className="text-sm text-body-medium">
                  {t("page-events-resources-description")}
                </p>
              </div>

              <div>
                <p className="font-medium">{t("page-events-connections")}</p>
                <p className="text-sm text-body-medium">
                  {t("page-events-connections-description")}
                </p>
              </div>
            </div>

            <Button variant="outline" asChild className="w-fit">
              <Link
                href="https://ethereum.foundation/ethereum-everywhere"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("page-events-contact")}
              </Link>
            </Button>
          </article>

          {/* Add event CTA */}
          <article className="flex flex-col items-center justify-center gap-6 rounded-lg border border-body-light bg-background-highlight p-6">
            <h4 className="text-center text-xl font-bold">
              {t("page-events-organising-event")}
            </h4>
            <p className="text-center text-sm text-body-medium">
              {t("page-events-organising-event-description")}
            </p>
            <Button variant="solid" asChild>
              <Link
                href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_event.yaml"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("page-events-add-event")}
              </Link>
            </Button>
          </article>
        </div>
      </div>
    </div>
  )
}

export default OrganizerSection
