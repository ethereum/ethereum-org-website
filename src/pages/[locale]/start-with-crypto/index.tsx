import { GetStaticProps } from "next"

import { BasePageProps, Lang } from "@/lib/types"

import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import StartWithEthereumFlow from "@/components/StartWithEthereumFlow"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import loadNamespaces from "@/i18n/loadNamespaces"
import HeroImage from "@/public/images/heroes/developers-hub-hero.jpg"
import ManDogeImage from "@/public/images/start-with-ethereum/man-doge-playing.png"

export async function getStaticPaths() {
  return {
    paths: LOCALES_CODES.map((locale) => ({ params: { locale } })),
    fallback: false,
  }
}

export const getStaticProps = (async ({ params }) => {
  const { locale = DEFAULT_LOCALE } = params || {}

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/start-with-crypto")

  const contentNotTranslated = !existsNamespace(
    locale! as string,
    requiredNamespaces[2]
  )

  const messages = await loadNamespaces(locale as string, requiredNamespaces)

  return {
    props: {
      messages,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const StartWithCryptoPage = () => {
  return (
    <MainArticle className="flex w-full flex-col items-center overflow-x-hidden">
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

      <div className="mb-36 flex flex-col gap-12 overflow-x-hidden px-8">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-4 text-center">
          <h1>Get started with Ethereum</h1>
          <p>
            Ethereum is so much more than just trading tokens on an exchange.
            Step into the new world yourself and learn all the basics in just
            few steps.
          </p>
        </div>

        <div id="start-with-ethereum-flow" className="flex flex-col gap-12">
          <StartWithEthereumFlow />
        </div>

        <div className="flex w-full flex-col gap-12 rounded-2xl border border-accent-c/10 bg-gradient-to-t from-accent-c/10 from-20% to-accent-c/5 to-60% px-12 py-16 md:flex-row dark:from-accent-c/20 dark:to-accent-c/10">
          <div className="flex flex-1 flex-col gap-8">
            <h2 className="">Do you know anyone who needs help to onboard?</h2>
            <p>
              Billions can’t open bank accounts or freely use their money.
              Ethereum’s financial system is always open and unbiased.
            </p>
            <div className="flex w-full md:w-auto">
              <ButtonLink
                href="/start-with-crypto/onboarding-guide"
                variant="outline"
                className="w-full md:w-auto"
              >
                Share this page
              </ButtonLink>
            </div>
          </div>
          <div className="flex max-w-[450px] flex-col items-center justify-center">
            <Image src={ManDogeImage} alt="Man Doge" />
          </div>
        </div>
      </div>
    </MainArticle>
  )
}

export default StartWithCryptoPage
