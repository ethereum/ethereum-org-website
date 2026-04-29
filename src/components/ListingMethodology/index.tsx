import { ReactNode } from "react"
import { getTranslations } from "next-intl/server"

import { BaseLink } from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import ExpandableCard from "../ExpandableCard"

type ListingMethodologyProps = {
  heading: string
  description: string
  href?: string // Full criteria link
  lastUpdated: string
  children: ReactNode
  footers?: string[]
}

const ListingMethodology = async ({
  heading,
  description,
  href,
  lastUpdated,
  children,
  footers,
}: ListingMethodologyProps) => {
  const t = await getTranslations("component-listing-methodology")

  return (
    <Section
      id="listing-methodology"
      aria-labelledby="methodology-heading"
      className="border-body-light mt-12 border-t pt-12 md:mt-16 md:pt-16"
    >
      <div className="flex w-full flex-col gap-6 px-4 pb-16 md:w-2/3 lg:w-3/5">
        <h2 id="methodology-heading" className="text-3xl font-bold md:text-4xl">
          {heading}
        </h2>

        <p className="text-body-medium text-lg leading-relaxed">
          {description}
        </p>

        {href && (
          <BaseLink href={href}>{t("full-criteria-link-label")}</BaseLink>
        )}

        <div className="text-body-medium flex flex-col gap-1 text-base">
          <p className="font-bold">{t("attribution")}</p>
          <p>
            {t("last-update")} {lastUpdated}
          </p>
        </div>

        <ExpandableCard
          title={t("details-title")}
          contentPreview={t("details-preview")}
          forceMount
        >
          <div className="space-y-4 text-lg leading-relaxed">
            {children}

            {footers && (
              <div className="text-body-medium border-body-light mt-6 space-y-2 border-t pt-6 text-sm">
                {footers.map((footer) => (
                  <p key={footer}>{footer}</p>
                ))}
              </div>
            )}
          </div>
        </ExpandableCard>
      </div>
    </Section>
  )
}

export default ListingMethodology
