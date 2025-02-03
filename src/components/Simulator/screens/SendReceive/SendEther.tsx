import React from "react"
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react"

import { EthTokenIcon } from "../../icons"
import { NotificationPopover } from "../../NotificationPopover"

type SendEtherProps = {
  ethPrice: number
  ethBalance: number
  chosenAmount: number
  setChosenAmount: (amount: number) => void
}
export const SendEther = ({
  ethPrice,
  ethBalance,
  chosenAmount,
  setChosenAmount,
}: SendEtherProps) => {
  const formatDollars = (amount: number): string =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    }).format(amount)

  const usdAmount = formatDollars(ethPrice * ethBalance)

  const ethAmount = new Intl.NumberFormat("en", {
    maximumFractionDigits: 5,
  }).format(ethBalance)

  const maxUsdAmount = ethPrice * ethBalance

  const handleSelection = (amount: number): void => {
    if (amount === maxUsdAmount) {
      setChosenAmount(maxUsdAmount)
      return
    }
    setChosenAmount(amount)
  }

  const AMOUNTS: Array<number> = [5, 10, 20, maxUsdAmount]
  const formatButtonLabel = (amount: number): string => {
    if (amount === maxUsdAmount) return "Max"
    return formatDollars(amount)
  }
  const formatChosenAmount = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(chosenAmount)

  return (
    <Box h="100%">
      <Box px={6} py={8}>
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          mb={{ base: 4, md: 6 }}
        >
          Send
        </Text>
        <Text mb={{ base: 0, md: 6 }}>How much do you want to send?</Text>
      </Box>
      <Flex
        px={6}
        py={{ base: 4, md: 6 }}
        borderTop="1px"
        borderBottom="1px"
        borderColor="background.highlight"
        gap={4}
        color="body.medium"
        fontSize="xs"
      >
        {/* Left side: Displayed send amount */}
        <NotificationPopover
          title="Example walkthrough"
          content="Choose a value below"
          side="top"
        >
          <Flex
            alignItems="top"
            flex={1}
            fontWeight="bold"
            color={chosenAmount > 0 ? "body.base" : "disabled"}
          >
            <Text fontSize="6xl" h="full" lineHeight="1em">
              {formatChosenAmount}
            </Text>
          </Flex>
        </NotificationPopover>
        {/* Right side */}
        <Flex direction="column" alignItems="end">
          <NotificationPopover
            side="top"
            title="Example walkthrough"
            content="In this walkthrough you can only send ETH, but in real wallet you can send different tokens as well"
          >
            {/* Token selector pill */}
            <Flex
              px={2}
              py={1}
              mb={4}
              borderRadius="full"
              bg="body.light"
              alignItems="center"
            >
              <Icon as={EthTokenIcon} fontSize="xl" me={1.5} />
              <Text fontWeight="bold" m={0} color="body.base">
                ETH
              </Text>
            </Flex>
          </NotificationPopover>
          {/* Balances */}
          <Text fontWeight="bold" m={0} lineHeight={1}>
            Balance: {usdAmount}
          </Text>
          <Text m={0}>
            <>{ethAmount} ETH</>
          </Text>
        </Flex>
      </Flex>
      <Box bg="background.highlight" h="full">
        <Flex
          flexWrap="nowrap"
          justify="space-between"
          px={6}
          py={6}
          fontWeight="bold"
          bg="background.highlight"
          position="relative"
        >
          {/* Amount buttons */}
          {AMOUNTS.map((amount, i) => (
            <Button
              key={i}
              onClick={() => handleSelection(amount)}
              borderRadius="10px"
              bg={amount === chosenAmount ? "primary.hover" : "primary.base"}
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
            >
              {formatButtonLabel(amount)}
            </Button>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
