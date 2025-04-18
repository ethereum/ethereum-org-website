"use client"

import type { ChildOnlyProp, Wallet } from "@/lib/types"

import BannerNotification from "@/components/Banners/BannerNotification"
import Breadcrumbs from "@/components/Breadcrumbs"
import FindWalletProductTable from "@/components/FindWalletProductTable"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import { useTranslation } from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/routing"
import HeroImage from "@/public/images/wallets/wallet-hero.png"

const Subtitle = ({ children }: ChildOnlyProp) => (
  <p className="mb-6 text-xl leading-[1.4] text-body-medium last:mb-8">
    {children}
  </p>
)

type Props = {
  wallets: Wallet[]
}

const FindWalletPage = ({ wallets }: Props) => {
  const pathname = usePathname()
  const { t } = useTranslation("page-wallets-find-wallet")

  return (
    <MainArticle className="relative flex flex-col">
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
