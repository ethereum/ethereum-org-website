import React from "react"
import { ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react"
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
              words is used to generate new accounts and recover your existing
              accounts.
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
              Feels old-fashioned, but{" "}
              <em>some things we don't want online!</em>
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
              You're almost done! Click the words in the correct order to prove
              you've backed up your phrase.
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
              Your wallet helps you manage your funds, NFTs, Web3 identity and
              more. Here we'll go over how to send and receive some tokens on
              Ethereum.
            </Text>
            <Text>
              New accounts are of course empty, so let's first look at how to
              receive some ETH to a new address.
            </Text>
            <Text>Click the button to get your address.</Text>
          </>
        ),
      },
      {
        header: "Receiving tokens is as easy as sharing your address",
        description: (
          <>
            <Text>
              Your address is a <em>public</em> identifier for your
              account—share this with others to receive tokens.
            </Text>
            <Text>
              An Ethereum address is like a transparent public dropbox, with
              your own unique number on it—anyone can see in, or make a deposit,
              but only you have the key to unlock and use what's inside.
            </Text>
            <Text>
              Your wallet holds the key to this lockbox, not the contents
              themselves.
            </Text>
          </>
        ),
      },
      {
        header: "You received funds! Now let's send some",
        description: (
          <>
            <Text>
              Now you have some ETH to cover network fees, allowing you to
              submit transactions yourself.
            </Text>
            <Text>
              Note that you didn't need to provide any personal information, or
              have any funds to begin with to start receiving assets to your
              address—receiving is free. <Emoji text="😁" />
            </Text>
            <Text>
              Let's try sending some funds to a friend by clicking the "Send"
              button.
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
            <Text>
              Ethereum doesn't discriminate, and never stops, allowing you full
              control over your funds—24/7.
            </Text>
            <Text>Select an amount to send then click "Next".</Text>
          </>
        ),
      },
      {
        header: "You can save contacts to make it easier",
        description: (
          <>
            <Text>
              To send tokens, you only need to know the recipients Ethereum
              address.
            </Text>
            <Text>You can send tokens anywhere globally at any time.</Text>
            <Text>
              As you use your wallet, you can save users as contacts for
              repeated use. Let's send some funds to Jacob.
            </Text>
          </>
        ),
      },
      {
        header: "You will need small amount of ETH to send tokens (fee)",
        description: (
          <>
            <Text>
              Make sure your account has enough ETH to cover network fees. Fees
              change based on how many people are using Ethereum.
            </Text>
            <Text>
              Most wallets will automatically add the suggested fee to the
              transaction which you can then confirm.
            </Text>
          </>
        ),
      },
      {
        header: "Thats it! You know the basics of transferring tokens 🎉",
        description: (
          <>
            <Text>Peer-to-peer. Global. Always available.</Text>
            <Text>
              Start the next lesson to learn how to use your wallet to log into
              Web3 applications.
            </Text>
          </>
        ),
      },
    ],
    ctaLabels: ["", "Share address", "", "Next", "", "Send now"],
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
        header: "Explore Web3: from NFTs to decentralized finance and identity",
        description: (
          <>
            <Text>
              Assets stored on Ethereum can be accessed from any application,
              adding portability to your accounts.
            </Text>
            <Text>
              The same account address will also represent your identity on many
              different Ethereum compatible blockchains such as Arbitrum,
              Polygon or Optimism.
            </Text>
          </>
        ),
      },
      {
        header:
          "No need to share any phone number, e-mail, or other identifying information",
        description: (
          <Text>
            Your public Ethereum address serves as a way to identify yourself,
            and can be authenticated using the keys in your wallet. No need to
            create a new account—you already own one.
          </Text>
        ),
      },
      {
        header:
          "No geographical or political discrimination against who can use Ethereum services",
        description: (
          <>
            <Text>You can use the same address on multiple devices.</Text>
            <Text>
              Wallets are technically only an interface to show you your balance
              and to make transactions—
              <strong>
                your assets aren't stored inside the wallet, but on the
                blockchain.
              </strong>
            </Text>
          </>
        ),
      },
      {
        header: "Start your journey now",
        description: (
          <>
            <Text>
              Great job! You're ready to start using apps on Ethereum.
            </Text>
            <Text fontWeight="bold" mb={2}>
              What to do next:
            </Text>
            <OrderedList>
              <Link href="/security/">
                <ListItem>Learn about staying safe in Web3</ListItem>
              </Link>
              <Link href="/what-is-ethereum/">
                <ListItem>Learn more about Ethereum</ListItem>
              </Link>
              <Link href="/dapps/">
                <ListItem>Check out some beginner friendly apps</ListItem>
              </Link>
            </OrderedList>
          </>
        ),
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
    usdConversion: 1,
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
    usdConversion: 1,
    Icon: UniTokenIcon,
  },
]

export const CONTACTS: Array<Contact> = [
  {
    name: "Jacob",
    lastAction: "Received 1 hour ago",
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
