import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { Lang } from "@/lib/types"

import { HubHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import CollectiblesPage from "./_components/Collectibles/lazy"
import { COLLECTIBLES_BASE_URL } from "./constants"
import type { Badge, Stats } from "./types"

import communityHeroImg from "@/public/images/heroes/community-hero.png"

// API endpoints
const BADGES_API = `${COLLECTIBLES_BASE_URL}/api/badges`
const STATS_API = `${COLLECTIBLES_BASE_URL}/api/stats`

// Data fetching
async function fetchBadges() {
  const res = await fetch(BADGES_API)
  if (!res.ok) throw new Error("Failed to fetch badges")
  return res.json()
}
async function fetchStats() {
  const res = await fetch(STATS_API)
  if (!res.ok) throw new Error("Failed to fetch stats")
  return res.json()
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Lang }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "page-collectibles" })
  setRequestLocale(locale)

  // Fetch data
  const [badges, stats]: [Badge[], Stats] = await Promise.all([
    fetchBadges(),
    fetchStats(),
  ])

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/collectibles/")
  const pickedMessages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={pickedMessages}>
      <MainArticle className="space-y-12 md:space-y-20">
        <HubHero
          heroImg={communityHeroImg}
          title={t("page-collectibles-hero-title")}
          header={t("page-collectibles-hero-header")}
          description={t("page-collectibles-hero-description")}
        />
        <Section
          id="stats"
          className="flex flex-col gap-x-6 gap-y-4 px-4 xl:flex-row xl:px-12"
        >
          <div className="flex-[2] space-y-4 rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/10 to-primary/5 px-8 py-12 text-lg dark:from-primary/20 dark:to-primary/10">
            <h2 className="text-3xl md:text-4xl">
              {t("page-collectibles-improve-title")}
            </h2>
            <p>
              {t.rich("page-collectibles-improve-desc-1", {
                strong: (chunks) => <span className="font-bold">{chunks}</span>,
              })}
            </p>
            <p>
              {t.rich("page-collectibles-improve-desc-2", {
                strong: (chunks) => <span className="font-bold">{chunks}</span>,
                a: (chunks) => (
                  <Link href="https://x.com/Xeift1/status/1896200245949968828">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>

          <div className="grid min-w-fit grid-cols-2 place-items-center gap-4 md:grid-cols-3 md:justify-start xl:grid-cols-2">
            {/* Minted */}
            <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-accent-a/20 bg-gradient-to-b from-accent-a/5 to-accent-a/15 px-4 py-8 text-accent-a max-md:col-span-2 xl:col-span-2 xl:p-6">
              <div className="text-4xl font-bold md:text-6xl">
                {stats.collectorsCount?.toLocaleString(locale) ?? "-"}
              </div>
              <div className="text-center font-bold">
                {t("page-collectibles-stats-minted")}
              </div>
            </div>
            {/* Collectors */}
            <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-accent-b/20 bg-gradient-to-b from-accent-b/5 to-accent-b/15 p-6 text-accent-b">
              <div className="text-4xl font-bold md:text-6xl">
                {stats.uniqueAddressesCount?.toLocaleString(locale) ?? "-"}
              </div>
              <div className="text-center font-bold">
                {t("page-collectibles-stats-collectors")}
              </div>
            </div>
            {/* Unique Badges */}
            <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-accent-c/20 bg-gradient-to-b from-accent-c/5 to-accent-c/15 p-6 text-accent-c">
              <div className="text-4xl font-bold md:text-6xl">
                {stats.collectiblesCount?.toLocaleString(locale) ?? "-"}
              </div>
              <div className="text-center font-bold">
                {t("page-collectibles-stats-unique-badges")}
              </div>
            </div>
          </div>
        </Section>

        <Section id="main" className="px-4 xl:px-12">
          <CollectiblesPage badges={badges} />
        </Section>
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "page-collectibles" })
  return await getMetadata({
    locale,
    slug: ["collectibles"],
    title: t("page-collectibles-hero-header"),
    description: t("page-collectibles-hero-description"),
    image: "/images/heroes/community-hero.png",
  })
}
