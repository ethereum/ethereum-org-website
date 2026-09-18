import {
  Building,
  Landmark,
  type LucideIcon,
  ShoppingCart,
  UserStar,
} from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import { HubHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import InlineLink from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import AdoptionChart from "./_components/adoption-chart"
import SectionIntro from "./_components/section-intro"
import PageJsonLD from "./page-jsonld"

import ethBlocksImg from "@/public/images/developers-eth-blocks.png"
import heroImg from "@/public/images/organizations/ethereum-city.png"
import whatImg from "@/public/images/organizations/hub-what-organizations-do.png"
import whyImg from "@/public/images/organizations/hub-why-building.png"

const NCA_REPORT_URL =
  "https://nca.org/2026%20Annual%20State%20of%20Crypto%20Holders%20Report.pdf"

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
    // `accent-a` is the semantic alias for this blue; the raw `blue-600`
    // palette entry is only defined in `:root`, so it never adapts in dark.
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

const WHY_ITEMS = ["neutral", "resilient", "interoperable", "programmable"]
const WHAT_ITEMS = ["payments", "tokenized", "identity", "custom"]
const FAQ_ITEMS = [1, 2, 3, 4]

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-organizations")

  const { contributors } = await getAppPageContributorInfo(
    "organizations",
    locale as Lang
  )

  const featureRows = (prefix: string, keys: string[]) => (
    <UnorderedList className="m-0 list-none p-0">
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
        <MainArticle className="flow mx-auto max-w-7xl">
          <Section id="audiences">
            <SectionIntro
              title={t("page-organizations-hub-audiences-title")}
              description={t("page-organizations-hub-audiences-description")}
            />
            <Grid balanced={4} data-flow="cta">
              {AUDIENCES.map(({ key, href, icon: Icon, tile, marker }) => (
                <Card key={key} href={href} variant="ghost" border size="lg">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded",
                        tile
                      )}
                    >
                      <Icon className="size-6" />
                    </div>
                    <CardTitle>
                      {t(`page-organizations-hub-audiences-${key}-title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                    {/* `withChevron` is the RTL-aware stand-in for the
                        design's trailing arrow-right glyph. */}
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
            <div className="relative aspect-3/4 max-lg:max-w-md">
              <Image
                src={whyImg}
                alt=""
                fill
                className="rounded-4xl border border-primary object-cover"
                sizes="(max-width: 992px) 100vw, 40vw"
              />
            </div>
            <div className="flow">
              <h2>{t("page-organizations-hub-why-title")}</h2>
              <p className="text-lg text-body-medium">
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
              <p className="text-lg text-body-medium">
                {t("page-organizations-hub-adoption-description")}
                <sup>
                  <InlineLink href={NCA_REPORT_URL} hideArrow>
                    1
                  </InlineLink>
                </sup>
              </p>
              {/* TODO(content): this attribution line is not in the Figma
                  frame -- the design has only the superscript link. Two of the
                  three figures ("monthly active addresses", "monthly active
                  users") are on-chain metrics that a holder survey is unlikely
                  to contain, so each figure needs confirming against the report
                  (or its own source) before launch. */}
              <p className="text-sm text-body-medium">
                <bdi>1.</bdi> {t("page-organizations-hub-adoption-source")}
              </p>
            </div>
            <AdoptionChart
              items={[
                {
                  value: t("page-organizations-hub-adoption-owners-value"),
                  label: t("page-organizations-hub-adoption-owners-label"),
                },
                {
                  value: t("page-organizations-hub-adoption-addresses-value"),
                  label: t("page-organizations-hub-adoption-addresses-label"),
                },
                {
                  value: t("page-organizations-hub-adoption-users-value"),
                  label: t("page-organizations-hub-adoption-users-label"),
                },
              ]}
            />
          </Section>

          <Section
            id="what-organizations-do"
            data-flow="skip"
            className="grid items-start gap-space-2x lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
            <div className="relative aspect-3/4 max-lg:max-w-md">
              <Image
                src={whatImg}
                alt=""
                fill
                className="rounded-4xl border border-primary object-cover"
                sizes="(max-width: 992px) 100vw, 40vw"
              />
            </div>
            <div className="flow">
              <h2>{t("page-organizations-hub-what-title")}</h2>
              <p className="text-lg text-body-medium">
                {t("page-organizations-hub-what-description")}
              </p>
              {featureRows("page-organizations-hub-what", WHAT_ITEMS)}
            </div>
          </Section>

          <Section
            id="faq"
            data-flow="skip"
            className="grid items-center gap-space-2x lg:grid-cols-2"
          >
            <div className="relative aspect-[1000/715] max-lg:max-w-md">
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
              <Accordion
                type="single"
                collapsible
                className="mt-space divide-y rounded-base border"
              >
                {FAQ_ITEMS.map((n) => (
                  <AccordionItem key={n} value={`faq-${n}`}>
                    <AccordionTrigger className="px-6 py-5 text-lg font-bold md:px-6">
                      {t(`page-organizations-hub-faq-${n}-question`)}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-base md:px-6">
                      {t(`page-organizations-hub-faq-${n}-answer`)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
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
    image: "/images/organizations/ethereum-city.png",
  })
}

export default Page
