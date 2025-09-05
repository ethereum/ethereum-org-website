"use client"

import CalloutSSR from "@/components/CalloutSSR"
import { ContentHero, ContentHeroProps } from "@/components/Hero"
import Layer2NetworksTable from "@/components/Layer2NetworksTable"
import MainArticle from "@/components/MainArticle"
import NetworkMaturity from "@/components/NetworkMaturity"
import { ButtonLink } from "@/components/ui/buttons/Button"

import useTranslation from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/routing"
import Callout2Image from "@/public/images/layer-2/layer-2-walking.png"
import heroImg from "@/public/images/layer-2/learn-hero.png"
import Callout1Image from "@/public/images/man-and-dog-playing.png"

const Layer2Networks = ({ layer2Data, locale, mainnetData }) => {
  const pathname = usePathname()
  const { t } = useTranslation(["page-layer-2-networks", "common"])

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: pathname, startDepth: 1 },
    heroImg,
    title: t("common:nav-networks-explore-networks-label"),
    description: t("page-layer-2-networks-hero-description"),
  }

  // JSON-LD structured data for the Layer 2 Networks page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/layer-2/networks/`,
    name: t("page-layer-2-networks-meta-title"),
    description: t("page-layer-2-networks-hero-description"),
    url: `https://ethereum.org/${locale}/layer-2/networks/`,
    inLanguage: locale,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://ethereum.org/${locale}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Layer 2",
          item: `https://ethereum.org/${locale}/layer-2/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: t("page-layer-2-networks-meta-title"),
          item: `https://ethereum.org/${locale}/layer-2/networks/`,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  // JSON-LD for Layer 2 Networks listing
  const networksItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ethereum Layer 2 Networks",
    description:
      "A comprehensive list of Ethereum Layer 2 scaling networks with TVL, transaction costs, and maturity data",
    numberOfItems: layer2Data.length,
    itemListElement: layer2Data.map((network, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: network.name,
        description:
          network.description || `${network.name} Layer 2 network on Ethereum`,
        url: network.website,
        applicationCategory: "Blockchain Network",
        operatingSystem: "Ethereum",
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Network Type",
            value: network.rollupType || "Layer 2",
          },
          {
            "@type": "PropertyValue",
            name: "Maturity Level",
            value: network.networkMaturity,
          },
          {
            "@type": "PropertyValue",
            name: "Total Value Locked (TVL)",
            value: network.tvl ? `$${network.tvl.toLocaleString()}` : "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "Daily Transaction Cost",
            value: network.txCosts ? `$${network.txCosts.toFixed(2)}` : "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "Supported Wallets",
            value: network.walletsSupportedCount || "N/A",
          },
        ],
      },
    })),
  }

  return (
    <>
      <script
        id="jsonld-webpage-layer2-networks"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <script
        id="jsonld-itemlist-layer2-networks"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(networksItemListJsonLd),
        }}
      />

      <MainArticle className="relative flex flex-col">
        <ContentHero {...heroProps} />

        <Layer2NetworksTable
          layer2Data={layer2Data}
          locale={locale}
          mainnetData={mainnetData}
        />

        <div id="more-advanced-cta" className="w-full px-8 py-9">
          <div className="flex flex-col gap-8 bg-main-gradient px-12 py-14">
            <h3>{t("page-layer-2-networks-more-advanced-title")}</h3>
            <div className="flex max-w-[768px] flex-col gap-8">
              <p>
                {t("page-layer-2-networks-more-advanced-descripton-1")}{" "}
                <strong>
                  {t("page-layer-2-networks-more-advanced-descripton-2")}
                </strong>
              </p>
              <p>{t("page-layer-2-networks-more-advanced-descripton-3")}</p>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row">
              <ButtonLink href="https://l2beat.com">
                {t("page-layer-2-networks-more-advanced-link-1")}
              </ButtonLink>
              <ButtonLink href="https://growthepie.com">
                {t("page-layer-2-networks-more-advanced-link-2")}
              </ButtonLink>
            </div>
          </div>
        </div>

        <NetworkMaturity />

        <div
          id="callout-cards"
          className="flex w-full flex-col px-8 py-9 lg:flex-row lg:gap-16"
        >
          <CalloutSSR
            image={Callout1Image}
            title={t("page-layer-2-networks-callout-1-title")}
            description={t("page-layer-2-networks-callout-1-description")}
          >
            <div>
              <ButtonLink
                href="/layer-2/"
                customEventOptions={{
                  eventCategory: "l2_networks",
                  eventAction: "button_click",
                  eventName: "bottom_hub",
                }}
              >
                {t("common:learn-more")}
              </ButtonLink>
            </div>
          </CalloutSSR>
          <CalloutSSR
            image={Callout2Image}
            title={t("page-layer-2-networks-callout-2-title")}
            description={t("page-layer-2-networks-callout-2-description")}
          >
            <div>
              <ButtonLink
                href="/layer-2/learn/"
                customEventOptions={{
                  eventCategory: "l2_networks",
                  eventAction: "button_click",
                  eventName: "bottom_learn",
                }}
              >
                {t("common:learn-more")}
              </ButtonLink>
            </div>
          </CalloutSSR>
        </div>
      </MainArticle>
    </>
  )
}

export default Layer2Networks
