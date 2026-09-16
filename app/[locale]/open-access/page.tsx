import { Globe, Handshake, Heart, PowerOff, Recycle } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"

import type { Lang, MatomoEventOptions, ToCItem } from "@/lib/types"

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
import rsfBannerImg from "@/public/assets/open-access/reporters-without-borders-banner.png"
import effBannerImg from "@/public/assets/open-source/electronic-frontier-foundation-banner.png"
import internetArchiveBannerImg from "@/public/assets/open-source/internet-archive-banner.png"
import torBannerImg from "@/public/assets/open-source/tor-project-banner.png"
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
    frozen: {
      id: "imagine-your-bank-account-frozen-overnight",
      title: t("page-open-access-frozen-title"),
    },
    freedom: {
      id: "what-is-financial-freedom",
      title: t("page-open-access-freedom-title"),
    },
    alternative: {
      id: "an-alternative-when-institutions-fail",
      title: t("page-open-access-alternative-title"),
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

  // The four properties that make Ethereum's access hard to revoke, in the
  // order the design lists them.
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

  // What censorship resistance protects, as prose subsections under
  // "An alternative when institutions fail".
  const affordances = [
    {
      id: "participate",
      title: t("page-open-access-participate-title"),
      descriptions: [
        t("page-open-access-participate-description-1"),
        t("page-open-access-participate-description-2"),
      ],
    },
    {
      id: "publish",
      title: t("page-open-access-publish-title"),
      descriptions: [
        t("page-open-access-publish-description-1"),
        t("page-open-access-publish-description-2"),
      ],
    },
    {
      id: "build",
      title: t("page-open-access-build-title"),
      descriptions: [
        t("page-open-access-build-description-1"),
        t("page-open-access-build-description-2"),
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
              <ListItem>
                {t.rich("page-open-access-summary-item-1", { strong: Strong })}
              </ListItem>
              <ListItem>
                {t.rich("page-open-access-summary-item-2", { strong: Strong })}
              </ListItem>
              <ListItem>
                {t.rich("page-open-access-summary-item-3", { strong: Strong })}
              </ListItem>
              <ListItem>
                {t.rich("page-open-access-summary-item-4", { strong: Strong })}
              </ListItem>
            </UnorderedList>
          </CardContent>
        </Card>

        <Section id={sections.frozen.id}>
          <h2>{sections.frozen.title}</h2>
          <p>{t("page-open-access-frozen-description-1")}</p>
          {/* Markers sit outside the strings so translators never carry the
              numbering; both sources are cited under Further reading. */}
          <p>
            {t("page-open-access-frozen-description-2")}
            {footnote(1, sections.frozen.id)}
          </p>
          <p>{t("page-open-access-frozen-description-3")}</p>
          <p>
            {t("page-open-access-frozen-description-4")}
            {footnote(2, sections.frozen.id)}
          </p>
          <p>{t("page-open-access-frozen-description-5")}</p>
          <Image
            src={ethVaultImg}
            alt={t("page-open-access-frozen-image-alt")}
            className="mx-auto max-h-48 w-auto object-contain"
            sizes="240px"
          />
        </Section>

        <Section id={sections.freedom.id}>
          <h2>{sections.freedom.title}</h2>
          <p>
            <strong>{t("page-open-access-freedom-lead")}</strong>
          </p>
          <p>{t("page-open-access-freedom-description-1")}</p>
          <p>{t("page-open-access-freedom-description-2")}</p>

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
                </p>
                <p>{t("page-open-access-emergency-description-3")}</p>
                <p>{t("page-open-access-emergency-description-4")}</p>
              </AlertDescription>
            </AlertContent>
          </Alert>

          {affordances.map(({ id, title, descriptions }) => (
            <div key={id} className="flow">
              <h3>{title}</h3>
              {descriptions.map((description) => (
                <p key={description}>{description}</p>
              ))}
            </div>
          ))}
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
          <p>{t("page-open-access-eth-description-1")}</p>
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
        </Section>

        <Section id={sections.resources.id}>
          <h2>{sections.resources.title}</h2>

          {/* Numbered: the targets of the [1]-[2] markers in the body. */}
          <OrderedList>
            <ListItem>
              {t.rich("page-open-access-reference-cfpb", {
                link: linkTo(
                  "https://www.consumerfinance.gov/data-research/research-reports/2025-consumer-response-annual-report/",
                  sections.resources.id,
                  "CFPB Consumer Response Annual Report"
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
          </OrderedList>
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
