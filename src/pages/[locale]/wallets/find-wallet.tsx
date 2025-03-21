import { GetStaticProps, InferGetStaticPropsType } from "next"

import type {
  BasePageProps,
  ChildOnlyProp,
  Lang,
  Params,
  Wallet,
} from "@/lib/types"

import BannerNotification from "@/components/Banners/BannerNotification"
import Breadcrumbs from "@/components/Breadcrumbs"
import FindWalletProductTable from "@/components/FindWalletProductTable"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import {
  getNonSupportedLocaleWallets,
  getSupportedLanguages,
  getSupportedLocaleWallets,
} from "@/lib/utils/wallets"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { useTranslation } from "@/hooks/useTranslation"
import loadNamespaces from "@/i18n/loadNamespaces"
import { usePathname } from "@/i18n/routing"
import HeroImage from "@/public/images/wallets/wallet-hero.png"

const Subtitle = ({ children }: ChildOnlyProp) => (
  <p className="mb-6 text-xl leading-[1.4] text-body-medium last:mb-8">
    {children}
  </p>
)

type Props = BasePageProps & {
  wallets: Wallet[]
}

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

  const requiredNamespaces = getRequiredNamespacesForPage(
    "/wallets/find-wallet"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const supportedLocaleWallets = getSupportedLocaleWallets(locale!)
  const noSupportedLocaleWallets = getNonSupportedLocaleWallets(locale!)
  const walletsData = supportedLocaleWallets.concat(noSupportedLocaleWallets)

  const wallets = walletsData.map((wallet) => ({
    ...wallet,
    supportedLanguages: getSupportedLanguages(
      wallet.languages_supported,
      locale!
    ),
  }))

  const messages = await loadNamespaces(locale!, requiredNamespaces)

  return {
    props: {
      messages,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      wallets,
    },
  }
}) satisfies GetStaticProps<Props, Params>

const FindWalletPage = ({
  wallets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const pathname = usePathname()
  const { t } = useTranslation("page-wallets-find-wallet")

  return (
    <MainArticle className="relative flex flex-col">
      <PageMetadata
        title={t("page-find-wallet-meta-title")}
        description={t("page-find-wallet-meta-description")}
        image="/images/wallets/wallet-hero.png"
      />

      <BannerNotification shouldShow={true}>
        {t("page-find-wallet-footnote-1")}
      </BannerNotification>

      <div
        className={cn(
          "relative mb-[44px] flex w-full flex-col p-12 md:flex-row",
          "bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20"
        )}
      >
        <div className="mt-8 w-full sm:mt-0 md:w-1/2">
          <Breadcrumbs slug={pathname} />
          <h1 className="mb-8 mt-8 text-[2.5rem] leading-[1.4] md:text-5xl">
            {t("page-find-wallet-title")}
          </h1>
          <Subtitle>{t("page-find-wallet-description")}</Subtitle>
          <Subtitle>
            {t("page-find-wallet-desc-2")}{" "}
            <InlineLink href="/wallets">
              {t("page-find-wallet-desc-2-wallets-link")}
            </InlineLink>
          </Subtitle>
        </div>
        <div className="flex w-full items-center justify-center md:w-1/2">
          <Image
            src={HeroImage}
            // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
            sizes="(max-width: 480px) 100vw, 500px"
            alt=""
            priority
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      <FindWalletProductTable wallets={wallets} />
    </MainArticle>
  )
}

export default FindWalletPage
