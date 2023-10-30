// Libraries
import { useEffect, useState } from "react"
import { Flex, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

// Components
import Emoji from "../Emoji"
import InlineLink from "../Link"
import Translation from "@/components/Translation"

// Utils
import { getLocaleForNumberFormat } from "@/lib/utils/translations"

// Types
import { Lang } from "@/lib/types"

// Data
import NetworkUpgradeSummaryData from "../../data/NetworkUpgradeSummaryData"

interface IProps {
  name: string
}

const NetworkUpgradeSummary: React.FC<IProps> = ({ name }) => {
  const [formattedUTC, setFormattedUTC] = useState("")
  const { locale } = useRouter()
  const localeForStatsBoxNumbers = getLocaleForNumberFormat(locale as Lang)

  const {
    dateTimeAsString,
    ethPriceInUSD,
    waybackLink,
    blockNumber,
    epochNumber,
    slotNumber,
  } = NetworkUpgradeSummaryData[name]
  // TODO fix dateTimeAsString

  // calculate date format only on the client side to avoid hydration issues
  useEffect(() => {
    const date = new Date(dateTimeAsString as any)
    const formattedDate = date.toLocaleString(locale, {
      timeZone: "UTC",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
    setFormattedUTC(`${formattedDate} +UTC`)
  })

  const blockTypeTranslation = (translationKey, explorerUrl, number) => {
    return (
      <Flex>
        <Emoji fontSize="sm" mr={2} text=":bricks:" />
        <Translation id={translationKey} />:{" "}
        <InlineLink to={`${explorerUrl}${number}`}>
          {new Intl.NumberFormat(localeForStatsBoxNumbers).format(number)}
        </InlineLink>
      </Flex>
    )
  }

  return (
    <Stack>
      {formattedUTC && (
        <Flex>
          <Emoji fontSize="sm" mr={2} text=":calendar:" />
          <Text fontFamily="monospace">{formattedUTC}</Text>
        </Flex>
      )}
      {blockNumber &&
        blockTypeTranslation(
          "page-history-block-number",
          "https://etherscan.io/block/",
          blockNumber
        )}
      {epochNumber &&
        blockTypeTranslation(
          "page-history-epoch-number",
          "https://beaconscan.com/epoch/",
          epochNumber
        )}
      {slotNumber &&
        blockTypeTranslation(
          "page-history-slot-number",
          "https://beaconscan.com/slot/",
          slotNumber
        )}
      {ethPriceInUSD && (
        <Flex>
          <Emoji fontSize="sm" mr={2} text=":money_bag:" />
          <Translation id="page-history-eth-price" />:{" "}
          {new Intl.NumberFormat(localeForStatsBoxNumbers, {
            style: "currency",
            currency: "USD",
          }).format(ethPriceInUSD)}
        </Flex>
      )}
      {waybackLink && (
        <Flex>
          <Emoji fontSize="sm" mr={2} text=":desktop_computer:" />
          <InlineLink to={waybackLink}>
            <Translation id="page-history-ethereum-org-wayback" />
          </InlineLink>
        </Flex>
      )}
    </Stack>
  )
}

export default NetworkUpgradeSummary
