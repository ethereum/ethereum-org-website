import { Box, Flex, Text } from "@chakra-ui/react"
import React from "react"

interface IProps {
  chosenAmount: number
  ethPrice: number
}
export const SendSummary: React.FC<IProps> = ({ chosenAmount, ethPrice }) => {
  const formatEth = (amount: number): string =>
    new Intl.NumberFormat("en", { maximumFractionDigits: 5 }).format(amount)

  const formatChosenAmount = new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).format(chosenAmount)

  return (
    <>
      <Box py={8} px={6}>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={8}>
          You are sending
        </Text>
        <Flex
          alignItems="top"
          flex={1}
          fontWeight="bold"
          color={chosenAmount > 0 ? "body.base" : "inherit"}
          mb={2}
        >
          <Text fontSize="6xl" h="full" lineHeight="1em" m={0}>
            {formatChosenAmount}
          </Text>
          <Text fontSize="3xl" lineHeight="1.4em" m={0}>
            $
          </Text>
        </Flex>
        <Text fontSize="xs" color="body.medium" m={0}>
          {formatEth(chosenAmount / ethPrice)} ETH
        </Text>
      </Box>
      <Flex
        py={8}
        px={6}
        bg="background.highlight"
        h="full"
        gap={6}
        direction="column"
      >
        <Box>
          <Text m={0}>To</Text>
          <Text m={0} fontWeight="bold">
            Jacob
          </Text>
        </Box>
        <Box>
          <Text m={0}>Arrival time</Text>
          <Text m={0} fontWeight="bold">
            est. about 12 seconds
          </Text>
        </Box>
        <Box>
          <Text m={0}>Nework fees</Text>
          <Text m={0} fontWeight="bold">
            {Intl.NumberFormat("en", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "USD",
              notation: "compact",
            }).format(0.17)}
          </Text>
        </Box>
      </Flex>
    </>
  )
}
