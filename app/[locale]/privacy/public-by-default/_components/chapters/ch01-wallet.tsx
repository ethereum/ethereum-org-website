import { getTranslations } from "next-intl/server"

import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"

import { persona } from "@/data/privacy-lesson/persona"

import { FixNote, NextChapterLink } from "./wallet/chapter-extras"
import NftPixelDemo from "./wallet/nft-pixel-demo"
import WalletDiscoveryDemo from "./wallet/wallet-discovery-demo"
import WalletOpenDemo from "./wallet/wallet-open-demo"
import type { ChapterProps } from "./types"

const P = "page-privacy-public-by-default"

// Chapter body for #wallet. The section, kicker, title and lede come from page.tsx.
const ChapterWallet = async ({ locale }: ChapterProps) => {
  const t = await getTranslations(P)
  const k = (key: string) => `${P}-${key}`

  return (
    <>
      <p>{t(k("wallet-intro-1"))}</p>
      <p>{t(k("wallet-intro-2"))}</p>

      <figure className="m-0 space-y-2">
        <WalletOpenDemo />
        <figcaption className="text-sm text-body-medium">
          {t(k("wallet-open-caption"))}
        </figcaption>
      </figure>

      <h3>{t(k("wallet-accounts-title"))}</h3>
      <p>{t.rich(k("wallet-accounts-1"), richTags())}</p>
      <p>{t(k("wallet-accounts-2"))}</p>

      <details className="rounded-base border p-4 [&[open]>summary]:mb-3">
        <summary className="cursor-pointer font-semibold">
          {t(k("wallet-https-summary"))}
        </summary>
        <p>
          {t(k("wallet-https-1"), {
            request: `eth_getBalance("${persona.main}")`,
          })}
        </p>
        <p className="mb-0">
          {t.rich(k("wallet-https-2"), richTags({ glossary: "rpc" }))}
        </p>
      </details>

      <h3>{t(k("wallet-nft-title"))}</h3>
      <p>{t(k("wallet-nft-1"))}</p>
      <p>{t(k("wallet-nft-2"))}</p>
      <NftPixelDemo />
      <p className="rounded-base border-s-4 border-primary bg-background-highlight p-4 text-sm">
        {t(k("wallet-nft-caveat"))}
      </p>

      <h3>{t(k("wallet-discovery-title"))}</h3>
      <p>{t(k("wallet-discovery-1"))}</p>
      <figure className="m-0 space-y-2">
        <WalletDiscoveryDemo />
        <figcaption className="text-sm text-body-medium">
          {t(k("wallet-discovery-caption"))}
        </figcaption>
      </figure>
      <p>{t(k("wallet-discovery-2"))}</p>

      <FixNote label={t(k("wallet-fixnote-label"))}>
        {t.rich(
          k("wallet-fixnote"),
          richTags({ link: "/wallets/find-wallet/" })
        )}
      </FixNote>

      <NextChapterLink locale={locale} current="wallet" />
    </>
  )
}

export default ChapterWallet
