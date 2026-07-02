import { Shield } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import PageHero from "@/components/Hero/PageHero"
import MainArticle from "@/components/MainArticle"
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Grid } from "@/components/ui/grid"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import WindowBox from "@/components/WindowBox"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import { sections } from "./data"
import SupportJsonLD from "./page-jsonld"

const EVENT_CATEGORY = "Support"

export default async function Page(props: { params: Promise<PageParams> }) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-community-support")

  const { contributors } = await getAppPageContributorInfo(
    "community/support",
    locale as Lang
  )

  return (
    <div>
      <SupportJsonLD locale={locale} contributors={contributors} />
      {/* Hero */}
      <PageHero
        breadcrumbs={{ slug: "/community/support", startDepth: 1 }}
        title={t("page-community-support-hero-title")}
        description={
          <>
            <p>{t("page-community-support-hero-subtitle-1")}</p>
            <p className="text-base">
              {t.rich("page-community-support-hero-subtitle-2", {
                a: (chunks) => <Link href="/">{chunks}</Link>,
              })}
            </p>
          </>
        }
        variant="no-divider"
      />

      <MainArticle className="space-y-16 px-4 py-16 md:px-10 md:py-20">
        {/* Decentralization alert */}
        <Alert className="max-w-3xl text-body-medium">
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
          <h2 className="text-2xl lg:text-3xl">
            {t("page-community-support-get-help")}
          </h2>
          <Grid columns={2} size="wider">
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
                    <p className="text-sm leading-relaxed text-body-medium">
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
          </Grid>
        </Section>

        {/* Section 2: Learn */}
        <Section id="learn" className="space-y-6">
          <h2 className="text-2xl lg:text-3xl">
            {t("page-community-support-learn")}
          </h2>
          <Grid columns={2} size="wider">
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
                    <p className="text-sm leading-relaxed text-body-medium">
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
          </Grid>
        </Section>

        {/* Still need help? */}
        <Section
          id="still-need-help"
          className="space-y-8 rounded-4xl border border-accent-a/20 bg-tint-accent-a px-8 py-16 lg:px-16"
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl lg:text-4xl">
              {t("page-community-support-still-need-help")}
            </h2>
            <p className="max-w-lg text-body-medium">
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

        <ContentFeedback />
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
