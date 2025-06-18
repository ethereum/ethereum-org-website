import dynamic from "next/dynamic"
import { getTranslations } from "next-intl/server"

import type { Lang, StatsBoxMetric } from "@/lib/types"

import ActivityStats from "@/components/ActivityStats"
import { HubHero } from "@/components/Hero"
import Checkmark from "@/components/icons/checkmark.svg"
import Adidas from "@/components/icons/enterprise/adidas.svg"
import Azure from "@/components/icons/enterprise/azure.svg"
import BancoSantander from "@/components/icons/enterprise/banco-santander.svg"
import BASF from "@/components/icons/enterprise/basf.svg"
import BlackRock from "@/components/icons/enterprise/blackrock.svg"
import BMW from "@/components/icons/enterprise/bmw.svg"
import CocaCola from "@/components/icons/enterprise/coca-cola.svg"
import EuropeanInvestmentBank from "@/components/icons/enterprise/european-investment-bank.svg"
import EY from "@/components/icons/enterprise/ey.svg"
import Fox from "@/components/icons/enterprise/fox.svg"
import FranklinTempleton from "@/components/icons/enterprise/franklin-templeton.svg"
import JPMorgan from "@/components/icons/enterprise/jpmorgan.svg"
import Lamborghini from "@/components/icons/enterprise/lamborghini.svg"
import LouisVuitton from "@/components/icons/enterprise/louis-vuitton.svg"
import Mastercard from "@/components/icons/enterprise/mastercard.svg"
import MediLedger from "@/components/icons/enterprise/mediledger.svg"
import Nike from "@/components/icons/enterprise/nike.svg"
import Opera from "@/components/icons/enterprise/opera.svg"
import PayPal from "@/components/icons/enterprise/paypal.svg"
import Samsung from "@/components/icons/enterprise/samsung.svg"
import SAP from "@/components/icons/enterprise/sap.svg"
import Siemens from "@/components/icons/enterprise/siemens.svg"
import Sony from "@/components/icons/enterprise/sony.svg"
import Sothebys from "@/components/icons/enterprise/sothebys.svg"
import Swarm from "@/components/icons/enterprise/swarm.svg"
import TMobile from "@/components/icons/enterprise/tmobile.svg"
import Verizon from "@/components/icons/enterprise/verizon.svg"
import Visa from "@/components/icons/enterprise/visa.svg"
import Walmart from "@/components/icons/enterprise/walmart.svg"
import WFP from "@/components/icons/enterprise/wfp.svg"
import MainArticle from "@/components/MainArticle"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card } from "@/components/ui/card"
import { Skeleton, SkeletonLines } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils/cn"
// import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"

// import { BASE_TIME_UNIT } from "@/lib/constants"
import CasesColumn from "./_components/CasesColumn"
import FeatureCard from "./_components/FeatureCard"
import { ENTERPRISE_MAILTO } from "./constants"
import type { Case, EcosystemPlayer, Feature } from "./types"
import { parseActivity } from "./utils"

import { fetchEthereumStablecoinsMcap } from "@/lib/api/fetchEthereumStablecoinsMcap"
import { fetchEthPrice } from "@/lib/api/fetchEthPrice"
import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
import { fetchTotalEthStaked } from "@/lib/api/fetchTotalEthStaked"
import EthGlyph from "@/public/images/assets/svgs/eth-diamond-rainbow.svg"
import heroImage from "@/public/images/heroes/enterprise-hero-white.png"

const FeaturesSwiper = dynamic(() => import("./_components/FeaturesSwiper"), {
  ssr: false,
  loading: () => (
    <Card className="ms-4 w-[85vw] rounded-4xl border bg-background px-2 py-6">
      <Skeleton className="mx-4 mb-6 size-16 rounded-xl" />
      <Skeleton className="mx-4 -mb-2 h-5 w-[85%]" />
      <SkeletonLines noOfLines={7} />
    </Card>
  ),
})

const CasesSwiper = dynamic(() => import("./_components/CasesSwiper"), {
  ssr: false,
  loading: () => (
    <Card className="ms-4 w-[85vw] space-y-1 rounded-4xl border bg-background px-2 py-6">
      <Skeleton className="mx-4 h-5 w-[85%]" />
      <SkeletonLines noOfLines={4} />
    </Card>
  ),
})

