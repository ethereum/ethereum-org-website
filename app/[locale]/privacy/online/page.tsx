import {
  ArrowDown,
  AtSign,
  Cookie,
  EyeOff,
  Fingerprint,
  Mail,
  MessagesSquare,
  ScrollText,
  Search,
  ShieldOff,
  SignalHigh,
  SlidersHorizontal,
  UserMinus,
  WandSparkles,
} from "lucide-react"
import type { StaticImageData } from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"

import type { Lang, MatomoEventOptions, ToCItem } from "@/lib/types"

import AppCard from "@/components/AppCard"
import AppsExpander from "@/components/AppsExpander"
import PathwayCard from "@/components/cards/pathway-card"
import PageHero from "@/components/Hero/PageHero"
import { Image } from "@/components/Image"
import MarkdownVideo from "@/components/Image/MarkdownVideo"
import { Emphasis, Strong } from "@/components/IntlStringElements"
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
import { Grid, type GridProps } from "@/components/ui/grid"
import Link from "@/components/ui/Link"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import VideoWatch from "@/components/Videos/VideoWatch"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import PageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import effBannerImg from "@/public/assets/open-source/electronic-frontier-foundation-banner.png"
import torBannerImg from "@/public/assets/open-source/tor-project-banner.png"
import ludlowBannerImg from "@/public/assets/privacy-online/ludlow-institute-banner.png"
import noybBannerImg from "@/public/assets/privacy-online/noyb-banner.png"
import privacyInternationalBannerImg from "@/public/assets/privacy-online/privacy-international-banner.png"
import web3privacyBannerImg from "@/public/assets/privacy-online/web3privacy-now-banner.png"
import developersEthBlocksImg from "@/public/images/developers-eth-blocks.png"
// Logos shared with /open-source are imported from there rather than copied.
// TODO: move the app catalog somewhere both pages can read it.
import bitwardenImg from "@/public/images/open-source/bitwarden.png"
import braveImg from "@/public/images/open-source/brave.png"
import cryptomatorImg from "@/public/images/open-source/cryptomator.png"
import entePhotosImg from "@/public/images/open-source/ente-photos.png"
import firefoxImg from "@/public/images/open-source/firefox.png"
import grapheneosImg from "@/public/images/open-source/grapheneos.png"
import organicMapsImg from "@/public/images/open-source/organic-maps.png"
import signalImg from "@/public/images/open-source/signal.png"
import heroImg from "@/public/images/privacy-curtains-woman-cat-computer.png"
import twofasImg from "@/public/images/privacy-online/2fas.png"
import addyImg from "@/public/images/privacy-online/addy-io.png"
import duckduckgoImg from "@/public/images/privacy-online/duckduckgo.png"
import fdroidImg from "@/public/images/privacy-online/f-droid.png"
import mullvadImg from "@/public/images/privacy-online/mullvad.png"
import mysudoImg from "@/public/images/privacy-online/mysudo.png"
import notesnookImg from "@/public/images/privacy-online/notesnook.png"
import protonMailImg from "@/public/images/privacy-online/proton-mail.png"
import protonVpnImg from "@/public/images/privacy-online/proton-vpn.png"
import quad9Img from "@/public/images/privacy-online/quad9.png"
import sessionImg from "@/public/images/privacy-online/session.png"
import simpleloginImg from "@/public/images/privacy-online/simplelogin.png"
import simplexImg from "@/public/images/privacy-online/simplex-chat.png"
import tailsImg from "@/public/images/privacy-online/tails.png"
import torBrowserImg from "@/public/images/privacy-online/tor-browser.png"
import tutaImg from "@/public/images/privacy-online/tuta.png"
import ublockOriginImg from "@/public/images/privacy-online/ublock-origin.png"
import privacyWhyImg from "@/public/images/three-people-cat-butterflies-petting-dog.png"

