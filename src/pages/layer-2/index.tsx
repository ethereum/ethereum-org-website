import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { BasePageProps, Lang } from "@/lib/types"

import HubHero, { HubHeroProps } from "@/components/Hero/HubHero"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import HeroImage from "@/public/images/heroes/layer-2-hub-hero.jpg"

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const Layer2Hub = () => {
  // TODO: setup translation
  const heroContent: HubHeroProps = {
    title: "Layer 2",
    header: "Ethereum networks",
    description: "Use Ethereum for a fraction of the cost.",
    heroImg: HeroImage,
    buttons: [
      {
        content: "Learn more",
        href: "/layer-2/learn",
        matomo: {
          eventCategory: "layer 2 hub hero buttons",
          eventAction: "click",
          eventName: "/layer-2/learn clicked",
        },
      },
      {
        content: "Choose network",
        href: "/layer-2/networks",
        matomo: {
          eventCategory: "layer 2 hub hero buttons",
          eventAction: "click",
          eventName: "/layer-2/networks clicked",
        },
      },
    ],
  }

  return (
    <MainArticle className="relative flex flex-col">
      {/* TODO: Clarify title and description here */}
      {/* TODO: Setup for translation */}
      <PageMetadata
        title={"Ethereum layer 2 networks"}
        description={"Learn about Ethereum layer 2 networks"}
        image="/images/layer-2/learn-hero.png"
      />

      <HubHero {...heroContent} />
    </MainArticle>
  )
}

export default Layer2Hub
