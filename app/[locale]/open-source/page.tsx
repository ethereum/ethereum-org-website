import {
  BookOpenCheck,
  DoorOpen,
  HeartPulse,
  Lightbulb,
  Recycle,
  Share,
  SquarePen,
  SquarePlay,
} from "lucide-react"
import type { StaticImageData } from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"

import type { Lang, MatomoEventOptions, ToCItem } from "@/lib/types"

import AppCard from "@/components/AppCard"
import ExpandableCard from "@/components/ExpandableCard"
import PageHero from "@/components/Hero/PageHero"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import { AccordionContainer } from "@/components/ui/accordion"
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
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getDayOfYear } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { seededShuffle } from "@/lib/utils/random"

import AppsExpander from "./_components/apps-expander"
import PromptCard from "./_components/prompt-card"
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
import janImg from "@/public/images/open-source/jan.png"
import libreOfficeImg from "@/public/images/open-source/libreoffice.png"
import lmStudioImg from "@/public/images/open-source/lm-studio.png"
import localSendImg from "@/public/images/open-source/localsend.png"
import logseqImg from "@/public/images/open-source/logseq.png"
import obsImg from "@/public/images/open-source/obs.png"
import ollamaImg from "@/public/images/open-source/ollama.png"
import organicMapsImg from "@/public/images/open-source/organic-maps.png"
import signalImg from "@/public/images/open-source/signal.png"
import thunderbirdImg from "@/public/images/open-source/thunderbird.png"
import ubuntuImg from "@/public/images/open-source/ubuntu.png"
import vlcImg from "@/public/images/open-source/vlc.png"

// `ExpandableCard` hard-prefixes its category with "ExpandableCard", so the
// leading underscore is what keeps the reported value readable.
const TRACK_CATEGORY_SUFFIX = "_open_source"

// Initial run of app cards; the rest sit behind "show more".
const VISIBLE_APP_COUNT = 12

/**
 * Order the app grid for a daily rotation. Whole category groups are shuffled so
 * like apps stay adjacent, then the visible run is filled with complete groups,
 * so a category is never split across the "show more" line. The seed is the
 * date, so the order is identical for every visitor on a given day.
 */
const getDailyAppOrder = <T extends { category: string }>(apps: T[]) => {
  const today = new Date()
  const seed = today.getFullYear() * 1000 + getDayOfYear(today)

  const byCategory = new Map<string, T[]>()
  for (const app of apps) {
    byCategory.set(app.category, [...(byCategory.get(app.category) ?? []), app])
  }

  const visible: T[] = []
  const overflow: T[] = []
  for (const group of seededShuffle([...byCategory.values()], seed)) {
    // A group that would overrun the visible run goes over the line whole;
    // smaller groups after it can still fill the remaining slots.
    const target =
      visible.length + group.length <= VISIBLE_APP_COUNT ? visible : overflow
    target.push(...group)
  }
  return {
    orderedApps: [...visible, ...overflow],
    visibleCount: visible.length,
  }
}

