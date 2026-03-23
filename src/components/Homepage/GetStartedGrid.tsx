import { Book, Building2, ChevronRight, Code } from "lucide-react"

import { Image } from "@/components/Image"
import { Card, CardContent } from "@/components/ui/card"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Section, SectionHeader } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

import { ENTERPRISE_ETHEREUM_URL } from "@/lib/constants"

import developersImage from "@/public/images/homepage/get-started/developers.png"
import enterpriseImage from "@/public/images/homepage/get-started/enterprise.png"
import learnImage from "@/public/images/homepage/get-started/learn.png"

const cards = [
  {
    id: "learn",
    icon: Book,
    iconBg: "bg-[#f7ecff]",
    iconColor: "text-primary",
    title: "Understand Ethereum",
    description:
      "Start here. Learn what it is, why it matters, and how it works in plain language.",
    bullets: [
      "What is Ethereum?",
      "How do wallets work?",
      "DeFi, stablecoins, and NFTs explained",
    ],
    bulletColor: "bg-primary",
    cta: "Start learning",
    href: "/learn/",
    image: learnImage,
  },
  {
    id: "developers",
    icon: Code,
    iconBg: "bg-[#e9f4ff]",
    iconColor: "text-accent-a",
    title: "Start building",
    description:
      "For developers. Access documentation, tools, and tutorials to build on Ethereum.",
    bullets: [
      "Developer documentation",
      "Smart contract tutorials",
      "Development tools & frameworks",
    ],
    bulletColor: "bg-accent-a",
    cta: "View materials",
    href: "/developers/",
    image: developersImage,
  },
  {
    id: "enterprise",
    icon: Building2,
    iconBg: "bg-[#e6f7f6]",
    iconColor: "text-accent-c",
    title: "For enterprise",
    description:
      "Business use cases, institutional resources, and how Ethereum can serve your organization.",
    bullets: [
      "Enterprise use cases",
      "Private & permissioned networks",
      "Institutional resources",
    ],
    bulletColor: "bg-accent-c",
    cta: "Explore enterprise",
    href: ENTERPRISE_ETHEREUM_URL,
    image: enterpriseImage,
  },
]

type GetStartedGridProps = {
  className?: string
  eventCategory?: string
}

const GetStartedGrid = ({
  className,
  eventCategory = "Homepage",
}: GetStartedGridProps) => {
  return (
    <Section id="get-started" className={cn("relative", className)}>
      <div className="flex flex-col gap-12 rounded-t-4xl bg-radial-a px-4 pb-8 pt-20 md:px-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <SectionHeader className="mb-0 mt-0">
            Get started on Ethereum
          </SectionHeader>
          <p className="max-w-[42rem] text-lg text-body-medium lg:text-2xl">
            Takes 2 minutes to get started. No credit check, no paperwork, no
            minimum balance.
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
                    className="flex items-center gap-1 font-semibold no-underline"
                    matomoEvent={{
                      eventCategory,
                      eventAction: "section_click",
                      eventName: `get_started/${card.id}`,
                    }}
                  >
                    {card.cta}
                    <ChevronRight className="size-5" />
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