// The first run of app cards; the rest sit behind "show more". The order is
// fixed rather than shuffled -- the visible run mirrors the tip cards above it
// (browser, search, blocking, messaging, email).
const VISIBLE_APP_COUNT = 12

// The Summary card is the article's first block, so the hero CTA targets it.
const SUMMARY_ID = "summary"

const Page = async (props: { params: Promise<{ locale: Lang }> }) => {
  const params = await props.params
  const { locale } = params
  setRequestLocale(locale)

  const t = await getTranslations("page-privacy-online")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("privacy/online", locale)

  // Keyed rather than positional: sections get reordered, and an <h2> rendering
  // under another section's anchor is invisible in review.
  const sections = {
    tools: {
      id: "use-online-privacy-tools",
      title: t("page-privacy-online-tools-title"),
    },
    settings: {
      id: "optimize-privacy-settings",
      title: t("page-privacy-online-settings-title"),
    },
    apps: {
      id: "privacy-default-apps",
      title: t("page-privacy-online-apps-title"),
    },
    vpn: {
      id: "what-a-vpn-does",
      title: t("page-privacy-online-vpn-title"),
    },
    resources: {
      id: "organizations-defending-your-privacy",
      title: t("page-privacy-online-resources-title"),
    },
    policies: {
      id: "navigate-privacy-policies",
      title: t("page-privacy-online-policies-title"),
    },
    furtherReading: {
      id: "further-reading",
      title: t("page-privacy-online-further-reading-title"),
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
    eventCategory: "privacy-online",
    eventAction: section,
    eventName: name,
  })

  // Footnote marker for the numbered citations under Further reading. Rendered
  // outside the strings so translators never carry the numbering.
  const footnote = (n: number, section: string) => (
    <sup>
      <Link
        href={`#${sections.furtherReading.id}`}
        customEventOptions={track(section, `Footnote ${n}`)}
      >{`[${n}]`}</Link>
    </sup>
  )

  // `t.rich` tag that leaves the claim as plain text and trails a footnote.
  const cite = (n: number, section: string) => {
    const Cited = (chunks: ReactNode) => (
      <>
        {chunks}
        {footnote(n, section)}
      </>
    )
    Cited.displayName = "Cited"
    return Cited
  }

  // `t.rich` link placeholder, pre-wired to Matomo.
  const linkTo = (href: string, section: string, name: string) => {
    const TrackedLink = (chunks: ReactNode) => (
      <Link href={href} customEventOptions={track(section, name)}>
        {chunks}
      </Link>
    )
    TrackedLink.displayName = "TrackedLink"
    return TrackedLink
  }

  type Tip = {
    id: string
    icon: ReactNode
    title: string
    description: ReactNode
  }

  const tools: Tip[] = [
    {
      id: "search",
      icon: <Search />,
      title: t("page-privacy-online-tools-search-title"),
      description: t.rich("page-privacy-online-tools-search-description", {
        strong: Strong,
      }),
    },
    {
      id: "blocking",
      icon: <EyeOff />,
      title: t("page-privacy-online-tools-blocking-title"),
      description: t.rich("page-privacy-online-tools-blocking-description", {
        strong: Strong,
      }),
    },
    {
      id: "messaging",
      icon: <MessagesSquare />,
      title: t("page-privacy-online-tools-messaging-title"),
      description: t.rich("page-privacy-online-tools-messaging-description", {
        strong: Strong,
      }),
    },
    {
      id: "email",
      icon: <Mail />,
      title: t("page-privacy-online-tools-email-title"),
      description: t.rich("page-privacy-online-tools-email-description", {
        strong: Strong,
      }),
    },
    {
      id: "aliases",
      icon: <AtSign />,
      title: t("page-privacy-online-tools-aliases-title"),
      description: t.rich("page-privacy-online-tools-aliases-description", {
        strong: Strong,
      }),
    },
    {
      id: "signin",
      icon: <Fingerprint />,
      title: t("page-privacy-online-tools-signin-title"),
      description: t.rich("page-privacy-online-tools-signin-description", {
        strong: Strong,
      }),
    },
  ]

  const settings: Tip[] = [
    {
      id: "devices",
      icon: <SlidersHorizontal />,
      title: t("page-privacy-online-settings-devices-title"),
      description: t("page-privacy-online-settings-devices-description"),
    },
    {
      id: "gpc",
      icon: <SignalHigh />,
      title: t("page-privacy-online-settings-gpc-title"),
      description: t("page-privacy-online-settings-gpc-description"),
    },
    {
      id: "cookies",
      icon: <Cookie />,
      title: t("page-privacy-online-settings-cookies-title"),
      description: t("page-privacy-online-settings-cookies-description"),
    },
  ]

  // Free routes only: Consumer Reports measured paid removal services doing
  // worse than filing by hand, so neither is named here.
  const policies: Tip[] = [
    {
      id: "optout",
      icon: <UserMinus />,
      title: t("page-privacy-online-policies-optout-title"),
      description: t("page-privacy-online-policies-optout-description"),
    },
    {
      id: "registry",
      icon: <WandSparkles />,
      title: t("page-privacy-online-policies-registry-title"),
      description: t.rich("page-privacy-online-policies-registry-description", {
        link: linkTo(
          "https://www.consumer.drop.privacy.ca.gov",
          sections.policies.id,
          "California DROP"
        ),
      }),
    },
    {
      id: "manual",
      icon: <ScrollText />,
      title: t("page-privacy-online-policies-manual-title"),
      description: t("page-privacy-online-policies-manual-description"),
    },
  ]

  // Shared across apps -- one string per category, not per app.
  const categories = {
    browser: t("page-privacy-online-category-browser"),
    search: t("page-privacy-online-category-search"),
    blocking: t("page-privacy-online-category-blocking"),
    messaging: t("page-privacy-online-category-messaging"),
    passwords: t("page-privacy-online-category-passwords"),
    phone: t("page-privacy-online-category-phone"),
    email: t("page-privacy-online-category-email"),
    aliases: t("page-privacy-online-category-aliases"),
    vpn: t("page-privacy-online-category-vpn"),
    dns: t("page-privacy-online-category-dns"),
    twoFactor: t("page-privacy-online-category-two-factor"),
    photos: t("page-privacy-online-category-photos"),
    fileEncryption: t("page-privacy-online-category-file-encryption"),
    notes: t("page-privacy-online-category-notes"),
    maps: t("page-privacy-online-category-maps"),
    mobileOs: t("page-privacy-online-category-mobile-os"),
    desktopOs: t("page-privacy-online-category-desktop-os"),
    appStore: t("page-privacy-online-category-app-store"),
  }

  // Hard-coded rather than read from the apps dataset: these are mainstream
  // consumer privacy tools, not Ethereum apps, so they get no /apps/<slug>
  // page and `CategoryAppsGrid` -- keyed by `AppCategoryEnum` -- cannot render
  // them. Grouped by category so like apps stay adjacent in the grid.
  const apps: {
    id: string
    href: string
    logo: StaticImageData
    name: string
    description: string
    category: string
    /** Monochrome marks are drawn in black and disappear on the dark background. */
    invertOnDark?: boolean
  }[] = [
    {
      id: "brave",
      href: "https://brave.com",
      logo: braveImg,
      name: t("page-privacy-online-app-brave-name"),
      description: t("page-privacy-online-app-brave-description"),
      category: categories.browser,
    },
    {
      id: "firefox",
      href: "https://www.mozilla.org/firefox",
      logo: firefoxImg,
      name: t("page-privacy-online-app-firefox-name"),
      description: t("page-privacy-online-app-firefox-description"),
      category: categories.browser,
    },
    {
      id: "mullvad-browser",
      href: "https://mullvad.net/browser",
      logo: mullvadImg,
      name: t("page-privacy-online-app-mullvad-browser-name"),
      description: t("page-privacy-online-app-mullvad-browser-description"),
      category: categories.browser,
    },
    {
      id: "tor-browser",
      href: "https://www.torproject.org/download/",
      logo: torBrowserImg,
      name: t("page-privacy-online-app-tor-browser-name"),
      description: t("page-privacy-online-app-tor-browser-description"),
      category: categories.browser,
    },
    {
      id: "brave-search",
      href: "https://search.brave.com",
      logo: braveImg,
      name: t("page-privacy-online-app-brave-search-name"),
      description: t("page-privacy-online-app-brave-search-description"),
      category: categories.search,
    },
    {
      id: "duckduckgo",
      href: "https://duckduckgo.com",
      logo: duckduckgoImg,
      name: t("page-privacy-online-app-duckduckgo-name"),
      description: t("page-privacy-online-app-duckduckgo-description"),
      category: categories.search,
    },
    {
      id: "ublock-origin",
      href: "https://ublockorigin.com",
      logo: ublockOriginImg,
      name: t("page-privacy-online-app-ublock-origin-name"),
      description: t("page-privacy-online-app-ublock-origin-description"),
      category: categories.blocking,
    },
    {
      id: "signal",
      href: "https://signal.org",
      logo: signalImg,
      name: t("page-privacy-online-app-signal-name"),
      description: t("page-privacy-online-app-signal-description"),
      category: categories.messaging,
    },
    {
      id: "session",
      href: "https://getsession.org",
      logo: sessionImg,
      name: t("page-privacy-online-app-session-name"),
      description: t("page-privacy-online-app-session-description"),
      category: categories.messaging,
    },
    {
      id: "simplex",
      href: "https://simplex.chat",
      logo: simplexImg,
      name: t("page-privacy-online-app-simplex-name"),
      description: t("page-privacy-online-app-simplex-description"),
      category: categories.messaging,
    },
    {
      id: "proton-mail",
      href: "https://proton.me/mail",
      logo: protonMailImg,
      name: t("page-privacy-online-app-proton-mail-name"),
      description: t("page-privacy-online-app-proton-mail-description"),
      category: categories.email,
    },
    {
      id: "tuta",
      href: "https://tuta.com",
      logo: tutaImg,
      name: t("page-privacy-online-app-tuta-name"),
      description: t("page-privacy-online-app-tuta-description"),
      category: categories.email,
    },
    {
      id: "simplelogin",
      href: "https://simplelogin.io",
      logo: simpleloginImg,
      name: t("page-privacy-online-app-simplelogin-name"),
      description: t("page-privacy-online-app-simplelogin-description"),
      category: categories.aliases,
    },
    {
      id: "addy",
      href: "https://addy.io",
      logo: addyImg,
      name: t("page-privacy-online-app-addy-name"),
      description: t("page-privacy-online-app-addy-description"),
      category: categories.aliases,
    },
    {
      id: "mysudo",
      href: "https://mysudo.com",
      logo: mysudoImg,
      name: t("page-privacy-online-app-mysudo-name"),
      description: t("page-privacy-online-app-mysudo-description"),
      category: categories.phone,
    },
    {
      id: "mullvad-vpn",
      href: "https://mullvad.net/vpn",
      logo: mullvadImg,
      name: t("page-privacy-online-app-mullvad-vpn-name"),
      description: t("page-privacy-online-app-mullvad-vpn-description"),
      category: categories.vpn,
    },
    {
      id: "proton-vpn",
      href: "https://protonvpn.com",
      logo: protonVpnImg,
      name: t("page-privacy-online-app-proton-vpn-name"),
      description: t("page-privacy-online-app-proton-vpn-description"),
      category: categories.vpn,
    },
    {
      id: "quad9",
      href: "https://quad9.net",
      logo: quad9Img,
      name: t("page-privacy-online-app-quad9-name"),
      description: t("page-privacy-online-app-quad9-description"),
      category: categories.dns,
    },
    {
      id: "grapheneos",
      href: "https://grapheneos.org",
      logo: grapheneosImg,
      invertOnDark: true,
      name: t("page-privacy-online-app-grapheneos-name"),
      description: t("page-privacy-online-app-grapheneos-description"),
      category: categories.mobileOs,
    },
    {
      id: "tails",
      href: "https://tails.net",
      logo: tailsImg,
      name: t("page-privacy-online-app-tails-name"),
      description: t("page-privacy-online-app-tails-description"),
      category: categories.desktopOs,
    },
    {
      id: "ente-photos",
      href: "https://ente.io",
      logo: entePhotosImg,
      name: t("page-privacy-online-app-ente-photos-name"),
      description: t("page-privacy-online-app-ente-photos-description"),
      category: categories.photos,
    },
    {
      id: "cryptomator",
      href: "https://cryptomator.org",
      logo: cryptomatorImg,
      name: t("page-privacy-online-app-cryptomator-name"),
      description: t("page-privacy-online-app-cryptomator-description"),
      category: categories.fileEncryption,
    },
    {
      id: "notesnook",
      href: "https://notesnook.com",
      logo: notesnookImg,
      name: t("page-privacy-online-app-notesnook-name"),
      description: t("page-privacy-online-app-notesnook-description"),
      category: categories.notes,
    },
    {
      id: "organic-maps",
      href: "https://organicmaps.app",
      logo: organicMapsImg,
      name: t("page-privacy-online-app-organic-maps-name"),
      description: t("page-privacy-online-app-organic-maps-description"),
      category: categories.maps,
    },
    {
      id: "f-droid",
      href: "https://f-droid.org",
      logo: fdroidImg,
      name: t("page-privacy-online-app-f-droid-name"),
      description: t("page-privacy-online-app-f-droid-description"),
      category: categories.appStore,
    },
    {
      id: "bitwarden",
      href: "https://bitwarden.com",
      logo: bitwardenImg,
      name: t("page-privacy-online-app-bitwarden-name"),
      description: t("page-privacy-online-app-bitwarden-description"),
      category: categories.passwords,
    },
    {
      id: "2fas",
      href: "https://2fas.com",
      logo: twofasImg,
      name: t("page-privacy-online-app-2fas-name"),
      description: t("page-privacy-online-app-2fas-description"),
      category: categories.twoFactor,
    },
  ]

  // The grid is capped at six; everything else is listed as a plain link below.
  const resources = [
    {
      id: "eff",
      href: "https://www.eff.org",
      banner: effBannerImg,
      name: t("page-privacy-online-resource-eff-name"),
      description: t("page-privacy-online-resource-eff-description"),
    },
    {
      id: "tor",
      href: "https://www.torproject.org",
      banner: torBannerImg,
      name: t("page-privacy-online-resource-tor-name"),
      description: t("page-privacy-online-resource-tor-description"),
    },
    {
      id: "ludlow",
      href: "https://ludlowinstitute.org",
      banner: ludlowBannerImg,
      name: t("page-privacy-online-resource-ludlow-name"),
      description: t("page-privacy-online-resource-ludlow-description"),
    },
    {
      id: "web3privacy",
      href: "https://web3privacy.info",
      banner: web3privacyBannerImg,
      name: t("page-privacy-online-resource-web3privacy-name"),
      description: t("page-privacy-online-resource-web3privacy-description"),
    },
    {
      id: "privacy-international",
      href: "https://www.privacyinternational.org",
      banner: privacyInternationalBannerImg,
      name: t("page-privacy-online-resource-privacy-international-name"),
      description: t(
        "page-privacy-online-resource-privacy-international-description"
      ),
    },
    {
      id: "noyb",
      href: "https://noyb.eu",
      banner: noybBannerImg,
      name: t("page-privacy-online-resource-noyb-name"),
      description: t("page-privacy-online-resource-noyb-description"),
    },
  ]

  const moreResources = [
    { id: "access-now", href: "https://www.accessnow.org" },
    { id: "fpf", href: "https://freedom.press/digisec/" },
    { id: "security-in-a-box", href: "https://securityinabox.org/en/" },
    { id: "prc", href: "https://www.privacyrights.org/resources" },
    { id: "newsguild", href: "https://www.nyguild.org/digital-security" },
  ]

  const renderTips = (tips: Tip[], size: GridProps["size"] = "slim") => (
    <Grid columns={3} size={size} data-flow="cta">
      {tips.map(({ id, icon, title, description }) => (
        <Card key={id}>
          <CardHeader>
            <CardIconContainer>{icon}</CardIconContainer>
          </CardHeader>
          <CardContent>
            <CardTitle asChild>
              <h3>{title}</h3>
            </CardTitle>
            <CardParagraph>{description}</CardParagraph>
          </CardContent>
        </Card>
      ))}
    </Grid>
  )

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
            breadcrumbs={{ slug: "privacy/online" }}
            heroImg={heroImg}
            title={t("page-privacy-online-title")}
            description={t("page-privacy-online-hero-description")}
            buttons={[
              {
                content: t("page-privacy-online-hero-cta"),
                href: `#${SUMMARY_ID}`,
              },
            ]}
          />
        }
        tocItems={tocItems}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      >
        <Section id={SUMMARY_ID}>
          <Card size="lg">
            <CardContent>
              <CardTitle size="lg" asChild>
                <h2>{t("page-privacy-online-summary-title")}</h2>
              </CardTitle>
              <UnorderedList className="mb-0">
                <ListItem>
                  {t.rich("page-privacy-online-summary-item-1", {
                    strong: Strong,
                  })}
                </ListItem>
                <ListItem>
                  {t.rich("page-privacy-online-summary-item-2", {
                    strong: Strong,
                  })}
                </ListItem>
                <ListItem>
                  {t.rich("page-privacy-online-summary-item-3", {
                    strong: Strong,
                  })}
                </ListItem>
                <ListItem>
                  {t.rich("page-privacy-online-summary-item-4", {
                    strong: Strong,
                  })}
                </ListItem>
              </UnorderedList>
            </CardContent>
          </Card>
        </Section>

        <Section>
          <p>{t("page-privacy-online-how-description-1")}</p>
          <p>{t("page-privacy-online-how-description-2")}</p>
        </Section>

        <Section id={sections.tools.id}>
          <h2>{sections.tools.title}</h2>
          <p>{t("page-privacy-online-tools-description")}</p>
          <p>
            {t.rich("page-privacy-online-tools-browser-first", {
              strong: Strong,
              browserShare: cite(1, sections.tools.id),
              searchShare: cite(2, sections.tools.id),
              em: Emphasis,
            })}
          </p>
          <Callout
            id="start-with-brave"
            title={t("page-privacy-online-tools-browser-callout-title")}
            description={t(
              "page-privacy-online-tools-browser-callout-description"
            )}
            image={braveImg}
            variant="sm"
            as="h3"
          >
            <ButtonLink
              href="https://brave.com"
              customEventOptions={track(sections.tools.id, "Brave")}
            >
              {t("page-privacy-online-tools-browser-callout-cta")}
            </ButtonLink>
            <ButtonLink
              href="https://brave.com/compare/chrome-vs-brave/"
              variant="outline"
              customEventOptions={track(sections.tools.id, "Brave vs Chrome")}
            >
              {t("page-privacy-online-tools-browser-callout-compare")}
            </ButtonLink>
          </Callout>
          <p>{t("page-privacy-online-tools-browser-tests")}</p>
          <p>
            <Link
              href="https://privacytests.org"
              customEventOptions={track(sections.tools.id, "PrivacyTests")}
            >
              {t("page-privacy-online-tools-browser-tests-cta")}
            </Link>
          </p>

          {renderTips(tools, "narrow")}
          <p>
            <Link
              href={`#${sections.apps.id}`}
              customEventOptions={track(sections.tools.id, "Jump to apps")}
            >
              {t("page-privacy-online-tools-jump-to-apps")}
              <ArrowDown className="ms-1 inline size-4 align-text-bottom" />
            </Link>
          </p>
          <VideoWatch slug="privacy-fixes-most-people-never-make" />
        </Section>

        <Section id={sections.settings.id}>
          <h2>{sections.settings.title}</h2>
          <p>{t("page-privacy-online-settings-description")}</p>
          {renderTips(settings)}
          <MarkdownVideo
            src="/assets/privacy-online/reject-cookies.mp4#1280x720"
            poster="/assets/privacy-online/reject-cookies-poster.jpg"
            alt={t("page-privacy-online-settings-cookies-clip-alt")}
          />
        </Section>

        <Section id={sections.apps.id}>
          <h2>{sections.apps.title}</h2>
          <p>{t("page-privacy-online-apps-description")}</p>
          <AppsExpander matomoEvent={track(sections.apps.id, "Show more apps")}>
            <Grid columns={3} size="narrow" className="my-space-2x">
              {apps.map(
                (
                  { id, href, name, description, category, logo, invertOnDark },
                  index
                ) => (
                  <AppCard
                    key={id}
                    name={name}
                    description={description}
                    // 27 cards is ~9 phone screens with descriptions shown
                    descriptionClassName="hidden md:block"
                    descriptionMaxLines={6}
                    descriptionExpandable={false}
                    nameClassName="line-clamp-2 text-base leading-tight sm:text-lg"
                    thumbnail={logo.src}
                    tags={[category]}
                    href={href}
                    customEventOptions={track(sections.apps.id, id)}
                    className={cn(
                      invertOnDark && "dark:[&_img]:invert",
                      index >= VISIBLE_APP_COUNT &&
                        "group-data-[expanded=false]/apps:hidden"
                    )}
                  />
                )
              )}
            </Grid>
          </AppsExpander>
          <p>
            {t.rich("page-privacy-online-apps-more", {
              privacyGuides: linkTo(
                "https://www.privacyguides.org",
                sections.apps.id,
                "Privacy Guides"
              ),
              awesomePrivacy: linkTo(
                "https://awesome-privacy.xyz",
                sections.apps.id,
                "Awesome Privacy"
              ),
            })}
          </p>
        </Section>

        <Section id={sections.vpn.id}>
          <h2>{sections.vpn.title}</h2>
          <Alert>
            <AlertIcon size="lg">
              <ShieldOff />
            </AlertIcon>
            <AlertContent>
              <AlertTitle size="lg">
                {t("page-privacy-online-vpn-alert-title")}
              </AlertTitle>
              <AlertDescription>
                <p>
                  {t.rich("page-privacy-online-vpn-alert-description", {
                    strong: Strong,
                  })}
                </p>
              </AlertDescription>
            </AlertContent>
          </Alert>

          <p data-flow="cta">{t("page-privacy-online-vpn-table-lead")}</p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("page-privacy-online-vpn-table-does")}</TableHead>
                <TableHead>
                  {t("page-privacy-online-vpn-table-does-not")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4].map((n) => (
                <TableRow key={n}>
                  <TableCell>
                    {t(`page-privacy-online-vpn-table-${n}-does`)}
                  </TableCell>
                  <TableCell>
                    {t(`page-privacy-online-vpn-table-${n}-not`)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <p>{t.rich("page-privacy-online-vpn-trust", { strong: Strong })}</p>
          <p>{t("page-privacy-online-vpn-criteria-lead")}</p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-privacy-online-vpn-criteria-1", { strong: Strong })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-online-vpn-criteria-2", { strong: Strong })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-online-vpn-criteria-3", { strong: Strong })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-online-vpn-criteria-4", { strong: Strong })}
            </ListItem>
          </UnorderedList>

          <h3>{t("page-privacy-online-vpn-tor-title")}</h3>
          <p>{t("page-privacy-online-vpn-tor-description-1")}</p>
          <p>{t("page-privacy-online-vpn-tor-description-2")}</p>
          <p>{t("page-privacy-online-vpn-tor-description-3")}</p>
          <p>
            {t.rich("page-privacy-online-vpn-tor-learn-more", {
              link: linkTo(
                "https://www.privacyguides.org/en/advanced/tor-overview/",
                sections.vpn.id,
                "Tor overview"
              ),
            })}
          </p>

          <h3>{t("page-privacy-online-vpn-relay-title")}</h3>
          <p>{t("page-privacy-online-vpn-relay-description")}</p>
        </Section>

        <Section id={sections.resources.id}>
          <h2>{sections.resources.title}</h2>
          <p>{t("page-privacy-online-resources-description")}</p>
          <Grid columns={3} size="narrow" className="my-space-2x">
            {resources.map(({ id, href, name, description, banner }) => (
              <Card
                key={id}
                href={href}
                variant="ghost"
                size="sm"
                customEventOptions={track(sections.resources.id, id)}
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
          <p>{t("page-privacy-online-resources-more")}</p>
          <UnorderedList>
            {moreResources.map(({ id, href }) => (
              <ListItem key={id}>
                {t.rich(`page-privacy-online-resource-${id}`, {
                  link: linkTo(href, sections.resources.id, id),
                })}
              </ListItem>
            ))}
          </UnorderedList>
        </Section>

        <Section id={sections.policies.id}>
          <h2>{sections.policies.title}</h2>
          <p>{t("page-privacy-online-policies-description")}</p>
          <p>
            {t.rich("page-privacy-online-policies-services", {
              crStudy: cite(3, sections.policies.id),
              privacyGuidesRemovals: cite(4, sections.policies.id),
            })}
          </p>
          {renderTips(policies)}
        </Section>

        <Section id={sections.furtherReading.id}>
          <h2>{sections.furtherReading.title}</h2>
          <OrderedList>
            <ListItem>
              {t.rich("page-privacy-online-reference-browser-share", {
                link: linkTo(
                  "https://gs.statcounter.com/browser-market-share",
                  sections.furtherReading.id,
                  "Statcounter browsers"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-online-reference-search-share", {
                link: linkTo(
                  "https://gs.statcounter.com/search-engine-market-share",
                  sections.furtherReading.id,
                  "Statcounter search"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-online-reference-cr-removal-services", {
                link: linkTo(
                  "https://advocacy.consumerreports.org/press_release/consumer-reports-evaluation-of-people-search-site-removal-services-finds-that-they-are-largely-ineffective/",
                  sections.furtherReading.id,
                  "Consumer Reports removal services"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-privacy-online-reference-privacy-guides-removals", {
                link: linkTo(
                  "https://www.privacyguides.org/en/data-broker-removals/",
                  sections.furtherReading.id,
                  "Privacy Guides data broker removals"
                ),
              })}
            </ListItem>
          </OrderedList>
        </Section>

        <Section>
          <PathwayCard
            href="/privacy/"
            title={t("page-privacy-online-pathway-1-title")}
            description={t("page-privacy-online-pathway-1-description")}
            banner={<Image src={privacyWhyImg} alt="" sizes="160px" />}
          />
          <PathwayCard
            href="/privacy/ethereum/"
            title={t("page-privacy-online-pathway-2-title")}
            description={t("page-privacy-online-pathway-2-description")}
            banner={<Image src={developersEthBlocksImg} alt="" sizes="160px" />}
          />
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

  const t = await getTranslations("page-privacy-online")

  return await getMetadata({
    locale,
    slug: ["privacy", "online"],
    title: t("page-privacy-online-title"),
    description: t("page-privacy-online-meta-description"),
  })
}

export default Page
