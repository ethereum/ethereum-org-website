import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import ProfileEmptyNotice from "@/components/Courses/profile-empty-notice"
import ProfileView from "@/components/Courses/profile-view"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { PROFILE_SEGMENT } from "@/data/courses"

import heroImg from "@/public/images/courses/learner-trophy-island.png"

export const revalidate = false

const Page = async (props: { params: Promise<PageParams> }) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-courses")

  const allMessages = await getMessages({ locale })
  const messages = pick(
    allMessages,
    getRequiredNamespacesForPage(`/courses/${PROFILE_SEGMENT}`)
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <PageHero
        breadcrumbs={{
          slug: `/courses/${PROFILE_SEGMENT}`,
          label: t("page-courses-profile-breadcrumb"),
        }}
        heroImg={heroImg}
        title={t("page-courses-profile-title")}
        description={t("page-courses-profile-description")}
      />
      <main className="px-page pt-space-3x pb-page">
        <MainArticle>
          <ProfileEmptyNotice />
          <ProfileView />
        </MainArticle>
      </main>
    </I18nProvider>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-courses")

  return await getMetadata({
    locale,
    slug: ["courses", PROFILE_SEGMENT],
    title: `${t("page-courses-profile-link")} | ethereum.org`,
    description: t("page-courses-profile-meta-description"),
    image: "/images/courses/learning-path-garden-with-trophy.png",
    noIndex: true,
  })
}

export default Page
