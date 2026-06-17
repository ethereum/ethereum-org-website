import { pick } from "lodash"
import type { Metadata } from "next"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Story } from "@/lib/types"

import { PageHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Section } from "@/components/ui/section"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getVideos } from "@/lib/utils/videos"

import tenYearStories from "@/data/tenYearStories"

import { parseStoryDates } from "../10years/_components/utils"
import { getVideosByCategory } from "../videos/utils"

import CommunityStories from "./_components/CommunityStories"
import DiscoverStories from "./_components/DiscoverStories"
import MoreStories from "./_components/MoreStories"

import { routing } from "@/i18n/routing"
import storiesHero from "@/public/images/stories/hero.png"

const SHARE_STORY_URL = "https://ethereumstory.paperform.co/"

const StoriesPage = async (props: { params: Promise<{ locale: string }> }) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  const t = await getTranslations("page-stories")

  const videos = await getVideos(locale)
  const storyVideos = getVideosByCategory(videos, ["community-stories"])
  const communityStories: Story[] = parseStoryDates(tenYearStories, locale)

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/stories/")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="mx-auto w-full max-w-screen-2xl space-y-16 pb-16 md:space-y-24">
        <PageHero
          variant="no-divider"
          breadcrumbs={{ slug: "stories" }}
          title={t("page-stories-hero-title")}
          description={t("page-stories-hero-description")}
          heroImg={storiesHero}
          buttons={[
            <ButtonLink key="share" href={SHARE_STORY_URL}>
              {t("page-stories-hero-cta")}
            </ButtonLink>,
          ]}
        />

        <Section id="discover" className="px-4 md:px-8">
          <DiscoverStories />
        </Section>

        <Section id="more-stories" className="space-y-8 px-4 md:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
            <h2>{t("page-stories-more-title")}</h2>
            <p className="text-lg text-body-medium">
              {t("page-stories-more-subtitle")}
            </p>
          </div>
          <MoreStories videos={storyVideos} />
        </Section>

        <Section id="community-stories" className="space-y-8 px-4 md:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
            <h2>{t("page-stories-community-title")}</h2>
            <p className="text-lg text-body-medium">
              {t("page-stories-community-subtitle")}
            </p>
          </div>
          <CommunityStories stories={communityStories} />
        </Section>

        <Section id="share" className="px-4 md:px-8">
          <div className="flex flex-col items-center gap-12 rounded-4xl bg-radial-a px-4 pt-20 pb-8 md:px-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <h2>{t("page-stories-banner-title")}</h2>
              <p className="max-w-[42rem] text-lg text-body-medium lg:text-2xl">
                {t("page-stories-banner-description")}
              </p>
            </div>
            <ButtonLink
              href={SHARE_STORY_URL}
              customEventOptions={{
                eventCategory: "community-stories",
                eventAction: "click",
                eventName: "share your story",
              }}
            >
              {t("page-stories-banner-cta")}
            </ButtonLink>
          </div>
        </Section>
      </MainArticle>
    </I18nProvider>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await props.params

  const t = await getTranslations("page-stories")

  return await getMetadata({
    locale,
    slug: ["stories"],
    title: t("page-stories-meta-title"),
    description: t("page-stories-meta-description"),
  })
}

export default StoriesPage
