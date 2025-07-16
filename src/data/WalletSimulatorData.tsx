import { Stack } from "@/components/ui/flex"
import Link from "@/components/ui/Link"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"

import Emoji from "../components/Emoji"
import GlossaryTooltip from "../components/Glossary/GlossaryTooltip"
import {
  CONNECT_WEB3,
  CREATE_ACCOUNT,
  SEND_RECEIVE,
} from "../components/Simulator/constants"
import {
  ConnectWeb3Icon,
  CreateAccountIcon,
  SendReceiveIcon,
} from "../components/Simulator/icons"
import {
  ConnectWeb3,
  CreateAccount,
  SendReceive,
} from "../components/Simulator/screens"
import { CONTACTS } from "../components/Simulator/screens/SendReceive/constants"
import type { SimulatorData } from "../components/Simulator/types"

export const walletOnboardingSimData: SimulatorData = {
  [CREATE_ACCOUNT]: {
    title: "Create account",
    Icon: CreateAccountIcon,
    Screen: CreateAccount,
    explanations: [
      {
        header: "Begin your journey by downloading a wallet",
        description: (
          <>
            <p>To get started, you&apos;ll need to download a wallet app.</p>
            <p>
              Most people use mobile apps, but desktop apps and browser
              extensions are also available.
            </p>
            <p>
              Let&apos;s set up a mobile wallet. Click &quot;Install a
              wallet&quot; to get started.
            </p>
          </>
        ),
      },
      {
        header: "Wallets are free apps you can download",
        description: (
          <>
            <p>
              Mobile wallet apps can be downloaded and installed using any app
              store.
            </p>
            <p>
              Wallets provide an easy way to create an Ethereum account, and
              then use Ethereum and its applications.
            </p>
            <p>Go ahead and open your new wallet app.</p>
          </>
        ),
      },
      {
        header: "Creating an account is free, private and easy",
        description: (
          <>
            <p>
              Ethereum accounts are created privately and do not require any
              forms or approval—no personal identifying information required!
            </p>
            <p>
              Click on &quot;Create account&quot; to generate a new account.
            </p>
          </>
        ),
      },
      {
        header:
          "This is YOUR account, and nobody else's—you control it completely",
        description: (
          <p>
            No company, including your wallet provider, has access to your
            account.
          </p>
        ),
      },
      {
        header: "A recovery phrase is used to keep the account safe",
        description: (
          <>
            <p>
              You and only you control this phrase, so it is critical to take
              steps to backup and secure it.
            </p>
            <p>
              Read carefully and click &quot;I understand&quot; to see and
              backup your recovery phrase.
            </p>
          </>
        ),
      },
      {
        header: "Keep your phrase safe!",
        description: (
          <>
            <Stack>
              <p className="font-bold">Storing small amount of value:</p>
              <UnorderedList className="leading-1 ms-0 list-none">
                <ListItem>
                  <Emoji text="✅" className="me-2" /> Consider saving in a
                  password manager
                </ListItem>
              </UnorderedList>
            </Stack>
            <Stack>
              <p className="font-bold">Storing any significant value:</p>
              <UnorderedList className="leading-1 ms-0 list-none">
                <ListItem>
                  <Emoji text="✅" className="me-2" /> Write your recovery
                  phrase down
                </ListItem>
                <ListItem>
                  <Emoji text="✅" className="me-2" /> Store it in a safe place
                  (consider multiple backups)
                </ListItem>
                {/* TODO: Add link for seed phrase further reading */}
                {/* <ListItem>
                <Emoji text="✅" className="me-2" />{" "}
                <Link href="#TODO-link-out">
                Learn more on protecting your recovery phrase
                </Link>
                </ListItem> */}
              </UnorderedList>
            </Stack>
            <Stack>
              <p className="font-bold">Unsafe backup methods:</p>
              <UnorderedList className="leading-1 ms-0 list-none">
                <ListItem>
                  <Emoji text="❌" className="me-2" />
                  Texting it to a friend (or anyone!)
                </ListItem>
                <ListItem>
                  <Emoji text="❌" className="me-2" />
                  Taking a picture of the phrase
                </ListItem>
                <ListItem>
                  <Emoji text="❌" className="me-2" />
                  Saving it in a file on your computer
                </ListItem>
              </UnorderedList>
            </Stack>
          </>
        ),
      },
      {
        header: "Repeat phrase to prove you have saved it",
        description: (
          <>
            <p>
              This is done on initial setup only, but is <strong>not</strong>{" "}
              required every time.
            </p>
            <p>
              <strong>Keep this private!</strong> Nobody from customer service
              should <em>ever</em> ask you for this.
            </p>
            <p>
              Click the words in the correct order to prove you&apos;ve backed
              up your phrase.
            </p>
          </>
        ),
      },
      {
        header: "That's it! Welcome to Ethereum 🎉",
        description: (
          <p>
            In the next lesson we&apos;ll learn how to use your new account to
            receive and send some funds.
          </p>
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
      label: "Download a real wallet",
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
        header: "Receive digital assets from anywhere",
        description: (
          <>
            <p>
              Your wallet helps you manage your funds,{" "}
              <GlossaryTooltip termKey="nft">NFTs</GlossaryTooltip>,{" "}
              <GlossaryTooltip termKey="web3">Web3</GlossaryTooltip> identity
              and more. Here we&apos;ll go over how to receive and send some
              tokens on Ethereum.
            </p>
            <p>
              Let&apos;s first look at how to receive ether (ETH),
              Ethereum&apos;s native currency.
            </p>
            <p>
              Click the &quot;Receive&quot; button to see how to receive funds.
            </p>
          </>
        ),
      },
      {
        header: "Receiving tokens is as easy as sharing your address",
        description: (
          <>
            <p>
              Your address is a <em>sharable</em> identifier for your
              account—share this with others to receive tokens.
            </p>
            <p>
              An Ethereum address is like a transparent public dropbox, with
              your own unique number on it—anyone can see in, or put stuff
              inside, but only you have the ability to unlock and use its
              contents.
            </p>
          </>
        ),
      },
      {
        header: "You received ether (ETH)! Now let's send some",
        description: (
          <>
            <p>
              Now you have some ETH to cover network fees, allowing you to
              submit transactions yourself.
            </p>
            <p>
              Note that you didn&apos;t need to provide any personal
              information, or have any funds to begin with to start receiving
              assets to your address—receiving is free. <Emoji text="😁" />
            </p>
            <p>
              Let&apos;s try sending some ETH by clicking the &quot;Send&quot;
              button.
            </p>
          </>
        ),
      },
      {
        header: "Sending tokens is quick and irreversible",
        description: (
          <>
            <p>
              Unlike with traditional banking, there are no borders, or third
              parties intervening and stopping your transactions.
            </p>
            <p>
              Ethereum doesn&apos;t discriminate, and never stops, allowing you
              full control over your funds—24/7.
            </p>
            <p>
              Select an amount to send then click &quot;Select recipient.&quot;
            </p>
          </>
        ),
      },
      {
        header: "You can save contacts to make it easier",
        description: (
          <>
            <p>
              To send tokens, you only need to know the recipients Ethereum
              address.
            </p>
            <p>You can send tokens anywhere globally at any time.</p>
            <p>
              As you use your wallet, you can save users as contacts for
              repeated use. Let&apos;s send some funds back to{" "}
              {CONTACTS[0].name}.
            </p>
          </>
        ),
      },
      {
        header: "You will need small amount of ETH to send tokens (fee)",
        description: (
          <>
            <p>
              Make sure your account has enough ETH to cover network fees. Fees
              change based on how many people are using Ethereum.
            </p>
            <p>
              Most wallets will automatically add the suggested fee to the
              transaction which you can then confirm.
            </p>
          </>
        ),
      },
      {
        header: "Peer-to-peer. Global. Always available. 🎉",
        description: (
          <p>
            Start the next lesson to learn how to use your wallet to log into
            Web3 applications.
          </p>
        ),
      },
    ],
    ctaLabels: ["", "Share address", "", "Select recipient", "", "Send now"],
    finalCtaLink: {
      label: "Download a real wallet",
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
            <p>
              Your wallet can be used to connect to all sorts of applications,
              allowing you to interact with your onchain assets.
            </p>
            <p>
              Your friend just sent an NFT art piece to your address! Let&apos;s
              go to a new NFT marketplace website to view it.
            </p>
          </>
        ),
      },
      {
        header: "No need to create a new account for each service",
        description: (
          <>
            <p>
              Your account is universal across all Ethereum and
              Ethereum-compatible applications.
            </p>
            <p>Assets stored onchain can be accessed from any application.</p>
          </>
        ),
      },
      {
        header: "You can have a single login for most Ethereum based projects",
        description: (
          <>
            <p>
              The same account address will represent your identity on many
              different Ethereum compatible blockchains such as Arbitrum,
              Polygon or Optimism.
            </p>
            <p>
              Logins are handled by your wallet—no more creating insecure
              passwords.
            </p>
          </>
        ),
      },
      {
        header: "Personal identifying information is not shared",
        description: (
          <>
            <p>Your private information stays private.</p>
            <p>
              Your personal information, such as email or phone number, is not
              needed to use Web3 apps—you only need a wallet.
            </p>
            <p>
              Also note there are no associated transaction fees here—signing in
              using Ethereum is free, fast and easy!
            </p>
          </>
        ),
      },
      {
        header:
          "No geographical or political discrimination against who can use Ethereum services",
        description: (
          <>
            <p>There&apos;s the NFT you received!</p>
            <p>
              Wallets are technically only an interface to show you your balance
              and to make transactions—
              <strong>
                your assets aren&apos;t stored inside the wallet, but on the
                blockchain.
              </strong>
            </p>
          </>
        ),
      },
      {
        header: "Start your journey now",
        description: (
          <>
            <p>Great job! You&apos;re ready to start using apps on Ethereum.</p>
            <Stack>
              <p className="font-bold">What to do next:</p>
              <OrderedList>
                <ListItem>
                  <Link href="/security/">
                    Learn about staying safe in Web3
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/what-is-ethereum/">
                    Learn more about Ethereum
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/dapps/">
                    Check out some beginner friendly apps
                  </Link>
                </ListItem>
              </OrderedList>
            </Stack>
          </>
        ),
      },
    ],
    ctaLabels: [
      "Visit NFT market",
      "Connect wallet",
      "Connect to app",
      "Go to account",
      "Finished",
    ],
    finalCtaLink: {
      label: "Get a wallet",
      href: "/wallets/find-wallet/",
      isPrimary: true,
    },
  },
}
