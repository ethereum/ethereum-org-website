import React from "react"
import {
  Box,
  type BoxProps,
  Flex,
  Icon,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react"
import { MdChevronLeft, MdInfoOutline } from "react-icons/md"
import Button from "../Button"
import Tooltip from "../Tooltip"
import { SimulatorStateProps } from "../../interfaces"
import Emoji from "../Emoji"

// TODO: Relocate data
const explanationData = {
  "create-account": [
    {
      header: "Interact with Ethereum using a wallet",
      description: (
        <>
          <Text>
            To get started, you&apos;ll need to download a wallet app.
          </Text>
          <Text>
            Most people use mobile apps, but you can download a desktop app, or
            use a browser extension.
          </Text>
        </>
      ),
    },
    {
      header: "They are free apps you can download",
      description: (
        <>
          <Text>You will need to install an app called wallet.</Text>
          <Text>
            Wallets can be a mobile or desktop app, browser extension and even a
            hardware.
          </Text>
        </>
      ),
    },
    {
      header: "Creating an account is free and easy",
      description: (
        <>
          <Text>
            Creating an account on Ethereum is free, easy, and permissionless—no
            documentation or proofs required!
          </Text>
          <Text>
            Some wallets have &quot;smart accounts&quot; which can require ETH
            to setup, but we won&apos;t cover those in this simulation{" "}
            <Emoji text="👽" ms={1} />
          </Text>
        </>
      ),
    },
    {
      header:
        "The account isn't maintained by any company, only you have access to it",
      description: <></>,
    },
    {
      header: "Use recovery phrase to keep the account safe",
      description: (
        <Text>
          The recovery phrase (sometimes called a seed phrase) is the key to
          controlling your account.
        </Text>
      ),
    },
    {
      header: "Keep it safe!",
      description: (
        <>
          <Text fontWeight="bold" mb={2}>
            Storing smaller amount of funds:
          </Text>
          <UnorderedList listStyleType="none" mx={0} lineHeight={1}>
            <ListItem>
              <Emoji text="✅" me={2} />
              Backup file in cloud storage
            </ListItem>
          </UnorderedList>
          <Text fontWeight="bold" mb={2}>
            Storing significant funds:
          </Text>
          <UnorderedList listStyleType="none" mx={0} lineHeight={1}>
            <ListItem>
              <Emoji text="✅" me={2} />
              Use durable offline method
            </ListItem>
            <ListItem>
              <Emoji text="✅" me={2} />
              Use a hardware wallet
            </ListItem>
          </UnorderedList>
          <Text fontWeight="bold" mb={2}>
            Risky ways to store your recovery phrase:
          </Text>
          <UnorderedList listStyleType="none" mx={0} lineHeight={1}>
            <ListItem>
              <Emoji text="❌" me={2} />
              Texting it to a friend
            </ListItem>
            <ListItem>
              <Emoji text="❌" me={2} />
              Taking a picture of the phrase
            </ListItem>
            <ListItem>
              <Emoji text="❌" me={2} />
              Saving it in a file on your computer
            </ListItem>
          </UnorderedList>
        </>
      ),
    },
    {
      header: "You may be asked to repeat it to ensure you saved it",
      description: (
        <Text>
          The recovery phrase (sometimes called a seed phrase) is the key to
          controlling your account.
        </Text>
      ),
    },
  ],
}

export const Explanation: React.FC<SimulatorStateProps> = ({ state }) => {
  const { regressStepper, step, totalSteps, pathId } = state
  const { header, description } = explanationData[pathId][step]

  const Description: React.FC<BoxProps> = (props) => (
    <Box {...props}>{description}</Box>
  )
  return (
    <Flex direction="column" flex={1} alignItems="start">
      <Button
        variant="ghost"
        leftIcon={<MdChevronLeft size="18px" />}
        sx={{ paddingInlineStart: 0 }}
        mb={8}
        onClick={regressStepper}
      >
        Back
      </Button>
      {/* Step counter */}
      <Text
        borderRadius="base"
        bg="background.highlight"
        p={2}
        lineHeight={1}
        fontSize="xs"
        fontWeight="bold"
        mb={2}
      >
        {step + 1}/{totalSteps}
      </Text>
      <Text
        fontSize={{ base: "2xl", md: "3xl" }}
        lineHeight={{ base: 8, md: 10 }}
        fontWeight="bold"
        mb={8}
      >
        {header}
      </Text>
      <Description display={{ base: "none", md: "block" }} />
      <Flex display={{ md: "none" }} alignItems="center">
        <Tooltip content={<Description />}>
          <Text as="span">More info</Text>
          <Icon as={MdInfoOutline} size={24} />
        </Tooltip>
      </Flex>
    </Flex>
  )
}
