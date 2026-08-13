import {
  BookOpenCheck,
  DoorOpen,
  HeartPulse,
  Recycle,
  Share,
  SquarePen,
  SquarePlay,
} from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, ToCItem } from "@/lib/types"

import AppCard from "@/components/AppCard"
import PageHero from "@/components/Hero/PageHero"
import { Strong } from "@/components/IntlStringElements"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import {
  Card,
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

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getIdFromHash } from "@/lib/utils/url"

import { GITHUB_REPO_URL } from "@/lib/constants"

import PageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import heroImg from "@/public/images/doge-computer.png"
import alternativeToImg from "@/public/images/open-source/alternativeto-telescope.png"

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
      title: t("page-open-source-local-ai-title"),
      url: "#running-ai-locally",
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
      licenses: t("page-open-source-comparison-source-available-licenses"),
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

  // The nine apps shown in the design, rendered with `AppCard` -- the same
  // component `CategoryAppsGrid` renders on /privacy/ethereum/, and the one the
  // Figma cards were drawn from (64px logo + name + expandable description +
  // tag). These are mainstream FLOSS tools rather than Ethereum apps, so they
  // aren't in the apps dataset and the list is local; `AppCard` falls back to a
  // placeholder glyph if a logo is missing.
  //
  // TODO: once the apps data layer carries these, this block and the `<Grid>`
  // below collapse to `<CategoryAppsGrid category="open-source" hideFilter />`.
  // That needs, in order:
  //   1. an "Open source" tab in the apps sheet (GOOGLE_SHEET_ID_DAPPS), rows
  //      with `ready=true` and `discover`/`highlight` false -- the Discover and
  //      Highlighted rows on /apps/ flatten every data key (lib/utils/apps.ts);
  //   2. `fetchApps.ts` to allow that tab through (it currently drops any sheet
  //      whose name isn't an AppCategoryEnum value);
  //   3. `translationRegistry.ts` to skip that key when building /apps/<slug>/
  //      paths, or every entry gets an Ethereum-app detail page and a sitemap
  //      entry.
  // Deliberately NOT adding an AppCategoryEnum value: `AppCategories` is an
  // exhaustive Record, so a new member forces an `appsCategories` entry, which
  // publishes a catalog tile and an /apps/categories/<slug>/ page for a list
  // that is meant to live only on this page.
  const apps = [
    {
      id: "bitwarden",
      href: "https://bitwarden.com",
      name: t("page-open-source-app-bitwarden-name"),
      description: t("page-open-source-app-bitwarden-description"),
      category: t("page-open-source-app-bitwarden-category"),
    },
    {
      id: "brave",
      href: "https://brave.com",
      name: t("page-open-source-app-brave-name"),
      description: t("page-open-source-app-brave-description"),
      category: t("page-open-source-app-brave-category"),
    },
    {
      id: "signal",
      href: "https://signal.org",
      name: t("page-open-source-app-signal-name"),
      description: t("page-open-source-app-signal-description"),
      category: t("page-open-source-app-signal-category"),
    },
    {
      id: "duckduckgo",
      href: "https://duckduckgo.com",
      name: t("page-open-source-app-duckduckgo-name"),
      description: t("page-open-source-app-duckduckgo-description"),
      category: t("page-open-source-app-duckduckgo-category"),
    },
    {
      id: "cryptomator",
      href: "https://cryptomator.org",
      name: t("page-open-source-app-cryptomator-name"),
      description: t("page-open-source-app-cryptomator-description"),
      category: t("page-open-source-app-cryptomator-category"),
    },
    {
      id: "thunderbird",
      href: "https://www.thunderbird.net",
      name: t("page-open-source-app-thunderbird-name"),
      description: t("page-open-source-app-thunderbird-description"),
      category: t("page-open-source-app-thunderbird-category"),
    },
    {
      id: "ente-photos",
      href: "https://ente.io",
      name: t("page-open-source-app-ente-photos-name"),
      description: t("page-open-source-app-ente-photos-description"),
      category: t("page-open-source-app-ente-photos-category"),
    },
    {
      id: "organic-maps",
      href: "https://organicmaps.app",
      name: t("page-open-source-app-organic-maps-name"),
      description: t("page-open-source-app-organic-maps-description"),
      category: t("page-open-source-app-organic-maps-category"),
    },
    {
      id: "vlc",
      href: "https://www.videolan.org/vlc/",
      name: t("page-open-source-app-vlc-name"),
      description: t("page-open-source-app-vlc-description"),
      category: t("page-open-source-app-vlc-category"),
    },
  ].map((app) => ({ ...app, logo: `/images/open-source/${app.id}.png` }))

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
        variant="narrow"
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
          <p>{t("page-open-source-ownership-description-1")}</p>
          <p>{t("page-open-source-ownership-description-2")}</p>
          <p>{t("page-open-source-ownership-description-3")}</p>
          <p>{t("page-open-source-ownership-description-4")}</p>
        </Section>

        <Section id={getIdFromHash(tocItems[1].url)}>
          <h2>{tocItems[1].title}</h2>
          <p>{t("page-open-source-definition-description-1")}</p>
          <p>{t("page-open-source-definition-description-2")}</p>
          <p>
            {t.rich("page-open-source-definition-description-3", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-open-source-definition-description-4")}</p>
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

          <p>{t("page-open-source-definition-description-5")}</p>
          <p>{t("page-open-source-definition-description-6")}</p>
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
            {apps.map(({ id, href, name, description, category, logo }) => (
              <AppCard
                key={id}
                name={name}
                description={description}
                thumbnail={logo}
                tags={[category]}
                href={href}
              />
            ))}
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
          <p>{t("page-open-source-local-ai-description-1")}</p>
          <p>{t("page-open-source-local-ai-description-2")}</p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-open-source-local-ai-item-lm-studio", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-local-ai-item-ollama", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-local-ai-item-jan", { strong: Strong })}
            </ListItem>
          </UnorderedList>
          <p>{t("page-open-source-local-ai-description-3")}</p>
        </Section>

        <Section id={getIdFromHash(tocItems[6].url)}>
          <h2>{tocItems[6].title}</h2>
          <p>{t("page-open-source-ethereum-description-1")}</p>
          <UnorderedList>
            <ListItem>{t("page-open-source-ethereum-item-1")}</ListItem>
            <ListItem>{t("page-open-source-ethereum-item-2")}</ListItem>
            <ListItem>{t("page-open-source-ethereum-item-3")}</ListItem>
            <ListItem>{t("page-open-source-ethereum-item-4")}</ListItem>
          </UnorderedList>
          <p>{t("page-open-source-ethereum-description-2")}</p>
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
          <p>{t("page-open-source-contribute-description")}</p>
          <ButtonLink href={GITHUB_REPO_URL} data-flow="cta">
            {t("page-open-source-contribute-cta")}
          </ButtonLink>
        </Section>

        <Section id={getIdFromHash(tocItems[9].url)}>
          <h2>{tocItems[9].title}</h2>

          <h3>{t("page-open-source-resources-defending-title")}</h3>
          <UnorderedList>
            <ListItem>
              {t.rich("page-open-source-resources-fsf", {
                link: (chunks) => (
                  <Link href="https://www.fsf.org">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-eff", {
                link: (chunks) => (
                  <Link href="https://www.eff.org">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-osi", {
                link: (chunks) => (
                  <Link href="https://opensource.org">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-sfc", {
                link: (chunks) => (
                  <Link href="https://sfconservancy.org">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-open-source-resources-tor", {
                link: (chunks) => (
                  <Link href="https://www.torproject.org">{chunks}</Link>
                ),
              })}
            </ListItem>
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
