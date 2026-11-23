import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import ProfileEmptyNotice from "@/components/Courses/profile-empty-notice"
import ProfileView from "@/components/Courses/profile-view"
import ProgressOutdated from "@/components/Courses/progress-outdated"
import I18nProvider from "@/components/I18nProvider"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { COURSES_OG_IMAGE, PROFILE_SEGMENT, TRACKS } from "@/data/courses"

import { toCatalog } from "@/lib/courses/catalog"
import { pickCourseMessages } from "@/lib/courses/messages"

export const revalidate = false

const Page = async (props: { params: Promise<PageParams> }) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-courses")

  const allMessages = await getMessages({ locale })
  const messages = pickCourseMessages(
    pick(
      allMessages,
      getRequiredNamespacesForPage(`/courses/${PROFILE_SEGMENT}`)
    ),
    { page: "profile" }
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <ProfileView
        breadcrumbs={
          <Breadcrumbs
            slug={`/courses/${PROFILE_SEGMENT}`}
            label={t("page-courses-profile-breadcrumb")}
          />
        }
        notice={<ProfileEmptyNotice />}
        tracks={toCatalog(TRACKS, { steps: true })}
      />
      <ProgressOutdated />
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
    title: t("page-courses-meta-profile-title"),
    description: t("page-courses-profile-meta-description"),
    image: COURSES_OG_IMAGE,
    // Shows only progress saved in this browser, so nothing to index
    noIndex: true,
  })
}

export default Page
