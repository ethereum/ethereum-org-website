import React from "react"
import { TranslationKey } from "../utils/translations"
import Translation from "./Translation"
import { Heading, Text, VStack } from "@chakra-ui/react"

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
}) => (
  <VStack
    alignItems="left"
    bg={
      isShipped ? "upgradeStatusShippedBackground" : "upgradeStatusBackground"
    }
    borderColor={
      isShipped ? "upgradeStatusShippedBorder" : "upgradeStatusBorder"
    }
    borderRadius="4px"
    boxShadow={`0px 4px 7px rgba(0, 0, 0, 0.05), 0px 10px 17px rgba(0, 0, 0, 0.03),
       0px 14px 66px rgba(0, 0, 0, 0.07)`}
    mb={8}
    mt={{ base: 8, lg: 0 }}
    p={6}
    spacing={6}
    width="100%"
  >
    <Heading fontSize="sm" fontWeight="normal" my={0} textTransform="uppercase">
      <Translation id="consensus-when-shipping" />
    </Heading>
    <Text fontSize="2.5rem" fontWeight="bold" lineHeight="100%">
      <Translation id={dateKey} />
    </Text>
    <Text fontSize="xl">{children}</Text>
  </VStack>
)

export default UpgradeStatus
