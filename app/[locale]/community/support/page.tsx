import { Shield } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import FeedbackCard from "@/components/FeedbackCard"
import { SimpleHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import WindowBox from "@/components/WindowBox"

import { getMetadata } from "@/lib/utils/metadata"

const EVENT_CATEGORY = "Support"

export default async function Page(props: { params: Promise<PageParams> }) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-community-support")

  return (
    <div>
      {/* Hero */}
      <SimpleHero
        breadcrumbs={<Breadcrumbs slug="community/support" startDepth={1} />}
        title={t("page-community-support-hero-title")}
        subtitle={
          <div className="text-body-medium space-y-[1lh] text-base">
            <p className="text-lg">
              {t("page-community-support-hero-subtitle-1")}
            </p>
            <p>
              {t.rich("page-community-support-hero-subtitle-2", {
                a: (chunks) => <Link href="/">{chunks}</Link>,
              })}
            </p>
          </div>
        }
      />

      <MainArticle className="space-y-16 px-4 py-16 md:px-10 md:py-20">
        {/* Decentralization alert */}
        <Alert className="text-body-medium max-w-3xl">
          <AlertIcon>
            <Shield />
          </AlertIcon>
          <AlertContent>
            <AlertTitle className="text-body">
              {t("page-community-support-alert-title")}
            </AlertTitle>
            <AlertDescription className="text-sm">
              {t("page-community-support-alert-description")}
            </AlertDescription>
          </AlertContent>
        </Alert>

        {/* Section 1: Get help */}
        <Section id="get-help" className="space-y-6">
          <h2 className="text-2xl font-bold lg:text-3xl">
            {t("page-community-support-get-help")}
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {sections.getHelp.map(
              ({
                titleKey,
                Svg,
                colorClass,
                descriptionKey,
                eventAction,
                items,
              }) => (
            <WindowBox
key={titleKey}
              title={<h3>{t(titleKey)}</h3>}
              svg={<Svg className={cn(colorClass, "size-8")} />}
              className="h-fit"
            >
              <div className="[&>*]:px-6 [&>*]:py-4 [&>a]:block [&>a]:border-t [&>a]:no-underline">
                <p className="text-body-medium text-sm leading-relaxed">
                  {t(descriptionKey)}
                </p>
{items.map(({ labelKey, href, eventName }) => (
                <Link
key={href}
                  className="hover:bg-background-highlight"
                  href={href}
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction,
                    eventName,
                  }}
                >
                  {t(labelKey)}
                </Link>
                ))}
              </div>
            </WindowBox>
)
            )}
          </div>
        </Section>

        {/* Section 2: Learn */}
        <Section id="learn" className="space-y-6">
          <h2 className="text-2xl font-bold lg:text-3xl">
            {t("page-community-support-learn")}
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {sections.learn.map(
              ({
                titleKey,
                Svg,
                colorClass,
                descriptionKey,
                eventAction,
                items,
              }) => (
            <WindowBox
key={titleKey}
              title={<h3>{t(titleKey)}</h3>}
              svg={<Svg className={cn(colorClass, "size-8")} />}
              className="h-fit"
            >
              <div className="[&>*]:px-6 [&>*]:py-4 [&>a]:block [&>a]:border-t [&>a]:no-underline">
                <p className="text-body-medium text-sm leading-relaxed">
                  {t(descriptionKey)}
                </p>
{items.map(({ labelKey, href, eventName }) => (
                <Link
key={href}
                  className="hover:bg-background-highlight"
                  href={href}
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction,
                    eventName,
                  }}
                >
                  {t(labelKey)}
                </Link>
                ))}
              </div>
            </WindowBox>
)
            )}
          </div>
        </Section>

        {/* Still need help? */}
        <Section
          id="still-need-help"
          className="border-accent-a/20 from-accent-a/5 to-accent-a/10 dark:from-accent-a/10 dark:to-accent-a/20 space-y-8 rounded-4xl border bg-linear-to-b px-8 py-16 lg:px-16"
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">
              {t("page-community-support-still-need-help")}
            </h2>
            <p className="text-body-medium max-w-lg">
              {t("page-community-support-still-need-help-description")}
            </p>
            <ButtonLink
              href="https://discord.gg/ethereum-org"
              customEventOptions={{
                eventCategory: EVENT_CATEGORY,
                eventAction: "Still need help?",
                eventName: "ethereum.org Discord",
              }}
            >
              {t("page-community-support-discord")}
            </ButtonLink>
          </div>
        </Section>

        <FeedbackCard />
      </MainArticle>
    </div>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-community-support")

  return await getMetadata({
    locale,
    slug: ["community", "support"],
    title: t("page-community-support-hero-title"),
    description: t("page-community-support-meta-description"),
  })
}
