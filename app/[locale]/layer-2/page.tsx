import pick from "lodash.pick"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { networkMaturity } from "@/lib/utils/networkMaturity"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { layer2Data } from "@/data/networks/networks"

import { BASE_TIME_UNIT } from "@/lib/constants"

import Layer2Page from "./_components/layer-2"

import { getMessages } from "@/i18n/loadMessages"
import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
import { fetchL2beat } from "@/lib/api/fetchL2beat"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const loadData = dataLoader(
  [
    ["growThePieData", fetchGrowThePie],
    ["l2beatData", fetchL2beat],
  ],
  REVALIDATE_TIME * 1000
)

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  const [growThePieData, l2beatData] = await loadData()

  const getRandomL2s = () => {
    let randomL2s = layer2Data.filter(
      (network) =>
        networkMaturity(l2beatData.data.projects[network.l2beatID]) === "robust"
    )

    if (randomL2s.length === 0) {
      randomL2s = layer2Data.filter(
        (network) =>
          networkMaturity(l2beatData.data.projects[network.l2beatID]) ===
          "maturing"
      )
    }

    return randomL2s.sort(() => 0.5 - Math.random()).slice(0, 3)
  }

  const randomL2s = layer2Data.sort(() => 0.5 - Math.random()).slice(0, 9)

  const userRandomL2s = getRandomL2s()

  // Get i18n messages
  const allMessages = await getMessages(locale)
  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <Layer2Page
        randomL2s={randomL2s}
        userRandomL2s={userRandomL2s}
        growThePieData={growThePieData}
        locale={locale}
      />
    </I18nProvider>
  )
}

export default Page