// TODO: Switch back to this for cache and mock-data dev fallback
// const loadData = dataLoader(
//   [
//     ["growThePieData", fetchGrowThePie],
//     ["ethereumStablecoins", fetchEthereumStablecoinsMcap],
//     ["ethPrice", fetchEthPrice],
//     ["totalEthStaked", fetchTotalEthStaked],
//   ],
//   BASE_TIME_UNIT * 1000
// )

const Page = async ({ params }: { params: { locale: Lang } }) => {
  const { locale } = params

  const t = await getTranslations({ locale, namespace: "page-enterprise" })

  // const [{ txCount }, stablecoinMarketCap, ethPrice, totalEthStaked] =
  //   await loadData()
  const { txCount, txCostsMedianUsd } = await fetchGrowThePie()
  const stablecoinMarketCap = await fetchEthereumStablecoinsMcap()
  const ethPrice = await fetchEthPrice()
  const totalEthStaked = await fetchTotalEthStaked()

  const metrics = await parseActivity({
    txCount,
    txCostsMedianUsd,
    stablecoinMarketCap,
    ethPrice,
    totalEthStaked,
  })

  const signals: StatsBoxMetric[] = [
    {
      label: "Years",
      state: { value: "10" }, // TODO: Calculate to future-proof, avoid hard-coding
    },
    {
      label: "Upgrades",
      state: { value: "15" }, // TODO: Calculate from upgrades list
    },
    {
      label: "Downtime",
      state: { value: "0" },
    },
  ]

  const features: Feature[] = [
    {
      header: t("page-enterprise-features-1-header"),
      content: [t("page-enterprise-features-1-content-1")],
      iconName: "ExtraSecurity",
    },
    {
      header: t("page-enterprise-features-2-header"),
      content: [
        t("page-enterprise-features-2-content-1"),
        t("page-enterprise-features-2-content-2"),
      ],
      iconName: "FutureProofing",
    },
    {
      header: t("page-enterprise-features-3-header"),
      content: [
        t("page-enterprise-features-3-content-1"),
        t("page-enterprise-features-3-content-2"),
      ],
      iconName: "BetterUX",
    },
    {
      header: t("page-enterprise-features-4-header"),
      content: [
        t("page-enterprise-features-4-content-1"),
        t("page-enterprise-features-4-content-2"),
      ],
      iconName: "CheaperTransactions",
    },
  ]

  const cases: Case[] = [
    {
      name: "Blackrock",
      content: (
        <Translation
          id="page-enterprise-cases-blackrock-content"
          ns="page-enterprise"
        />
      ),
    },
    {
      name: "MediLedger",
      content: t("page-enterprise-cases-mediledger-content"),
    },
    {
      name: "European Investment Bank",
      content: (
        <Translation
          ns="page-enterprise"
          id="page-enterprise-cases-eib-content"
        />
      ),
    },
    {
      name: "T-Mobile & SK Telecom",
      content: t("page-enterprise-cases-tmobile-content"),
    },
    {
      name: "UN World Food Programme",
      content: (
        <Translation
          id="page-enterprise-cases-unwfp-content"
          ns="page-enterprise"
        />
      ),
    },
    {
      name: "Visa",
      content: (
        <Translation
          id="page-enterprise-cases-visa-content"
          ns="page-enterprise"
        />
      ),
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

  const players: EcosystemPlayer[] = [
    { name: "Adidas", Logo: Adidas, className: "scale-105 origin-bottom" },
    { name: "Azure", Logo: Azure, className: "-translate-y-1" },
    {
      name: "Banco Santander",
      Logo: BancoSantander,
      className: "-translate-y-1",
    },
    { name: "BASF", Logo: BASF, className: "text-[28px]" },
    { name: "BlackRock", Logo: BlackRock, className: "text-[32px]" },
    { name: "BMW", Logo: BMW, className: "scale-105 origin-bottom" },
    { name: "Coca-Cola", Logo: CocaCola },
    {
      name: "European Investment Bank",
      Logo: EuropeanInvestmentBank,
      className: "-translate-y-1.5",
    },
    {
      name: "Ernst & Young Global Limited",
      Logo: EY,
      className: "scale-105 origin-bottom -translate-y-1.5",
    },
    { name: "Franklin Templeton Investments", Logo: FranklinTempleton },
    { name: "Fox", Logo: Fox, className: "text-[32px]" },
    { name: "JP Morgan", Logo: JPMorgan, className: "translate-y-1" },
    {
      name: "Lamborghini",
      Logo: Lamborghini,
      className: "text-[32px] translate-y-0.5",
    },
    { name: "Louis Vuitton", Logo: LouisVuitton },
    { name: "Mastercard", Logo: Mastercard },
    { name: "MediLedger", Logo: MediLedger },
    { name: "Nike", Logo: Nike, className: "translate-y-1.5" },
    { name: "Opera", Logo: Opera },
    { name: "PayPal", Logo: PayPal },
    { name: "Samsung", Logo: Samsung, className: "text-[28px]" },
    { name: "SAP", Logo: SAP },
    { name: "Siemens", Logo: Siemens, className: "text-[28px]" },
    { name: "Sony", Logo: Sony, className: "text-[28px]" },
    { name: "Sotheby's", Logo: Sothebys, className: "translate-y-0.5" },
    { name: "Swarm", Logo: Swarm, className: "-translate-y-1" },
    { name: "T-Mobile", Logo: TMobile },
    {
      name: "Verizon",
      Logo: Verizon,
      className: "text-[32px] -translate-y-px",
    },
    { name: "Visa", Logo: Visa },
    { name: "Walmart", Logo: Walmart },
    { name: "World Food Programme", Logo: WFP },
  ]

  return (
    <div className="mb-12 space-y-12 md:mb-20 md:space-y-20">
      <HubHero
        header={t("page-enterprise-hero-title")}
        description={t("page-enterprise-hero-subtitle")}
        title={t("page-enterprise-hero-breadcrumb")}
        heroImg={heroImage}
        buttons={[
          {
            content: t("page-enterprise-hero-cta"),
            href: ENTERPRISE_MAILTO,
            matomo: {
              eventCategory: "enterprise",
              eventAction: "CTA",
              eventName: "header_cta",
            },
          },
        ]}
        className="[&_[data-label='breadcrumb']]:xl:text-body-light [&_[data-label='hero-content']]:xl:bg-accent-a [&_[data-label='hero-content']]:xl:text-background xl:[&_a:hover]:bg-accent-a-hover xl:[&_a:hover]:!text-background [&_a]:font-bold [&_a]:xl:bg-background [&_a]:xl:text-accent-a [&_img]:opacity-75 [&_img]:dark:invert"
      />

      <MainArticle className="space-y-12 px-4 md:space-y-20 md:px-10">
        <section
          id="activity"
          className="flex flex-col justify-between gap-6 xl:flex-row"
        >
          <div className="max-w-prose space-y-4">
            <h2>{t("page-enterprise-metrics-header")}</h2>
            <p>
              <Translation
                id="page-enterprise-metrics-subtext"
                ns="page-enterprise"
              />
            </p>
          </div>

          <ActivityStats
            metrics={metrics}
            className={cn(
              "w-fit max-w-xl shrink-0 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[auto,auto,auto,auto] xl:grid-cols-2",
              "[&_[data-label='big-number']]:border-none [&_[data-label='big-number']]:p-0",
              "[&_[data-label='big-number']:nth-of-type(1)_[data-label='value']]:text-accent-a",
              "[&_[data-label='big-number']:nth-of-type(2)_[data-label='value']]:text-accent-b",
              "[&_[data-label='big-number']:nth-of-type(3)_[data-label='value']]:text-accent-c",
              "[&_[data-label='big-number']:nth-of-type(4)_[data-label='value']]:text-primary"
            )}
          />
        </section>

        <section id="features">
          <h2 className="sr-only">{t("page-enterprise-features-header")}</h2>

          <div className="-mx-4 -my-6 flex py-6 md:hidden">
            <FeaturesSwiper features={features} />
          </div>

          <div className="grid grid-cols-1 gap-2 max-md:hidden sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard
                key={feature.header}
                feature={feature}
                className="h-full"
              />
            ))}
          </div>
        </section>

        <section
          id="ecosystem"
          className="flex w-full flex-col items-center gap-y-12 rounded-t-4xl bg-radial-b px-4 py-10 md:rounded-t-[4rem] md:py-12"
        >
          <div className="max-w-prose space-y-4">
            <h2 className="max-w-prose text-center text-4xl font-black md:text-5xl">
              {t("page-enterprise-ecosystem-header")}
            </h2>
            <p className="max-w-prose text-center">
              {t("page-enterprise-ecosystem-description")}
            </p>
          </div>

          {/* A11y list of companies for screen readers */}
          <div className="sr-only">
            <h3>{t("page-enterprise-ecosystem-companies")}</h3>
            <ul>
              {players.map(({ name }) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          <div
            data-label="marquee"
            dir="ltr"
            className="w-full text-body opacity-40 grayscale"
            style={{
              mask: `linear-gradient(to right, transparent 0, white 10%, white 90%, transparent 100%)`,
            }}
          >
            {Array.from({ length: 3 }).map((_, row) => (
              <div
                data-label="marquee-row"
                key={row}
                className="flex max-w-full flex-nowrap overflow-hidden py-4"
              >
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex min-w-fit animate-scroll-left-240 flex-nowrap items-center"
                  >
                    {players.map(({ name, Logo, className }) => (
                      <div
                        key={name}
                        className={cn(
                          "flex size-fit justify-center px-6 text-[2.5rem] md:px-8",
                          row === 1 && "-translate-x-[90rem]",
                          row === 2 && "-translate-x-[180rem]",
                          className
                        )}
                      >
                        <Logo aria-hidden />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div
            className="w-screen"
            style={{
              mask: `linear-gradient(to right, transparent 1rem, white 2rem, white calc(100% - 2rem), transparent calc(100% - 1rem)`,
            }}
          >
            <div className="-my-6 flex px-4 py-6 md:hidden">
              <CasesSwiper cases={cases} />
            </div>
          </div>

          <div
            data-label="case-studies"
            className="grid w-full max-w-screen-lg grid-cols-1 gap-4 px-4 max-md:hidden md:grid-cols-3 md:px-6"
          >
            <CasesColumn cases={cases.slice(0, 2)} />
            <CasesColumn cases={cases.slice(2, 4)} />
            <CasesColumn cases={cases.slice(4, 6)} />
          </div>
          <ButtonLink href="/enterprise/use-cases" variant="outline">
            {t("page-enterprise-ecosystem-cta")}
          </ButtonLink>
        </section>

        <section
          id="why"
          className="flex w-full flex-col items-center gap-y-12 rounded-4xl border border-accent-c/20 bg-gradient-to-b from-accent-c/5 from-[60%] to-accent-c/15 px-4 py-10 md:py-12 dark:from-accent-c/10 dark:to-accent-c/20 [&>*]:max-w-screen-lg"
        >
          <div className="space-y-4">
            <h2 className="px-6 text-center text-4xl font-black md:px-8 md:text-5xl">
              {t("page-enterprise-why-header")}
            </h2>
            <p className="px-6 text-center md:px-8">
              {t("page-enterprise-why-description")}
            </p>
          </div>

          <ActivityStats
            data-label="signalling-metrics"
            metrics={signals}
            className={cn(
              "max-sm:gap-8 max-sm:px-4",
              "flex w-fit max-w-xl shrink-0 flex-wrap gap-12 text-center",
              "[&_[data-label='big-number']]:border-none [&_[data-label='big-number']]:p-0",
              "[&_[data-label='big-number']:nth-of-type(1)_[data-label='value']]:text-accent-a",
              "[&_[data-label='big-number']:nth-of-type(2)_[data-label='value']]:text-accent-b",
              "[&_[data-label='big-number']:nth-of-type(3)_[data-label='value']]:text-accent-c"
            )}
          />

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
          <ButtonLink
            href={ENTERPRISE_MAILTO}
            customEventOptions={{
              eventCategory: "enterprise",
              eventAction: "CTA",
              eventName: "bottom_mail",
            }}
          >
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
    image: "/images/heroes/enterprise-hero-white.png",
  })
}

Page.displayName = "EnterprisePage"

export default Page
