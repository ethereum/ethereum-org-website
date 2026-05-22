import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import { ContentHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { Tag } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import { reports } from "./data"
import ReportsPageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/hackathon_transparent.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-reports")

  const { contributors } = await getAppPageContributorInfo(
    "reports",
    locale as Lang
  )

  return (
    <>
      <ReportsPageJsonLD locale={locale} contributors={contributors} />

      <div>
        <ContentHero
          breadcrumbs={{ slug: "research/reports", startDepth: 1 }}
          heroImg={heroImg}
          title={t("page-reports-title")}
          description={t("page-reports-description")}
        />
        <MainArticle className="relative space-y-16 px-4 py-16 md:space-y-20 md:px-10 md:py-20">
          <Section id="reports" className="space-y-12">
            <div className="max-w-3xl space-y-4">
              <h2>{t("page-reports-heading")}</h2>
              <p>{t("page-reports-intro")}</p>
            </div>

            <div className="grid grid-cols-fill-4 gap-4">
              {reports.map(
                ({
                  slug,
                  title,
                  publisher,
                  date,
                  href,
                  internal,
                  imgSrc,
                  fileSizeBytes,
                }) => (
                  <Card
                    key={slug}
                    className="row-span-3 grid grid-rows-subgrid gap-y-8 bg-background-highlight p-8 max-md:p-4"
                  >
                    <CardBanner background="none" fit="contain">
                      <Image
                        src={imgSrc}
                        alt=""
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 384px"
                      />
                    </CardBanner>
                    <CardContent className="space-y-4 p-0">
                      <Tag
                        status="warning"
                        size="small"
                        className="w-fit rounded-[4px] px-1 py-px font-bold normal-case"
                      >
                        {date}
                      </Tag>
                      <CardTitle variant="bold">{title}</CardTitle>
                      <CardParagraph variant="light">{publisher}</CardParagraph>
                      {fileSizeBytes ? (
                        <CardParagraph variant="light" size="sm">
                          {t("page-reports-pdf-size", {
                            size: (fileSizeBytes / 1048576).toFixed(1),
                          })}
                        </CardParagraph>
                      ) : null}
                    </CardContent>
                    <ButtonLink href={href} variant="outline">
                      {internal
                        ? t("page-reports-cta-view")
                        : t("page-reports-cta-read")}
                    </ButtonLink>
                  </Card>
                )
              )}
            </div>
          </Section>

          <Section id="suggest" className="max-w-3xl space-y-4">
            <h2>{t("page-reports-suggest-heading")}</h2>
            <p>{t("page-reports-suggest-body")}</p>
            <ButtonLink
              href="https://github.com/ethereum/ethereum-org-website/issues/new/choose"
              variant="outline"
            >
              {t("page-reports-suggest-cta")}
            </ButtonLink>
          </Section>
        </MainArticle>
      </div>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-reports")

  return await getMetadata({
    locale,
    slug: ["reports"],
    title: t("page-reports-metadata-title"),
    description: t("page-reports-metadata-description"),
    image: "/images/hackathon_transparent.png",
  })
}

export default Page
