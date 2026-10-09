import {
  Building,
  Landmark,
  type LucideIcon,
  ShoppingCart,
  UserStar,
} from "lucide-react"
import { getImageProps, type StaticImageData } from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import ExpandableCard from "@/components/ExpandableCard"
import { HubHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { AccordionContainer } from "@/components/ui/accordion"
import {
  Card,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { createPageTracking } from "@/lib/utils/pageTracking"
import { breakpointAsNumber } from "@/lib/utils/screen"

import AdoptionChart from "./_components/adoption-chart"
import SectionIntro from "./_components/section-intro"
import PageJsonLD from "./page-jsonld"

import ethBlocksImg from "@/public/images/developers-eth-blocks.png"
import whyImg from "@/public/images/organizations/civic-district-on-shared-platform.png"
import whyPortraitImg from "@/public/images/organizations/civic-district-on-shared-platform-portrait.png"
import heroImg from "@/public/images/organizations/sunrise-over-organizations-city-skyline.png"
import whatImg from "@/public/images/organizations/waterfront-trade-hub-with-rail-network.png"
import whatPortraitImg from "@/public/images/organizations/waterfront-trade-hub-with-rail-network-portrait.png"

const A16Z_REPORT_URL =
  "https://a16zcrypto.com/posts/article/state-of-crypto-report-2025/"

/** Matomo category suffix, matching the `_open_source` convention. */
const TRACK_CATEGORY_SUFFIX = "_organizations"

const REFERENCES_ID = "references"

type Audience = {
  key: string
  href: string
  icon: LucideIcon
  /** Tailwind classes for the tinted icon tile */
  tile: string
  /** Tailwind classes for the bullet markers */
  marker: string
}

const AUDIENCES: Audience[] = [
  {
    key: "public-sector",
    href: "/organizations/public-sector/",
    icon: Landmark,
    // Not `blue-600`: it's only defined in `:root`, so it doesn't adapt in dark
    tile: "text-accent-a bg-accent-a/10",
    marker: "marker:text-accent-a",
  },
  {
    key: "enterprise",
    href: "/organizations/enterprise/",
    icon: Building,
    tile: "text-primary bg-primary/10",
    marker: "marker:text-primary",
  },
  {
    key: "small-business",
    href: "/organizations/small-business/",
    icon: ShoppingCart,
    tile: "text-accent-c bg-accent-c/10",
    marker: "marker:text-accent-c",
  },
  {
    key: "founders",
    href: "/organizations/founders/",
    icon: UserStar,
    tile: "text-accent-b bg-accent-b/10",
    marker: "marker:text-accent-b",
  },
]

/** Landscape art when stacked (below lg), its portrait crop beside the text (lg+) */
const SectionPicture = ({
  landscape,
  portrait,
}: {
  landscape: StaticImageData
  portrait: StaticImageData
}) => {
  const lg = breakpointAsNumber["lg"]
  const portraitSizes = "40vw"
  const landscapeSizes = "100vw"
  const {
    props: { srcSet: portraitSrcSet },
  } = getImageProps({ alt: "", src: portrait, sizes: portraitSizes })
  const {
    props: { srcSet: landscapeSrcSet, ...img },
  } = getImageProps({ alt: "", src: landscape, sizes: landscapeSizes })

  return (
    <picture>
      <source
        media={`(min-width: ${lg}px)`}
        srcSet={portraitSrcSet}
        sizes={portraitSizes}
      />
      <source
        media={`(max-width: ${lg - 1}px)`}
        srcSet={landscapeSrcSet}
        sizes={landscapeSizes}
      />
      <img
        {...img}
        alt=""
        className="absolute inset-0 size-full rounded-4xl object-cover"
      />
    </picture>
  )
}

const WHY_ITEMS = ["neutral", "resilient", "interoperable", "programmable"]
const WHAT_ITEMS = ["payments", "tokenized", "identity", "custom"]
const FAQ_ITEMS = [1, 2, 3, 4]

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations")
  const tCommon = await getTranslations("common")
  const { footnote, linkTo } = createPageTracking(
    "organizations",
    REFERENCES_ID
  )

  const { contributors } = await getAppPageContributorInfo(
    "organizations",
    locale as Lang
  )

  const featureRows = (prefix: string, keys: string[]) => (
    <UnorderedList className="ms-0 mt-space-2x list-none p-0">
      {keys.map((key) => (
        <ListItem key={key} className="m-0 border-b py-4">
          <h3 className="text-h5">{t(`${prefix}-${key}-title`)}</h3>
          <p className="mt-1 text-body-medium">
            {t(`${prefix}-${key}-description`)}
          </p>
        </ListItem>
      ))}
    </UnorderedList>
  )

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <HubHero
        heroImg={heroImg}
        header={t("page-organizations-hub-hero-title")}
        description={t("page-organizations-hub-hero-description")}
      />

      <main className="px-page pb-page">
        <MainArticle className="flow *:[section]:py-space-3x">
          <Section id="audiences">
            <SectionIntro
              title={t("page-organizations-hub-audiences-title")}
              description={t("page-organizations-hub-audiences-description")}
            />
            <Grid balanced={4} data-flow="cta">
              {AUDIENCES.map(({ key, href, icon: Icon, tile, marker }) => (
                <Card
                  key={key}
                  href={href}
                  variant="ghost"
                  border
                  size="lg"
                  className="row-span-4 grid grid-rows-subgrid gap-0"
                >
                  <CardHeader className="flex flex-row items-start gap-3">
                    <div
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-lg",
                        tile
                      )}
                    >
                      <Icon className="size-6" />
                    </div>
                    <CardTitle>
                      {t(`page-organizations-hub-audiences-${key}-title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="row-span-2 grid grid-rows-subgrid gap-(--content-space) space-y-0">
                    <CardParagraph>
                      {t(`page-organizations-hub-audiences-${key}-description`)}
                    </CardParagraph>
                    <UnorderedList
                      className={cn("mb-0 text-sm text-body-medium", marker)}
                    >
                      {[1, 2, 3].map((n) => (
                        <ListItem key={n}>
                          {t(
                            `page-organizations-hub-audiences-${key}-item-${n}`
                          )}
                        </ListItem>
                      ))}
                    </UnorderedList>
                  </CardContent>
                  <CardFooter>
                    <CardButtonFake withChevron>
                      {t(`page-organizations-hub-audiences-${key}-cta`)}
                    </CardButtonFake>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Section>

          <Section
            id="why-ethereum"
            data-flow="skip"
            className="grid items-start gap-space-2x lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
            <div className="relative aspect-3/2 lg:aspect-auto lg:min-h-192 lg:self-stretch">
              <SectionPicture landscape={whyImg} portrait={whyPortraitImg} />
            </div>
            <div className="flow">
              <h2>{t("page-organizations-hub-why-title")}</h2>
              <p className="text-lg text-pretty text-body-medium">
                {t("page-organizations-hub-why-description")}
              </p>
              {featureRows("page-organizations-hub-why", WHY_ITEMS)}
            </div>
          </Section>

          <Section
            id="adoption"
            data-flow="skip"
            className="grid items-center gap-space-2x lg:grid-cols-2"
          >
            <div className="flow">
              <h2>{t("page-organizations-hub-adoption-title")}</h2>
              <p className="text-lg text-pretty text-body-medium">
                {t("page-organizations-hub-adoption-description")}
                {footnote(1, "adoption")}
              </p>
            </div>
            <AdoptionChart />
          </Section>

          <Section
            id="what-organizations-do"
            data-flow="skip"
            className="grid items-start gap-space-2x lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
            <div className="relative aspect-3/2 lg:aspect-auto lg:min-h-192 lg:self-stretch">
              <SectionPicture landscape={whatImg} portrait={whatPortraitImg} />
            </div>
            <div className="flow">
              <h2>{t("page-organizations-hub-what-title")}</h2>
              <p className="text-lg text-pretty text-body-medium">
                {t("page-organizations-hub-what-description")}
              </p>
              {featureRows("page-organizations-hub-what", WHAT_ITEMS)}
            </div>
          </Section>

          <Section
            id="faq"
            data-flow="skip"
            className="grid items-start gap-space-2x lg:grid-cols-2"
          >
            <div className="relative aspect-1000/715 w-full max-w-md justify-self-center lg:sticky lg:top-28 lg:max-w-none">
              <Image
                src={ethBlocksImg}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2>{t("page-organizations-hub-faq-title")}</h2>
              <AccordionContainer className="mt-space">
                {FAQ_ITEMS.map((n) => (
                  <ExpandableCard
                    key={n}
                    title={t(`page-organizations-hub-faq-${n}-question`)}
                    eventCategory={TRACK_CATEGORY_SUFFIX}
                    eventAction="faq"
                    eventName={`Question ${n}`}
                  >
                    <p>{t(`page-organizations-hub-faq-${n}-answer`)}</p>
                  </ExpandableCard>
                ))}
              </AccordionContainer>
            </div>
          </Section>

          {/* Target of the `[1]` marker above. */}
          <Section id={REFERENCES_ID}>
            <h2>{tCommon("references")}</h2>
            <OrderedList className="ms-0 list-inside list-decimal text-sm text-body-medium">
              <ListItem>
                {t.rich("page-organizations-hub-reference-a16z", {
                  link: linkTo(
                    A16Z_REPORT_URL,
                    REFERENCES_ID,
                    "a16z State of Crypto"
                  ),
                })}
              </ListItem>
            </OrderedList>
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

  const t = await getTranslations("page-organizations")

  return await getMetadata({
    locale,
    slug: ["organizations"],
    title: t("page-organizations-hub-meta-title"),
    description: t("page-organizations-hub-meta-description"),
    image: "/images/organizations/sunrise-over-organizations-city-skyline.png",
  })
}

export default Page
