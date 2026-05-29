import { setRequestLocale } from "next-intl/server"

import type { Lang } from "@/lib/types"

import ContentHero from "@/components/Hero/ContentHero"
import MainArticle from "@/components/MainArticle"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import { Leaderboard } from "./_components/Leaderboard"
import TranslatathonLeaderboardJsonLD from "./page-jsonld"

import heroImg from "@/public/images/heroes/translatathon-hero.png"

const Page = async (props: { params: Promise<{ locale: string }> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const { contributors } = await getAppPageContributorInfo(
    "contributing/translation-program/translatathon/leaderboard",
    locale as Lang
  )

  return (
    <>
      <TranslatathonLeaderboardJsonLD
        locale={locale}
        contributors={contributors}
      />
      <ContentHero
        breadcrumbs={{
          slug: "/contributing/translation-program/translatathon/leaderboard",
          startDepth: 1,
        }}
        heroImg={heroImg}
        title="2025 Ethereum.org Translatathon"
        description="Final leaderboard from the 2025 Ethereum.org Translatathon."
      />

      <MainArticle className="mx-auto mb-16 w-full max-w-screen-xl px-8 pb-8 lg:pt-16">
        <div className="flex flex-col gap-4">
          <h2 id="leaderboard">Leaderboard</h2>
          <p>
            This page preserves the historical record of the 2025 ethereum.org
            Translatathon leaderboard.
          </p>
          <Leaderboard />
        </div>
      </MainArticle>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  return await getMetadata({
    locale,
    slug: ["translatathon"],
    title: "2025 Ethereum.org Translatathon",
    description: "2025 Ethereum.org Translatathon",
  })
}

export default Page
