import { getTranslations } from "next-intl/server"

import type { Lang } from "@/lib/types"

import { HubHero } from "@/components/Hero"
import BetterUX from "@/components/icons/better-ux.svg"
import CheaperTransactions from "@/components/icons/cheaper-transactions.svg"
import Checkmark from "@/components/icons/checkmark.svg"
import ExtraSecurity from "@/components/icons/extra-security.svg"
import FutureProofing from "@/components/icons/future-proofing.svg"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils/cn"
import { getMetadata } from "@/lib/utils/metadata"

import EthGlyph from "@/public/images/assets/svgs/eth-diamond-rainbow.svg"
import heroImage from "@/public/images/heroes/enterprise-hero-white.png"

type Case = {
  name: string
  content: string | React.ReactNode
}

const CasesColumn = ({
  cases,
  className,
}: {
  cases: Case[]
  className?: string
}) => (
  <div className={cn("flex w-full flex-col gap-4", className)}>
    {cases.map(({ name, content }) => (
      <Card
        key={name}
        className="space-y-1 rounded-4xl border bg-background p-6 shadow-window-box"
      >
        <h3 className="text-xl">{name}</h3>
        <p className="text-body-medium">{content}</p>
      </Card>
    ))}
  </div>
)

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "page-enterprise" })

  const features = [
    {
      header: t("page-enterprise-features-1-header"),
      content: [t("page-enterprise-features-1-content-1")],
      Icon: ExtraSecurity,
    },
    {
      header: t("page-enterprise-features-2-header"),
      content: [
        t("page-enterprise-features-2-content-1"),
        t("page-enterprise-features-2-content-2"),
      ],
      Icon: FutureProofing,
    },
    {
      header: t("page-enterprise-features-3-header"),
      content: [
        t("page-enterprise-features-3-content-1"),
        t("page-enterprise-features-3-content-2"),
      ],
      Icon: BetterUX,
    },
    {
      header: t("page-enterprise-features-4-header"),
      content: [
        t("page-enterprise-features-4-content-1"),
        t("page-enterprise-features-4-content-2"),
      ],
      Icon: CheaperTransactions,
    },
  ]

  const cases: Case[] = [
    {
      name: "Blackrock",
      content: (
        <>
          Launched <strong>$2,9B+ tokenized</strong> U.S. Treasury fund on
          Ethereum and its ecosystem, delivering same-day liquidity to
          institutions.
        </>
      ),
    },
    {
      name: "MediLedger",
      content:
        "Enables Pfizer and Genentech to verify drug authenticity and ensure pharma compliance.",
    },
    {
      name: "European Investment Bank",
      content: (
        <>
          <strong>Issued a €100M digital bond</strong> on public Ethereum. The
          project was conducted in cooperation with the Banque de France,
          Goldman Sachs, Santander and Société Generale.
        </>
      ),
    },
    {
      name: "T-Mobile & SK Telecom",
      content:
        "Use Ethereum to streamline roaming and device trust—shared ledgers simplify authentication and billing.",
    },
    {
      name: "UN World Food Programme",
      content: (
        <>
          UN <strong>tracks aid for 100,000+ refugees</strong> using a private
          Ethereum fork, boosting audit capabilities.
        </>
      ),
    },
    {
      name: "MediLedger",
      content:
        "Enables Pfizer and Genentech to verify drug authenticity and ensure pharma compliance.",
    },
  ]

  const reasons = [
    {
      header: t("page-enterprise-reason-1-header"),
      content: t("page-enterprise-reason-1-content"),
    },
    {
      header: t("page-enterprise-reason-2-header"),
      content: t("page-enterprise-reason-2-content"),
    },
    {
      header: t("page-enterprise-reason-3-header"),
      content: t("page-enterprise-reason-3-content"),
    },
    {
      header: t("page-enterprise-reason-4-header"),
      content: t("page-enterprise-reason-4-content"),
    },
  ]

  return (
    <div className="space-y-12 md:space-y-20">
      <HubHero
        header={t("page-enterprise-hero-title")}
        description={t("page-enterprise-hero-subtitle")}
        title={t("page-enterprise-hero-breadcrumb")}
        heroImg={heroImage}
        buttons={[
          {
            content: t("page-enterprise-hero-cta"),
            href: "mailto:enterprise@ethereum.org", // TODO: Confirm
            matomo: {
              eventCategory: "enterprise hero buttons",
              eventAction: "click",
              eventName: "get in touch",
            },
          },
        ]}
        className="[&_[data-label='breadcrumb']]:xl:text-body-light [&_[data-label='hero-content']]:xl:bg-accent-a [&_[data-label='hero-content']]:xl:text-background [&_a]:font-bold [&_a]:xl:bg-background [&_a]:xl:text-accent-a [&_img]:dark:invert"
      />

      <MainArticle className="space-y-12 px-4 md:space-y-20 md:px-10">
        <section id="metrics" className="flex flex-col gap-6 md:flex-row">
          <div className="max-w-prose">
            <h2>{t("page-enterprise-metrics-header")}</h2>
            <p>
              Ethereum is the leading platform for <strong>issuing</strong>,{" "}
              <strong>managing</strong>, and{" "}
              <strong>settling digital assets</strong>. From tokenized money and
              financial instruments to real-world assets and emerging markets,
              Ethereum provides a secure, neutral foundation for the digital
              economy.
            </p>
          </div>
          <div className="TODO:METRICS flex max-w-[min(41rem,100%)] gap-6 md:ms-auto">
            <Skeleton className="h-32 w-64 rounded-2xl" />
            <Skeleton className="h-32 w-64 rounded-2xl" />
            <Skeleton className="h-32 w-64 rounded-2xl" />
          </div>
        </section>

        <section id="features">
          <h2 className="sr-only">{t("page-enterprise-features-header")}</h2>
          {/* // TODO: Add mobile ui/swiper */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
            {features.map(({ header, content, Icon }) => (
              <Card
                key={header}
                className="space-y-4 rounded-4xl border bg-background px-6 py-8 shadow-window-box"
              >
                <Icon className="text-7xl text-primary" />
                <h3 className="text-xl">{header}</h3>
                {content.map((p, i) => (
                  <p key={i} className="mb-8 last:mb-0">
                    {p}
                  </p>
                ))}
              </Card>
            ))}
          </div>
        </section>

        <section
          id="ecosystem"
          className="flex w-full flex-col items-center gap-y-12 rounded-t-[4rem] bg-radial-b py-10 md:py-12"
        >
          <h2 className="max-w-prose text-center text-4xl font-black md:text-5xl">
            {t("page-enterprise-ecosystem-header")}
          </h2>
          <p className="max-w-prose text-center">
            {t("page-enterprise-ecosystem-description")}
          </p>
          <div data-label="marquee" className="w-full space-y-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div
            data-label="case-studies"
            className="grid w-full max-w-screen-lg grid-cols-1 gap-4 px-4 md:grid-cols-3 md:px-6"
          >
            <CasesColumn cases={cases.slice(0, 2)} />
            <CasesColumn cases={cases.slice(2, 4)} />
            <CasesColumn cases={cases.slice(4, 6)} />
          </div>
          <ButtonLink href="/enterprise/use" variant="outline">
            {t("page-enterprise-ecosystem-cta")}
          </ButtonLink>
        </section>

        <section
          id="why"
          className="flex w-full flex-col items-center gap-y-12 rounded-4xl border border-accent-c/20 bg-gradient-to-b from-accent-c/5 from-[60%] to-accent-c/15 px-4 py-10 md:py-12 dark:from-accent-c/10 dark:to-accent-c/20 [&>*]:max-w-screen-lg"
        >
          <h2 className="max-w-prose px-6 text-center text-4xl font-black md:px-8 md:text-5xl">
            {t("page-enterprise-why-header")}
          </h2>
          <p className="max-w-prose px-6 text-center md:px-8">
            {t("page-enterprise-why-description")}
          </p>
          <div className="grid w-full grid-cols-1 gap-6 rounded-4xl border bg-background p-6 md:grid-cols-2 md:gap-8 md:p-8">
            {reasons.map(({ header, content }) => (
              <div
                key={header}
                className="grid h-fit grid-cols-[auto,1fr] gap-x-3"
              >
                <Checkmark className="text-2xl text-success" />
                <h3 className="h-fit text-lg font-bold">{header}</h3>
                <p className="col-start-2 text-body-medium">{content}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="team"
          className="flex w-full flex-col items-center gap-y-12 rounded-4xl border border-accent-a/20 bg-gradient-to-b from-accent-a/5 to-accent-a/10 py-10 md:py-12"
        >
          <div className="flex flex-col items-center gap-2">
            <EthGlyph className="size-14" />
            <h2 className="max-w-prose px-6 text-center text-3xl font-bold md:px-8 md:text-4xl">
              {t("page-enterprise-team-header")}
            </h2>
          </div>
          <p className="max-w-prose px-6 text-center md:px-8">
            {t("page-enterprise-team-description")}
          </p>
          {/* // TODO: Confirm email */}
          <ButtonLink href="mailto:enterprise@ethereum.org">
            {t("page-enterprise-hero-cta")}
          </ButtonLink>
        </section>
      </MainArticle>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "page-enterprise" })
  return await getMetadata({
    locale,
    slug: ["enterprise"],
    title: t("page-enterprise-hero-title"),
    description: t("page-enterprise-metadata-description"),
    image: "/images/heroes/developers-hub-hero.jpg",
  })
}

Page.displayName = "EnterprisePage"

export default Page
