import { useRouter } from "next/router"
import type { GetStaticProps } from "next/types"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { BasePageProps, Lang } from "@/lib/types"

import { ContentHero, ContentHeroProps } from "@/components/Hero"
import Layer2NetworksTable from "@/components/Layer2NetworksTable"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { layer2Data } from "@/data/layer-2/layer-2"

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2/networks")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      locale,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const Layer2Networks = () => {
  const { pathname } = useRouter()

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: pathname, startDepth: 1 },
    heroImg: "/images/layer-2/learn-hero.png",
    blurDataURL: "/images/layer-2/learn-hero.png",
    title: "Choose network",
    description:
      "Using Ethereum today means interacting with hundreds of different networks and apps. All backed by Ethereum as the foundational backbone.",
  }

  return (
    <MainArticle className="relative flex flex-col">
      <PageMetadata
        title="Choose network"
        description="Using Ethereum today means interacting with hundreds of different networks and apps. All backed by Ethereum as the foundational backbone."
        image="/images/layer-2/learn-hero.png"
      />

      <ContentHero {...heroProps} />

      <Layer2NetworksTable layer2Data={layer2Data} />
    </MainArticle>
  )
}

export default Layer2Networks
