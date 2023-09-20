// Libraries
import { useEffect, useState } from "react"
import { Flex, Stack, Text } from "@chakra-ui/react"
// TODO: look for replacement lib when i18n is set up
// import { useI18next } from "gatsby-plugin-react-i18next"

// Components
import Emoji from "../Emoji"
import InlineLink from "../Link"
// TODO add Translation
// import Translation from "../Translation"

// Data
import NetworkUpgradeSummaryData from "../../data/NetworkUpgradeSummaryData"

// Utils
// TODO
// import { Lang } from "../../utils/languages"
// TODO
// import { getLocaleForNumberFormat } from "../../utils/translations"

interface IProps {
  name: string
}

const NetworkUpgradeSummary: React.FC<IProps> = ({ name }) => {
  const [formattedUTC, setFormattedUTC] = useState("")

  // TODO: remove hardcoded locale "en" values when i18n is set up
  // const { language } = useI18next()
  const language = "en"
  // const localeForStatsBoxNumbers = getLocaleForNumberFormat(language as Lang)
  const localeForStatsBoxNumbers = "en"

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
    const formattedDate = date.toLocaleString(language, {
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
    // TODO: remove temporalGetValue after i18n is set up
    const temporalGetValue = {
      "page-history-block-number": "Block number",
      "page-history-epoch-number": "Epoch number",
      "page-history-slot-number": "Slot number",
    }

    return (
      <Flex>
        <Emoji fontSize="sm" mr={2} text=":bricks:" />
        {/* <Translation id={translationKey} /> */}
        {temporalGetValue[translationKey]}:&nbsp;
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
          {/* TODO: remove hardcoded text when Translation & i18n are set up */}
          {/* <Translation id="page-history-eth-price" /> */}
          ETH price: &nbsp;
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
            {/* TODO: remove hardcoded text when Translation & i18n are set up */}
            {/* <Translation id="page-history-ethereum-org-wayback" /> */}
            ethereum.org on waybackmachine
          </InlineLink>
        </Flex>
      )}
    </Stack>
  )
}

export default NetworkUpgradeSummary
