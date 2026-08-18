import {
  BookOpenCheck,
  DoorOpen,
  HeartPulse,
  Lightbulb,
  Recycle,
  Scale,
  ScanSearch,
  Share,
  SquarePen,
  SquarePlay,
} from "lucide-react"
import type { StaticImageData } from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, ToCItem } from "@/lib/types"

import AppCard from "@/components/AppCard"
import { CopyButton } from "@/components/CopyToClipboard"
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
import Link from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getIdFromHash } from "@/lib/utils/url"

import { GITHUB_REPO_URL } from "@/lib/constants"

import PageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import effBannerImg from "@/public/assets/open-source/electronic-frontier-foundation-banner.png"
import fightForTheFutureBannerImg from "@/public/assets/open-source/fight-for-the-future-banner.png"
import fsfBannerImg from "@/public/assets/open-source/free-software-foundation-banner.png"
import internetArchiveBannerImg from "@/public/assets/open-source/internet-archive-banner.png"
import osiBannerImg from "@/public/assets/open-source/open-source-initiative-banner.png"
import torBannerImg from "@/public/assets/open-source/tor-project-banner.png"
import heroImg from "@/public/images/future_transparent.png"
import alternativeToImg from "@/public/images/open-source/alternativeto-logo.png"
import bitwardenImg from "@/public/images/open-source/bitwarden.png"
import blenderImg from "@/public/images/open-source/blender.png"
import braveImg from "@/public/images/open-source/brave.png"
import cryptomatorImg from "@/public/images/open-source/cryptomator.png"
import debianImg from "@/public/images/open-source/debian.png"
import entePhotosImg from "@/public/images/open-source/ente-photos.png"
import firefoxImg from "@/public/images/open-source/firefox.png"
import gimpImg from "@/public/images/open-source/gimp.png"
import grapheneosImg from "@/public/images/open-source/grapheneos.png"
import homeAssistantImg from "@/public/images/open-source/home-assistant.png"
import immichImg from "@/public/images/open-source/immich.png"
import inkscapeImg from "@/public/images/open-source/inkscape.png"
import libreOfficeImg from "@/public/images/open-source/libreoffice.png"
import localSendImg from "@/public/images/open-source/localsend.png"
import logseqImg from "@/public/images/open-source/logseq.png"
import obsImg from "@/public/images/open-source/obs.png"
import organicMapsImg from "@/public/images/open-source/organic-maps.png"
import signalImg from "@/public/images/open-source/signal.png"
import thunderbirdImg from "@/public/images/open-source/thunderbird.png"
import ubuntuImg from "@/public/images/open-source/ubuntu.png"
import vlcImg from "@/public/images/open-source/vlc.png"

