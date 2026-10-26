import { Fragment } from "react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import PageHero from "@/components/Hero/PageHero"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import { Flex } from "@/components/ui/flex"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
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
import { toNetworkCard } from "@/lib/utils/networkData"

import NetworksPageBody from "./_components/NetworksPageBody"
import { getNetworks } from "./_lib/networks"
import PageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/counter-screen-network-towers-rings-collage-cut-out.png"
import layer2CalloutImage from "@/public/images/man-and-dog-playing.png"
import layer2LearnCalloutImage from "@/public/images/network-column-rooftop-piping-construction.png"
import developingImage from "@/public/images/network-maturity/developing.svg"
import emergingImage from "@/public/images/network-maturity/emerging.svg"
import maturingImage from "@/public/images/network-maturity/maturing.svg"
import robustImage from "@/public/images/network-maturity/robust.svg"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const [{ networks, mainnet, walletsTotal }, { contributors }] =
    await Promise.all([
      getNetworks(),
      getAppPageContributorInfo("layer-2/networks", locale as Lang),
    ])

  const t = await getTranslations("page-layer-2-networks")
  const tCommon = await getTranslations("common")
  const tLayer2 = await getTranslations("page-layer-2")

  const cards = networks.map((network) =>
    toNetworkCard(network, {
      locale,
      description: tLayer2(network.description),
      walletsTotal,
    })
  )
  const mainnetCard = toNetworkCard(mainnet, {
    locale,
    description: "",
    walletsTotal,
  })

  const maturityLevels = [
    {
      Icon: robustImage,
      label: t("page-layer-2-networks-robust-label"),
      cellClassName: "bg-blue-700 text-white",
      description: [
        t("page-layer-2-network-maturity-component-10"),
        t("page-layer-2-network-maturity-component-11"),
      ],
    },
    {
      Icon: maturingImage,
      label: t("page-layer-2-networks-maturing-label"),
      cellClassName: "bg-blue-400 text-white",
      description: [
        t("page-layer-2-network-maturity-component-12"),
        t("page-layer-2-network-maturity-component-13"),
        t("page-layer-2-network-maturity-component-14"),
      ],
    },
    {
      Icon: developingImage,
      label: t("page-layer-2-networks-developing-label"),
      cellClassName: "bg-blue-200 text-black",
      description: [
        t("page-layer-2-network-maturity-component-15"),
        t("page-layer-2-network-maturity-component-16"),
        t("page-layer-2-network-maturity-component-13"),
        t("page-layer-2-network-maturity-component-14"),
      ],
    },
    {
      Icon: emergingImage,
      label: t("page-layer-2-networks-emerging-label"),
      cellClassName: "bg-blue-50 text-black",
      description: [
        t("page-layer-2-network-maturity-component-15"),
        t("page-layer-2-network-maturity-component-17"),
        t("page-layer-2-network-maturity-component-18"),
      ],
    },
  ]

  return (
    <>
      <PageJsonLD
        locale={locale}
        networks={networks}
        cards={cards}
        contributors={contributors}
      />

      <PageHero
        breadcrumbs={{ slug: "/layer-2/networks" }}
        heroImg={heroImg}
        title={tCommon("nav-networks-explore-networks-label")}
        description={t("page-layer-2-networks-hero-description")}
      />

      <MainArticle className="flow pb-page *:[section]:px-page">
        <Section id="networks">
          <h2 className="sr-only">{tCommon("nav-ethereum-networks")}</h2>
          <NetworksPageBody
            locale={locale}
            networks={networks}
            cards={cards}
            mainnetCard={mainnetCard}
          />
        </Section>

        <Section id="more-advanced">
          <div className="flow rounded-2xl bg-linear-primary p-8 md:p-12">
            <h3>{t("page-layer-2-networks-more-advanced-title")}</h3>
            <p className="max-w-3xl">
              {t("page-layer-2-networks-more-advanced-descripton-1")}{" "}
              <strong>
                {t("page-layer-2-networks-more-advanced-descripton-2")}
              </strong>
            </p>
            <p className="max-w-3xl">
              {t("page-layer-2-networks-more-advanced-descripton-3")}
            </p>
            <Flex
              data-flow="cta"
              className="gap-4 max-sm:flex-col max-sm:*:[a]:w-full"
            >
              <ButtonLink href="https://l2beat.com">
                {t("page-layer-2-networks-more-advanced-link-1")}
              </ButtonLink>
              <ButtonLink href="https://growthepie.com">
                {t("page-layer-2-networks-more-advanced-link-2")}
              </ButtonLink>
            </Flex>
          </div>
        </Section>

        <Section id="network-maturity">
          <h2>{t("page-layer-2-network-maturity-component-title")}</h2>
          <p className="max-w-4xl">
            {t.rich("page-layer-2-network-maturity-intro", {
              link: (chunks) => (
                <InlineLink href="https://medium.com/l2beat/introducing-stages-a-framework-to-evaluate-rollups-maturity-d290bb22befe">
                  {chunks}
                </InlineLink>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
          <p className="max-w-4xl">
            {t("page-layer-2-network-maturity-component-7")}
          </p>

          <Table variant="minimal" className="w-full max-w-4xl">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">
                  {t("page-layer-2-network-maturity-component-8")}
                </TableHead>
                <TableHead className="w-1/2">
                  {t("page-layer-2-network-maturity-component-9")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maturityLevels.map(
                ({ Icon, label, cellClassName, description }) => (
                  <TableRow key={label}>
                    <TableCell className={cn("align-middle", cellClassName)}>
                      <div className="flex items-center gap-2">
                        <Icon />
                        <strong>{label}</strong>
                      </div>
                    </TableCell>
                    <TableCell>
                      {description.map((line, index) => (
                        <Fragment key={index}>
                          {index > 0 && <br />}
                          {line}
                        </Fragment>
                      ))}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Section>

        <Section id="callouts">
          <Grid columns={2} size="wide">
            <Callout
              image={layer2CalloutImage}
              title={t("page-layer-2-networks-callout-1-title")}
              description={t("page-layer-2-networks-callout-1-description")}
            >
              <ButtonLink
                href="/layer-2/"
                customEventOptions={{
                  eventCategory: "l2_networks",
                  eventAction: "button_click",
                  eventName: "bottom_hub",
                }}
              >
                {tCommon("learn-more")}
              </ButtonLink>
            </Callout>
            <Callout
              image={layer2LearnCalloutImage}
              title={t("page-layer-2-networks-callout-2-title")}
              description={t("page-layer-2-networks-callout-2-description")}
            >
              <ButtonLink
                href="/layer-2/learn/"
                customEventOptions={{
                  eventCategory: "l2_networks",
                  eventAction: "button_click",
                  eventName: "bottom_learn",
                }}
              >
                {tCommon("learn-more")}
              </ButtonLink>
            </Callout>
          </Grid>
        </Section>
      </MainArticle>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-layer-2-networks")

  return await getMetadata({
    locale,
    slug: ["layer-2", "networks"],
    title: t("page-layer-2-networks-meta-title"),
    description: t("page-layer-2-networks-hero-description"),
    image: "/images/heroes/layer-2-hub-hero.png",
  })
}

export default Page
