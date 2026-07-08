import type { ChainName, Lang, WalletRow } from "@/lib/types"

import { appOnlyNetworks } from "@/data/networks/app-networks"
import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"

import { buildWalletFilterGroups } from "./filter-groups"
import IconSprite from "./IconSprite"
import { chainTooltipId, featureTooltipId } from "./tooltip-ids"
import TooltipLayer from "./TooltipLayer"
import WalletRowDetails from "./WalletRowDetails"
import WalletRowSummary from "./WalletRowSummary"

const networkData = [ethereumNetworkData, ...layer2Data, ...appOnlyNetworks]

// Self-contained detail body for a single wallet, used by both the dedicated
// `[wallet]` route and the intercepted modal. Unlike the list page, it carries
// its own icon sprite, tooltip content, and TooltipLayer so it renders
// correctly as a standalone route.
const WalletDetail = async ({
  wallet,
  locale,
}: {
  wallet: WalletRow
  locale: Lang
}) => {
  const { featureGroups } = await buildWalletFilterGroups(locale)

  const featureItemsWithDescription = featureGroups
    .flatMap((group) => group.items)
    .filter((item) => item.description)

  const chains = (wallet.supported_chains as ChainName[]).filter((chain) =>
    networkData.some((network) => network.chainName === chain)
  )

  return (
    <div className="flex flex-col gap-4">
      <IconSprite />
      <WalletRowSummary wallet={wallet} index={0} />
      <WalletRowDetails
        wallet={wallet}
        featureGroups={featureGroups}
        locale={locale}
      />

      {/* Hidden contents referenced by data-tooltip-ref / aria-describedby */}
      <div hidden>
        {featureItemsWithDescription.map((item) => (
          <div id={featureTooltipId(item.key)} key={item.key}>
            <p className="text-body">{item.description}</p>
          </div>
        ))}
        {chains.map((chain) => {
          const chainData = networkData.find(
            (network) => network.chainName === chain
          )
          return (
            <div id={chainTooltipId(chain)} key={chain}>
              {chainData?.name || chain}
            </div>
          )
        })}
      </div>
      <TooltipLayer />
    </div>
  )
}

export default WalletDetail
