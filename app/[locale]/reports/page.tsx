import { getTranslations } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import PageHero from "@/components/Hero/PageHero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Flex } from "@/components/ui/flex"
import { Grid } from "@/components/ui/grid"
import { ExternalLinkIcon } from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import { Tag } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { formatDate } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { numberFormat } from "@/lib/utils/numbers"
import { isExternal, isFile } from "@/lib/utils/url"

import { reports } from "./data"
import PageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/reports/reports-hero.webp"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-reports")

  const { contributors } = await getAppPageContributorInfo(
    "reports",
    locale as Lang
  )

  const sortedReports = reports.sort((a, b) => {
    const dateA = new Date(a.dateIso)
    const dateB = new Date(b.dateIso)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <>
      <PageJsonLD
        locale={locale}
        contributors={contributors}
        reports={reports}
      />

      <PageHero
        breadcrumbs={{ slug: "research/reports", startDepth: 1 }}
        heroImg={heroImg}
        title={t("page-reports-title")}
        description={t("page-reports-description")}
      />

      <MainArticle className="flow px-page pt-page-2x pb-page">
        <Section id="reports">
          <h2>{t("page-reports-heading")}</h2>
          <p className="max-w-3xl">{t("page-reports-intro")}</p>

          <Grid data-flow="cta">
            {sortedReports.map(
              ({
                slug,
                title,
                publisher,
                dateIso,
                href,
                internal,
                imgSrc,
                fileSizeBytes,
              }) => (
                <Card key={slug} href={href}>
                  <CardHeader>
                    <CardBanner
                      size="full"
                      fit="contain"
                      zoom
                      className="aspect-[1/calc(sqrt(2))]" // Force A0 paper ratio
                    >
                      <Image
                        src={imgSrc}
                        alt=""
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 384px"
                      />
                    </CardBanner>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 font-bold uppercase">
                      <Tag status="warning" size="small">
                        {formatDate(dateIso, locale, {
                          year: "numeric",
                          month: "short",
                          timeZone: "UTC",
                          day: undefined,
                        })}
                      </Tag>
                      {fileSizeBytes ? (
                        <Tag status="accent-a" size="small">
                          {t("page-reports-pdf-size", {
                            size: numberFormat(locale, {
                              style: "unit",
                              unit: "megabyte",
                              unitDisplay: "short",
                              maximumFractionDigits: 1,
                            }).format(fileSizeBytes / 2 ** 20),
                          })}
                        </Tag>
                      ) : !internal ? (
                        <Tag status="accent-b" size="small">
                          {t("page-reports-web-article")}
                        </Tag>
                      ) : null}
                    </div>
                    <CardTitle>
                      {title}
                      {(isExternal(href) || isFile(href)) && (
                        <ExternalLinkIcon />
                      )}
                    </CardTitle>
                    <CardParagraph>{publisher}</CardParagraph>
                  </CardContent>
                </Card>
              )
            )}
          </Grid>
        </Section>

        <Section id="suggest">
          <h2>{t("page-reports-suggest-heading")}</h2>
          <p className="max-w-3xl">{t("page-reports-suggest-body")}</p>
          <Flex data-flow="cta" className="flex-wrap gap-4 max-sm:*:[a]:w-full">
            <ButtonLink href="https://ethereumadoption.com/reports/eth/">
              {t("page-reports-more-cta")}
            </ButtonLink>
            <ButtonLink
              href="https://github.com/ethereum/ethereum-org-website/issues/new/choose"
              variant="outline"
            >
              {t("page-reports-suggest-cta")}
            </ButtonLink>
          </Flex>
        </Section>
      </MainArticle>
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
    title: t("page-reports-title"),
    description: t("page-reports-description"),
    image: "/images/reports/reports-hero.webp",
  })
}

export default Page
