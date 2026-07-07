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
import { Grid } from "@/components/ui/grid"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import WindowBox from "@/components/WindowBox"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import FooterCTA from "../events/_components/footer-cta"

import { sections } from "./data"
import PageJsonLD from "./page-jsonld"

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
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

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

      <main className="px-page pb-page max-lg:pt-page-2x">
        <MainArticle className="flow">
          {/* Decentralization alert */}
          <Alert className="max-w-3xl">
            <AlertIcon>
              <Shield />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>{t("page-community-support-alert-title")}</AlertTitle>
              <AlertDescription className="text-sm">
                {t("page-community-support-alert-description")}
              </AlertDescription>
            </AlertContent>
          </Alert>

          {/* Section 1: Get help */}
          <Section id="get-help">
            <h2>{t("page-community-support-get-help")}</h2>
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
                    <div className="*:px-6 *:py-4 [&>a]:block [&>a]:border-t [&>a]:no-underline">
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
          <Section id="learn">
            <h2>{t("page-community-support-learn")}</h2>
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
                    <div className="*:px-6 *:py-4 [&>a]:block [&>a]:border-t [&>a]:no-underline">
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
          <FooterCTA
            id="still-need-help"
            header={t("page-community-support-still-need-help")}
            paragraph={t("page-community-support-still-need-help-description")}
            href="https://discord.gg/ethereum-org"
            customEventOptions={{
              eventCategory: EVENT_CATEGORY,
              eventAction: "Still need help?",
              eventName: "ethereum.org Discord",
            }}
            ctaLabel={t("page-community-support-discord")}
          />
        </MainArticle>

        <ContentFeedback />
      </main>
    </>
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
