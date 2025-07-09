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
import Callout1Image from "@/public/images/man-and-dog-playing.png"

const Layer2Networks = ({ layer2Data, locale, mainnetData }) => {
  const pathname = usePathname()
  const { t } = useTranslation(["page-layer-2-networks", "common"])

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: pathname, startDepth: 1 },
    heroImg: "/images/layer-2/learn-hero.png",
    blurDataURL: "/images/layer-2/learn-hero.png",
    title: t("common:nav-networks-explore-networks-label"),
    description: t("page-layer-2-networks-hero-description"),
  }

  return (
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
  )
}

export default Layer2Networks
