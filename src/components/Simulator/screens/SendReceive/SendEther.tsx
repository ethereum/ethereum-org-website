import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { MdChevronRight } from "react-icons/md"
import { EthTokenIcon } from "../../icons"

// TODO: Pass ethPrice and ethBalance
interface IProps {
  ethPrice?: number
  ethBalance?: number
  chosenAmount: number
  setChosenAmount: (amount: number) => void
}
export const SendEther: React.FC<IProps> = ({
  ethPrice = 1000,
  ethBalance = 0.5,
  chosenAmount,
  setChosenAmount,
}) => {
  const formatDollars = (amount: number): string =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    }).format(amount)

  const usdAmount = formatDollars(ethPrice * ethBalance)

  const ethAmount = Intl.NumberFormat("en", {
    maximumFractionDigits: 5,
  }).format(ethBalance)

  const handleSelection = (amount: number): void => {
    if (amount === Infinity) {
      setChosenAmount(ethBalance * ethPrice)
      return
    }
    setChosenAmount(amount)
  }
  const AMOUNTS: Array<number> = [5, 10, 20, Infinity]
  const formatAmount = (amount: number): string => {
    if (amount === Infinity) return "Max"
    return formatDollars(amount)
  }
  return (
    <Box h="100%">
      <Box px={6} py={8}>
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          color="body.medium"
        >
          Send
        </Text>
        <Text color="body.medium">How much do you want to send?</Text>
      </Box>
      <Flex
        p={6}
        borderTop="1px"
        borderBottom="1px"
        borderColor="background.highlight"
        gap={4}
        color="body.medium"
        fontSize="xs"
      >
        {/* Displayed send amount */}
        <Flex
          alignItems="top"
          flex={1}
          fontWeight="bold"
          color={chosenAmount > 0 ? "body.base" : "inherit"}
        >
          <Text fontSize="6xl" h="full" lineHeight="1em">
            {chosenAmount}
          </Text>
          <Text fontSize="3xl" lineHeight="1.4em">
            $
          </Text>
        </Flex>
        <Flex direction="column" alignItems="end">
          {/* Token selector pill */}
          <Flex
            ps={2}
            pe={1}
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
            <Icon
              as={MdChevronRight}
              fontSize="xl"
              transform="scale(1.125)"
              ms={0.5}
            />
          </Flex>
          {/* Balances */}
          <Text
            /* color="body.medium" */ fontWeight="bold"
            m={0}
            lineHeight={1}
          >
            Balance: {usdAmount}
          </Text>
          <Text /* color="body.medium" */ m={0}>
            <>{ethAmount} ETH</>
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexWrap="nowrap"
        justify="space-between"
        px={6}
        py={6}
        fontWeight="bold"
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
            {formatAmount(amount)}
          </Button>
        ))}
      </Flex>
    </Box>
  )
}
