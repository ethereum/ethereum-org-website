import React from "react"
import { Banknote, ChartNoAxesCombined, UsersRound, Wrench } from "lucide-react"
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams, SectionNavDetails } from "@/lib/types"

import PageHero from "@/components/Hero/PageHero"
import { CheckCircle } from "@/components/icons/CheckCircle"
import EthGlyph from "@/components/icons/eth-glyph.svg"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tag } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import OrganizationPathways from "../_components/organization-pathways"

import Alchemy from "./logos/alchemy.svg"
import Alliance from "./logos/alliance.svg"
import Arbitrum from "./logos/arbitrum.svg"
import Base from "./logos/base.svg"
import EcosystemSupport from "./logos/ecosystem-support-program.svg"
import EthGlobal from "./logos/ethglobal.svg"
import Kernel from "./logos/kernel.svg"
import Unichain from "./logos/unichain.svg"
import PageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/organizations/startup-warehouse-founders-workspace.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-founders")

  // Status tags come first on each card and answer "can I apply right now?"
  const supportTags = {
    open: {
      label: t("page-founders-tag-open"),
      // TODO: extract color variants to ui/tag component
      className:
        "bg-green-100 dark:bg-green-700/50 text-green-700 dark:text-green-100",
    },
    ongoing: {
      label: t("page-founders-tag-ongoing"),
      className:
        "bg-green-100 dark:bg-green-700/50 text-green-700 dark:text-green-100",
    },
    cohortClosed: {
      label: t("page-founders-tag-cohort-closed"),
      className: "bg-background-highlight text-body-medium",
    },
    grants: {
      label: t("page-founders-tag-grants"),
      className:
        "bg-blue-100 dark:bg-blue-600/50 text-blue-600 dark:text-blue-100",
    },
    investment: {
      label: t("page-founders-tag-investment"),
      className:
        "bg-yellow-100 dark:bg-yellow-700/50 text-yellow-700 dark:text-yellow-100",
    },
    publicGoods: {
      label: t("page-founders-tag-public-goods"),
      className:
        "bg-orange-100 dark:bg-orange-700/50 text-orange-700 dark:text-orange-100",
    },
    accelerator: {
      label: t("page-founders-tag-accelerator"),
      className:
        "bg-orange-100 dark:bg-orange-700/50 text-orange-700 dark:text-orange-100",
    },
    mentorship: {
      label: t("page-founders-tag-mentorship"),
      className:
        "bg-purple-100 dark:bg-purple-600/50 text-purple-600 dark:text-purple-100",
    },
    auditSubsidies: {
      label: t("page-founders-tag-audit-subsidies"),
      className:
        "bg-purple-100 dark:bg-purple-600/50 text-purple-600 dark:text-purple-100",
    },
    credits: {
      label: t("page-founders-tag-credits"),
      className:
        "bg-pink-100 dark:bg-pink-800/50 text-pink-800 dark:text-pink-100",
    },
    gas: {
      label: t("page-founders-tag-gas"),
      className:
        "bg-pink-100 dark:bg-pink-800/50 text-pink-800 dark:text-pink-100",
    },
    events: {
      label: t("page-founders-tag-events"),
      className:
        "bg-yellow-100 dark:bg-yellow-700/50 text-yellow-700 dark:text-yellow-100",
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
      label: t("page-founders-funding-investment-label"),
      icon: <Banknote />,
      entities: [
        {
          name: "Ecosystem Support Program",
          Logo: EcosystemSupport,
          tags: ["ongoing", "grants", "publicGoods"],
          description: t("page-founders-funding-esp-applicants-description"),
          highlights: [
            t("page-founders-funding-esp-applicants-highlight-1"),
            t("page-founders-funding-esp-applicants-highlight-2"),
          ],
          href: "https://esp.ethereum.foundation/applicants",
          ctaLabel: t.rich("page-founders-cta-visit-name", { name: "ESP" }),
        },
        {
          name: "Base",
          Logo: Base,
          tags: ["ongoing", "grants", "investment"],
          description: t("page-founders-funding-base-builders-description"),
          highlights: [
            t("page-founders-funding-base-builders-highlight-1"),
            t("page-founders-funding-base-builders-highlight-2"),
          ],
          href: "https://docs.base.org/get-started/builders",
          ctaLabel: t.rich("page-founders-cta-visit-name", { name: "Base" }),
        },
        {
          name: "Uniswap Foundation and Unichain",
          Logo: Unichain,
          tags: ["ongoing", "grants", "auditSubsidies"],
          description: t("page-founders-funding-uniswap-description"),
          highlights: [
            t("page-founders-funding-uniswap-highlight-1"),
            t("page-founders-funding-uniswap-highlight-2"),
          ],
          href: "https://www.uniswapfoundation.org/build",
          ctaLabel: t.rich("page-founders-cta-visit-name", {
            name: "Uniswap Foundation",
          }),
        },
      ],
    },
    {
      key: "accelerators-mentorship",
      label: t("page-founders-accelerators-mentorship-label"),
      icon: <ChartNoAxesCombined />,
      entities: [
        {
          name: "Alliance",
          Logo: Alliance,
          tags: ["open", "accelerator", "investment", "mentorship"],
          description: t(
            "page-founders-accelerators-alliance-terms-description"
          ),
          highlights: [
            t("page-founders-accelerators-alliance-terms-highlight-1"),
            t("page-founders-accelerators-alliance-terms-highlight-2"),
          ],
          href: "https://alliance.xyz/",
          ctaLabel: t.rich("page-founders-cta-explore-name", {
            name: "Alliance",
          }),
        },
        {
          name: "Kernel",
          Logo: Kernel,
          tags: ["open", "mentorship"],
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
          name: "Base Batches",
          Logo: Base,
          tags: ["cohortClosed", "accelerator", "investment"],
          description: t("page-founders-accelerators-base-batches-description"),
          highlights: [
            t("page-founders-accelerators-base-batches-highlight-1"),
          ],
          href: "https://www.base.org/batches",
          ctaLabel: t.rich("page-founders-cta-explore-name", {
            name: "Base Batches",
          }),
        },
      ],
    },
    {
      key: "technical-support",
      label: t("page-founders-technical-label"),
      icon: <Wrench />,
      entities: [
        {
          name: "Arbitrum",
          Logo: Arbitrum,
          tags: ["ongoing", "auditSubsidies", "gas"],
          description: t("page-founders-technical-arbitrum-description"),
          highlights: [
            t("page-founders-technical-arbitrum-highlight-1"),
            t("page-founders-technical-arbitrum-highlight-2"),
          ],
          href: "https://arbitrum.foundation/grants",
          ctaLabel: t.rich("page-founders-cta-visit-name", {
            name: "Arbitrum",
          }),
        },
        {
          name: "Alchemy Startup Program",
          Logo: Alchemy,
          tags: ["ongoing", "credits"],
          description: t("page-founders-technical-alchemy-description"),
          highlights: [
            t("page-founders-technical-alchemy-highlight-1"),
            t("page-founders-technical-alchemy-highlight-2"),
          ],
          href: "https://www.alchemy.com/startup-program",
          ctaLabel: t.rich("page-founders-cta-visit-name", {
            name: "Alchemy",
          }),
        },
      ],
    },
    {
      key: "meet-builders",
      label: t("page-founders-community-label"),
      icon: <UsersRound />,
      entities: [
        {
          name: "ETHGlobal",
          Logo: EthGlobal,
          tags: ["events"],
          description: t("page-founders-community-ethglobal-description"),
          highlights: [],
          href: "https://ethglobal.com/events",
          ctaLabel: t.rich("page-founders-cta-visit-name", {
            name: "ETHGlobal",
          }),
        },
        {
          name: "Ethereum events",
          // Glyph defaults to 1em; match the wordmark logos' height
          Logo: (props) => (
            <EthGlyph {...props} height="2.25rem" width="auto" />
          ),
          tags: ["events"],
          description: t("page-founders-community-events-description"),
          highlights: [],
          href: "/community/events/",
          ctaLabel: t("page-founders-cta-browse-events"),
        },
      ],
    },
  ]

  const { contributors } = await getAppPageContributorInfo(
    "organizations/founders",
    locale as Lang
  )

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{ slug: "organizations/founders" }}
        heroImg={heroImg}
        title={t("page-founders-title")}
        description={t("page-founders-description")}
      />

      <MainArticle className="flow px-page pt-page-2x pb-page">
        <Section id="apply">
          <h2>{t("page-founders-apply-h2")}</h2>
          <p>{t("page-founders-apply-p1")}</p>

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
                className="mt-space border-0 p-0"
              >
                <Grid>
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
                        href={href}
                        size="lg"
                        className="row-span-3 grid grid-rows-subgrid gap-0"
                      >
                        <CardHeader className="my-auto">
                          <h3 className="sr-only">{name}</h3>
                          <Logo className="max-h-9 max-w-full **:fill-body!" />
                        </CardHeader>
                        <CardContent spacing="md">
                          {!!tags.length && (
                            <div className="flex flex-wrap gap-x-1 gap-y-2">
                              {tags.map((tag) => (
                                <Tag
                                  key={tag}
                                  size="small"
                                  className={supportTags[tag].className}
                                >
                                  {supportTags[tag].label}
                                </Tag>
                              ))}
                            </div>
                          )}
                          {subtitle && <p className="font-bold">{subtitle}</p>}
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
                        </CardContent>
                        <CardFooter>
                          <CardButtonFake variant="outline">
                            {ctaLabel || categoryCtaLabel}
                          </CardButtonFake>
                        </CardFooter>
                      </Card>
                    )
                  )}
                </Grid>
              </TabsContent>
            ))}
          </Tabs>

          <p className="mt-10 text-sm text-body-medium">
            {t("page-founders-last-checked")}
          </p>
        </Section>

        <Section
          id="more-funding"
          className="flex flex-col items-start gap-4 rounded-2xl border p-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-2">
            <h3 className="text-xl">{t("page-founders-rfpsearch-h3")}</h3>
            <p className="text-body-medium">{t("page-founders-rfpsearch-p")}</p>
          </div>
          <ButtonLink
            href="https://rfpsear.ch/"
            variant="outline"
            className="shrink-0"
          >
            {t("page-founders-rfpsearch-cta")}
          </ButtonLink>
        </Section>

        <OrganizationPathways pathways={["small-business", "enterprise"]} />
      </MainArticle>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-founders")

  return await getMetadata({
    locale,
    slug: ["organizations", "founders"],
    title: t("page-founders-metadata-title"),
    description: t("page-founders-metadata-description"),
    image: "/images/organizations/startup-warehouse-founders-workspace.png",
  })
}
export default Page
