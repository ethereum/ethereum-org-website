import {
  AppWindow,
  Cookie,
  EyeOff,
  KeyRound,
  Mail,
  MessagesSquare,
  ScrollText,
  ShieldCheck,
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
import { Strong } from "@/components/IntlStringElements"
import {
  Card,
  CardBanner,
  CardContent,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import Link from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"
import VideoWatch from "@/components/Videos/VideoWatch"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import PageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import awesomePrivacyBannerImg from "@/public/assets/privacy-online/awesome-privacy-banner.png"
import fpfBannerImg from "@/public/assets/privacy-online/freedom-of-the-press-foundation-banner.png"
import frontLineDefendersBannerImg from "@/public/assets/privacy-online/front-line-defenders-banner.png"
import privacyGuidesBannerImg from "@/public/assets/privacy-online/privacy-guides-banner.png"
import ssdBannerImg from "@/public/assets/privacy-online/surveillance-self-defense-banner.png"
import web3privacyBannerImg from "@/public/assets/privacy-online/web3privacy-now-banner.png"
import developersEthBlocksImg from "@/public/images/developers-eth-blocks.png"
import heroImg from "@/public/images/doge-computer.png"
// Logos shared with /open-source are imported from there rather than copied.
// TODO: move the app catalog somewhere both pages can read it.
import bitwardenImg from "@/public/images/open-source/bitwarden.png"
import cryptomatorImg from "@/public/images/open-source/cryptomator.png"
import entePhotosImg from "@/public/images/open-source/ente-photos.png"
import firefoxImg from "@/public/images/open-source/firefox.png"
import grapheneosImg from "@/public/images/open-source/grapheneos.png"
import organicMapsImg from "@/public/images/open-source/organic-maps.png"
import signalImg from "@/public/images/open-source/signal.png"
import aegisImg from "@/public/images/privacy-online/aegis.png"
import braveSearchImg from "@/public/images/privacy-online/brave-search.png"
import duckduckgoImg from "@/public/images/privacy-online/duckduckgo.png"
import keepassxcImg from "@/public/images/privacy-online/keepassxc.png"
import mullvadImg from "@/public/images/privacy-online/mullvad.png"
import notesnookImg from "@/public/images/privacy-online/notesnook.png"
import protonMailImg from "@/public/images/privacy-online/proton-mail.png"
import protonVpnImg from "@/public/images/privacy-online/proton-vpn.png"
import quad9Img from "@/public/images/privacy-online/quad9.png"
import simplexImg from "@/public/images/privacy-online/simplex-chat.png"
import torBrowserImg from "@/public/images/privacy-online/tor-browser.png"
import tutaImg from "@/public/images/privacy-online/tuta.png"
import ublockOriginImg from "@/public/images/privacy-online/ublock-origin.png"
import privacyWhyImg from "@/public/images/three-people-cat-butterflies-petting-dog.png"

// The first run of app cards; the rest sit behind "show more". The order is
// fixed rather than shuffled -- the visible run mirrors the tip cards above it
// (browser, messaging, passwords, VPN, blocking, email).
const VISIBLE_APP_COUNT = 12

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
    how: {
      id: "how-to-protect-your-privacy-online",
      title: t("page-privacy-online-how-title"),
    },
    tools: {
      id: "use-online-privacy-tools",
      title: t("page-privacy-online-tools-title"),
    },
    settings: {
      id: "optimize-privacy-settings",
      title: t("page-privacy-online-settings-title"),
    },
    policies: {
      id: "navigate-privacy-policies",
      title: t("page-privacy-online-policies-title"),
    },
    apps: {
      id: "privacy-default-apps",
      title: t("page-privacy-online-apps-title"),
    },
    resources: {
      id: "actionable-resources-and-guides",
      title: t("page-privacy-online-resources-title"),
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

  type Tip = { id: string; icon: ReactNode; title: string; description: string }

  const tools: Tip[] = [
    {
      id: "browser",
      icon: <AppWindow className="size-12 text-primary" />,
      title: t("page-privacy-online-tools-browser-title"),
      description: t("page-privacy-online-tools-browser-description"),
    },
    {
      id: "messaging",
      icon: <MessagesSquare className="size-12 text-primary" />,
      title: t("page-privacy-online-tools-messaging-title"),
      description: t("page-privacy-online-tools-messaging-description"),
    },
    {
      id: "passwords",
      icon: <KeyRound className="size-12 text-primary" />,
      title: t("page-privacy-online-tools-passwords-title"),
      description: t("page-privacy-online-tools-passwords-description"),
    },
    {
      id: "vpn",
      icon: <ShieldCheck className="size-12 text-primary" />,
      title: t("page-privacy-online-tools-vpn-title"),
      description: t("page-privacy-online-tools-vpn-description"),
    },
    {
      id: "blocking",
      icon: <EyeOff className="size-12 text-primary" />,
      title: t("page-privacy-online-tools-blocking-title"),
      description: t("page-privacy-online-tools-blocking-description"),
    },
    {
      id: "email",
      icon: <Mail className="size-12 text-primary" />,
      title: t("page-privacy-online-tools-email-title"),
      description: t("page-privacy-online-tools-email-description"),
    },
  ]

  const settings: Tip[] = [
    {
      id: "gpc",
      icon: <SignalHigh className="size-12 text-primary" />,
      title: t("page-privacy-online-settings-gpc-title"),
      description: t("page-privacy-online-settings-gpc-description"),
    },
    {
      id: "cookies",
      icon: <Cookie className="size-12 text-primary" />,
      title: t("page-privacy-online-settings-cookies-title"),
      description: t("page-privacy-online-settings-cookies-description"),
    },
    {
      id: "devices",
      icon: <SlidersHorizontal className="size-12 text-primary" />,
      title: t("page-privacy-online-settings-devices-title"),
      description: t("page-privacy-online-settings-devices-description"),
    },
  ]

  const policies: Tip[] = [
    {
      id: "optout",
      icon: <UserMinus className="size-12 text-primary" />,
      title: t("page-privacy-online-policies-optout-title"),
      description: t("page-privacy-online-policies-optout-description"),
    },
    {
      id: "manual",
      icon: <ScrollText className="size-12 text-primary" />,
      title: t("page-privacy-online-policies-manual-title"),
      description: t("page-privacy-online-policies-manual-description"),
    },
    {
      id: "automate",
      icon: <WandSparkles className="size-12 text-primary" />,
      title: t("page-privacy-online-policies-automate-title"),
      description: t("page-privacy-online-policies-automate-description"),
    },
  ]

  // Shared across apps -- one string per category, not per app.
  const categories = {
    browser: t("page-privacy-online-category-browser"),
    search: t("page-privacy-online-category-search"),
    messaging: t("page-privacy-online-category-messaging"),
    email: t("page-privacy-online-category-email"),
    passwords: t("page-privacy-online-category-passwords"),
    twoFactor: t("page-privacy-online-category-two-factor"),
    vpn: t("page-privacy-online-category-vpn"),
    blocking: t("page-privacy-online-category-blocking"),
    dns: t("page-privacy-online-category-dns"),
    photos: t("page-privacy-online-category-photos"),
    fileEncryption: t("page-privacy-online-category-file-encryption"),
    notes: t("page-privacy-online-category-notes"),
    maps: t("page-privacy-online-category-maps"),
    mobileOs: t("page-privacy-online-category-mobile-os"),
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
      id: "tor-browser",
      href: "https://www.torproject.org/download/",
      logo: torBrowserImg,
      name: t("page-privacy-online-app-tor-browser-name"),
      description: t("page-privacy-online-app-tor-browser-description"),
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
      id: "firefox",
      href: "https://www.mozilla.org/firefox",
      logo: firefoxImg,
      name: t("page-privacy-online-app-firefox-name"),
      description: t("page-privacy-online-app-firefox-description"),
      category: categories.browser,
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
      id: "simplex",
      href: "https://simplex.chat",
      logo: simplexImg,
      name: t("page-privacy-online-app-simplex-name"),
      description: t("page-privacy-online-app-simplex-description"),
      category: categories.messaging,
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
      id: "keepassxc",
      href: "https://keepassxc.org",
      logo: keepassxcImg,
      name: t("page-privacy-online-app-keepassxc-name"),
      description: t("page-privacy-online-app-keepassxc-description"),
      category: categories.passwords,
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
      id: "ublock-origin",
      href: "https://ublockorigin.com",
      logo: ublockOriginImg,
      name: t("page-privacy-online-app-ublock-origin-name"),
      description: t("page-privacy-online-app-ublock-origin-description"),
      category: categories.blocking,
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
      id: "duckduckgo",
      href: "https://duckduckgo.com",
      logo: duckduckgoImg,
      name: t("page-privacy-online-app-duckduckgo-name"),
      description: t("page-privacy-online-app-duckduckgo-description"),
      category: categories.search,
    },
    {
      id: "brave-search",
      href: "https://search.brave.com",
      logo: braveSearchImg,
      name: t("page-privacy-online-app-brave-search-name"),
      description: t("page-privacy-online-app-brave-search-description"),
      category: categories.search,
    },
    {
      id: "aegis",
      href: "https://getaegis.app",
      logo: aegisImg,
      name: t("page-privacy-online-app-aegis-name"),
      description: t("page-privacy-online-app-aegis-description"),
      category: categories.twoFactor,
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
      id: "grapheneos",
      href: "https://grapheneos.org",
      logo: grapheneosImg,
      invertOnDark: true,
      name: t("page-privacy-online-app-grapheneos-name"),
      description: t("page-privacy-online-app-grapheneos-description"),
      category: categories.mobileOs,
    },
  ]

  // The grid is capped at six; everything else is listed as a plain link below.
  const resources = [
    {
      id: "privacy-guides",
      href: "https://www.privacyguides.org",
      banner: privacyGuidesBannerImg,
      name: t("page-privacy-online-resource-privacy-guides-name"),
      description: t("page-privacy-online-resource-privacy-guides-description"),
    },
    {
      id: "ssd",
      href: "https://ssd.eff.org",
      banner: ssdBannerImg,
      name: t("page-privacy-online-resource-ssd-name"),
      description: t("page-privacy-online-resource-ssd-description"),
    },
    {
      id: "awesome-privacy",
      href: "https://awesome-privacy.xyz",
      banner: awesomePrivacyBannerImg,
      name: t("page-privacy-online-resource-awesome-privacy-name"),
      description: t(
        "page-privacy-online-resource-awesome-privacy-description"
      ),
    },
    {
      id: "fpf",
      href: "https://freedom.press/digisec/",
      banner: fpfBannerImg,
      name: t("page-privacy-online-resource-fpf-name"),
      description: t("page-privacy-online-resource-fpf-description"),
    },
    {
      id: "security-in-a-box",
      href: "https://securityinabox.org/en/",
      banner: frontLineDefendersBannerImg,
      name: t("page-privacy-online-resource-security-in-a-box-name"),
      description: t(
        "page-privacy-online-resource-security-in-a-box-description"
      ),
    },
    {
      id: "web3privacy",
      href: "https://web3privacy.info",
      banner: web3privacyBannerImg,
      name: t("page-privacy-online-resource-web3privacy-name"),
      description: t("page-privacy-online-resource-web3privacy-description"),
    },
  ]

  const moreResources = [
    { id: "ludlow", href: "https://ludlowinstitute.org" },
    { id: "prc", href: "https://www.privacyrights.org/resources" },
    { id: "newsguild", href: "https://www.nyguild.org/digital-security" },
  ]

  const renderTips = (tips: Tip[]) => (
    <Grid columns={3} size="narrow">
      {tips.map(({ id, icon, title, description }) => (
        <Card key={id}>
          <CardContent>
            {icon}
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
                href: tocItems[0].url,
              },
            ]}
          />
        }
        tocItems={tocItems}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      >
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

        <Section id={sections.how.id}>
          <h2>{sections.how.title}</h2>
          <p>{t("page-privacy-online-how-description-1")}</p>
          <p>{t("page-privacy-online-how-description-2")}</p>
        </Section>

        <Section id={sections.tools.id}>
          <h2>{sections.tools.title}</h2>
          <p>{t("page-privacy-online-tools-description")}</p>
          {renderTips(tools)}
          <VideoWatch slug="privacy-fixes-most-people-never-make" />
        </Section>

        <Section id={sections.settings.id}>
          <h2>{sections.settings.title}</h2>
          <p>{t("page-privacy-online-settings-description")}</p>
          {renderTips(settings)}
        </Section>

        <Section id={sections.policies.id}>
          <h2>{sections.policies.title}</h2>
          <p>{t("page-privacy-online-policies-description")}</p>
          {renderTips(policies)}
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
                    // 21 cards is ~8 phone screens with descriptions shown
                    descriptionClassName="hidden md:block"
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
                  link: (chunks) => (
                    <Link
                      href={href}
                      customEventOptions={track(sections.resources.id, id)}
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </ListItem>
            ))}
          </UnorderedList>
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
    title: t("page-privacy-online-meta-title"),
    description: t("page-privacy-online-meta-description"),
  })
}

export default Page
