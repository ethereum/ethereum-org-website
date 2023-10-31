import React from "react"
import { Heading, useColorModeValue, VStack } from "@chakra-ui/react"

// TODO: Re-enable after i18n implemented
// import Translation from "./Translation"
import Text from "./OldText"

import type { TranslationKey } from "@/lib/types"

export interface IStyledContainer {
  isShipped: boolean
}

export interface IProps {
  children?: React.ReactNode
  dateKey: TranslationKey
  isShipped?: boolean
}

const UpgradeStatus: React.FC<IProps> = ({
  dateKey,
  children,
  isShipped = false,
}) => {
  const border = useColorModeValue("none", "2px solid")
  const darkBorderColor = isShipped ? "#3fb181" : "#a4a4ff"

  const borderColor = useColorModeValue(undefined, darkBorderColor)

  return (
    <VStack
      as="aside"
      alignItems="start"
      bg={
        isShipped ? "upgradeStatusShippedBackground" : "upgradeStatusBackground"
      }
      border={border}
      borderColor={borderColor}
      borderRadius="base"
      boxShadow={`0px 4px 7px rgba(0, 0, 0, 0.05), 0px 10px 17px rgba(0, 0, 0, 0.03),
       0px 14px 66px rgba(0, 0, 0, 0.07)`}
      mb={8}
      mt={{ base: 8, lg: 0 }}
      p={6}
      spacing={6}
      width="100%"
    >
      <Heading fontSize="sm" fontWeight="normal" textTransform="uppercase">
        {/* TODO: Re-enable after i18n implemented */}
        {/* <Translation id="consensus-when-shipping" /> */}
        When&apos;s it shipping?
      </Heading>
      <Text fontSize="2.5rem" fontWeight="bold" lineHeight="100%">
        {/* TODO: Re-enable after i18n implemented */}
        {/* <Translation id={dateKey} /> */}
        {dateKey}
      </Text>
      <Text fontSize="xl">{children}</Text>
    </VStack>
  )
}

export default UpgradeStatus
