import { Globe } from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { Lang, WalletRow } from "@/lib/types"

import Discord from "@/components/icons/discord.svg"
import Twitter from "@/components/icons/twitter.svg"

import { cn } from "@/lib/utils/cn"
import { getLocaleFormattedDate } from "@/lib/utils/date"

import { featureTooltipId } from "./tooltip-ids"
import type { WalletFilterGroupConfig } from "./types"

const matomoLinkEvent = (action: string, name: string) =>
  JSON.stringify({
    eventCategory: "WalletExternalLinkList",
    eventAction: action,
    eventName: name,
  })

const SocialLink = ({
  href,
  eventName,
  children,
}: {
  href: string
  eventName: string
  children: React.ReactNode
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    data-matomo={matomoLinkEvent("Go to wallet", eventName)}
    className="hover:scale-1.1 relative flex h-6 scale-100 items-center align-middle transition-transform duration-100"
  >
    {children}
    <span className="sr-only select-none">&nbsp;(opens in a new tab)</span>
  </a>
)

const WalletRowDetails = async ({
  wallet,
  featureGroups,
  locale,
}: {
  wallet: WalletRow
  featureGroups: WalletFilterGroupConfig[]
  locale: Lang
}) => {
  const t = await getTranslations("page-wallets-find-wallet")

  const walletLastUpdated = getLocaleFormattedDate(locale, wallet.last_updated)

  return (
    <div className="flex flex-row gap-2">
      <div className="w-1 md:w-14">
        <div
          className={cn(
            "m-auto h-full w-1 bg-linear-to-b to-97%",
            wallet.twGradiantBrandColor
          )}
        />
      </div>
      <div className="flex w-full flex-1 flex-col gap-4">
        <div className="flex w-full flex-col justify-between gap-4 xl:flex-row">
          {featureGroups.map((group) => (
            <div key={group.id} className="mx-2">
              <h4 className="mb-2 text-md">{group.title}</h4>
              <ul className="m-0 list-none">
                {[...group.items]
                  .sort((a, b) =>
                    wallet[b.key] === wallet[a.key] ? 0 : wallet[b.key] ? 1 : -1
                  )
                  .map((item) => {
                    const supported = !!wallet[item.key]
                    // Split last word off the label to force a non-wrapping
                    // connection between the last word and the info icon
                    const labelSplit = item.label.split(" ")
                    const labelLastWord = labelSplit.pop()
                    const labelRoot = labelSplit.join(" ")
                    return (
                      <li key={item.key} className="mb-2 flex flex-row gap-2">
                        <span className="translate-y-0.5">
                          <svg
                            className="size-4"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <use
                              href={
                                supported
                                  ? "#fw-icon-check"
                                  : "#fw-icon-warning"
                              }
                            />
                          </svg>
                        </span>
                        <p
                          className={supported ? "text-body" : "text-disabled"}
                        >
                          {labelRoot && `${labelRoot} `}
                          <span className="whitespace-nowrap">
                            {labelLastWord}
                            <button
                              type="button"
                              data-tooltip-ref={featureTooltipId(item.key)}
                              aria-describedby={featureTooltipId(item.key)}
                              className="align-middle"
                            >
                              <svg
                                className="ms-1 size-[0.875em] translate-y-0.5"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <use href="#fw-icon-info" />
                              </svg>
                            </button>
                          </span>
                        </p>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
        </div>
        <div className="ml-3">
          <h4 className="mb-2 text-md">{t("page-find-wallet-social-links")}</h4>
          <div className="flex flex-row gap-4">
            <SocialLink href={wallet.url} eventName={`Website: ${wallet.name}`}>
              <Globe className="text-2xl text-primary" />
            </SocialLink>
            {wallet.discord && (
              <SocialLink
                href={wallet.discord}
                eventName={`Discord: ${wallet.name}`}
              >
                <Discord className="text-2xl text-[#7289da]" />
              </SocialLink>
            )}
            {wallet.twitter && (
              <SocialLink
                href={wallet.twitter}
                eventName={`Twitter: ${wallet.name}`}
              >
                <Twitter className="text-2xl text-[#1da1f2]" />
              </SocialLink>
            )}
          </div>
        </div>
        <p className="ml-3 italic">{`${wallet.name} ${t("page-find-wallet-info-updated-on")} ${walletLastUpdated}`}</p>
      </div>
    </div>
  )
}

export default WalletRowDetails
