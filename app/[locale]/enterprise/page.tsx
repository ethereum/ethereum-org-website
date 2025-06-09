import { getTranslations } from "next-intl/server"

import type { Lang } from "@/lib/types"

import { HubHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Skeleton } from "@/components/ui/skeleton"

import { getMetadata } from "@/lib/utils/metadata"

import EthGlyph from "@/public/images/assets/svgs/eth-diamond-rainbow.svg"
import heroImage from "@/public/images/heroes/enterprise-hero-transparent.png"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "page-enterprise" })

  return (
    <div className="space-y-12 md:space-y-20">
      <HubHero
        header={t("page-enterprise-hero-title")}
        description={t("page-enterprise-hero-subtitle")}
        title={t("page-enterprise-hero-breadcrumb")}
        heroImg={heroImage}
        buttons={[
          {
            content: t("page-enterprise-hero-cta"),
            href: "mailto:enterprise@ethereum.org", // TODO: Confirm
            matomo: {
              eventCategory: "enterprise hero buttons",
              eventAction: "click",
              eventName: "get in touch",
            },
          },
        ]}
        className="[&_[data-label='breadcrumb']]:xl:text-body-light [&_[data-label='hero-content']]:xl:bg-accent-a [&_[data-label='hero-content']]:xl:text-background [&_a]:font-bold [&_a]:xl:bg-background [&_a]:xl:text-accent-a [&_img]:dark:invert"
      />

      <MainArticle className="space-y-12 px-4 md:space-y-20 md:px-10">
        <section id="metrics" className="flex flex-col gap-6 md:flex-row">
          <div className="max-w-prose">
            <h2>{t("page-enterprise-metrics-header")}</h2>
            <p>
              Ethereum is the leading platform for <strong>issuing</strong>,{" "}
              <strong>managing</strong>, and{" "}
              <strong>settling digital assets</strong>. From tokenized money and
              financial instruments to real-world assets and emerging markets,
              Ethereum provides a secure, neutral foundation for the digital
              economy.
            </p>
          </div>
          <div className="TODO:METRICS flex max-w-[min(41rem,100%)] gap-6 md:ms-auto">
            <Skeleton className="h-32 w-64 rounded-2xl" />
            <Skeleton className="h-32 w-64 rounded-2xl" />
            <Skeleton className="h-32 w-64 rounded-2xl" />
          </div>
        </section>

        <section id="highlights" className="">
          <h2 className="sr-only">{t("page-enterprise-highlights-header")}</h2>
          <div className="flex flex-nowrap gap-2 md:gap-6">
            <Skeleton className="h-[440px] w-[clamp(min(300px,100%),25%,500px)] rounded-2xl border bg-background px-6 py-8 shadow-window-box" />
            <Skeleton className="h-[440px] w-[clamp(min(300px,100%),25%,500px)] rounded-2xl border bg-background px-6 py-8 shadow-window-box" />
            <Skeleton className="h-[440px] w-[clamp(min(300px,100%),25%,500px)] rounded-2xl border bg-background px-6 py-8 shadow-window-box" />
            <Skeleton className="h-[440px] w-[clamp(min(300px,100%),25%,500px)] rounded-2xl border bg-background px-6 py-8 shadow-window-box" />
          </div>
        </section>

        <section
          id="ecosystem"
          className="flex w-full flex-col items-center gap-y-12 rounded-t-[4rem] bg-radial-b py-10 md:py-12"
        >
          <h2 className="max-w-prose text-center text-4xl font-black md:text-5xl">
            {t("page-enterprise-ecosystem-header")}
          </h2>
          <p className="max-w-prose text-center">
            {t("page-enterprise-ecosystem-description")}
          </p>
          <div data-label="marquee" className="w-full space-y-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div
            data-label="case-studies"
            className="grid w-full max-w-screen-lg grid-cols-1 gap-4 md:grid-cols-3"
          >
            <div className="flex w-full flex-col gap-4">
              <Skeleton className="h-40 w-full rounded-2xl" />
              <Skeleton className="h-32 w-full rounded-2xl" />
            </div>
            <div className="flex w-full flex-col gap-4">
              <Skeleton className="h-52 w-full rounded-2xl" />
              <Skeleton className="h-40 w-full rounded-2xl" />
            </div>
            <div className="flex w-full flex-col gap-4">
              <Skeleton className="h-40 w-full rounded-2xl" />
              <Skeleton className="h-32 w-full rounded-2xl" />
            </div>
          </div>
          <ButtonLink href="/enterprise/use" variant="outline">
            {t("page-enterprise-ecosystem-cta")}
          </ButtonLink>
        </section>

        <section
          id="why"
          className="flex w-full flex-col items-center gap-y-12 rounded-4xl border border-accent-c/20 bg-gradient-to-b from-accent-c/5 from-[60%] to-accent-c/15 px-4 py-10 md:py-12 dark:from-accent-c/10 dark:to-accent-c/20 [&>*]:max-w-screen-lg"
        >
          <h2 className="max-w-prose px-6 text-center text-4xl font-black md:px-8 md:text-5xl">
            {t("page-enterprise-why-header")}
          </h2>
          <p className="max-w-prose px-6 text-center md:px-8">
            {t("page-enterprise-why-description")}
          </p>
          <div className="grid w-full grid-cols-1 gap-6 rounded-4xl border bg-background p-6 md:grid-cols-2 md:gap-8 md:p-8">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
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
          {/* // TODO: Confirm email */}
          <ButtonLink href="mailto:enterprise@ethereum.org">
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
    image: "/images/heroes/developers-hub-hero.jpg",
  })
}

Page.displayName = "EnterprisePage"

export default Page
