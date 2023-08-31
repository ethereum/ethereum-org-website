import React from "react"
import { ListItem, Text, UnorderedList } from "@chakra-ui/react"
import Emoji from "../../Emoji"
import type { SimulatorData } from "../types"
import { ConnectWeb3, CreateAccount, SendReceive } from "../screens"
import {
  CreateAccountIcon,
  ConnectWeb3Icon,
  DaiTokenIcon,
  EthTokenIcon,
  SendReceiveIcon,
  UniTokenIcon,
} from "../icons"
import { CONNECT_WEB3, CREATE_ACCOUNT, SEND_RECEIVE } from "../constants"
import Link from "../../Link"
import { Contact, TokenBalance } from "../Wallet/interfaces"

export const simulatorData: SimulatorData = {
  [CREATE_ACCOUNT]: {
    title: "Create account",
    Icon: CreateAccountIcon,
    Screen: CreateAccount,
    explanations: [
      {
        header: "Wallets are used to interact with Ethereum",
        description: (
          <>
            <Text>
              To get started, you&apos;ll need to download a wallet app.
            </Text>
            <Text>
              Most people use mobile apps, but desktop apps and browser
              extensions are also available.
            </Text>
            <Text>
              Let's set up a mobile wallet. Click "Install a wallet" to get
              started.
            </Text>
          </>
        ),
      },
      {
        header: "They are free apps you can download",
        description: (
          <>
            <Text>
              Mobile wallet apps can be downloaded and installed using app
              stores.
            </Text>
            <Text>
              Wallets provide an easy way to create an Ethereum account, and
              then interact with Ethereum and its applications.
            </Text>
            <Text>Go ahead and open your new wallet app.</Text>
          </>
        ),
      },
      {
        header: "Creating an account is free, private and easy",
        description: (
          <>
            <Text>
              Ethereum accounts are created privately and do not require any
              forms or approval—no personal identifying information required!
            </Text>
            <Text>Click on "Create account" to generate a new account.</Text>
          </>
        ),
      },
      {
        header:
          "This is YOUR account, and nobody else's—you control it completely",
        description: (
          <Text>
            No company, including your wallet provider, has access to your
            account.
          </Text>
        ),
      },
      {
        header: "A recovery phrase is used to keep the account safe",
        description: (
          <>
            <Text>
              Sometimes called a "seed phrase", this unique sequence of 12-24
              words is used to generate new accounts. This phrase can also
              recover your account to a new wallet or device.
            </Text>
            <Text>
              Read notice and click "I understand" to see and backup your
              recovery phrase.
            </Text>
          </>
        ),
      },
      {
        header: "Keep your phrase safe!",
        description: (
          <>
            <Text fontWeight="bold" mb={2}>
              Storing small amount of value:
            </Text>
            <UnorderedList listStyleType="none" mx={0} lineHeight={1}>
              <ListItem>
                <Emoji text="🔐" me={2} /> Consider saving in a password manager
              </ListItem>
            </UnorderedList>
            <Text fontWeight="bold" mb={2}>
              Storing any significant value:
            </Text>
            <UnorderedList listStyleType="none" mx={0} lineHeight={1}>
              <ListItem>
                <Emoji text="✍️" me={2} /> Write your recovery phrase down
              </ListItem>
              <ListItem>
                <Emoji text="🔒" me={2} /> Store it in a safe place (consider
                multiple backups)
              </ListItem>
              <ListItem>
                <Emoji text="👩‍🏫" me={2} />{" "}
                <Link href="#TODO-link-out">
                  Learn more on protecting your recovery phrase
                </Link>
              </ListItem>
            </UnorderedList>
            <Text fontWeight="bold" mb={2}>
              Unsafe backup methods:
            </Text>
            <UnorderedList listStyleType="none" mx={0} lineHeight={1}>
              <ListItem>
                <Emoji text="❌" me={2} />
                Texting it to a friend (or anyone!)
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
            <Text>
              Feels old-fashioned, but <em>some things we don't want online</em>
              .
            </Text>
          </>
        ),
      },
      {
        header: "You may be asked to repeat it to ensure you've saved it",
        description: (
          <>
            <Text>
              Since you and only you control this phrase, it is critical to take
              steps to backup and secure it.
            </Text>
            <Text>
              Wallets usually ask you to repeat this on initial setup to ensure
              you've backed it up, but you do <strong>not</strong> have to enter
              this every time you use your wallet.
            </Text>
            <Text>
              Almost done! Click the words in the correct order to prove you've
              backed up your phrase.
            </Text>
          </>
        ),
      },
      {
        header: "Thats it! Welcome to Ethereum 🎉",
        description: (
          <>
            <Text>That's all it takes to create an Ethereum account!</Text>
            <Text>
              In the next lesson we'll learn how to use your new account to
              receive and send some funds.
            </Text>
          </>
        ),
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
    Icon: SendReceiveIcon,
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
    finalCtaLink: {
      label: "Get a wallet",
      href: "/wallets/find-wallet/",
      isPrimary: true,
    },
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
