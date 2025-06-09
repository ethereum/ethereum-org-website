import { getTranslations } from "next-intl/server"

import type { Lang } from "@/lib/types"

import { HubHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"

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
        className="[&>div>div>h1]:xl:text-body-light [&_[data-label='hero-content']]:xl:bg-accent-a [&_[data-label='hero-content']]:xl:text-background [&_a]:font-bold [&_a]:xl:bg-background [&_a]:xl:text-accent-a [&_img]:dark:invert"
      />

      <MainArticle className="space-y-12 md:space-y-20">
        <section id="metrics" className="">
          metrics section
        </section>
        <section id="highlights" className="">
          highlights section
        </section>
        <section id="ecosystem" className="">
          ecosystem section
        </section>
        <section id="why" className="">
          why section
        </section>
        <section id="team" className="">
          team section
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
