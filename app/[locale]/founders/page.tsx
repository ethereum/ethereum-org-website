import React from "react"
import { Banknote, ChartNoAxesCombined, Handshake } from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { Lang, PageParams, SectionNavDetails } from "@/lib/types"

import ContentHero from "@/components/Hero/ContentHero"
import { CheckCircle } from "@/components/icons/CheckCircle"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import Alliance from "./logos/alliance.svg"
import Arbitrum from "./logos/arbitrum.svg"
import Base from "./logos/base.svg"
import Devconnect from "./logos/devconnect.svg"
import EcosystemSupport from "./logos/ecosystem-support-program.svg"
import EFFounderSuccess from "./logos/ef-founder-success.svg"
import EnsBuilderGrants from "./logos/ens-builder-grants.svg"
import EthGlobal from "./logos/ethglobal.svg"
// import Gitcoin from "./logos/gitcoin.svg"
import Kernel from "./logos/kernel.svg"
import Optimism from "./logos/optimism.svg"
import Polygon from "./logos/polygon.svg"
import ProtogolGuild from "./logos/protocol-guild.svg"
import Unichain from "./logos/unichain.svg"
import FoundersPageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/upgrades/merge.png"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: "page-founders" })

  const supportTags = {
    active: {
      label: t("page-founders-support-tag-active"),
      // TODO: extract color variants to ui/tag component
      className:
        "bg-green-100 dark:bg-green-700/50 text-green-700 dark:text-green-100",
    },
    grantProgram: {
      label: t("page-founders-support-tag-grant-program"),
      className:
        "bg-blue-100 dark:bg-blue-600/50 text-blue-600 dark:text-blue-100",
    },
    auditGrants: {
      label: t("page-founders-support-tag-audit-grants"),
      className:
        "bg-purple-100 dark:bg-purple-600/50 text-purple-600 dark:text-purple-100",
    },
    publicGoods: {
      label: t("page-founders-support-tag-public-goods"),
      className:
        "bg-orange-100 dark:bg-orange-700/50 text-orange-700 dark:text-orange-100",
    },
    toolingInfra: {
      label: t("page-founders-support-tag-tooling-infra"),
      className:
        "bg-pink-100 dark:bg-pink-800/50 text-pink-800 dark:text-pink-100",
    },
    events: {
      label: t("page-founders-support-tag-events"),
      className:
        "bg-yellow-100 dark:bg-yellow-700/50 text-yellow-700 dark:text-yellow-100",
    },
    fundraising: {
      label: t("page-founders-support-tag-fundraising"),
      className:
        "bg-yellow-100 dark:bg-yellow-700/50 text-yellow-700 dark:text-yellow-100",
    },
    ecosystemEvents: {
      label: t("page-founders-support-tag-ecosystem-events"),
      className:
        "bg-pink-100 dark:bg-pink-800/50 text-pink-800 dark:text-pink-100 tracking-1",
    },
    accelerator: {
      label: t("page-founders-support-tag-accelerator"),
      className:
        "bg-orange-100 dark:bg-orange-700/50 text-orange-700 dark:text-orange-100",
    },
    mentorship: {
      label: t("page-founders-support-tag-mentorship"),
      className:
        "bg-purple-100 dark:bg-purple-600/50 text-purple-600 dark:text-purple-100",
    },
    networking: {
      label: t("page-founders-support-tag-networking"),
      className:
        "bg-blue-100 dark:bg-blue-600/50 text-blue-600 dark:text-blue-100",
    },
  } as const satisfies Record<string, { label: string; className: string }>

  type SupportTag = keyof typeof supportTags

  type SupportEntity = {
    name: string // sr-only h3
    Logo: React.FC<React.SVGProps<SVGElement>>
    tags: SupportTag[]
    subtitle?: string
    description: string
    highlights: string[] // w/ CheckCircle
    href: string
    ctaLabel?: React.ReactNode
  }

  type SupportSection = Omit<Required<SectionNavDetails>, "href"> & {
    entities: SupportEntity[]
    categoryCtaLabel?: string
  }

  const supportTabs: SupportSection[] = [
    {
      key: "funding",
      label: t("page-founders-funding-label"),
      icon: <Banknote />,
      entities: [
        {
          name: "Optimism Atlas",
          Logo: Optimism,
          tags: ["active", "grantProgram", "auditGrants", "publicGoods"],
          description: t("page-founders-funding-optimism-description"),
          highlights: [
            t("page-founders-funding-optimism-highlight-1"),
            t("page-founders-funding-optimism-highlight-2"),
          ],
          href: "https://atlas.optimism.io/",
          ctaLabel: t.rich("page-founders-cta-visit-name", {
            name: "Optimism",
          }),
        },
        // {
        //   name: "Gitcoin",
        //   Logo: Gitcoin,
        //   tags: ["grantProgram", "publicGoods"],
        //   description: "A quarterly initiative that empowers people and collectives in web3 to allocate funding toward projects and causes they believe in.",
        //   highlights: ["3,700+ projects supported"],
        //   href: "https://www.gitcoin.co/program",
        //   ctaLabel: t.rich("page-founders-cta-visit-name", { name: "Gitcoin" }),
        // },
        {
          name: "Base",
          Logo: Base,
          tags: ["active", "grantProgram", "toolingInfra"],
          description: t("page-founders-funding-base-description"),
          highlights: [t("page-founders-funding-base-highlight-1")],
          href: "https://paragraph.com/@grants.base.eth/calling-based-builders",
          ctaLabel: t.rich("page-founders-cta-visit-name", { name: "Base" }),
        },
        {
          name: "Ecosystem Support Program",
          Logo: EcosystemSupport,
          tags: [
            "active",
            "grantProgram",
            "publicGoods",
            "toolingInfra",
            "events",
          ],
          description: t("page-founders-funding-esp-description"),
          highlights: [t("page-founders-funding-esp-highlight-1")],
          href: "https://esp.ethereum.foundation/",
          ctaLabel: t.rich("page-founders-cta-visit-name", { name: "ESP" }),
        },
        {
          name: "Arbitrum",
          Logo: Arbitrum,
          tags: ["active", "grantProgram", "auditGrants", "toolingInfra"],
          description: t("page-founders-funding-arbitrum-description"),
          highlights: [t("page-founders-funding-arbitrum-highlight-1")],
          href: "https://arbitrum.foundation/grants",
          ctaLabel: t.rich("page-founders-cta-visit-name", {
            name: "Arbitrum",
          }),
        },
        {
          name: "Unichain",
          Logo: Unichain,
          tags: ["active", "grantProgram", "auditGrants", "toolingInfra"],
          description: t("page-founders-funding-unichain-description"),
          highlights: [t("page-founders-funding-unichain-highlight-1")],
          href: "https://www.uniswapfoundation.org/build",
          ctaLabel: t.rich("page-founders-cta-visit-name", {
            name: "Unichain",
          }),
        },
        {
          name: "Polygon",
          Logo: Polygon,
          tags: ["active", "grantProgram", "toolingInfra"],
          description: t("page-founders-funding-polygon-description"),
          highlights: [t("page-founders-funding-polygon-highlight-1")],
          href: "https://polygon.technology/grants",
          ctaLabel: t.rich("page-founders-cta-visit-name", { name: "Polygon" }),
        },
      ],
    },
    {
      key: "accelerators-growth",
      label: t("page-founders-accelerators-growth-label"),
      icon: <ChartNoAxesCombined />,
      entities: [
        {
          name: "Kernel",
          Logo: Kernel,
          tags: ["active", "mentorship", "networking"],
          description: t("page-founders-accelerators-kernel-description"),
          highlights: [
            t("page-founders-accelerators-kernel-highlight-1"),
            t("page-founders-accelerators-kernel-highlight-2"),
          ],
          href: "https://www.kernel.community/",
          ctaLabel: t.rich("page-founders-cta-explore-name", {
            name: "Kernel",
          }),
        },
        {
          name: "Alliance",
          Logo: Alliance,
          tags: [
            "active",
            "accelerator",
            "networking",
            "mentorship",
            "fundraising",
          ],
          description: t("page-founders-accelerators-alliance-description"),
          highlights: [t("page-founders-accelerators-alliance-highlight-1")],
          href: "https://alliance.xyz/",
          ctaLabel: t.rich("page-founders-cta-explore-name", {
            name: "Alliance",
          }),
        },
        {
          name: "Base",
          Logo: Base,
          tags: ["accelerator", "mentorship", "networking"],
          description: t("page-founders-accelerators-base-description"),
          highlights: [t("page-founders-accelerators-base-highlight-1")],
          href: "https://www.basebatches.xyz/",
          ctaLabel: t.rich("page-founders-cta-explore-name", { name: "Base" }),
        },
      ],
    },
    {
      key: "partnerships-integrations",
      label: t("page-founders-partnerships-label"),
      icon: <Handshake />,
      entities: [
        {
          name: "Unichain",
          Logo: Unichain,
          tags: ["active", "auditGrants"],
          description: t("page-founders-partnerships-unichain-description"),
          highlights: [t("page-founders-partnerships-unichain-highlight-1")],
          href: "https://www.uniswapfoundation.org/build",
          ctaLabel: t.rich("page-founders-cta-visit-name", {
            name: "Unichain",
          }),
        },
        {
          name: "ENS Builder Grants",
          Logo: EnsBuilderGrants,
          tags: ["active", "publicGoods", "fundraising"],
          description: t("page-founders-partnerships-ens-description"),
          highlights: [
            t("page-founders-partnerships-ens-highlight-1"),
            t("page-founders-partnerships-ens-highlight-2"),
          ],
          href: "https://builder.ensgrants.xyz/",
          ctaLabel: t.rich("page-founders-cta-visit-name", { name: "ENS" }),
        },
        {
          name: "Protocol Guild",
          Logo: ProtogolGuild,
          tags: ["active", "fundraising"],
          description: t(
            "page-founders-partnerships-protocol-guild-description"
          ),
          highlights: [
            t("page-founders-partnerships-protocol-guild-highlight-1"),
          ],
          href: "https://www.protocolguild.org/",
          ctaLabel: t.rich("page-founders-cta-visit-name", { name: "PG" }),
        },
        {
          name: "Devconnect",
          Logo: Devconnect,
          tags: ["ecosystemEvents"],
          description: t("page-founders-partnerships-devconnect-description"),
          highlights: [],
          href: "https://devconnect.org/",
          ctaLabel: t.rich("page-founders-cta-visit-name", {
            name: "Devconnect",
          }),
        },
        {
          name: "ETHGlobal",
          Logo: EthGlobal,
          tags: ["ecosystemEvents"],
          description: t("page-founders-partnerships-ethglobal-description"),
          highlights: [],
          href: "https://ethglobal.com/",
          ctaLabel: t.rich("page-founders-cta-visit-name", {
            name: "ETHGlobal",
          }),
        },
        {
          name: "Ethereum Foundation Founder Support",
          Logo: EFFounderSuccess,
          tags: [],
          subtitle: t("page-founders-partnerships-ef-founder-support-subtitle"),
          description: t(
            "page-founders-partnerships-ef-founder-support-description"
          ),
          highlights: [],
          href: "https://efdn.notion.site/255d989555418113975ff62641d9c814",
          ctaLabel: t("page-founders-partnerships-ef-founder-support-cta"),
        },
        // {
        //   name: "Base",
        //   Logo: Base,
        //   tags: [],
        //   description: "Base Batches is a global program for builders creating the next wave of onchain apps",
        //   highlights: [],
        //   href: "https://www.basebatches.xyz/",
        //   ctaLabel: "Visit Base",
        // },
      ],
    },
  ]

  const { contributors } = await getAppPageContributorInfo(
    "founders",
    locale as Lang
  )

  return (
    <>
      <FoundersPageJsonLD locale={locale} contributors={contributors} />

      <div>
        <ContentHero
          breadcrumbs={{ slug: "build/founders", startDepth: 1 }}
          heroImg={heroImg}
          title={t("page-founders-title")}
          description={t("page-founders-description")}
        />
        <MainArticle className="relative space-y-16 px-4 py-16 md:space-y-20 md:px-10 md:py-20">
          <Section id="apply" className="space-y-12">
            <div className="space-y-4">
              <h2>{t("page-founders-apply-h2")}</h2>
              <p>{t("page-founders-apply-p1")}</p>
            </div>

            <Tabs defaultValue={supportTabs[0].key}>
              <TabsList>
                {supportTabs.map(({ key, label, icon }) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    // TODO: Add tracking to triggers
                    // customEventOptions={{
                    //   eventCategory: "founders_support",
                    //   eventAction: "apply_for_support_section",
                    // }}
                  >
                    {icon}&nbsp;{label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {supportTabs.map(({ key, entities, categoryCtaLabel }) => (
                <TabsContent
                  key={key}
                  value={key}
                  className="mt-12 border-0 p-0"
                >
                  <div className="grid grid-cols-fill-4 gap-4">
                    {entities.map(
                      ({
                        name,
                        Logo,
                        tags,
                        subtitle,
                        description,
                        highlights,
                        href,
                        ctaLabel,
                      }) => (
                        <Card
                          key={name}
                          className="row-span-3 grid grid-rows-subgrid gap-y-8 rounded-2xl bg-background-highlight p-8 max-md:px-4"
                        >
                          <h3 className="sr-only">{name}</h3>
                          <Logo className="my-auto max-h-9 max-w-full [&_*]:!fill-body" />
                          <div className="space-y-4">
                            {!!tags.length && (
                              <div className="flex flex-wrap gap-x-1 gap-y-2">
                                {tags.map((tag) => (
                                  <Tag
                                    key={tag}
                                    className={cn(
                                      "!min-h-0 !py-1",
                                      supportTags[tag].className
                                    )}
                                  >
                                    {supportTags[tag].label}
                                  </Tag>
                                ))}
                              </div>
                            )}
                            {subtitle && (
                              <p className="font-bold">{subtitle}</p>
                            )}
                            <p>{description}</p>
                            {highlights.map((highlight) => (
                              <div
                                key={highlight}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle />
                                <p>{highlight}</p>
                              </div>
                            ))}
                          </div>
                          <ButtonLink href={href} variant="outline">
                            {ctaLabel || categoryCtaLabel}
                          </ButtonLink>
                        </Card>
                      )
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Section>
        </MainArticle>
      </div>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  const t = await getTranslations({
    locale,
    namespace: "page-founders",
  })

  return await getMetadata({
    locale,
    slug: ["founders"],
    title: t("page-founders-metadata-title"),
    description: t("page-founders-metadata-description"),
    image: "/images/upgrades/merge.png",
  })
}
export default Page
