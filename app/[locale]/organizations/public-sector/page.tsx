import { Globe } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { PageHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import {
  Card,
  CardBanner,
  CardButtonFake,
  CardContent,
  CardEmoji,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import SectionIntro from "../_components/section-intro"

import PageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/organizations/hero-public-sector.png"
import defiImg from "@/public/images/organizations/isometric-defi.png"
import l2StackImg from "@/public/images/organizations/isometric-l2-stack.png"
import privacyImg from "@/public/images/organizations/isometric-privacy.png"
import tokenizationImg from "@/public/images/organizations/isometric-tokenization.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-public-sector")

  const { contributors } = await getAppPageContributorInfo(
    "organizations/public-sector",
    locale as Lang
  )

  const useCases = [
    {
      key: "identity",
      href: "/decentralized-identity/",
      image: tokenizationImg,
    },
    {
      key: "records",
      href: "/smart-contracts/",
      image: defiImg,
    },
    {
      key: "funding",
      href: "/community/grants/",
      image: l2StackImg,
    },
    {
      key: "finance",
      href: "/stablecoins/",
      image: privacyImg,
    },
  ] as const

  const fitsRows = [
    "coordinate",
    "credentials",
    "transparency",
    "borders",
    "privacy",
    "vendor",
  ] as const

  const caseStudies = [
    {
      key: "bhutan",
      href: "https://www.bhutanndi.com/",
      badge: <CardEmoji text="🇧🇹" />,
    },
    {
      key: "buenos-aires",
      href: "https://quarkid.org/",
      badge: <CardEmoji text="🇦🇷" />,
    },
    {
      key: "unicef",
      href: "https://www.unicef.org/innovation/cryptofund",
      badge: (
        <CardIconContainer>
          <Globe />
        </CardIconContainer>
      ),
    },
    {
      key: "india",
      href: "https://www.undp.org/blog/using-blockchain-make-land-registry-more-reliable-india",
      badge: <CardEmoji text="🇮🇳" />,
    },
  ] as const

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{ slug: "organizations/public-sector" }}
        heroImg={heroImg}
        title={t("page-organizations-public-sector-hero-title")}
        description={
          <>
            <p>{t("page-organizations-public-sector-hero-description-1")}</p>
            <p>{t("page-organizations-public-sector-hero-description-2")}</p>
          </>
        }
      />

      <main className="px-page pb-page">
        <MainArticle className="flow mx-auto max-w-7xl *:[section]:py-space-2x">
          <Section id="use-cases">
            <SectionIntro
              title={t("page-organizations-public-sector-use-cases-title")}
              description={t(
                "page-organizations-public-sector-use-cases-description"
              )}
            />
            <Grid balanced={4} data-flow="cta">
              {useCases.map(({ key, href, image }) => (
                <Card key={key} href={href}>
                  <CardHeader>
                    <CardBanner background="none" fit="contain">
                      <Image
                        src={image}
                        alt=""
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </CardBanner>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>
                      {t(
                        `page-organizations-public-sector-use-cases-${key}-title`
                      )}
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        `page-organizations-public-sector-use-cases-${key}-description`
                      )}
                    </CardParagraph>
                  </CardContent>
                  <CardFooter>
                    <CardButtonFake>
                      {t(
                        `page-organizations-public-sector-use-cases-${key}-cta`
                      )}
                    </CardButtonFake>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Section>

          <Section id="where-ethereum-fits">
            <SectionIntro
              title={t("page-organizations-public-sector-fits-title")}
              description={t(
                "page-organizations-public-sector-fits-description"
              )}
            />
            <Table variant="highlight-first-column">
              <TableCaption className="sr-only">
                {t("page-organizations-public-sector-fits-title")}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {t("page-organizations-public-sector-fits-col-need")}
                  </TableHead>
                  <TableHead>
                    {t("page-organizations-public-sector-fits-col-help")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fitsRows.map((row) => (
                  <TableRow key={row}>
                    <TableCell>
                      {t(
                        `page-organizations-public-sector-fits-row-${row}-need`
                      )}
                    </TableCell>
                    <TableCell>
                      {t(
                        `page-organizations-public-sector-fits-row-${row}-help`
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Section>

          <Section id="case-studies">
            <SectionIntro
              title={t("page-organizations-public-sector-case-studies-title")}
              description={t(
                "page-organizations-public-sector-case-studies-description"
              )}
            />
            <Grid balanced={2} data-flow="cta">
              {caseStudies.map(({ key, href, badge }) => (
                <Card key={key} href={href}>
                  <CardHeader>{badge}</CardHeader>
                  <CardContent>
                    <CardTitle>
                      {t(
                        `page-organizations-public-sector-case-studies-${key}-title`
                      )}
                    </CardTitle>
                    <CardParagraph>
                      {t(
                        `page-organizations-public-sector-case-studies-${key}-description`
                      )}
                    </CardParagraph>
                  </CardContent>
                  <CardFooter buttons="compact">
                    <CardButtonFake>
                      {t("page-organizations-public-sector-case-studies-cta")}
                    </CardButtonFake>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Section>
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

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations-public-sector")

  return await getMetadata({
    locale,
    slug: ["organizations", "public-sector"],
    title: t("page-organizations-public-sector-meta-title"),
    description: t("page-organizations-public-sector-meta-description"),
    image: "/images/organizations/hero-public-sector.png",
  })
}

export default Page
