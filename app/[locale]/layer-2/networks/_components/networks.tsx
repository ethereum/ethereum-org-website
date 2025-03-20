"use client"

import Callout from "@/components/Callout"
import { ContentHero, ContentHeroProps } from "@/components/Hero"
import Layer2NetworksTable from "@/components/Layer2NetworksTable"
import MainArticle from "@/components/MainArticle"
import NetworkMaturity from "@/components/NetworkMaturity"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { usePathname } from "@/i18n/routing"
import Callout2Image from "@/public/images/layer-2/layer-2-walking.png"
import Callout1Image from "@/public/images/man-and-dog-playing.png"

const Layer2Networks = ({ layer2Data, locale, mainnetData }) => {
  const pathname = usePathname()

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: pathname, startDepth: 1 },
    heroImg: "/images/layer-2/learn-hero.png",
    blurDataURL: "/images/layer-2/learn-hero.png",
    title: "Explore networks",
    description:
      "Using Ethereum today means interacting with hundreds of different networks and apps. All backed by Ethereum as the foundational backbone.",
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
          <h3>Looking for more advanced overview?</h3>
          <div className="flex max-w-[768px] flex-col gap-8">
            <p>
              Many of the projects are{" "}
              <strong>still young and somewhat experimental.</strong>
            </p>
            <p>
              For more information on the technology, risks and trust
              assumptions of these networks, we recommend checking out L2BEAT,
              which provides a comprehensive risk assessment framework of each
              project and growthepie for general data analysis.
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row">
            <ButtonLink href="https://l2beat.com">Visit l2beat.com</ButtonLink>
            <ButtonLink href="https://growthepie.xyz">
              Visit growthepie.xyz
            </ButtonLink>
          </div>
        </div>
      </div>

      <NetworkMaturity />

      <div
        id="callout-cards"
        className="flex w-full flex-col px-8 py-9 lg:flex-row lg:gap-16"
      >
        <Callout
          image={Callout1Image}
          title={"What are the benefits?"}
          description={
            "Ethereum's strength and security provides a platform for other networks to build upon."
          }
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
              Learn more
            </ButtonLink>
          </div>
        </Callout>
        <Callout
          image={Callout2Image}
          title={"Interested in more details?"}
          description={
            "Curious about the technology and reasons for this scaling approach? Learn more about the thinking and different technological approaches."
          }
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
              Learn more
            </ButtonLink>
          </div>
        </Callout>
      </div>
    </MainArticle>
  )
}

export default Layer2Networks