const Page = async (props: { params: Promise<{ locale: Lang }> }) => {
  const params = await props.params
  const { locale } = params
  setRequestLocale(locale)

  const t = await getTranslations("page-open-source")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("open-source", locale)

  // Keyed rather than positional: sections get reordered, and an <h2> rendering
  // under another section's anchor is invisible in review.
  const sections = {
    ownership: {
      id: "when-the-things-you-buy-stop-being-yours",
      title: t("page-open-source-ownership-title"),
    },
    definition: {
      id: "what-does-free-and-open-source-mean",
      title: t("page-open-source-definition-title"),
    },
    possible: {
      id: "benefits-of-open-source",
      title: t("page-open-source-possible-title"),
    },
    switching: {
      id: "how-to-switch-to-open-source-apps",
      title: t("page-open-source-switch-title"),
    },
    ai: {
      id: "open-source-and-ai",
      title: t("page-open-source-ai-title"),
    },
    movement: {
      id: "open-beyond-code",
      title: t("page-open-source-movement-title"),
    },
    ethereum: {
      id: "why-is-ethereum-open-source",
      title: t("page-open-source-ethereum-title"),
    },
    faq: {
      id: "frequently-asked-questions",
      title: t("page-open-source-faq-title"),
    },
    resources: {
      id: "further-reading",
      title: t("page-open-source-resources-reading-title"),
    },
  }

  const tocItems: ToCItem[] = Object.values(sections).map(({ id, title }) => ({
    title,
    url: `#${id}`,
  }))

  // Matomo: one category for the page, the section id as the action, and a
  // stable English name for the element. Section titles and most element titles
  // are translated -- ids and slugs keep a locale from splitting its own row.
  const track = (section: string, name: string): MatomoEventOptions => ({
    eventCategory: "open-source",
    eventAction: section,
    eventName: name,
  })

  // Footnote marker for the numbered citations under Further reading. Rendered
  // outside the strings so translators never carry the numbering.
  const footnote = (n: number, section: string) => (
    <sup>
      <Link
        href="#further-reading"
        customEventOptions={track(section, `Footnote ${n}`)}
      >{`[${n}]`}</Link>
    </sup>
  )

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
          a: linkTo("https://opensource.org/", sections.ethereum.id, "OSI"),
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
  const prompts = (
    [
      ["alternatives", "primary"],
      ["install", "accent-a"],
      ["error", "tag-yellow"],
      ["reputation", "tag-green"],
      ["policy", "accent-b"],
      ["permissions", "accent-c"],
    ] as const
  ).map(([id, tagStatus]) => ({
    id,
    tagStatus,
    prompt: t(`page-open-source-ai-prompt-${id}-text`),
    tag: t(`page-open-source-ai-prompt-${id}-tag`),
  }))

  // Runners for local models. Tagged by license status rather than category:
  // on this page that is the distinction worth surfacing.
  const localAiApps = [
    {
      id: "jan",
      href: "https://jan.ai",
      logo: janImg,
      name: t("page-open-source-local-ai-app-jan-name"),
      description: t("page-open-source-local-ai-app-jan-description"),
      tag: t("page-open-source-local-ai-tag-open-source"),
    },
    {
      id: "ollama",
      href: "https://ollama.com",
      logo: ollamaImg,
      invertOnDark: true,
      name: t("page-open-source-local-ai-app-ollama-name"),
      description: t("page-open-source-local-ai-app-ollama-description"),
      tag: t("page-open-source-local-ai-tag-open-source"),
    },
    {
      id: "lm-studio",
      href: "https://lmstudio.ai",
      logo: lmStudioImg,
      name: t("page-open-source-local-ai-app-lm-studio-name"),
      description: t("page-open-source-local-ai-app-lm-studio-description"),
      tag: t("page-open-source-local-ai-tag-closed-source"),
    },
  ]

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

  const { orderedApps, visibleCount } = getDailyAppOrder(apps)

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

        <Section id={sections.ownership.id}>
          <h2>{sections.ownership.title}</h2>
          <p>
            {t.rich("page-open-source-ownership-description-1", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-open-source-ownership-description-2")}</p>
          {/* Markers sit outside the strings so translators never carry the
              numbering; both sources are cited under Further reading. */}
          <p>
            {t.rich("page-open-source-ownership-description-3a", {
              strong: Strong,
            })}
            {footnote(1, sections.ownership.id)}{" "}
            {t.rich("page-open-source-ownership-description-3b", {
              strong: Strong,
            })}
            {footnote(2, sections.ownership.id)}
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

        <Section id={sections.definition.id}>
          <h2>{sections.definition.title}</h2>
          <p>
            {t.rich("page-open-source-definition-description-1", {
              strong: Strong,
            })}
          </p>

          {/* Recognizable examples land second, as a list: the opening of this
              section is where a newcomer is most likely to bounce off prose. */}
          <p>{t("page-open-source-definition-examples-lead")}</p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-open-source-definition-example-linux", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-definition-example-firefox", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-definition-example-signal", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-definition-example-vlc", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-definition-example-libreoffice", {
                strong: Strong,
              })}
            </ListItem>
          </UnorderedList>

          <p>
            {t.rich("page-open-source-definition-description-2", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-open-source-definition-description-3", {
              strong: Strong,
            })}
            {footnote(3, sections.definition.id)}
          </p>
          <Grid balanced={2} className="my-space-2x">
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

        <Section id={sections.possible.id}>
          <h2>{sections.possible.title}</h2>
          <p>
            {t.rich("page-open-source-possible-description", {
              strong: Strong,
            })}
          </p>

          <Grid columns={3} className="my-space-2x">
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

          <h3>{t("page-open-source-repair-title")}</h3>
          <p>
            {t.rich("page-open-source-repair-description", { strong: Strong })}
          </p>

          <h3>{t("page-open-source-speech-title")}</h3>
          <p>
            {t.rich("page-open-source-speech-description", { strong: Strong })}
          </p>

          <h3>{t("page-open-source-fork-title")}</h3>
          <p>
            {t.rich("page-open-source-fork-description", { strong: Strong })}
          </p>
        </Section>

        <Section id={sections.switching.id}>
          <h2>{sections.switching.title}</h2>
          <p>{t("page-open-source-switch-description-1")}</p>
          <p>{t("page-open-source-switch-description-2")}</p>

          <h3>{t("page-open-source-apps-title")}</h3>
          <AppsExpander
            matomoEvent={track(sections.switching.id, "Show more apps")}
          >
            <Grid columns={3} size="narrow" className="my-space-2x">
              {orderedApps.map(
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
                    customEventOptions={track(sections.switching.id, id)}
                    className={cn(
                      invertOnDark && "dark:[&_img]:invert",
                      index >= visibleCount &&
                        "group-data-[expanded=false]/apps:hidden"
                    )}
                  />
                )
              )}
            </Grid>
          </AppsExpander>

          <Callout
            id="alternativeto"
            title={t("page-open-source-alternativeto-title")}
            description={t("page-open-source-alternativeto-description")}
            image={alternativeToImg}
            variant="sm"
            as="h3"
          >
            <ButtonLink
              href="https://alternativeto.net"
              customEventOptions={track(sections.switching.id, "AlternativeTo")}
            >
              {t("page-open-source-alternativeto-cta")}
            </ButtonLink>
          </Callout>
        </Section>

        <Section id={sections.ai.id}>
          <h2>{sections.ai.title}</h2>
          <p>{t("page-open-source-ai-intro")}</p>

          <h3>{t("page-open-source-ai-assist-title")}</h3>
          <p>
            {t.rich("page-open-source-ai-assist-description-1", {
              strong: Strong,
            })}
          </p>

          <p>{t("page-open-source-ai-prompts-lead")}</p>
          {/* The whole card copies -- a card-sized target beats an icon-sized
              one, and the icon alone reads as the only thing that is clickable. */}
          <Grid columns={2} size="narrow" className="my-space-2x">
            {prompts.map(({ id, prompt, tag, tagStatus }) => (
              <PromptCard
                key={id}
                prompt={prompt}
                tag={tag}
                tagStatus={tagStatus}
                copyLabel={t("page-open-source-ai-copy-prompt")}
                matomoEvent={track(sections.ai.id, id)}
              />
            ))}
          </Grid>

          <Alert variant="warning">
            <AlertIcon className="[&>svg]:size-10 [&>svg]:text-body!">
              <Lightbulb />
            </AlertIcon>
            <AlertContent>
              <AlertTitle size="lg">
                {t("page-open-source-ai-tip-title")}
              </AlertTitle>
              <AlertDescription>
                <p>
                  {t.rich("page-open-source-ai-tip-description", {
                    strong: Strong,
                  })}
                </p>
              </AlertDescription>
            </AlertContent>
          </Alert>

          <h3>{t("page-open-source-local-ai-title")}</h3>
          <p>{t("page-open-source-local-ai-description-1")}</p>
          <p>
            {t.rich("page-open-source-local-ai-description-2", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-open-source-local-ai-description-3")}</p>
          <Grid columns={3} className="my-space-2x">
            {localAiApps.map(
              ({ id, href, name, description, tag, logo, invertOnDark }) => (
                <AppCard
                  key={id}
                  name={name}
                  description={description}
                  nameClassName="line-clamp-2 text-base leading-tight sm:text-lg"
                  thumbnail={logo.src}
                  tags={[tag]}
                  href={href}
                  customEventOptions={track(sections.ai.id, id)}
                  className={cn(invertOnDark && "dark:[&_img]:invert")}
                />
              )
            )}
          </Grid>
        </Section>

        {/* Sits immediately before the Ethereum section so the widening lens
            reads as the movement Ethereum joins, not a closing reading list. */}
        <Section id={sections.movement.id}>
          <h2>{sections.movement.title}</h2>
          <p>
            {t.rich("page-open-source-movement-description", {
              strong: Strong,
            })}
          </p>

          <h3>{t("page-open-source-resources-defending-title")}</h3>
          <Grid columns={3} size="narrow" className="my-space-2x">
            {organizations.map(({ id, href, name, description, banner }) => (
              <Card
                key={id}
                href={href}
                variant="ghost"
                size="sm"
                customEventOptions={track(sections.movement.id, id)}
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
                <Link
                  href={href}
                  customEventOptions={track(sections.movement.id, id)}
                >
                  {name}
                </Link>
              </ListItem>
            ))}
          </UnorderedList>

          <h3>{t("page-open-source-resources-wider-title")}</h3>
          <p>
            {t.rich("page-open-source-movement-wider-description", {
              strong: Strong,
            })}
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-open-source-resources-education", {
                openstax: linkTo(
                  "https://openstax.org",
                  sections.movement.id,
                  "OpenStax"
                ),
                mit: linkTo(
                  "https://ocw.mit.edu",
                  sections.movement.id,
                  "MIT OpenCourseWare"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-data", {
                doaj: linkTo("https://doaj.org", sections.movement.id, "DOAJ"),
                arxiv: linkTo(
                  "https://arxiv.org",
                  sections.movement.id,
                  "arXiv"
                ),
                zenodo: linkTo(
                  "https://zenodo.org",
                  sections.movement.id,
                  "Zenodo"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-commons", {
                p2p: linkTo(
                  "https://p2pfoundation.net",
                  sections.movement.id,
                  "P2P Foundation"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-culture", {
                cc: linkTo(
                  "https://creativecommons.org",
                  sections.movement.id,
                  "Creative Commons"
                ),
                wikipedia: linkTo(
                  "https://www.wikipedia.org",
                  sections.movement.id,
                  "Wikipedia"
                ),
                osm: linkTo(
                  "https://www.openstreetmap.org",
                  sections.movement.id,
                  "OpenStreetMap"
                ),
              })}
            </ListItem>
          </UnorderedList>
        </Section>

        <Section id={sections.ethereum.id}>
          <h2>{sections.ethereum.title}</h2>
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

          {/* The license taxonomy lands here rather than a third of the way up
              the page: it is the decoder for the client licenses listed below. */}
          <h3>{t("page-open-source-comparison-title")}</h3>
          <p>{t("page-open-source-comparison-description")}</p>
          <AccordionContainer>
            {comparisonRows.map(
              ({ id, approach, rights, licenses, examples }) => (
                <ExpandableCard
                  key={id}
                  title={approach}
                  contentPreview={rights}
                  eventCategory={TRACK_CATEGORY_SUFFIX}
                  eventAction={sections.ethereum.id}
                  eventName={id}
                >
                  <p>
                    <strong>
                      {t("page-open-source-comparison-label-licenses")}
                    </strong>{" "}
                    {licenses}
                  </p>
                  <p>
                    <strong>
                      {t("page-open-source-comparison-label-examples")}
                    </strong>{" "}
                    {examples}
                  </p>
                </ExpandableCard>
              )
            )}
          </AccordionContainer>

          <h3>{t("page-open-source-copyleft-title")}</h3>
          <p>{t("page-open-source-copyleft-description-1")}</p>
          <p>{t("page-open-source-copyleft-description-2")}</p>
          <p>
            {t.rich("page-open-source-copyleft-contribute", {
              source: linkTo(
                "https://github.com/ethereum/ethereum-org-website/",
                sections.ethereum.id,
                "Source code"
              ),
              issues: linkTo(
                "https://github.com/ethereum/ethereum-org-website/issues",
                sections.ethereum.id,
                "Suggest changes"
              ),
            })}
          </p>
          <p>{t("page-open-source-copyleft-description-3")}</p>
        </Section>

        <Section id={sections.faq.id}>
          <h2>{sections.faq.title}</h2>
          <AccordionContainer>
            <ExpandableCard
              title={t("page-open-source-traditions-question")}
              eventCategory={TRACK_CATEGORY_SUFFIX}
              eventAction={sections.faq.id}
              eventName="free-software-vs-open-source"
            >
              <p>
                {t.rich("page-open-source-traditions-answer-1", {
                  strong: Strong,
                })}
              </p>
              <p>{t("page-open-source-traditions-answer-2")}</p>
            </ExpandableCard>
            <ExpandableCard
              title={t("page-open-source-security-question")}
              eventCategory={TRACK_CATEGORY_SUFFIX}
              eventAction={sections.faq.id}
              eventName="open-source-security"
            >
              <p>{t("page-open-source-security-answer-1")}</p>
              <p>
                {t.rich("page-open-source-security-answer-2", {
                  strong: Strong,
                })}
              </p>
            </ExpandableCard>
            <ExpandableCard
              title={t("page-open-source-local-ai-note-title")}
              eventCategory={TRACK_CATEGORY_SUFFIX}
              eventAction={sections.faq.id}
              eventName="open-weight-models"
            >
              <p>
                {t.rich("page-open-source-local-ai-note-description-1", {
                  strong: Strong,
                })}
              </p>
              <p>
                {t.rich("page-open-source-local-ai-note-description-2", {
                  strong: Strong,
                  a: linkTo(
                    "https://opensource.org/ai/open-source-ai-definition",
                    sections.faq.id,
                    "Open Source AI Definition"
                  ),
                })}
              </p>
            </ExpandableCard>
          </AccordionContainer>
        </Section>

        <Section id={sections.resources.id}>
          <h2>{sections.resources.title}</h2>

          {/* Numbered: the targets of the [1]-[4] markers in the body.
              Uncited reading stays bulleted below. */}
          <OrderedList>
            <ListItem>
              {t.rich("page-open-source-reference-kindle", {
                link: linkTo(
                  "https://web.archive.org/web/20090726115923/http://bits.blogs.nytimes.com/2009/07/23/amazon-chief-says-erasing-orwell-books-was-stupid/",
                  sections.resources.id,
                  "Kindle deletion (NYT)"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-reference-car-thing", {
                link: linkTo(
                  "https://9to5google.com/2024/12/09/spotify-officially-kills-car-thing-remaining-units-no-longer-work/",
                  sections.resources.id,
                  "Car Thing shutdown"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-reference-gnu-definition", {
                link: linkTo(
                  `https://www.gnu.org/philosophy/free-sw.html.${gnuOrgLocaleMap[locale] ?? "en"}`,
                  sections.resources.id,
                  "The Free Software Definition"
                ),
              })}
            </ListItem>
          </OrderedList>

          <UnorderedList>
            <ListItem>
              {t.rich("page-open-source-reference-osi-definition", {
                link: linkTo(
                  "https://opensource.org/osd",
                  sections.resources.id,
                  "The Open Source Definition"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-roads", {
                link: linkTo(
                  "https://www.fordfoundation.org/work/learning/research-reports/roads-and-bridges-the-unseen-labor-behind-our-digital-infrastructure/",
                  sections.resources.id,
                  "Roads and Bridges"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-critique-surveillance", {
                link: linkTo(
                  "https://www.eff.org/wp/behind-the-one-way-mirror",
                  sections.resources.id,
                  "Behind the One-Way Mirror"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-critique-lockin", {
                link: linkTo(
                  "https://www.eff.org/deeplinks/2019/10/adversarial-interoperability",
                  sections.resources.id,
                  "Adversarial Interoperability"
                ),
              })}
            </ListItem>
          </UnorderedList>

          <h3>{t("page-open-source-resources-alternatives-title")}</h3>
          <UnorderedList>
            <ListItem>
              {t.rich("page-open-source-resources-catalogs", {
                switching: linkTo(
                  "https://switching.software",
                  sections.resources.id,
                  "Switching.software"
                ),
                privacyguides: linkTo(
                  "https://www.privacyguides.org",
                  sections.resources.id,
                  "Privacy Guides"
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-degoogled", {
                grapheneos: linkTo(
                  "https://grapheneos.org",
                  sections.resources.id,
                  "GrapheneOS"
                ),
                eos: linkTo(
                  "https://e.foundation",
                  sections.resources.id,
                  "/e/OS"
                ),
                lineageos: linkTo(
                  "https://lineageos.org",
                  sections.resources.id,
                  "LineageOS"
                ),
                fdroid: linkTo(
                  "https://f-droid.org",
                  sections.resources.id,
                  "F-Droid"
                ),
                framework: linkTo(
                  "https://frame.work",
                  sections.resources.id,
                  "Framework"
                ),
                pine64: linkTo(
                  "https://pine64.org",
                  sections.resources.id,
                  "Pine64"
                ),
                mnt: linkTo(
                  "https://mntre.com/reform.html",
                  sections.resources.id,
                  "MNT Reform"
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

  const t = await getTranslations("page-open-source")

  return await getMetadata({
    locale,
    slug: ["open-source"],
    title: t("page-open-source-meta-title"),
    description: t("page-open-source-meta-description"),
  })
}

export default Page
