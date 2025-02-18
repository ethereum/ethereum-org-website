import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { BasePageProps, Lang } from "@/lib/types"

import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import HeroImage from "@/public/images/heroes/developers-hub-hero.jpg"

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/start-with-crypto")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const StartWithCryptoPage = () => {
  return (
    <MainArticle className="flex w-full flex-col items-center">
      <PageMetadata title={""} description={""} image="" />

      <div className="mb-16 h-[240px] w-full md:h-[380px] lg:h-[398px]">
        <Image
          src={HeroImage}
          alt={"Start with crypto"}
          sizes="(max-width: 1504px) 100vw, 1504px"
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <div className="flex flex-col gap-12 px-8">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-4 text-center">
          <h1>Get started with Ethereum</h1>
          <p>
            Ethereum is so much more than just trading tokens on an exchange.
            Step into the new world yourself and learn all the basics in just
            few steps.
          </p>
        </div>
      </div>
    </MainArticle>
  )
}

export default StartWithCryptoPage
