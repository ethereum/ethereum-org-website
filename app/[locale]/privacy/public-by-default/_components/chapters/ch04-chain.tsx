import { getTranslations } from "next-intl/server"

import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"
import Blockquote from "@/components/ui/blockquote"
import Link from "@/components/ui/Link"

import { numberFormat } from "@/lib/utils/numbers"

import {
  AddressPoisoningQuizLazy,
  ChainClockLazy,
  ChainExplorerLazy,
} from "./chain/lazy"
import type { ChapterProps } from "./types"

const P = "page-privacy-public-by-default"
const NEXT_CHAPTER_NUMBER = 5

// Chapter body for #chain. The section, kicker, title and lede come from page.tsx.
const ChapterChain = async ({ locale }: ChapterProps) => {
  const t = await getTranslations(P)
  const nextNumber = numberFormat(locale, { minimumIntegerDigits: 2 }).format(
    NEXT_CHAPTER_NUMBER
  )

  return (
    <>
      <p>{t(`${P}-chain-intro-1`)}</p>
      <p>{t(`${P}-chain-intro-2`)}</p>
      <ChainExplorerLazy />

      <h3>{t(`${P}-chain-clicked-title`)}</h3>
      <p>{t(`${P}-chain-clicked-body`)}</p>
      <Blockquote className="border-leak bg-leak-low-contrast/40 text-lg font-bold">
        <p>{t(`${P}-chain-pull-history`)}</p>
      </Blockquote>

      <h3>{t(`${P}-chain-clock-title`)}</h3>
      <p>{t(`${P}-chain-clock-body-1`)}</p>
      <p>{t(`${P}-chain-clock-body-2`)}</p>
      <ChainClockLazy />
      <p className="text-sm text-body-medium">
        {t(`${P}-chain-heatmap-caption`)}
      </p>

      <h3>{t(`${P}-chain-poison-title`)}</h3>
      <p>{t(`${P}-chain-poison-intro`)}</p>
      <AddressPoisoningQuizLazy variant="lesson" />

      <h3>{t(`${P}-chain-indefinitely-title`)}</h3>
      <p>{t(`${P}-chain-indefinitely-body-1`)}</p>
      <p>{t(`${P}-chain-indefinitely-body-2`)}</p>
      <Blockquote className="border-leak bg-leak-low-contrast/40 text-lg font-bold">
        <p>{t(`${P}-chain-pull-future`)}</p>
      </Blockquote>

      <details className="rounded-base border p-4">
        <summary className="cursor-pointer font-semibold">
          {t(`${P}-chain-technical-summary`)}
        </summary>
        <div className="mt-4 space-y-4">
          <p>
            {t.rich(
              `${P}-chain-technical-body-1`,
              richTags({ glossary: "nonce" })
            )}
          </p>
          <p>
            {t.rich(
              `${P}-chain-technical-body-2`,
              richTags({
                link: "https://blog.ethereum.org/2025/07/08/partial-history-exp",
              })
            )}
          </p>
        </div>
      </details>

      <aside className="space-y-2 rounded-base border-s-4 border-primary bg-primary-low-contrast/40 p-4">
        <p className="m-0 text-sm font-bold tracking-wide text-primary-high-contrast uppercase">
          {t(`${P}-chain-fix-label`)}
        </p>
        <p className="m-0">
          {t.rich(
            `${P}-chain-fix-body`,
            richTags({ glossary: "stealth-address" })
          )}
        </p>
      </aside>

      <Link
        href="#analysts"
        className="block rounded-base border p-4 no-underline hover:bg-background-highlight"
      >
        <span className="block font-bold">
          {t(`${P}-nav-next`, {
            kicker: t(`${P}-analysts-kicker`, { number: nextNumber }),
          })}
        </span>
        <span className="block text-body-medium">
          {t(`${P}-chain-next-blurb`)}
        </span>
      </Link>
    </>
  )
}

export default ChapterChain
