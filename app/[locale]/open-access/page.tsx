import {
  Clock,
  Globe,
  HandCoins,
  Handshake,
  Heart,
  Network,
  PowerOff,
  Recycle,
  Wallet,
} from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"

import type { Lang, MatomoEventOptions, ToCItem } from "@/lib/types"

import PathwayCard from "@/components/cards/pathway-card"
import PageHero from "@/components/Hero/PageHero"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import {
  Card,
  CardBanner,
  CardContent,
  CardHeader,
  CardIconContainer,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import PageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import accessNowBannerImg from "@/public/assets/open-access/access-now-banner.png"
import ethDiamondImg from "@/public/assets/open-access/eth-diamond-pastel.png"
import ethVaultImg from "@/public/assets/open-access/eth-vault.png"
import freedomPressBannerImg from "@/public/assets/open-access/freedom-of-the-press-foundation-banner.png"
import heroImg from "@/public/assets/open-access/open-access-hero.png"
import privacyPathwayImg from "@/public/assets/open-access/privacy-pathway.png"
import rsfBannerImg from "@/public/assets/open-access/reporters-without-borders-banner.png"
import effBannerImg from "@/public/assets/open-source/electronic-frontier-foundation-banner.png"
import internetArchiveBannerImg from "@/public/assets/open-source/internet-archive-banner.png"
import torBannerImg from "@/public/assets/open-source/tor-project-banner.png"
import ethBlocksImg from "@/public/images/developers-eth-blocks.png"
import walletCalloutImg from "@/public/images/impact_transparent.png"

const Page = async (props: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-open-access")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("open-access", locale)

  // Keyed rather than positional: sections get reordered, and an <h2> rendering
  // under another section's anchor is invisible in review.
  const sections = {
    decides: {
      id: "who-decides-what-you-can-do-with-your-money",
      title: t("page-open-access-decides-title"),
    },
    freedoms: {
      id: "what-financial-freedoms-does-ethereum-offer",
      title: t("page-open-access-freedoms-title"),
    },
    alternative: {
      id: "an-alternative-when-institutions-fail",
      title: t("page-open-access-alternative-title"),
    },
    publish: {
      id: "your-ability-to-publish",
      title: t("page-open-access-publish-title"),
    },
    build: {
      id: "your-freedom-to-build",
      title: t("page-open-access-build-title"),
    },
    how: {
      id: "how-ethereum-resists-censorship",
      title: t("page-open-access-how-title"),
    },
    eth: {
      id: "eth-is-not-like-other-crypto-assets",
      title: t("page-open-access-eth-title"),
    },
    started: {
      id: "getting-started-on-ethereum",
      title: t("page-open-access-started-title"),
    },
    beyond: {
      id: "digital-freedom-beyond-ethereum",
      title: t("page-open-access-beyond-title"),
    },
    future: {
      id: "a-different-future-is-possible",
      title: t("page-open-access-future-title"),
    },
    resources: {
      id: "further-reading",
      title: t("page-open-access-resources-title"),
    },
  }

  const tocItems: ToCItem[] = Object.values(sections).map(({ id, title }) => ({
    title,
    url: `#${id}`,
  }))

  // Matomo: one category for the page, the section id as the action, and a
  // stable English name for the element. Section titles are translated -- ids
  // and slugs keep a locale from splitting its own row.
  const track = (section: string, name: string): MatomoEventOptions => ({
    eventCategory: "open-access",
    eventAction: section,
    eventName: name,
  })

  // Footnote marker for the numbered citations under Further reading. Rendered
  // outside the strings so translators never carry the numbering.
  const footnote = (n: number, section: string) => (
    <sup>
      <InlineLink
        href="#further-reading"
        customEventOptions={track(section, `Footnote ${n}`)}
      >{`[${n}]`}</InlineLink>
    </sup>
  )

  // `t.rich` link placeholder, pre-wired to Matomo.
  const linkTo = (href: string, section: string, name: string) => {
    const TrackedLink = (chunks: ReactNode) => (
      <InlineLink href={href} customEventOptions={track(section, name)}>
        {chunks}
      </InlineLink>
    )
    TrackedLink.displayName = "TrackedLink"
    return TrackedLink
  }

  // Financial agency: what you can do when you don't need standing permission.
  // Icons are deliberately distinct from the censorship-resistance grid below --
  // two 2x2 grids sharing an icon set read as the same idea stated twice.
  const agency = [
    {
      id: "worldwide",
      icon: <Network />,
      title: t("page-open-access-agency-worldwide-title"),
      descriptions: [
        t("page-open-access-agency-worldwide-description-1"),
        t("page-open-access-agency-worldwide-description-2"),
      ],
    },
    {
      id: "collateral",
      icon: <HandCoins />,
      title: t("page-open-access-agency-collateral-title"),
      descriptions: [
        t("page-open-access-agency-collateral-description-1"),
        t("page-open-access-agency-collateral-description-2"),
      ],
    },
    {
      id: "anytime",
      icon: <Clock />,
      title: t("page-open-access-agency-anytime-title"),
      descriptions: [
        t("page-open-access-agency-anytime-description-1"),
        t("page-open-access-agency-anytime-description-2"),
      ],
    },
    {
      id: "portable",
      icon: <Wallet />,
      title: t("page-open-access-agency-portable-title"),
      descriptions: [
        t("page-open-access-agency-portable-description-1"),
        t("page-open-access-agency-portable-description-2"),
      ],
    },
  ]

  // The four properties that make Ethereum's access hard to revoke.
  const properties = [
    {
      id: "permissionless",
      icon: <Globe />,
      title: t("page-open-access-property-permissionless-title"),
      descriptions: [
        t("page-open-access-property-permissionless-description-1"),
        t("page-open-access-property-permissionless-description-2"),
      ],
    },
    {
      id: "neutral",
      icon: <Heart />,
      title: t("page-open-access-property-neutral-title"),
      descriptions: [
        t("page-open-access-property-neutral-description-1"),
        t("page-open-access-property-neutral-description-2"),
      ],
    },
    {
      id: "no-off-switch",
      icon: <PowerOff />,
      title: t("page-open-access-property-no-off-switch-title"),
      descriptions: [
        t("page-open-access-property-no-off-switch-description-1"),
        t("page-open-access-property-no-off-switch-description-2"),
      ],
    },
    {
      id: "shared-record",
      icon: <Recycle />,
      title: t("page-open-access-property-shared-record-title"),
      descriptions: [
        t("page-open-access-property-shared-record-description-1"),
        t("page-open-access-property-shared-record-description-2"),
      ],
    },
  ]

  // Grid order matches the design. EFF, Tor and Internet Archive reuse the
  // banners already committed for /open-source/.
  const organizations = [
    {
      id: "eff",
      href: "https://www.eff.org",
      banner: effBannerImg,
      name: t("page-open-access-org-eff-name"),
      description: t("page-open-access-org-eff-description"),
    },
    {
      id: "access-now",
      href: "https://www.accessnow.org",
      banner: accessNowBannerImg,
      name: t("page-open-access-org-access-now-name"),
      description: t("page-open-access-org-access-now-description"),
    },
    {
      id: "internet-archive",
      href: "https://archive.org",
      banner: internetArchiveBannerImg,
      name: t("page-open-access-org-internet-archive-name"),
      description: t("page-open-access-org-internet-archive-description"),
    },
    {
      id: "tor",
      href: "https://www.torproject.org",
      banner: torBannerImg,
      name: t("page-open-access-org-tor-name"),
      description: t("page-open-access-org-tor-description"),
    },
    {
      id: "freedom-press",
      href: "https://freedom.press",
      banner: freedomPressBannerImg,
      name: t("page-open-access-org-freedom-press-name"),
      description: t("page-open-access-org-freedom-press-description"),
    },
    {
      id: "rsf",
      href: "https://rsf.org",
      banner: rsfBannerImg,
      name: t("page-open-access-org-rsf-name"),
      description: t("page-open-access-org-rsf-description"),
    },
  ]

  const lockouts = [
    { id: "lebanon", note: 1 },
    { id: "argentina", note: 2 },
    { id: "myanmar", note: 3 },
    { id: "sri-lanka", note: 4 },
  ] as const

  return (
    <>
      <PageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <ContentLayout
        heroSection={
          <PageHero
            breadcrumbs={{ slug: "open-access" }}
            heroImg={heroImg}
            title={t("page-open-access-title")}
            description={
              <>
                <p>{t("page-open-access-hero-description-1")}</p>
                <p>{t("page-open-access-hero-description-2")}</p>
              </>
            }
          />
        }
        tocItems={tocItems}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      >
        <Card size="lg">
          <CardContent>
            <CardTitle size="lg" asChild>
              <h2>{t("page-open-access-summary-title")}</h2>
            </CardTitle>
            <UnorderedList className="mb-0">
              <ListItem>{t("page-open-access-summary-item-1")}</ListItem>
              <ListItem>{t("page-open-access-summary-item-2")}</ListItem>
              <ListItem>{t("page-open-access-summary-item-3")}</ListItem>
              <ListItem>{t("page-open-access-summary-item-4")}</ListItem>
            </UnorderedList>
          </CardContent>
        </Card>

        <Section id={sections.decides.id}>
          <h2>{sections.decides.title}</h2>
          <p>{t("page-open-access-decides-description-1")}</p>
          <p>
            <strong>{t("page-open-access-decides-description-2")}</strong>
          </p>
          <p>
            {t.rich("page-open-access-decides-description-3", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-open-access-decides-lockouts-lead")}</p>
          {/* Markers sit outside the strings so translators never carry the
              numbering; every case is cited under Further reading. */}
          <UnorderedList>
            {lockouts.map(({ id, note }) => (
              <ListItem key={id}>
                {t(`page-open-access-decides-lockout-${id}`)}
                {footnote(note, sections.decides.id)}
              </ListItem>
            ))}
          </UnorderedList>
          <p>
            {t("page-open-access-decides-description-4")}
            {footnote(5, sections.decides.id)}
          </p>
          <p>
            <strong>{t("page-open-access-decides-description-5")}</strong>
          </p>
          <p>{t("page-open-access-decides-description-6")}</p>
          <Image
            src={ethVaultImg}
            alt={t("page-open-access-decides-image-alt")}
            className="mx-auto max-h-48 w-auto object-contain"
            sizes="240px"
          />
        </Section>

        <Section id={sections.freedoms.id}>
          <h2>{sections.freedoms.title}</h2>
          <p>{t("page-open-access-freedoms-description-1")}</p>
          <p>
            {t.rich("page-open-access-freedoms-description-2", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-open-access-freedoms-description-3", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-open-access-freedoms-description-4")}</p>

          <h3>{t("page-open-access-participate-title")}</h3>
          <p>{t("page-open-access-participate-description-1")}</p>
          <p>{t("page-open-access-participate-description-2")}</p>
          <Grid balanced={2} className="my-space-2x">
            {agency.map(({ id, icon, title, descriptions }) => (
              <Card key={id}>
                <CardHeader>
                  <CardIconContainer>{icon}</CardIconContainer>
                </CardHeader>
                <CardContent>
                  <CardTitle asChild>
                    <h4>{title}</h4>
                  </CardTitle>
                  {descriptions.map((description) => (
                    <CardParagraph key={description}>
                      {description}
                    </CardParagraph>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Grid>

          <h3>{t("page-open-access-censorship-resistance-title")}</h3>
          <p>{t("page-open-access-censorship-resistance-description-1")}</p>
          <p>{t("page-open-access-censorship-resistance-description-2")}</p>
          <p>{t("page-open-access-censorship-resistance-description-3")}</p>
          <Grid balanced={2} className="my-space-2x">
            {properties.map(({ id, icon, title, descriptions }) => (
              <Card key={id}>
                <CardHeader>
                  <CardIconContainer>{icon}</CardIconContainer>
                </CardHeader>
                <CardContent>
                  <CardTitle asChild>
                    <h4>{title}</h4>
                  </CardTitle>
                  {descriptions.map((description) => (
                    <CardParagraph key={description}>
                      {description}
                    </CardParagraph>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section id={sections.alternative.id}>
          <h2>{sections.alternative.title}</h2>
          <p>{t("page-open-access-alternative-description-1")}</p>
          <p>{t("page-open-access-alternative-description-2")}</p>
          <p>{t("page-open-access-alternative-description-3")}</p>

          {/* Icon is top-aligned: the default centering strands it beside a
              four-paragraph body. */}
          <Alert variant="update" className="items-start">
            <AlertIcon className="[&>svg]:size-12">
              <Handshake />
            </AlertIcon>
            <AlertContent>
              <AlertTitle size="lg">
                {t("page-open-access-emergency-title")}
              </AlertTitle>
              <AlertDescription>
                <p>{t("page-open-access-emergency-description-1")}</p>
                <p>
                  {t.rich("page-open-access-emergency-description-2", {
                    strong: Strong,
                  })}
                  {footnote(6, sections.alternative.id)}
                </p>
                <p>{t("page-open-access-emergency-description-3")}</p>
                <p>{t("page-open-access-emergency-description-4")}</p>
              </AlertDescription>
            </AlertContent>
          </Alert>
        </Section>

        <Section id={sections.publish.id}>
          <h2>{sections.publish.title}</h2>
          <p>{t("page-open-access-publish-description-1")}</p>
          <p>
            {t.rich("page-open-access-publish-description-2", {
              strong: Strong,
            })}
            {footnote(7, sections.publish.id)}
          </p>
          <p>
            {t.rich("page-open-access-publish-description-3", {
              strong: Strong,
            })}
            {footnote(8, sections.publish.id)}
          </p>
          <p>
            {t("page-open-access-publish-description-4")}
            {footnote(9, sections.publish.id)}
          </p>
          <p>{t("page-open-access-publish-description-5")}</p>
        </Section>

        <Section id={sections.build.id}>
          <h2>{sections.build.title}</h2>
          <p>{t("page-open-access-build-description-1")}</p>
          <p>{t("page-open-access-build-description-2")}</p>
          <p>
            {t("page-open-access-build-description-3")}
            {footnote(10, sections.build.id)}
          </p>
          <p>{t("page-open-access-build-description-4")}</p>
        </Section>

        <Section id={sections.how.id}>
          <h2>{sections.how.title}</h2>
          <p>{t("page-open-access-how-description-1")}</p>
          <p>{t("page-open-access-how-description-2")}</p>
          <p>{t("page-open-access-how-description-3")}</p>
          <p>{t("page-open-access-how-description-4")}</p>
          <Image
            src={ethDiamondImg}
            alt={t("page-open-access-how-image-alt")}
            className="mx-auto max-h-36 w-auto object-contain"
            sizes="144px"
          />
        </Section>

        <Section id={sections.eth.id}>
          <h2>{sections.eth.title}</h2>
          <p>
            {t("page-open-access-eth-description-1")}
            {footnote(11, sections.eth.id)}
          </p>
          <p>{t("page-open-access-eth-description-2")}</p>
          <p>{t("page-open-access-eth-description-3")}</p>
        </Section>

        <Section id={sections.started.id}>
          <h2>{sections.started.title}</h2>
          <p>{t("page-open-access-started-description")}</p>
          <p>
            <InlineLink
              href="/wallets/"
              customEventOptions={track(sections.started.id, "Wallets")}
            >
              {t("page-open-access-started-link")}
            </InlineLink>
          </p>

          <Callout
            id="download-a-wallet"
            title={t("page-open-access-wallet-callout-title")}
            description={t("page-open-access-wallet-callout-description")}
            image={walletCalloutImg}
            variant="sm"
            as="h3"
          >
            <ButtonLink
              href="/wallets/find-wallet/"
              customEventOptions={track(sections.started.id, "Find wallet")}
            >
              {t("page-open-access-wallet-callout-cta")}
            </ButtonLink>
          </Callout>
        </Section>

        <Section id={sections.beyond.id}>
          <h2>{sections.beyond.title}</h2>
          <p>{t("page-open-access-beyond-description-1")}</p>
          <p>{t("page-open-access-beyond-description-2")}</p>

          <Grid columns={3} size="narrow" className="my-space-2x">
            {organizations.map(({ id, href, name, description, banner }) => (
              <Card
                key={id}
                href={href}
                variant="ghost"
                size="sm"
                customEventOptions={track(sections.beyond.id, id)}
              >
                <CardHeader>
                  <CardBanner size="sm">
                    <Image
                      src={banner}
                      alt=""
                      sizes="(max-width: 480px) calc(100vw - 2rem), 300px"
                    />
                  </CardBanner>
                </CardHeader>
                <CardContent>
                  <CardTitle size="sm" asChild>
                    <h3>{name}</h3>
                  </CardTitle>
                  <CardParagraph size="sm">{description}</CardParagraph>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section id={sections.future.id}>
          <h2>{sections.future.title}</h2>
          <p>{t("page-open-access-future-description-1")}</p>
          <p>{t("page-open-access-future-description-2")}</p>
          <p>{t("page-open-access-future-description-3")}</p>
          <p>{t("page-open-access-future-description-4")}</p>

          <PathwayCard
            href="/privacy/"
            title={t("page-open-access-pathway-privacy-title")}
            description={t("page-open-access-pathway-privacy-description")}
            badge={{ label: t("page-open-access-pathway-privacy-badge") }}
            banner={<Image src={privacyPathwayImg} alt="" sizes="160px" />}
          />
          <PathwayCard
            href="/what-is-ethereum/"
            title={t("page-open-access-pathway-ethereum-title")}
            description={t("page-open-access-pathway-ethereum-description")}
            banner={<Image src={ethBlocksImg} alt="" sizes="160px" />}
          />
        </Section>

        <Section id={sections.resources.id}>
          <h2>{sections.resources.title}</h2>

          {/* Numbered: the targets of the [1]-[11] markers in the body. */}
          <OrderedList>
            <ListItem>
              {t.rich("page-open-access-reference-lebanon", {
                link: linkTo(
                  "https://www.imf.org/en/publications/cr/issues/2023/06/28/lebanon-2023-article-iv-consultation-press-release-staff-report-and-statement-by-the-535372",
                  sections.resources.id,
                  "IMF Lebanon Article IV"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-access-reference-argentina", {
                link: linkTo(
                  "https://bcra.gob.ar/pdfs/comytexord/A6815.pdf",
                  sections.resources.id,
                  "BCRA Comunicacion A 6815"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-access-reference-myanmar", {
                link: linkTo(
                  "https://www.worldbank.org/en/country/myanmar/publication/myanmar-economic-monitor-july-2021-progress-threatened-resilience-tested",
                  sections.resources.id,
                  "World Bank Myanmar Economic Monitor"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-access-reference-sri-lanka", {
                link: linkTo(
                  "https://www.cbsl.gov.lk/en/news/amending-limits-and-terms-and-conditions-on-possession-of-foreign-currency",
                  sections.resources.id,
                  "Central Bank of Sri Lanka FX possession"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-access-reference-findex", {
                link: linkTo(
                  "https://www.worldbank.org/en/news/press-release/2025/07/16/mobile-phone-technology-powers-saving-surge-in-developing-economies",
                  sections.resources.id,
                  "World Bank Global Findex 2025"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-access-reference-ukraine", {
                link: linkTo(
                  "https://www.kmu.gov.ua/en/news/mincifri-kriptofond-ukrayini-vzhe-zibrav-ponad-60-miljoniv-dolariv-na-potrebi-zsu",
                  sections.resources.id,
                  "Cabinet of Ministers of Ukraine crypto fund"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-access-reference-metoo", {
                link: linkTo(
                  "https://www.hongkongfp.com/2018/04/27/historic-moment-chinas-metoo-activists-use-blockchain-skirt-censors/",
                  sections.resources.id,
                  "HKFP MeToo blockchain"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-access-reference-vaccine", {
                link: linkTo(
                  "https://technode.com/2018/07/23/vaccine-scandal-blockchain/",
                  sections.resources.id,
                  "TechNode vaccine scandal blockchain"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-access-reference-ai-fen", {
                link: linkTo(
                  "https://www.forbes.com/sites/rogerhuang/2020/03/31/chinese-netizens-use-ethereum-to-avoid-chinas-covid-19-censorship/",
                  sections.resources.id,
                  "Forbes Ai Fen Ethereum"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-access-reference-uniswap", {
                link: linkTo(
                  "https://blog.uniswap.org/token-access-app",
                  sections.resources.id,
                  "Uniswap Labs token access"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-access-reference-stablecoins", {
                link: linkTo(
                  "https://www.circle.com/legal/usdc-risk-factors",
                  sections.resources.id,
                  "Circle USDC risk factors"
                ),
              })}
            </ListItem>
          </OrderedList>

          <h3>{t("page-open-access-resources-supporting-title")}</h3>
          <UnorderedList>
            <ListItem>
              {t.rich("page-open-access-reference-nyse", {
                link: linkTo(
                  "https://www.nyse.com/trade/hours-calendars",
                  sections.resources.id,
                  "NYSE trading hours"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-access-reference-settlement", {
                link: linkTo(
                  "https://www.sec.gov/resources-for-investors/investor-alerts-bulletins/new-t1-settlement-cycle-what-investors-need-know-investor-bulletin",
                  sections.resources.id,
                  "SEC T+1 settlement"
                ),
              })}
            </ListItem>
          </UnorderedList>
        </Section>
      </ContentLayout>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("page-open-access")

  return await getMetadata({
    locale,
    slug: ["open-access"],
    title: t("page-open-access-meta-title"),
    description: t("page-open-access-meta-description"),
    image: "/assets/open-access/open-access-hero.png",
  })
}

export default Page
