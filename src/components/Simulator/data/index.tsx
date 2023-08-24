import React from "react"
import { ListItem, Text, UnorderedList } from "@chakra-ui/react"
import Emoji from "../../Emoji"
import type { SimulatorData } from "../types"
import { ConnectWeb3, CreateAccount, SendReceive } from "../screens"
import { ConnectWeb3Icon, EthWalletIcon, WalletAppIcon } from "../icons"
import { CONNECT_WEB3, CREATE_ACCOUNT, SEND_RECEIVE } from "../constants"

export const simulatorData: SimulatorData = {
  [CREATE_ACCOUNT]: {
    title: "Create account",
    Icon: EthWalletIcon,
    Screen: CreateAccount,
    explanations: [
      {
        header: "Interact with Ethereum using a wallet",
        description: (
          <>
            <Text>
              To get started, you&apos;ll need to download a wallet app.
            </Text>
            <Text>
              Most people use mobile apps, but you can download a desktop app,
              or use a browser extension.
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
              Wallets can be a mobile or desktop app, browser extension and even
              a hardware.
            </Text>
          </>
        ),
      },
      {
        header: "Creating an account is free and easy",
        description: (
          <>
            <Text>
              Ethereum accounts do not require any permission to create—no
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
      {
        // ? Change type for header to allow components, ie. Emoji?
        header: "Thats it! Welcome to Ethereum 🎉",
        description: <></>,
      },
    ],
    ctaLabels: [
      "Install a wallet",
      "Open wallet",
      "Create account",
      "",
      "I understand",
      "Next",
      "Start using wallet",
    ],
    finalCtaLink: {
      label: "See a list of wallets",
      href: "/wallets/find-wallet/",
    },
    nextPathId: SEND_RECEIVE,
  },
  [SEND_RECEIVE]: {
    title: "Send / receive tokens",
    Icon: WalletAppIcon,
    Screen: SendReceive,
    explanations: [
      {
        header: "Send/receive header",
        description: <Text>Send/receive description</Text>,
      },
    ],
    ctaLabels: ["Coming soon™"],
    nextPathId: CONNECT_WEB3,
  },
  [CONNECT_WEB3]: {
    title: "Connect to Web3",
    Icon: ConnectWeb3Icon,
    Screen: ConnectWeb3,
    explanations: [
      {
        header: "Connect to Web3 header",
        description: <Text>Connect to Web3 description</Text>,
      },
    ],
    ctaLabels: ["Coming soon™"],
  },
}
