import { getTranslations } from "next-intl/server"

import FooterCTA from "./footer-cta"

export default async function OrganizerCTA() {
  const t = await getTranslations("page-community-events")

  return (
    <FooterCTA
      id="submit-event"
      header={t("page-events-cta-title")}
      paragraph={t("page-events-cta-body")}
      href="https://forms.gle/9yK4jeoiXqzVbxq6A"
      customEventOptions={{
        eventCategory: "Events_submit",
        eventAction: "events_clicked",
        eventName: "submit_event",
      }}
      ctaLabel={t("page-events-cta-button")}
    />
  )
}
