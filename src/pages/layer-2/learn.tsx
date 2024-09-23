import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "react-i18next"

import type { BasePageProps, Lang } from "@/lib/types"

import { ContentHero, type ContentHeroProps } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2/learn")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const Layer2Learn = () => {
  const { t } = useTranslation("page-layer-2-learn")
  const { pathname } = useRouter()

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: pathname, startDepth: 1 },
    heroImg: "/images/layer-2/learn-hero.png",
    blurDataURL: "/images/layer-2/learn-hero.png",
    title: t("page-layer-2-learn-title"),
    description: t("page-layer-2-learn-description"),
    // TODO: Check matomo event information to implementc
    buttons: [
      {
        content: "",
        href: "/layer-2/",
        matomo: {
          eventCategory: "",
          eventAction: "",
          eventName: "",
        },
      },
      {
        content: "",
        href: "/layer-2/networks",
        matomo: {
          eventCategory: "",
          eventAction: "",
          eventName: "",
        },
      },
    ],
  }

  return (
    <MainArticle className="relative flex flex-col">
      <PageMetadata
        title={t("page-layer-2-learn-meta-title")}
        description={t("page-layer-2-learn-description")}
        image="/images/layer-2/learn-hero.png"
      />

      <ContentHero {...heroProps} />
    </MainArticle>
  )
}

export default Layer2Learn
