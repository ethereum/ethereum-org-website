import React from "react"
import { ListItem, Text, UnorderedList } from "@chakra-ui/react"
import Emoji from "../../Emoji"
import type { SimulatorData } from "../types"
import { ConnectWeb3, CreateAccount, SendReceive } from "../screens"
import {
  ConnectWeb3Icon,
  DaiTokenIcon,
  EthTokenIcon,
  EthWalletIcon,
  UniTokenIcon,
  WalletAppIcon,
} from "../icons"
import { CONNECT_WEB3, CREATE_ACCOUNT, SEND_RECEIVE } from "../constants"
import Link from "../../Link"
import { Contact, TokenBalance } from "../Wallet/interfaces"

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
        description: null,
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
        description: null,
      },
    ],
    ctaLabels: [
      "Install a wallet",
      "Open wallet",
      "Create account",
      "Next",
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
        header: "Send or receive digital assets from anywhere",
        description: (
          <>
            <Text>
              Your wallet helps you manage your tokens, NFTs, and Web3 identity.
            </Text>
            <Text>Let’s look at sending and receiving tokens on Ethereum.</Text>
            <Text>
              Don't have a wallet yet?{" "}
              <Link href="/wallets/find-wallet/">Find one here.</Link>
            </Text>
            <Text>Click the "Receive" button to get your address.</Text>
          </>
        ),
      },
      {
        header: "Receiving tokens is as easy as sharing your address",
        description: (
          <>
            <Text>You can use the same address on multiple devices.</Text>
            <Text>
              Wallets are technically only an interface to show you your balance
              and to make transactions, your assets aren't stored inside the
              wallet, but on the blockchain.
            </Text>
          </>
        ),
      },
      {
        header: "Lets look at how to send tokens now",
        description: (
          <>
            <Text>
              Ensure that your account has sufficient ETH to cover the
              transaction fee, which varies depending on network conditions.
            </Text>
            <Text>
              Most wallets will automatically add the suggested fee to the
              transaction which you can then confirm.
            </Text>
          </>
        ),
      },
      {
        header: "Sending tokens is quick and irreversible",
        description: (
          <>
            <Text>
              Unlike with traditional banking, there are no borders, hidden fees
              or third parties intervening and stopping your transactions.
            </Text>
          </>
        ),
      },
      {
        header: "You can save contacts to make it easier",
        description: (
          <>
            <Text>
              To send tokens, you only need to know recipients ethereum address.
            </Text>
            <Text>You can send tokens anywhere globally at any time.</Text>
          </>
        ),
      },
      {
        header: "You will need small amount of ETH to send tokens (fee)",
        description: (
          <>
            <Text>
              Ensure that your account has sufficient ETH to cover the
              transaction fee, which varies depending on network conditions.
            </Text>
            <Text>
              Most wallets will automatically add the suggested fee to the
              transaction which you can then confirm.
            </Text>
          </>
        ),
      },
      {
        header: "Thats it! You should know the basics of using a wallet  🎉",
        description: null,
      },
    ],
    ctaLabels: ["", "Done", "", "Next", "", "Send now"],
    finalCtaLink: {
      label: "See a list of wallets",
      href: "/wallets/find-wallet/",
    },
    nextPathId: CONNECT_WEB3,
  },
  [CONNECT_WEB3]: {
    title: "Connect to Web3",
    Icon: ConnectWeb3Icon,
    Screen: ConnectWeb3,
    explanations: [
      {
        header: "Explore web3: From NFTs to decentralized finance and identity",
        description: (
          <>
            <Text>
              Wallets are free apps you can download from{" "}
              <Link href="/wallets/find-wallet/">here</Link>.
            </Text>
            <Text>
              Wallets can be a mobile or desktop app, browser extension and even
              a hardware.
            </Text>
          </>
        ),
      },
      {
        header:
          "You can have a single, private login in most Ethereum based projects",
        description: (
          <Text>
            The same account address will also represent your identity on many
            different Ethereum compatible blockchains such as Arbitrum, Polygon
            or Optimism.
          </Text>
        ),
      },
      {
        header: "No need to share any of your personal information or e-mail",
        description: <Text>TODO: Copy needed</Text>,
      },
      {
        header:
          "No geographical or political discrimination against who can use Ethereum services",
        description: (
          <>
            <Text>You can use the same address on multiple devices.</Text>
            <Text>
              Wallets are technically only an interface to show you your balance
              and to make transactions, your account isn't stored inside the
              wallet, but on the blockchain.
            </Text>
          </>
        ),
      },
      {
        header: "Start your journey now",
        description: null,
      },
    ],
    ctaLabels: ["Connect wallet", "Connect to app", "Done", "Finished"],
  },
}

export const defaultTokenBalances: Array<TokenBalance> = [
  {
    name: "Ether",
    ticker: "ETH",
    amount: 0,
    usdConversion: 1600, // TODO: Fetch?
    Icon: EthTokenIcon,
  },
  {
    name: "DAI",
    ticker: "DAI",
    amount: 0,
    usdConversion: 1,
    Icon: DaiTokenIcon,
  },
  {
    name: "Uniswap",
    ticker: "UNI",
    amount: 0,
    usdConversion: 4.5, // TODO: Fetch?
    Icon: UniTokenIcon,
  },
]

export const CONTACTS: Array<Contact> = [
  {
    name: "Jacob",
    lastAction: "Sent to 5 days ago",
  },
  {
    name: "Mom",
    lastAction: "Sent to 2 weeks ago",
  },
  {
    name: "Uncle",
    lastAction: "Sent to 1 month ago",
  },
]