const Page = async (props: { params: Promise<{ locale: Lang }> }) => {
  const params = await props.params
  const { locale } = params
  setRequestLocale(locale)

  const t = await getTranslations("page-open-source")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("open-source", locale)

  const tocItems: ToCItem[] = [
    {
      title: t("page-open-source-ownership-title"),
      url: "#when-the-things-you-buy-stop-being-yours",
    },
    {
      title: t("page-open-source-definition-title"),
      url: "#what-does-free-and-open-source-mean",
    },
    {
      title: t("page-open-source-comparison-title"),
      url: "#proprietary-open-source-and-free-software",
    },
    {
      title: t("page-open-source-possible-title"),
      url: "#what-does-open-source-make-possible",
    },
    {
      title: t("page-open-source-switch-title"),
      url: "#how-to-switch-to-open-source-apps",
    },
    {
      title: t("page-open-source-ai-title"),
      url: "#open-source-and-ai",
    },
    {
      title: t("page-open-source-ethereum-title"),
      url: "#why-is-ethereum-open-source",
    },
    {
      title: t("page-open-source-copyleft-title"),
      url: "#ethereum-runs-on-copyleft",
    },
    {
      title: t("page-open-source-contribute-title"),
      url: "#help-improve-this-page",
    },
    {
      title: t("page-open-source-resources-title"),
      url: "#resources",
    },
  ]

  // The four freedoms, in the order the design lists them.
  const freedoms = [
    {
      id: "run",
      icon: <SquarePlay />,
      title: t("page-open-source-freedom-run-title"),
      description: t("page-open-source-freedom-run-description"),
    },
    {
      id: "study",
      icon: <SquarePen />,
      title: t("page-open-source-freedom-study-title"),
      description: t("page-open-source-freedom-study-description"),
    },
    {
      id: "share",
      icon: <Share />,
      title: t("page-open-source-freedom-share-title"),
      description: t("page-open-source-freedom-share-description"),
    },
    {
      id: "distribute",
      icon: <Recycle />,
      title: t("page-open-source-freedom-distribute-title"),
      description: t("page-open-source-freedom-distribute-description"),
    },
  ]

  const benefits = [
    {
      id: "trust",
      icon: <BookOpenCheck />,
      title: t("page-open-source-benefit-trust-title"),
      description: t("page-open-source-benefit-trust-description"),
    },
    {
      id: "leave",
      icon: <DoorOpen />,
      title: t("page-open-source-benefit-leave-title"),
      description: t("page-open-source-benefit-leave-description"),
    },
    {
      id: "outlives",
      icon: <HeartPulse />,
      title: t("page-open-source-benefit-outlives-title"),
      description: t("page-open-source-benefit-outlives-description"),
    },
  ]

  const comparisonRows = [
    {
      id: "proprietary",
      approach: t("page-open-source-comparison-proprietary-approach"),
      rights: t("page-open-source-comparison-proprietary-rights"),
      licenses: t("page-open-source-comparison-proprietary-licenses"),
      examples: t("page-open-source-comparison-proprietary-examples"),
    },
    {
      id: "source-available",
      approach: t("page-open-source-comparison-source-available-approach"),
      rights: t("page-open-source-comparison-source-available-rights"),
      licenses: t.rich(
        "page-open-source-comparison-source-available-licenses",
        {
          a: (chunks) => <Link href="https://opensource.org/">{chunks}</Link>,
        }
      ),
      examples: t("page-open-source-comparison-source-available-examples"),
    },
    {
      id: "permissive",
      approach: t("page-open-source-comparison-permissive-approach"),
      rights: t("page-open-source-comparison-permissive-rights"),
      licenses: t("page-open-source-comparison-permissive-licenses"),
      examples: t("page-open-source-comparison-permissive-examples"),
    },
    {
      id: "copyleft",
      approach: t("page-open-source-comparison-copyleft-approach"),
      rights: t("page-open-source-comparison-copyleft-rights"),
      licenses: t("page-open-source-comparison-copyleft-licenses"),
      examples: t.rich("page-open-source-comparison-copyleft-examples", {
        strong: Strong,
      }),
    },
  ]

  // Prompt text is copied to the clipboard verbatim -- no markup in these.
  // Pragmatic first (find it, install it, unstick it), scrutiny last.
  const prompts = [
    "alternatives",
    "install",
    "error",
    "reputation",
    "policy",
    "permissions",
  ].map((id) => ({
    id,
    prompt: t(`page-open-source-ai-prompt-${id}-text`),
    description: t(`page-open-source-ai-prompt-${id}-description`),
  }))

  // Shared across apps -- one string per category, not per app.
  const categories = {
    passwords: t("page-open-source-category-passwords"),
    browser: t("page-open-source-category-browser"),
    messaging: t("page-open-source-category-messaging"),
    fileStorage: t("page-open-source-category-file-storage"),
    email: t("page-open-source-category-email"),
    photos: t("page-open-source-category-photos"),
    maps: t("page-open-source-category-maps"),
    media: t("page-open-source-category-media"),
    mobileOs: t("page-open-source-category-mobile-os"),
    desktopOs: t("page-open-source-category-desktop-os"),
    home: t("page-open-source-category-home"),
    productivity: t("page-open-source-category-productivity"),
    fileSharing: t("page-open-source-category-file-sharing"),
    streaming: t("page-open-source-category-streaming"),
    creative: t("page-open-source-category-creative"),
  }

  // TODO: swap org-placeholder.png for each organization's own artwork.
  const organizations = [
    {
      id: "fsf",
      href: "https://www.fsf.org",
      banner: fsfBannerImg,
      name: t("page-open-source-org-fsf-name"),
      description: t("page-open-source-org-fsf-description"),
    },
    {
      id: "eff",
      href: "https://www.eff.org",
      banner: effBannerImg,
      name: t("page-open-source-org-eff-name"),
      description: t("page-open-source-org-eff-description"),
    },
    {
      id: "osi",
      href: "https://opensource.org",
      banner: osiBannerImg,
      name: t("page-open-source-org-osi-name"),
      description: t("page-open-source-org-osi-description"),
    },
    {
      id: "tor",
      href: "https://www.torproject.org",
      banner: torBannerImg,
      name: t("page-open-source-org-tor-name"),
      description: t("page-open-source-org-tor-description"),
    },
    {
      id: "fight-for-the-future",
      href: "https://www.fightforthefuture.org",
      banner: fightForTheFutureBannerImg,
      name: t("page-open-source-org-fight-for-the-future-name"),
      description: t("page-open-source-org-fight-for-the-future-description"),
    },
    {
      id: "internet-archive",
      href: "https://archive.org",
      banner: internetArchiveBannerImg,
      name: t("page-open-source-org-internet-archive-name"),
      description: t("page-open-source-org-internet-archive-description"),
    },
  ]

  // Listed as plain links rather than cards -- the grid is capped at six.
  const moreOrganizations = [
    {
      id: "linux-foundation",
      href: "https://www.linuxfoundation.org",
      name: t("page-open-source-org-linux-foundation-name"),
    },
    {
      id: "ludlow",
      href: "https://www.ludlowinstitute.org",
      name: t("page-open-source-org-ludlow-name"),
    },
    {
      id: "mozilla",
      href: "https://foundation.mozilla.org",
      name: t("page-open-source-org-mozilla-name"),
    },
    {
      id: "sfc",
      href: "https://sfconservancy.org",
      name: t("page-open-source-org-sfc-name"),
    },
    {
      id: "wedf",
      href: "https://worldethicaldata.org",
      name: t("page-open-source-org-wedf-name"),
    },
  ]

  // Hard-coded rather than read from the apps dataset: these are mainstream
  // FLOSS consumer tools, not Ethereum apps, so they get no /apps/<slug> page.
  // `CategoryAppsGrid` can't render them for the same reason -- it is keyed by
  // `AppCategoryEnum` and links every card into /apps/.
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
      id: "bitwarden",
      href: "https://bitwarden.com",
      logo: bitwardenImg,
      name: t("page-open-source-app-bitwarden-name"),
      description: t("page-open-source-app-bitwarden-description"),
      category: categories.passwords,
    },
    {
      id: "brave",
      href: "https://brave.com",
      logo: braveImg,
      name: t("page-open-source-app-brave-name"),
      description: t("page-open-source-app-brave-description"),
      category: categories.browser,
    },
    {
      id: "firefox",
      href: "https://www.mozilla.org/firefox",
      logo: firefoxImg,
      name: t("page-open-source-app-firefox-name"),
      description: t("page-open-source-app-firefox-description"),
      category: categories.browser,
    },
    {
      id: "signal",
      href: "https://signal.org",
      logo: signalImg,
      name: t("page-open-source-app-signal-name"),
      description: t("page-open-source-app-signal-description"),
      category: categories.messaging,
    },
    {
      id: "thunderbird",
      href: "https://www.thunderbird.net",
      logo: thunderbirdImg,
      name: t("page-open-source-app-thunderbird-name"),
      description: t("page-open-source-app-thunderbird-description"),
      category: categories.email,
    },
    {
      id: "ente-photos",
      href: "https://ente.com/",
      logo: entePhotosImg,
      name: t("page-open-source-app-ente-photos-name"),
      description: t("page-open-source-app-ente-photos-description"),
      category: categories.photos,
    },
    {
      id: "immich",
      href: "https://immich.app",
      logo: immichImg,
      name: t("page-open-source-app-immich-name"),
      description: t("page-open-source-app-immich-description"),
      category: categories.photos,
    },
    {
      id: "cryptomator",
      href: "https://cryptomator.org",
      logo: cryptomatorImg,
      name: t("page-open-source-app-cryptomator-name"),
      description: t("page-open-source-app-cryptomator-description"),
      category: categories.fileStorage,
    },
    {
      id: "localsend",
      href: "https://localsend.org",
      logo: localSendImg,
      name: t("page-open-source-app-localsend-name"),
      description: t("page-open-source-app-localsend-description"),
      category: categories.fileSharing,
    },
    {
      id: "organic-maps",
      href: "https://organicmaps.app",
      logo: organicMapsImg,
      name: t("page-open-source-app-organic-maps-name"),
      description: t("page-open-source-app-organic-maps-description"),
      category: categories.maps,
    },
    {
      id: "vlc",
      href: "https://www.videolan.org/vlc",
      logo: vlcImg,
      name: t("page-open-source-app-vlc-name"),
      description: t("page-open-source-app-vlc-description"),
      category: categories.media,
    },
    {
      id: "obs",
      href: "https://obsproject.com",
      logo: obsImg,
      name: t("page-open-source-app-obs-name"),
      description: t("page-open-source-app-obs-description"),
      category: categories.streaming,
    },
    {
      id: "logseq",
      href: "https://logseq.com",
      logo: logseqImg,
      name: t("page-open-source-app-logseq-name"),
      description: t("page-open-source-app-logseq-description"),
      category: categories.productivity,
    },
    {
      id: "libreoffice",
      href: "https://www.libreoffice.org",
      logo: libreOfficeImg,
      name: t("page-open-source-app-libreoffice-name"),
      description: t("page-open-source-app-libreoffice-description"),
      category: categories.productivity,
    },
    {
      id: "blender",
      href: "https://www.blender.org",
      logo: blenderImg,
      name: t("page-open-source-app-blender-name"),
      description: t("page-open-source-app-blender-description"),
      category: categories.creative,
    },
    {
      id: "inkscape",
      href: "https://inkscape.org",
      logo: inkscapeImg,
      invertOnDark: true,
      name: t("page-open-source-app-inkscape-name"),
      description: t("page-open-source-app-inkscape-description"),
      category: categories.creative,
    },
    {
      id: "gimp",
      href: "https://www.gimp.org",
      logo: gimpImg,
      name: t("page-open-source-app-gimp-name"),
      description: t("page-open-source-app-gimp-description"),
      category: categories.creative,
    },
    {
      id: "home-assistant",
      href: "https://www.home-assistant.io",
      logo: homeAssistantImg,
      name: t("page-open-source-app-home-assistant-name"),
      description: t("page-open-source-app-home-assistant-description"),
      category: categories.home,
    },
    {
      id: "grapheneos",
      href: "https://grapheneos.org",
      logo: grapheneosImg,
      invertOnDark: true,
      name: t("page-open-source-app-grapheneos-name"),
      description: t("page-open-source-app-grapheneos-description"),
      category: categories.mobileOs,
    },
    {
      id: "debian",
      href: "https://www.debian.org",
      logo: debianImg,
      name: t("page-open-source-app-debian-name"),
      description: t("page-open-source-app-debian-description"),
      category: categories.desktopOs,
    },
    {
      id: "ubuntu",
      href: "https://ubuntu.com/download",
      logo: ubuntuImg,
      name: t("page-open-source-app-ubuntu-name"),
      description: t("page-open-source-app-ubuntu-description"),
      category: categories.desktopOs,
    },
  ]

  // Only locales gnu.org publishes a translation for; the rest fall back to "en"
  const gnuOrgLocaleMap: Partial<Record<Lang, string>> = {
    en: "en",
    de: "de",
    ar: "fa",
    fr: "fr",
    it: "it",
    ja: "ja",
    ko: "ko",
    "pt-br": "pt-br",
    ru: "ru",
    tr: "tr",
    uk: "uk",
    zh: "zh-cn",
    "zh-tw": "zh-cn",
  }

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
            breadcrumbs={{ slug: "open-source" }}
            heroImg={heroImg}
            title={t("page-open-source-title")}
            description={
              <>
                <p>{t("page-open-source-hero-description-1")}</p>
                <p>{t("page-open-source-hero-description-2")}</p>
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
              <h2>{t("page-open-source-summary-title")}</h2>
            </CardTitle>
            <UnorderedList className="mb-0">
              <ListItem>
                {t.rich("page-open-source-summary-item-1", { strong: Strong })}
              </ListItem>
              <ListItem>
                {t.rich("page-open-source-summary-item-2", { strong: Strong })}
              </ListItem>
              <ListItem>
                {t.rich("page-open-source-summary-item-3", { strong: Strong })}
              </ListItem>
              <ListItem>
                {t.rich("page-open-source-summary-item-4", { strong: Strong })}
              </ListItem>
            </UnorderedList>
          </CardContent>
        </Card>

        <Section id={getIdFromHash(tocItems[0].url)}>
          <h2>{tocItems[0].title}</h2>
          <p>
            {t.rich("page-open-source-ownership-description-1", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-open-source-ownership-description-2")}</p>
          <p>
            {t.rich("page-open-source-ownership-description-3", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-open-source-ownership-description-4", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-open-source-ownership-description-5", {
              strong: Strong,
            })}
          </p>
        </Section>

        <Section id={getIdFromHash(tocItems[1].url)}>
          <h2>{tocItems[1].title}</h2>
          <p>
            {t.rich("page-open-source-definition-description-1", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-open-source-definition-description-2", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-open-source-definition-description-3", {
              strong: Strong,
              a: (chunks) => (
                <Link
                  href={`https://www.gnu.org/philosophy/free-sw.html.${gnuOrgLocaleMap[locale] ?? "en"}`}
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-open-source-freedom-item-run", { strong: Strong })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-freedom-item-study", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-freedom-item-share", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-freedom-item-improvements", {
                strong: Strong,
              })}
            </ListItem>
          </UnorderedList>
          <p>
            {t.rich("page-open-source-definition-description-4", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-open-source-definition-description-5", {
              strong: Strong,
            })}
          </p>
          <Grid balanced={2}>
            {freedoms.map(({ id, icon, title, description }) => (
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
        </Section>

        <Section id={getIdFromHash(tocItems[2].url)}>
          <h2>{tocItems[2].title}</h2>
          <p>{t("page-open-source-comparison-description")}</p>
          <Table variant="minimal">
            <TableHeader>
              <TableRow>
                <TableHead scope="col">
                  {t("page-open-source-comparison-header-approach")}
                </TableHead>
                <TableHead scope="col">
                  {t("page-open-source-comparison-header-rights")}
                </TableHead>
                <TableHead scope="col">
                  {t("page-open-source-comparison-header-licenses")}
                </TableHead>
                <TableHead scope="col">
                  {t("page-open-source-comparison-header-examples")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonRows.map(
                ({ id, approach, rights, licenses, examples }) => (
                  <TableRow key={id}>
                    <TableCell>
                      <strong>{approach}</strong>
                    </TableCell>
                    <TableCell>{rights}</TableCell>
                    <TableCell>{licenses}</TableCell>
                    <TableCell>{examples}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Section>

        <Section id={getIdFromHash(tocItems[3].url)}>
          <h2>{tocItems[3].title}</h2>
          <p>
            {t.rich("page-open-source-possible-description", {
              strong: Strong,
            })}
          </p>

          <Grid columns={3} size="narrow">
            {benefits.map(({ id, icon, title, description }) => (
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

          <h3>{t("page-open-source-collaboration-title")}</h3>
          <p>{t("page-open-source-collaboration-description")}</p>

          <h3>{t("page-open-source-repairable-title")}</h3>
          <p>{t("page-open-source-repairable-description")}</p>

          <h3>{t("page-open-source-fork-title")}</h3>
          <p>
            {t.rich("page-open-source-fork-description", { strong: Strong })}
          </p>
        </Section>

        <Section id={getIdFromHash(tocItems[4].url)}>
          <h2>{tocItems[4].title}</h2>
          <p>{t("page-open-source-switch-description-1")}</p>
          <p>{t("page-open-source-switch-description-2")}</p>

          <h3>{t("page-open-source-apps-title")}</h3>
          <Grid columns={3} size="narrow">
            {apps.map(
              ({
                id,
                href,
                name,
                description,
                category,
                logo,
                invertOnDark,
              }) => (
                <AppCard
                  key={id}
                  name={name}
                  description={description}
                  // 21 cards is ~8 phone screens with descriptions shown
                  descriptionClassName="hidden md:block"
                  thumbnail={logo.src}
                  tags={[category]}
                  href={href}
                  className={cn(invertOnDark && "dark:[&_img]:invert")}
                />
              )
            )}
          </Grid>

          <Callout
            id="alternativeto"
            title={t("page-open-source-alternativeto-title")}
            description={t("page-open-source-alternativeto-description")}
            image={alternativeToImg}
            variant="sm"
            as="h3"
          >
            <ButtonLink href="https://alternativeto.net">
              {t("page-open-source-alternativeto-cta")}
            </ButtonLink>
          </Callout>
        </Section>

        <Section id={getIdFromHash(tocItems[5].url)}>
          <h2>{tocItems[5].title}</h2>
          <p>{t("page-open-source-ai-intro")}</p>

          <h3>{t("page-open-source-ai-assist-title")}</h3>
          <p>{t("page-open-source-ai-assist-description-1")}</p>
          <p>{t("page-open-source-ai-assist-description-2")}</p>

          <Alert variant="update">
            <AlertIcon className="[&>svg]:size-10">
              <ScanSearch />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>
                {t("page-open-source-ai-superpower-title")}
              </AlertTitle>
              <AlertDescription>
                <p>
                  {t.rich("page-open-source-ai-superpower-description", {
                    strong: Strong,
                  })}
                </p>
              </AlertDescription>
            </AlertContent>
          </Alert>

          <p>{t("page-open-source-ai-prompts-lead")}</p>
          <Grid columns={2} size="wide">
            {prompts.map(({ id, prompt, description }) => (
              <Card key={id} size="md">
                <CardContent spacing="sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-balance">
                      <strong>{prompt}</strong>
                    </p>
                    <CopyButton
                      message={prompt}
                      size="sm"
                      aria-label={t("page-open-source-ai-copy-prompt")}
                      className="-me-2 -mt-1 shrink-0 text-body-medium hover:text-primary"
                    />
                  </div>
                  <CardParagraph size="sm">{description}</CardParagraph>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Alert variant="warning">
            <AlertIcon className="[&>svg]:size-10 [&>svg]:text-body!">
              <Lightbulb />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>{t("page-open-source-ai-tip-title")}</AlertTitle>
              <AlertDescription>
                <p>
                  {t.rich("page-open-source-ai-tip-description", {
                    strong: Strong,
                  })}
                </p>
              </AlertDescription>
            </AlertContent>
          </Alert>

          <p>{t("page-open-source-ai-assist-caveats")}</p>

          <h3>{t("page-open-source-local-ai-title")}</h3>
          <p>{t("page-open-source-local-ai-description-1")}</p>
          <p>
            {t.rich("page-open-source-local-ai-description-2", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-open-source-local-ai-description-3")}</p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-open-source-local-ai-item-jan", {
                strong: (chunks) => (
                  <Link href="https://jan.ai">
                    <strong>{chunks}</strong>
                  </Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-local-ai-item-ollama", {
                strong: (chunks) => (
                  <Link href="https://ollama.com">
                    <strong>{chunks}</strong>
                  </Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-local-ai-item-lm-studio", {
                strong: (chunks) => (
                  <Link href="https://lmstudio.ai">
                    <strong>{chunks}</strong>
                  </Link>
                ),
              })}
            </ListItem>
          </UnorderedList>
          <p>{t("page-open-source-local-ai-description-4")}</p>

          <Alert>
            <AlertIcon className="[&>svg]:size-10">
              <Scale />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>
                {t("page-open-source-local-ai-note-title")}
              </AlertTitle>
              <AlertDescription>
                <p>{t("page-open-source-local-ai-note-description-1")}</p>
                <p>
                  {t.rich("page-open-source-local-ai-note-description-2", {
                    a: (chunks) => (
                      <Link href="https://opensource.org/ai/open-source-ai-definition">
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
              </AlertDescription>
            </AlertContent>
          </Alert>
        </Section>

        <Section id={getIdFromHash(tocItems[6].url)}>
          <h2>{tocItems[6].title}</h2>
          <p>
            {t.rich("page-open-source-ethereum-description-1", {
              strong: Strong,
            })}
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-open-source-ethereum-item-1", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>{t("page-open-source-ethereum-item-2")}</ListItem>
            <ListItem>{t("page-open-source-ethereum-item-3")}</ListItem>
            <ListItem>{t("page-open-source-ethereum-item-4")}</ListItem>
          </UnorderedList>
          <p>
            {t.rich("page-open-source-ethereum-description-2", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-open-source-ethereum-description-3")}</p>
        </Section>

        <Section id={getIdFromHash(tocItems[7].url)}>
          <h2>{tocItems[7].title}</h2>
          <p>{t("page-open-source-copyleft-description-1")}</p>
          <p>{t("page-open-source-copyleft-description-2")}</p>
          <p>{t("page-open-source-copyleft-description-3")}</p>
        </Section>

        <Section id={getIdFromHash(tocItems[8].url)}>
          <h2>{tocItems[8].title}</h2>
          <p>
            {t.rich("page-open-source-contribute-description", {
              link1: (chunks) => (
                <Link href="https://github.com/ethereum/ethereum-org-website/issues">
                  {chunks}
                </Link>
              ),
              link2: (chunks) => (
                <Link href="https://github.com/ethereum/ethereum-org-website">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <ButtonLink href={GITHUB_REPO_URL} data-flow="cta">
            {t("page-open-source-contribute-cta")}
          </ButtonLink>
        </Section>

        <Section id={getIdFromHash(tocItems[9].url)}>
          <h2>{tocItems[9].title}</h2>

          <h3>{t("page-open-source-resources-defending-title")}</h3>
          <Grid columns={3} size="narrow">
            {organizations.map(({ id, href, name, description, banner }) => (
              <Card key={id} href={href} variant="ghost" size="sm">
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
                    <h4>{name}</h4>
                  </CardTitle>
                  <CardParagraph size="sm">{description}</CardParagraph>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <p>{t("page-open-source-resources-more-orgs")}</p>
          <UnorderedList>
            {moreOrganizations.map(({ id, href, name }) => (
              <ListItem key={id}>
                <Link href={href}>{name}</Link>
              </ListItem>
            ))}
          </UnorderedList>

          <h3>{t("page-open-source-resources-alternatives-title")}</h3>
          <UnorderedList>
            <ListItem>
              {t.rich("page-open-source-resources-catalogs", {
                alternativeto: (chunks) => (
                  <Link href="https://alternativeto.net">{chunks}</Link>
                ),
                switching: (chunks) => (
                  <Link href="https://switching.software">{chunks}</Link>
                ),
                privacyguides: (chunks) => (
                  <Link href="https://www.privacyguides.org">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-degoogled", {
                grapheneos: (chunks) => (
                  <Link href="https://grapheneos.org">{chunks}</Link>
                ),
                eos: (chunks) => (
                  <Link href="https://e.foundation">{chunks}</Link>
                ),
                lineageos: (chunks) => (
                  <Link href="https://lineageos.org">{chunks}</Link>
                ),
                fdroid: (chunks) => (
                  <Link href="https://f-droid.org">{chunks}</Link>
                ),
                framework: (chunks) => (
                  <Link href="https://frame.work">{chunks}</Link>
                ),
                pine64: (chunks) => (
                  <Link href="https://pine64.org">{chunks}</Link>
                ),
                mnt: (chunks) => (
                  <Link href="https://mntre.com/reform.html">{chunks}</Link>
                ),
              })}
            </ListItem>
          </UnorderedList>

          <h3>{t("page-open-source-resources-wider-title")}</h3>
          <UnorderedList>
            <ListItem>
              {t.rich("page-open-source-resources-education", {
                openstax: (chunks) => (
                  <Link href="https://openstax.org">{chunks}</Link>
                ),
                mit: (chunks) => (
                  <Link href="https://ocw.mit.edu">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>{t("page-open-source-resources-data")}</ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-commons", {
                p2p: (chunks) => (
                  <Link href="https://p2pfoundation.net">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-culture", {
                cc: (chunks) => (
                  <Link href="https://creativecommons.org">{chunks}</Link>
                ),
                wikipedia: (chunks) => (
                  <Link href="https://www.wikipedia.org">{chunks}</Link>
                ),
                osm: (chunks) => (
                  <Link href="https://www.openstreetmap.org">{chunks}</Link>
                ),
              })}
            </ListItem>
          </UnorderedList>

          <h3>{t("page-open-source-resources-reading-title")}</h3>
          <UnorderedList>
            <ListItem>
              {t.rich("page-open-source-resources-definitions", {
                gnu: (chunks) => (
                  <Link href="https://www.gnu.org/philosophy/free-sw.html">
                    {chunks}
                  </Link>
                ),
                osd: (chunks) => (
                  <Link href="https://opensource.org/osd">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-roads", {
                link: (chunks) => (
                  <Link href="https://www.fordfoundation.org/work/learning/research-reports/roads-and-bridges-the-unseen-labor-behind-our-digital-infrastructure/">
                    {chunks}
                  </Link>
                ),
              })}
            </ListItem>
            <ListItem>{t("page-open-source-resources-critiques")}</ListItem>
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

  const t = await getTranslations("page-open-source")

  return await getMetadata({
    locale,
    slug: ["open-source"],
    title: t("page-open-source-meta-title"),
    description: t("page-open-source-meta-description"),
  })
}

export default Page
