import { Book, Building2, Code } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"
import { Card, CardContent } from "@/components/ui/card"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Section, SectionHeader } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { ENTERPRISE_ETHEREUM_URL } from "@/lib/constants"

import { ChevronNext } from "../Chevron"

import developersImage from "@/public/images/homepage/get-started/developers.png"
import enterpriseImage from "@/public/images/homepage/get-started/enterprise.png"
import learnImage from "@/public/images/homepage/get-started/learn.png"

type GetStartedGridProps = {
  className?: string
  eventCategory?: string
}

const GetStartedGrid = async ({
  className,
  eventCategory = "Homepage",
}: GetStartedGridProps) => {
  const t = await getTranslations("page-index")
  const locale = await getLocale()

  const minutes = numberFormat(locale).format(2)

  const cards = [
    {
      id: "learn",
      icon: Book,
      iconBg: "bg-purple-50 dark:bg-purple-900",
      iconColor: "text-primary",
      title: t("page-index-get-started-learn-title"),
      description: t("page-index-get-started-learn-description"),
      bullets: [
        t("page-index-get-started-learn-bullet-1"),
        t("page-index-get-started-learn-bullet-2"),
        t("page-index-get-started-learn-bullet-3"),
      ],
      bulletColor: "bg-primary",
      cta: t("page-index-get-started-learn-cta"),
      href: "/learn/",
      image: learnImage,
    },
    {
      id: "developers",
      icon: Code,
      iconBg: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-accent-a",
      title: t("page-index-get-started-build-title"),
      description: t("page-index-get-started-build-description"),
      bullets: [
        t("page-index-get-started-build-bullet-1"),
        t("page-index-get-started-build-bullet-2"),
        t("page-index-get-started-build-bullet-3"),
      ],
      bulletColor: "bg-accent-a",
      cta: t("page-index-get-started-build-cta"),
      href: "/developers/",
      image: developersImage,
    },
    {
      id: "enterprise",
      icon: Building2,
      iconBg: "bg-teal-100 dark:bg-teal-900",
      iconColor: "text-accent-c",
      title: t("page-index-get-started-enterprise-title"),
      description: t("page-index-get-started-enterprise-description"),
      bullets: [
        t("page-index-get-started-enterprise-bullet-1"),
        t("page-index-get-started-enterprise-bullet-2"),
        t("page-index-get-started-enterprise-bullet-3"),
      ],
      bulletColor: "bg-accent-c",
      cta: t("page-index-get-started-enterprise-cta"),
      href: ENTERPRISE_ETHEREUM_URL,
      image: enterpriseImage,
    },
  ]

  return (
    <Section id="get-started" className={cn("relative", className)}>
      <div className="flex flex-col gap-12 rounded-t-4xl bg-radial-a px-4 pb-8 pt-20 md:px-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <SectionHeader className="mb-0 mt-0">
            {t("page-index-get-started-title")}
          </SectionHeader>
          <p className="max-w-[42rem] text-lg text-body-medium lg:text-2xl">
            {t("page-index-get-started-subtitle", { minutes })}
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-[76rem] gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <LinkBox key={card.title} className="h-full">
              <Card className="flex h-full flex-col overflow-hidden rounded-4xl border bg-background p-8 transition-colors hover:border-primary-hover">
                <div className="mb-7 h-48 overflow-hidden rounded-[10px]">
                  <Image
                    src={card.image}
                    alt=""
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="h-full w-full object-cover"
                  />
                </div>

                <CardContent className="flex flex-1 flex-col justify-between gap-6 space-y-1.5 p-0">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex size-10 items-center justify-center rounded-lg",
                          card.iconBg
                        )}
                      >
                        <card.icon className={cn("size-6", card.iconColor)} />
                      </div>
                      <h3 className="text-2xl font-bold leading-8">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-body-medium">{card.description}</p>

                    <ul className="m-0">
                      {card.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-3.5 last:mb-0"
                        >
                          <span
                            className={cn(
                              "size-1.5 shrink-0 rounded-full",
                              card.bulletColor
                            )}
                          />
                          <span className="text-sm leading-5 text-body-medium">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <LinkOverlay
                    href={card.href}
                    hideArrow
                    className="flex items-center gap-1 font-semibold no-underline"
                    matomoEvent={{
                      eventCategory,
                      eventAction: "section_click",
                      eventName: `get_started/${card.id}`,
                    }}
                  >
                    {card.cta}
                    <ChevronNext className="size-5" />
                  </LinkOverlay>
                </CardContent>
              </Card>
            </LinkBox>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default GetStartedGrid
