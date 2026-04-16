"use client"

import { useTranslations } from "next-intl"

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

/**
 * The translate function shape shared by both useTranslations (client)
 * and getTranslations (server) from next-intl.
 */
type TranslateFn = ReturnType<typeof useTranslations<"simulator">>

/**
 * Hook returning translated simulator data for client components.
 */
export function useWalletOnboardingSimData(): SimulatorData {
  const t = useTranslations("simulator")
  return buildSimulatorData(t)
}

/**
 * Build simulator data with the provided translate function.
 * Works with both useTranslations (client) and getTranslations (server).
 */
export function buildSimulatorData(t: TranslateFn): SimulatorData {
  return {
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
                    <Emoji text="✅" className="me-2" /> Store it in a safe
                    place (consider multiple backups)
                  </ListItem>
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
      title: t("sim-sr-title"),
      Icon: SendReceiveIcon,
      Screen: SendReceive,
      explanations: [
        {
          header: t("sim-sr-header-1"),
          description: (
            <>
              <p>
                {t.rich("sim-sr-desc-1-p1", {
                  nft: (chunks) => (
                    <GlossaryTooltip termKey="nft">{chunks}</GlossaryTooltip>
                  ),
                  web3: (chunks) => (
                    <GlossaryTooltip termKey="web3">{chunks}</GlossaryTooltip>
                  ),
                })}
              </p>
              <p>{t("sim-sr-desc-1-p2")}</p>
              <p>{t("sim-sr-desc-1-p3")}</p>
            </>
          ),
        },
        {
          header: t("sim-sr-header-2"),
          description: (
            <>
              <p>
                {t.rich("sim-sr-desc-2-p1", {
                  em: (chunks) => <em>{chunks}</em>,
                })}
              </p>
              <p>{t("sim-sr-desc-2-p2")}</p>
            </>
          ),
        },
        {
          header: t("sim-sr-header-3"),
          description: (
            <>
              <p>{t("sim-sr-desc-3-p1")}</p>
              <p>{t("sim-sr-desc-3-p2")}</p>
              <p>{t("sim-sr-desc-3-p3")}</p>
            </>
          ),
        },
        {
          header: t("sim-sr-header-4"),
          description: (
            <>
              <p>{t("sim-sr-desc-4-p1")}</p>
              <p>{t("sim-sr-desc-4-p2")}</p>
              <p>{t("sim-sr-desc-4-p3")}</p>
            </>
          ),
        },
        {
          header: t("sim-sr-header-5"),
          description: (
            <>
              <p>{t("sim-sr-desc-5-p1")}</p>
              <p>{t("sim-sr-desc-5-p2")}</p>
              <p>{t("sim-sr-desc-5-p3", { contactName: CONTACTS[0].name })}</p>
            </>
          ),
        },
        {
          header: t("sim-sr-header-6"),
          description: (
            <>
              <p>{t("sim-sr-desc-6-p1")}</p>
              <p>{t("sim-sr-desc-6-p2")}</p>
            </>
          ),
        },
        {
          header: t("sim-sr-header-7"),
          description: <p>{t("sim-sr-desc-7-p1")}</p>,
        },
      ],
      ctaLabels: [
        "",
        t("sim-sr-cta-2"),
        "",
        t("sim-sr-cta-4"),
        "",
        t("sim-sr-cta-6"),
      ],
      finalCtaLink: {
        label: t("sim-sr-final-cta"),
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
          header:
            "Explore Web3: from NFTs to decentralized finance and identity",
          description: (
            <>
              <p>
                Your wallet can be used to connect to all sorts of applications,
                allowing you to interact with your onchain assets.
              </p>
              <p>
                Your friend just sent an NFT art piece to your address!
                Let&apos;s go to a new NFT marketplace website to view it.
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
          header:
            "You can have a single login for most Ethereum based projects",
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
                Also note there are no associated transaction fees here—signing
                in using Ethereum is free, fast and easy!
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
                Wallets are technically only an interface to show you your
                balance and to make transactions—
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
              <p>
                Great job! You&apos;re ready to start using apps on Ethereum.
              </p>
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
                    <Link href="/apps/">
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
}
