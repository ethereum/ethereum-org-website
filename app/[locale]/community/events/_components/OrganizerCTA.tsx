import { getLocale, getTranslations } from "next-intl/server"

import { ButtonLink } from "@/components/ui/buttons/Button"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

interface OrganizerCTAProps {
  className?: string
}

export default async function OrganizerCTA({ className }: OrganizerCTAProps) {
  const locale = await getLocale()
  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })

  return (
    <Section
      className={cn(
        "border-accent-a/20 bg-gradient-to-b from-accent-a/5 to-accent-a/10 dark:from-accent-a/10 dark:to-accent-a/20",
        "space-y-8 rounded-4xl px-4 py-12 text-center md:px-8 md:py-20",
        className
      )}
    >
      <h2>{t("page-events-cta-title")}</h2>
      <p className="mx-auto max-w-3xl">{t("page-events-cta-body")}</p>
      <ButtonLink
        href="https://forms.gle/9yK4jeoiXqzVbxq6A"
        size="lg"
        className="mx-auto max-sm:w-full"
        customEventOptions={{
          eventCategory: "Events_submit",
          eventAction: "events_clicked",
          eventName: "submit_event",
        }}
      >
        {t("page-events-cta-button")}
      </ButtonLink>
    </Section>
  )
}
