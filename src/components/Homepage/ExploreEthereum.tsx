import { ChevronRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

type ExploreLink = {
  id: string
  title: string
  description: string
  href: string
}

type ExploreColumn = {
  heading: string
  links: ExploreLink[]
}

type ExploreEthereumProps = {
  className?: string
  eventCategory?: string
}

const ExploreEthereum = async ({
  className,
  eventCategory = "Homepage",
}: ExploreEthereumProps) => {
  const t = await getTranslations("page-index")

  const columns: ExploreColumn[] = [
    {
      heading: t("page-index-explore-col-essentials"),
      links: [
        {
          id: "ether",
          title: t("page-index-explore-ether-title"),
          description: t("page-index-explore-ether-description"),
          href: "/what-is-ether/",
        },
        {
          id: "wallets",
          title: t("page-index-explore-wallets-title"),
          description: t("page-index-explore-wallets-description"),
          href: "/wallets/",
        },
      ],
    },
    {
      heading: t("page-index-explore-col-vision"),
      links: [
        {
          id: "whitepaper",
          title: t("page-index-explore-whitepaper-title"),
          description: t("page-index-explore-whitepaper-description"),
          href: "/whitepaper/",
        },
        {
          id: "roadmap",
          title: t("page-index-explore-roadmap-title"),
          description: t("page-index-explore-roadmap-description"),
          href: "/roadmap/",
        },
      ],
    },
    {
      heading: t("page-index-explore-col-community"),
      links: [
        {
          id: "community",
          title: t("page-index-explore-community-title"),
          description: t("page-index-explore-community-description"),
          href: "/community/",
        },
        {
          id: "events",
          title: t("page-index-explore-events-title"),
          description: t("page-index-explore-events-description"),
          href: "/community/events/",
        },
      ],
    },
  ]

  return (
    <div className={cn("mx-auto w-full max-w-[76rem] space-y-8", className)}>
      <h2 className="text-center text-lg font-normal text-body-medium lg:text-2xl">
        {t("page-index-explore-title")}
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {columns.map((column) => (
          <div key={column.heading} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-body-medium">
              {column.heading}
            </h3>
            <div className="flex flex-1 flex-col gap-2">
              {column.links.map((link) => (
                <BaseLink
                  key={link.id}
                  href={link.href}
                  hideArrow
                  className="group flex flex-1 items-center justify-between gap-3 rounded-2xl border bg-background px-5 py-4 no-underline transition-colors hover:border-primary-hover"
                  customEventOptions={{
                    eventCategory,
                    eventAction: "section_click",
                    eventName: `explore/${link.id}`,
                  }}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-base font-semibold text-body">
                      {link.title}
                    </span>
                    <span className="text-sm leading-snug text-body-medium">
                      {link.description}
                    </span>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-body-medium transition-transform group-hover:translate-x-0.5" />
                </BaseLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExploreEthereum
