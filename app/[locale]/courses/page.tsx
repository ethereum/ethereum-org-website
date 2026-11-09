import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import CourseArt from "@/components/Courses/art/course-art"
import CourseProgress from "@/components/Courses/course-progress"
import {
  ProgressChips,
  ProgressNote,
} from "@/components/Courses/progress-stats"
import { chunkyButton, courseThemeStyle } from "@/components/Courses/theme"
import HubHero from "@/components/Hero/HubHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { courseHref, COURSES } from "@/data/courses"

import heroImg from "@/public/images/courses/learning-path-garden-with-trophy.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-courses")

  const allMessages = await getMessages({ locale })
  const messages = pick(allMessages, getRequiredNamespacesForPage("/courses"))

  return (
    <>
      <HubHero
        heroImg={heroImg}
        breadcrumbs={{ slug: "courses" }}
        header={t("page-courses-hero-title")}
        description={t("page-courses-hero-description")}
      />

      <I18nProvider locale={locale} messages={messages}>
        <main className="px-page pt-space-3x pb-page">
          <MainArticle className="flow">
            <Section id="courses">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="m-0">{t("page-courses-catalog-title")}</h2>
                <ProgressChips />
              </div>
              <ul className="ms-0 grid list-none gap-6 md:grid-cols-2 xl:grid-cols-3">
                {COURSES.map(({ id, level, theme, art, lessons }) => (
                  <li key={id} className="m-0" style={courseThemeStyle(theme)}>
                    <Card
                      href={courseHref(id)}
                      variant="nested"
                      border
                      className="h-full"
                    >
                      <CardHeader>
                        <CardBanner
                          background="none"
                          size="full"
                          className="relative bg-(--course-soft) px-10 pt-12 pb-4"
                        >
                          <span className="absolute start-3 top-3 rounded-full bg-background px-3 py-1 text-sm font-bold tracking-wide text-(--course-strong) uppercase dark:text-(--course-bright)">
                            {t(`page-courses-level-${level}`)} ·{" "}
                            {t("page-courses-lesson-count", {
                              count: lessons.length,
                            })}
                          </span>
                          <CourseArt
                            id={art}
                            className="mx-auto max-w-48 transition-transform duration-300 motion-safe:group-hover/link:scale-105"
                          />
                        </CardBanner>
                      </CardHeader>
                      <CardContent>
                        <CardTitle>{t(`${id}-title`)}</CardTitle>
                        <CardParagraph>{t(`${id}-description`)}</CardParagraph>
                        <CourseProgress
                          courseId={id}
                          lessonIds={lessons.map((lesson) => lesson.id)}
                        />
                      </CardContent>
                      <CardFooter buttons="full">
                        <span
                          className={cn(
                            chunkyButton,
                            "inline-flex items-center justify-center"
                          )}
                        >
                          {t("page-courses-hub-begin")}
                        </span>
                      </CardFooter>
                    </Card>
                  </li>
                ))}
              </ul>
            </Section>

            <ProgressNote />
          </MainArticle>
        </main>
      </I18nProvider>
    </>
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
    slug: ["courses"],
    title: `${t("page-courses-meta-title")} | ethereum.org`,
    description: t("page-courses-meta-description"),
    image: "/images/courses/learning-path-garden-with-trophy.png",
    // Proof of concept: keep out of search until the feature ships
    noIndex: true,
  })
}

export default Page
