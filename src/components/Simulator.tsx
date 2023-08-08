import { Flex, type FlexProps, Grid, Text } from "@chakra-ui/react"
import React from "react"
import { PathButton, SimulatorModal } from "../components/Simulator/"
import type { PathOption } from "../interfaces"
import { useDisclosure } from "@chakra-ui/react"

const InnerContainer: React.FC<Pick<FlexProps, "children">> = ({
  children,
}) => (
  <Flex
    direction={{ base: "column", md: "row" }}
    bg="background.base"
    p={{ base: 4, md: 16 }}
    alignItems="center"
    textAlign={{ base: "center", md: "start" }}
    gap={{ base: 4, md: 8, lg: 16 }}
    maxW="1000px"
    w="full"
  >
    {children}
  </Flex>
)

interface StartingPointProps {
  onOpen: () => void
}
const StartingPoint: React.FC<StartingPointProps> = ({ onOpen }) => {
  const pathOptions: Array<PathOption> = [
    {
      primaryText: "Create account",
      secondaryText: "How to?",
      iconName: "EthWalletIcon",
      onClick: onOpen,
    },
    {
      primaryText: "Send/receive",
      secondaryText: "How to?",
      iconName: "WalletAppIcon",
      onClick: onOpen,
    },
    {
      primaryText: "Connect to Web3",
      secondaryText: "How to?",
      iconName: "ConnectWeb3Icon",
      onClick: onOpen,
    },
  ]

  return (
    <>
      {/* TEXT CONTENT */}
      <Flex direction="column" px={4}>
        <Text
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontStyle="italic"
          color="body.medium"
          mb={2}
        >
          Interactive explainer with extra long text intl
        </Text>
        <Text
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          lineHeight="115%"
          fontWeight="bold"
          m={0}
        >
          How to use a wallet with extra long text intl
        </Text>
      </Flex>
      {/* Button stack for path options */}
      <Flex
        direction="column"
        gap={8}
        w={{ base: "min(100%, 320px)", md: "300px" }}
        minW={{ md: "300px" }}
      >
        {pathOptions.map((pathOption) => (
          <PathButton pathOption={pathOption} />
        ))}
      </Flex>
    </>
  )
}

export const Simulator: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const setIsOpen = () => {
    isOpen ? onClose() : onOpen()
  }
  return (
    <Grid
      bg="cardGradient"
      placeItems="center"
      p={{ base: 4, md: 16 }}
      w="full"
    >
      <InnerContainer>
        <StartingPoint onOpen={onOpen} />
        {isOpen && <SimulatorModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      </InnerContainer>
    </Grid>
  )
}
