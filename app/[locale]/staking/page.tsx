import pick from "lodash.pick"

import {
  EpochResponse,
  EthStoreResponse,
  Lang,
  StakingStatsData,
} from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { BASE_TIME_UNIT } from "@/lib/constants"

import StakingPage from "./_components/staking"

import { getMessages } from "@/i18n/loadMessages"

const fetchBeaconchainData = async (): Promise<StakingStatsData> => {
  // Fetch Beaconcha.in data
  const base = "https://beaconcha.in"
  const { href: ethstore } = new URL("api/v1/ethstore/latest", base)
  const { href: epoch } = new URL("api/v1/epoch/latest", base)

  // Get total ETH staked and current APR from ethstore endpoint
  const ethStoreResponse = await fetch(ethstore)
  if (!ethStoreResponse.ok)
    throw new Error("Network response from Beaconcha.in ETHSTORE was not ok")
  const ethStoreResponseJson: EthStoreResponse = await ethStoreResponse.json()
  const {
    data: { apr, effective_balances_sum_wei },
  } = ethStoreResponseJson
  const totalEffectiveBalance = effective_balances_sum_wei * 1e-18
  const totalEthStaked = Math.floor(totalEffectiveBalance)

  // Get total active validators from latest epoch endpoint
  const epochResponse = await fetch(epoch)
  if (!epochResponse.ok)
    throw new Error("Network response from Beaconcha.in EPOCH was not ok")
  const epochResponseJson: EpochResponse = await epochResponse.json()
  const {
    data: { validatorscount },
  } = epochResponseJson

  return { totalEthStaked, validatorscount, apr }
}

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const loadData = dataLoader(
  [["stakingStatsData", fetchBeaconchainData]],
  REVALIDATE_TIME * 1000
)

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  const [data] = await loadData()

  // Get i18n messages
  const allMessages = await getMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage("/staking")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <StakingPage data={data} />
    </I18nProvider>
  )
}

export default Page
