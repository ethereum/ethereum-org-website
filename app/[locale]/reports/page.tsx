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
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLinkIcon } from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import { Tag } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { isExternal, isFile } from "@/lib/utils/url"

import { reports } from "./data"
import ReportsPageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/reports/reports-hero.webp"

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
      <ReportsPageJsonLD
        locale={locale}
        contributors={contributors}
        reports={reports}
      />

      <div>
        <ContentHero
          breadcrumbs={{ slug: "research/reports", startDepth: 1 }}
          heroImg={heroImg}
          title={t("page-reports-title")}
          description={t("page-reports-description")}
        />
        <MainArticle className="relative space-y-16 px-4 py-16 md:space-y-20 md:px-10 md:py-20">
          <Section id="reports" className="space-y-12">
            <div className="max-w-3xl space-y-[0.25lh]">
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
                  <Card key={slug} href={href}>
                    <CardHeader>
                      <CardBanner size="full" fit="contain">
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
                          {date}
                        </Tag>
                        {fileSizeBytes ? (
                          <Tag status="accent-a" size="small">
                            {t("page-reports-pdf-size", {
                              size: (fileSizeBytes / 1048576).toFixed(1),
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
            </div>
          </Section>

          <Section id="suggest" className="space-y-[1.5lh]">
            <div className="max-w-3xl space-y-[0.25lh]">
              <h2>{t("page-reports-suggest-heading")}</h2>
              <p>{t("page-reports-suggest-body")}</p>
            </div>
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
    image: "/images/reports/reports-hero.webp",
  })
}

export default Page
